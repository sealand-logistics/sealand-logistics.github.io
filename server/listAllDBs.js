const mongoose = require('mongoose');
require('dotenv').config();

async function listAll() {
    try {
        const client = await mongoose.connect(process.env.MONGODB_URI);
        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();
        console.log('Databases:');
        for (const dbInfo of dbs.databases) {
            console.log(`\nDB: ${dbInfo.name}`);
            const db = mongoose.connection.useDb(dbInfo.name);
            const collections = await db.db.listCollections().toArray();
            collections.forEach(c => console.log(` - ${c.name}`));
        }
        await mongoose.connection.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

listAll();
