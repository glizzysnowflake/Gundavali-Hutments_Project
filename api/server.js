import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'shapes.json');

function loadShapes() {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveShapes(shapes) {
    fs.writeFileSync(filePath, JSON.stringify(shapes, null, 2), 'utf8');
}

export default function handler(req, res) {
    if (req.method === 'GET') {
        return res.status(200).json(loadShapes());
    } 
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const shapes = JSON.parse(body);
            saveShapes(shapes);
            res.status(200).json({ success: true });
        });
    }
}
