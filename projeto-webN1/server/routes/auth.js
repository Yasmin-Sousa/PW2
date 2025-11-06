const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


// POST /auth/signup
router.post('/signup', async (req, res) => {
try {
const { username, password } = req.body;
if (!username || !password) return res.status(400).json({ message: 'username e password são obrigatórios' });
const existing = await User.findOne({ username });
if (existing) return res.status(400).json({ message: 'username já existe' });
const hash = await bcrypt.hash(password, 10);
const user = await User.create({ username, password: hash });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
res.status(201).json({ token, user: { id: user._id, username: user.username } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Erro no servidor' });
}
});


// POST /auth/login
router.post('/login', async (req, res) => {
try {
const { username, password } = req.body;
if (!username || !password) return res.status(400).json({ message: 'username e password são obrigatórios' });
const user = await User.findOne({ username });
if (!user) return res.status(400).json({ message: 'Credenciais inválidas' });
const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ message: 'Credenciais inválidas' });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
res.json({ token, user: { id: user._id, username: user.username } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Erro no servidor' });
}
});


module.exports = router;
