const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const querystring = require('querystring');

// Server configuration
const PORT = 8080;
const USERS_FILE = path.join(__dirname, 'users.json');

// Common MIME types for serving files
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif'
};

// Helper function to serve files with better error handling
async function serveFile(filePath, res) {
    try {
        console.log('Attempting to serve file:', filePath); // Debug log
        const data = await fs.readFile(filePath);
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'text/plain' });
        res.end(data);
    } catch (err) {
        console.error('Error serving file:', err); // Debug log
        if (err.code === 'ENOENT') {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        } else {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal server error');
        }
    }
}

// Helper function to manage users with better error handling
async function getUsers() {
    try {
        const data = await fs.readFile(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            // If file doesn't exist, create it with empty array
            await fs.writeFile(USERS_FILE, '[]');
            return [];
        }
        console.error('Error reading users file:', err); // Debug log
        throw err;
    }
}

// Helper function to save users with error handling
async function saveUsers(users) {
    try {
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        return true;
    } catch (err) {
        console.error('Error saving users:', err); // Debug log
        return false;
    }
}

const server = http.createServer(async (req, res) => {
    console.log('Received request:', req.method, req.url); // Debug log

    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle GET requests
    if (req.method === 'GET') {
        switch (req.url) {
            case '/':
                await serveFile(path.join(__dirname, 'index.html'), res);
                break;
            case '/login':
                await serveFile(path.join(__dirname, 'login.html'), res);
                break;
            case '/about':
                await serveFile(path.join(__dirname, 'about_us.html'), res);
                break;
            case '/dashboard':
                await serveFile(path.join(__dirname, 'dashboard.html'), res);
                break;
            case '/destinations':
                await serveFile(path.join(__dirname, 'destinations.html'), res);
                break;
            default:
                    // Handle static files
                    try {
                        const filePath = path.join(__dirname, req.url);
                        // Basic security check
                        if (!filePath.startsWith(__dirname)) {
                            res.writeHead(403, { 'Content-Type': 'text/plain' });
                            res.end('Forbidden');
                            return;
                        }
                        await serveFile(filePath, res);
                    } catch (err) {
                        console.error('Error serving static file:', err);
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('File not found');
                    }
        }
    }
    // Handle POST requests
    else if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
            if (body.length > 1e6) {
                req.connection.destroy();
            }
        });

        req.on('end', async () => {
            try {
                const formData = querystring.parse(body);
                console.log('Received form data:', formData); // Debug log

                if (req.url === '/signup') {
                    const users = await getUsers();

                    // Validate email and password
                    if (!formData.email || !formData.password) {
                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                        res.end('Email and password are required');
                        return;
                    }

                    // Check if email exists
                    if (users.some(user => user.email === formData.email)) {
                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                        res.end('Email already exists');
                        return;
                    }

                    // Add new user
                    users.push({
                        email: formData.email,
                        password: formData.password,
                        createdAt: new Date().toISOString()
                    });

                    // Save users
                    const saved = await saveUsers(users);
                    if (!saved) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error saving user data');
                        return;
                    }

                    res.writeHead(302, { 'Location': '/login?registered=1' });
                    res.end();
                }
                else if (req.url === '/login') {
                    const users = await getUsers();
                    const user = users.find(u =>
                        u.email === formData.email &&
                        u.password === formData.password
                    );

                    if (user) {
                        res.writeHead(302, { 'Location': '/dashboard' });
                        res.end();
                    } else {
                        res.writeHead(401, { 'Content-Type': 'text/plain' });
                        res.end('Invalid credentials');
                    }
                }
            } catch (err) {
                console.error('Error processing request:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            }
        });
    }
});

// Start server with proper initialization
server.listen(PORT, async () => {
    try {
        // Ensure users.json exists
        await getUsers();
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(`Serving files from: ${__dirname}`);
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err);
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use`);
        process.exit(1);
    }
});