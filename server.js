const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to get the shapes data
app.get('/shapes', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'shapes.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading shapes data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Endpoint to save the shapes data
app.post('/save-shapes', (req, res) => {
    fs.writeFile(path.join(__dirname, 'public', 'shapes.json'), JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            res.status(500).send('Error saving shapes data');
        } else {
            res.send('Shapes data saved successfully');
        }
    });
});

// Endpoint to get color counts
app.get('/color-count', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'shapes.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading shapes data');
        } else {
            const shapes = JSON.parse(data);
            let colorCount = { red: 0, yellow: 0, green: 0, white: 0 };

            shapes.forEach(shape => {
                if (shape.color === "#FF0000") colorCount.red++;
                else if (shape.color === "#FFFF00") colorCount.yellow++;
                else if (shape.color === "#008000") colorCount.green++;
                else colorCount.white++;
            });

            res.json(colorCount);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
