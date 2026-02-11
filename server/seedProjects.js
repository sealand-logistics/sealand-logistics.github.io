const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const projects = [
    // OOG Projects
    { title: 'Turbine Transport', description: 'Heavy Lift / Europe', image: 'http://localhost:5000/uploads/oog/1.png', category: 'OOG' },
    { title: 'Industrial Boiler', description: 'Road Transport / Germany', image: 'http://localhost:5000/uploads/oog/2.png', category: 'OOG' },
    { title: 'Power Generator', description: 'Multimodal / Asia', image: 'http://localhost:5000/uploads/oog/3.png', category: 'OOG' },
    { title: 'Construction Machinery', description: 'Breakbulk / USA', image: 'http://localhost:5000/uploads/oog/4.png', category: 'OOG' },
    { title: 'Wind Blades', description: 'Special Trailer / Denmark', image: 'http://localhost:5000/uploads/oog/5.png', category: 'OOG' },
    { title: 'Factory Relocation', description: 'Project Cargo / Global', image: 'http://localhost:5000/uploads/oog/6.png', category: 'OOG' },
    { title: 'Mining Equipment', description: 'Out of Gauge / Australia', image: 'http://localhost:5000/uploads/oog/7.png', category: 'OOG' },
    { title: 'Oil & Gas Modules', description: 'Sea Freight / Middle East', image: 'http://localhost:5000/uploads/oog/8.png', category: 'OOG' },
    { title: 'Railway Locomotives', description: 'Rail Transport / Africa', image: 'http://localhost:5000/uploads/oog/9.png', category: 'OOG' },
    { title: 'Marine Vessels', description: 'Heavy Lift / South America', image: 'http://localhost:5000/uploads/oog/10.png', category: 'OOG' },
    { title: 'Aerospace Parts', description: 'Air Freight / North America', image: 'http://localhost:5000/uploads/oog/11.png', category: 'OOG' },
    { title: 'Infrastructure Beams', description: 'Special Transport / Asia', image: 'http://localhost:5000/uploads/oog/12.png', category: 'OOG' },

    // Specializations
    {
        title: 'OOG, Project Cargo, ODC, Break Bulk',
        description: 'Advanced engineered logistics solutions for complex OOG, oversized, over-dimensional, project and break bulk cargo.',
        image: 'http://localhost:5000/uploads/specializations/1.png',
        category: 'Specialization',
        points: [
            'Specialized handling of OOG, break bulk, and project cargo',
            'Heavy-lift operations, crane deployment, and route engineering',
            'Feasibility studies, permits, and regulatory clearances',
            'Multi-modal execution across road, barge, sea and port operations',
            'Controlled, end-to-end project execution with on-ground coordination'
        ]
    },
    {
        title: 'Reefer cargo export-import logistics',
        description: 'Eastern India\'s leading reefer trailer operators specializing in temperature-controlled EXIM logistics.',
        image: 'http://localhost:5000/uploads/specializations/2.png',
        category: 'Specialization',
        points: [
            'Comprehensive refrigerated logistics planning and execution',
            'Safe handling of perishables, pharmaceuticals, food products, and sensitive cargo',
            'Compliance with international cold-chain standards and quality protocols',
            'Seamless coordination across ports, carriers, and inland transport networks',
            'End-to-end visibility with proactive risk and temperature management'
        ]
    },
    {
        title: 'India–Bangladesh land export & imports',
        description: 'Specialized cross-border logistics solutions for seamless India - Bangladesh land trade via Asia\'s busiest land port of Petrapole & Benapole.',
        image: 'http://localhost:5000/uploads/specializations/3.png',
        category: 'Specialization',
        points: [
            'Expertise in land-port operations, customs, and cross-border procedures',
            'Coordinated documentation and regulatory compliance support',
            'Reliable trucking with transit & transshipment cargo management',
            'Optimized processes to reduce border dwell time',
            'Secure, compliant movement of import and export consignments'
        ]
    },

    // Industry Expertise
    { title: 'Solar ( C&I )', image: 'http://localhost:5000/uploads/industries/Solar.png', category: 'Industry' },
    { title: 'Heavy Engineering', image: 'http://localhost:5000/uploads/industries/Heavy Engineering.png', category: 'Industry' },
    { title: 'Oil & Gas', image: 'http://localhost:5000/uploads/industries/Oil Gas.png', category: 'Industry' },
    { title: 'Petrochemicals', image: 'http://localhost:5000/uploads/industries/Petrochemical.png', category: 'Industry' },
    { title: 'Mining', image: 'http://localhost:5000/uploads/industries/Mining.png', category: 'Industry' },
    { title: 'Steel & Metals', image: 'http://localhost:5000/uploads/industries/Steel.png', category: 'Industry' },
    { title: 'Automotive', image: 'http://localhost:5000/uploads/industries/Automotive.png', category: 'Industry' },
    { title: 'Seafood & Perishables', image: 'http://localhost:5000/uploads/industries/Seafood.png', category: 'Industry' },
    { title: 'EPC & Project Cargo', image: 'http://localhost:5000/uploads/industries/EPC.png', category: 'Industry' },
    { title: 'Industrial Machinery', image: 'http://localhost:5000/uploads/industries/IndustrialMachinary.png', category: 'Industry' },
    { title: 'Specialty Chemicals', image: 'http://localhost:5000/uploads/industries/SpcialtyChemicals.png', category: 'Industry' },
    { title: 'Cotton & Textiles', image: 'http://localhost:5000/uploads/industries/Cotton.png', category: 'Industry' },
    { title: 'Power & Energy Projects', image: 'http://localhost:5000/uploads/industries/PowerEnergy.png', category: 'Industry' },
    { title: 'Batteries & BESS', image: 'http://localhost:5000/uploads/industries/Batteries.png', category: 'Industry' },
    { title: 'Electronics & Semiconductors', image: 'http://localhost:5000/uploads/industries/Electronics.png', category: 'Industry' },
    { title: 'Consumer Goods , Retail & E-commerce', image: 'http://localhost:5000/uploads/industries/ConsumerGoods.png', category: 'Industry' },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing OOG and Industry projects if needed, or just insert
        // For security, let's not clear all projects, but maybe clear these specific ones
        // Actually, let's just insert them.

        await Project.insertMany(projects);
        console.log('Database seeded successfully');
        process.exit();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
