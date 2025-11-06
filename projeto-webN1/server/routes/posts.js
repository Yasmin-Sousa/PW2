const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');
const router = express.Router();


// GET /posts
router.get('/', async (req, res) => {
try {
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 6;
const skip = (page - 1) * limit;
const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user', 'username');
const total = await Post.countDocuments();
res.json({ posts, total });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Erro ao listar posts' });
}
});


// GET /posts/:id
router.get('/:id', async (req, res) => {
try {
const post = await Post.findById(req.params.id).populate('user', 'username');
if (!post) return res.status(404).json({ message: 'Post não encontrado' });
res.json(post);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Erro ao buscar post' });
}
});


// POST /posts
router.post('/', auth, async (req, res) => {
try {
const { title, text } = req.body;
if (!title || !text) return res.status(400).json({ message: 'title e text são obrigatórios' });
const post = await Post.create({ title, text, user: req.user._id });
res.status(201).json(post);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Erro ao criar post' });
}
});


module.exports = router;
