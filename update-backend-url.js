const fs = require('fs');
const path = require('path');

// The URL of your deployed backend
const BACKEND_URL = process.env.BACKEND_URL || 'https://your-backend-url.com';

// Path to the frontend package.json
const packageJsonPath = path.join(__dirname, 'frontend', 'package.json');

// Read the package.json file
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update the proxy
packageJson.proxy = BACKEND_URL;

// Write the updated package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Updated frontend package.json to use backend at: ${BACKEND_URL}`); 