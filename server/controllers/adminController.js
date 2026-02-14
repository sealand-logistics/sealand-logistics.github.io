const Project = require('../models/Project');
const Client = require('../models/Client');
const Contact = require('../models/Contact');
const Certification = require('../models/Certification');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/mailService');
const axios = require('axios');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 300, checkperiod: 60 }); // 5 minutes cache

// Helper to clear cache on updates
const clearCache = () => {
    myCache.flushAll();
};

// @desc    Get all projects
// @route   GET /api/projects
const getProjects = asyncHandler(async (req, res) => {
    const { category } = req.query;
    const cacheKey = `projects_${category || 'all'}`;

    const cachedRecords = myCache.get(cacheKey);
    if (cachedRecords) {
        return res.json(cachedRecords);
    }

    let query = {};
    if (category) {
        query.category = category;
    }

    // Optimization: When listing, only fetch what's needed for cards
    // If it's a specific request from admin it might need full detail, 
    // but for the website list we typically only need title, image, images, category
    const projects = await Project.find(query).sort({ createdAt: -1 });

    myCache.set(cacheKey, projects);
    res.json(projects);
});

// @desc    Create new project
// @route   POST /api/projects
// @desc    Create new project
// @route   POST /api/projects
const createProject = asyncHandler(async (req, res) => {
    const { title, description, category, image, images } = req.body;

    // Fallback: If 'images' array is provided, use the first one as main 'image' if not provided
    const mainImage = image || (images && images.length > 0 ? images[0] : null);

    if (!title) {
        res.status(400);
        throw new Error('Title is required');
    }

    const project = await Project.create({
        title,
        description,
        category,
        image: mainImage,
        images: images || (mainImage ? [mainImage] : [])
    });

    if (req.io) req.io.emit('new_data', { type: 'project', action: 'create' });
    clearCache();
    res.status(201).json(project);
});

const updateProject = asyncHandler(async (req, res) => {
    console.log(`[Update Project] Request for ID: ${req.params.id}`, req.body);
    const project = await Project.findById(req.params.id);
    if (project) {
        if (req.body.title !== undefined) project.title = req.body.title;
        if (req.body.description !== undefined) project.description = req.body.description;
        if (req.body.category !== undefined) project.category = req.body.category;

        // Update images if provided
        if (req.body.images !== undefined) {
            project.images = req.body.images;
        }

        // Update main image if provided, or sync with first image if images changed
        if (req.body.image !== undefined) {
            project.image = req.body.image;
        } else if (req.body.images && req.body.images.length > 0) {
            project.image = req.body.images[0];
        }

        const updatedProject = await project.save();
        console.log('[Update Project] Success:', updatedProject._id);
        if (req.io) req.io.emit('new_data', { type: 'project', action: 'update' });
        clearCache();
        res.json(updatedProject);
    } else {
        console.warn(`[Update Project] Project not found: ${req.params.id}`);
        res.status(404);
        throw new Error('Project not found');
    }
});

const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (project) {
        await project.deleteOne();
        if (req.io) req.io.emit('new_data', { type: 'project', action: 'delete' });
        clearCache();
        res.json({ message: 'Project removed' });
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

const createClient = asyncHandler(async (req, res) => {
    const { name, logo } = req.body;
    if (!name || !logo) {
        res.status(400);
        throw new Error('Name and logo are required');
    }
    const client = await Client.create({ name, logo });
    if (req.io) req.io.emit('new_data', { type: 'client', action: 'create' });
    res.status(201).json(client);
});

const updateClient = asyncHandler(async (req, res) => {
    console.log(`[Update Client] Request for ID: ${req.params.id}`, req.body);
    const client = await Client.findById(req.params.id);
    if (client) {
        if (req.body.name !== undefined) client.name = req.body.name;
        if (req.body.logo !== undefined) client.logo = req.body.logo;
        const updatedClient = await client.save();
        console.log('[Update Client] Success:', updatedClient._id);
        if (req.io) req.io.emit('new_data', { type: 'client', action: 'update' });
        res.json(updatedClient);
    } else {
        console.warn(`[Update Client] Client not found: ${req.params.id}`);
        res.status(404);
        throw new Error('Client not found');
    }
});

const deleteClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);
    if (client) {
        await client.deleteOne();
        if (req.io) req.io.emit('new_data', { type: 'client', action: 'delete' });
        res.json({ message: 'Client removed' });
    } else {
        res.status(404);
        throw new Error('Client not found');
    }
});

const getClients = asyncHandler(async (req, res) => {
    const cacheKey = 'clients_all';
    const cached = myCache.get(cacheKey);
    if (cached) return res.json(cached);

    const clients = await Client.find().sort({ createdAt: -1 });
    myCache.set(cacheKey, clients);
    res.json(clients);
});

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
    const { name, company, email, phone, service, message } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('Please provide name, email and phone');
    }
    const contact = await Contact.create({ name, company, email, phone, service, message });

    // 1. Send data to Google Form (Automated Notification Engine)
    // Mappings from the pre-filled link provided by user
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdDrHyG2_URhLnKQPBsAQHC5FhhYDCH1HaxDmP7p0zB9P3bkw/formResponse';

    // Use URLSearchParams for x-www-form-urlencoded format
    const params = new URLSearchParams();
    params.append('entry.282018960', name);
    params.append('entry.1842346492', company || 'N/A');
    params.append('entry.1557182690', email);
    params.append('entry.1318938986', phone);
    params.append('entry.904656255', service);
    params.append('entry.1706289452', message || 'No message provided');

    axios.post(GOOGLE_FORM_URL, params.toString())
        .then(() => console.log('Inquiry successfully synced to Google Form'))
        .catch(e => console.error('Google Form Sync Error:', e.message));

    /* 
    Optional: Direct Email Service (Disabled due to Microsoft Auth restrictions)
    sendEmail({ ... }).catch(e => console.error(e)); 
    */

    if (req.io) req.io.emit('new_data', { type: 'contact', action: 'create' });
    res.status(201).json(contact);
});

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
        await contact.deleteOne();
        res.json({ message: 'Contact removed' });
    } else {
        res.status(404);
        throw new Error('Contact not found');
    }
});

// Certification Controllers
const getCertifications = asyncHandler(async (req, res) => {
    const cacheKey = 'certs_all';
    const cached = myCache.get(cacheKey);
    if (cached) return res.json(cached);

    const certs = await Certification.find().sort({ createdAt: -1 });
    myCache.set(cacheKey, certs);
    res.json(certs);
});

const createCertification = asyncHandler(async (req, res) => {
    const { name, image } = req.body;
    if (!name || !image) {
        res.status(400);
        throw new Error('Name and image are required');
    }
    const cert = await Certification.create({ name, image });
    if (req.io) req.io.emit('new_data', { type: 'certification', action: 'create' });
    res.status(201).json(cert);
});

const updateCertification = asyncHandler(async (req, res) => {
    console.log(`[Update Certification] Request for ID: ${req.params.id}`, req.body);
    const cert = await Certification.findById(req.params.id);
    if (cert) {
        if (req.body.name !== undefined) cert.name = req.body.name;
        if (req.body.image !== undefined) cert.image = req.body.image;
        const updatedCert = await cert.save();
        console.log('[Update Certification] Success:', updatedCert._id);
        if (req.io) req.io.emit('new_data', { type: 'certification', action: 'update' });
        res.json(updatedCert);
    } else {
        console.warn(`[Update Certification] Certification not found: ${req.params.id}`);
        res.status(404);
        throw new Error('Certification not found');
    }
});

const deleteCertification = asyncHandler(async (req, res) => {
    const cert = await Certification.findById(req.params.id);
    if (cert) {
        await cert.deleteOne();
        if (req.io) req.io.emit('new_data', { type: 'certification', action: 'delete' });
        res.json({ message: 'Certification removed' });
    } else {
        res.status(404);
        throw new Error('Certification not found');
    }
});

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    getClients,
    createClient,
    updateClient,
    deleteClient,
    getContacts,
    createContact,
    deleteContact,
    getCertifications,
    createCertification,
    updateCertification,
    deleteCertification
};
