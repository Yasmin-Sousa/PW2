const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();


// GET /comments/:postId
router.get('/:postId', async (req, res) => {
try {
const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
res.json(comments);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Erro ao listar comentários' });
}
});


// POST /comments
router.post('/', async (req, res) => {
try {
const { text, postId } = req.body;
if (!text || !postId) return res.status(400).json({ message: 'text e postId são obrigatórios' });
const comment = await Comment.create({ text, postId });
res.status(201).json(comment);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Erro ao criar comentário' });
}
});


module.exports = router;
