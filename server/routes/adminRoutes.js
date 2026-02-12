const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/adminController');
const { protect } = require('../utils/authMiddleware');

router.route('/projects').get(getProjects).post(protect, createProject);
router.route('/projects/:id').put(protect, updateProject).delete(protect, deleteProject);

router.route('/clients').get(getClients).post(protect, createClient);
router.route('/clients/:id').put(protect, updateClient).delete(protect, deleteClient);

router.route('/contacts').get(getContacts).post(createContact);
router.route('/contacts/:id').delete(protect, deleteContact);

router.route('/certifications').get(getCertifications).post(protect, createCertification);
router.route('/certifications/:id').put(protect, updateCertification).delete(protect, deleteCertification);

module.exports = router;
