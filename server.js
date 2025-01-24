const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// Serve shapes.json
app.get('/shapes.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shapes.json'));
});

// Save updated shapes
app.post('/save-shapes', (req, res) => {
    const shapes = req.body;
    fs.writeFile(path.join(__dirname, 'public', 'shapes.json'), JSON.stringify(shapes, null, 2), (err) => {
        if (err) {
            console.error("Error saving shapes:", err);
            res.status(500).json({ message: 'Error saving shapes' });
        } else {
            res.json({ message: 'Shapes saved successfully' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
