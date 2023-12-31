// Create web server with Node.js

// Import modules
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Read JSON file
const data = fs.readFileSync('./data/comments.json');
const comments = JSON.parse(data);

// Get all comments
router.get('/', (req, res) => {
    res.send(comments);
});

// Get comment by id
router.get('/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found.');
    res.send(comment);
});

// Create new comment
router.post('/', (req, res) => {
    const comment = {
        id: comments.length + 1,
        comment: req.body.comment
    };
    comments.push(comment);
    res.send(comment);
});

// Update comment
router.put('/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found.');

    comment.comment = req.body.comment;
    res.send(comment);
});

// Delete comment
router.delete('/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found.');

    const index = comments.indexOf(comment);
    comments.splice(index, 1);

    res.send(comment);
});

module.exports = router;
