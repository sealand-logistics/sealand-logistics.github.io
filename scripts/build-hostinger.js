const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
    // 1. Build Client
    console.log('Building Client...');
    execSync('npm run build:client', { stdio: 'inherit' });

    // 2. Build Admin
    console.log('Building Admin...');
    execSync('npm run build:admin', { stdio: 'inherit' });

    // Paths
    const clientDist = path.join(__dirname, '../client/dist');
    const adminDist = path.join(__dirname, '../admin/dist');
    const adminDest = path.join(clientDist, 'admin');

    // 3. Ensure client/dist/admin exists (clean first)
    if (fs.existsSync(adminDest)) {
        console.log('Cleaning old admin build...');
        fs.rmSync(adminDest, { recursive: true, force: true });
    }
    fs.mkdirSync(adminDest, { recursive: true });

    // 4. Copy admin build to client/dist/admin
    console.log('Copying Admin build to Client/dist...');
    fs.cpSync(adminDist, adminDest, { recursive: true });

    // 5. Copy .htaccess to client/dist/.htaccess
    const htaccessSrc = path.join(__dirname, '../client/public/.htaccess');
    const htaccessDest = path.join(clientDist, '.htaccess');

    if (fs.existsSync(htaccessSrc)) {
        console.log('Copying .htaccess...');
        fs.copyFileSync(htaccessSrc, htaccessDest);
    } else {
        console.warn('Warning: .htaccess not found in client/public!');
    }

    console.log('Build Complete! The "client/dist" folder is ready for upload.');

} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}
