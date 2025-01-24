const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SHAPES_FILE = path.join(__dirname, 'public/shapes.json');

app.use(express.json());
app.use(express.static('public'));

// Load shapes.json
app.get('/shapes', (req, res) => {
    fs.readFile(SHAPES_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading shapes file:", err);
            res.status(500).json({ error: "Error reading shapes file" });
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Save shapes.json
app.post('/save-shapes', (req, res) => {
    fs.writeFile(SHAPES_FILE, JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            console.error("Error saving shapes:", err);
            res.status(500).json({ error: "Error saving shapes" });
            return;
        }
        res.json({ message: "Shapes saved successfully" });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
