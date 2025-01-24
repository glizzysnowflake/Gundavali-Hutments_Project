const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Load shapes from JSON file
app.get('/shapes', (req, res) => {
    fs.readFile('shapes.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error reading shapes.json" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Update shapes.json when an admin changes colors
app.post('/update-shapes', (req, res) => {
    fs.writeFile('shapes.json', JSON.stringify(req.body, null, 4), 'utf8', (err) => {
        if (err) {
            res.status(500).json({ error: "Error saving shapes.json" });
        } else {
            res.json({ message: "Shapes updated successfully" });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
