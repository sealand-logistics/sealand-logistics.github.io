const Project = require('../models/Project');
const Client = require('../models/Client');
const Contact = require('../models/Contact');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/mailService');

// @desc    Get all projects
// @route   GET /api/projects
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
});

// @desc    Create new project
// @route   POST /api/projects
const createProject = asyncHandler(async (req, res) => {
    const { title, description, category, image } = req.body;
    if (!title || !image) {
        res.status(400);
        throw new Error('Title and image are required');
    }
    const project = await Project.create({ title, description, category, image });
    if (req.io) req.io.emit('new_data', { type: 'project', action: 'create' });
    res.status(201).json(project);
});

const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (project) {
        project.title = req.body.title || project.title;
        project.description = req.body.description || project.description;
        project.category = req.body.category || project.category;
        project.image = req.body.image || project.image;
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

    sendEmail({
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: 'New Contact Form Submission - Sealand',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="background-color: #000040; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h2 style="color: #FF6600; margin: 0; font-style: italic;">Sealand Logistics</h2>
                </div>
                <div style="padding: 20px; color: #333;">
                    <h3 style="border-bottom: 2px solid #FF6600; padding-bottom: 10px;">New Inquiry Received</h3>
                    <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 10px 0;"><strong>Company:</strong> ${company || 'N/A'}</p>
                    <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>
                    <p style="margin: 10px 0;"><strong>Service:</strong> ${service}</p>
                    <div style="margin-top: 20px;">
                        <strong>Message:</strong>
                        <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #FF6600; margin-top: 10px; font-style: italic;">
                            ${message || 'No message provided'}
                        </div>
                    </div>
                </div>
                <div style="text-align: center; padding: 15px; background-color: #f8f8f8; font-size: 11px; color: #777; border-radius: 0 0 10px 10px;">
                    This is an automated notification from Sealand Logistics Portal. Please do not reply to this email directly.
                </div>
            </div>
        `,
    }).catch(e => console.error('Email error:', e));

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
    deleteContact
};
