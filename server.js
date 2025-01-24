const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

app.get('/shapes', (req, res) => {
    fs.readFile('shapes.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading shapes data.');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/save-shapes', (req, res) => {
    fs.writeFile('shapes.json', JSON.stringify(req.body, null, 2), err => {
        if (err) {
            res.status(500).send('Error saving shapes.');
            return;
        }
        res.sendStatus(200);
    });
});

app.get('/color-count', (req, res) => {
    fs.readFile('shapes.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading shapes data.');
            return;
        }
        const shapes = JSON.parse(data);

        const colorCount = {
            red: 0,
            yellow: 0,
            green: 0,
            white: 0
        };

        shapes.forEach(shape => {
            switch (shape.color.toLowerCase()) {
                case "#ff0000":
                    colorCount.red++;
                    break;
                case "#ffff00":
                    colorCount.yellow++;
                    break;
                case "#008000":
                    colorCount.green++;
                    break;
                case "#ffffff":
                    colorCount.white++;
                    break;
            }
        });

        res.json(colorCount);
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
