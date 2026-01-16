const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8000;
const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Parse URL
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Normaliser le chemin
    filePath = path.normalize(filePath);

    // Obtenir l'extension du fichier
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    // Lire le fichier
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Fichier non trouvé
                res.writeHead(404, { 
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end('<h1>404 - Fichier non trouvé</h1>', 'utf-8');
            } else {
                // Erreur serveur
                res.writeHead(500, { 
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(`<h1>500 - Erreur serveur: ${error.code}</h1>`, 'utf-8');
            }
        } else {
            // Succès
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': '*'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log('\n🚀 Serveur démarré !');
    console.log(`📂 Répertoire: ${process.cwd()}`);
    console.log(`🌐 URL: ${url}`);
    console.log(`⏹️  Appuyez sur Ctrl+C pour arrêter le serveur\n`);
    
    // Ouvrir automatiquement le navigateur
    const platform = process.platform;
    let command;
    
    if (platform === 'win32') {
        command = `start ${url}`;
    } else if (platform === 'darwin') {
        command = `open ${url}`;
    } else {
        command = `xdg-open ${url}`;
    }
    
    exec(command, (error) => {
        if (error) {
            console.log(`💡 Ouvrez manuellement votre navigateur à l'adresse: ${url}\n`);
        }
    });
});
