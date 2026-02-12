const Project = require('../models/Project');
const Client = require('../models/Client');
const Contact = require('../models/Contact');
const Certification = require('../models/Certification');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/mailService');
const axios = require('axios');

// @desc    Get all projects
// @route   GET /api/projects
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 });
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
    res.status(201).json(project);
});

const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (project) {
        project.title = req.body.title || project.title;
        project.description = req.body.description || project.description;
        project.category = req.body.category || project.category;

        // Update images if provided
        if (req.body.images) {
            project.images = req.body.images;
        }

        // Update main image if provided, or sync with first image if images changed
        if (req.body.image) {
            project.image = req.body.image;
        } else if (req.body.images && req.body.images.length > 0) {
            project.image = req.body.images[0];
        }

        const updatedProject = await project.save();
        if (req.io) req.io.emit('new_data', { type: 'project', action: 'update' });
        res.json(updatedProject);
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (project) {
        await project.deleteOne();
        if (req.io) req.io.emit('new_data', { type: 'project', action: 'delete' });
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
    const client = await Client.findById(req.params.id);
    if (client) {
        client.name = req.body.name || client.name;
        client.logo = req.body.logo || client.logo;
        const updatedClient = await client.save();
        if (req.io) req.io.emit('new_data', { type: 'client', action: 'update' });
        res.json(updatedClient);
    } else {
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
    const clients = await Client.find().sort({ createdAt: -1 });
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
    const certs = await Certification.find().sort({ createdAt: -1 });
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
    const cert = await Certification.findById(req.params.id);
    if (cert) {
        cert.name = req.body.name || cert.name;
        cert.image = req.body.image || cert.image;
        const updatedCert = await cert.save();
        if (req.io) req.io.emit('new_data', { type: 'certification', action: 'update' });
        res.json(updatedCert);
    } else {
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
