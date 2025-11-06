const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = async (req, res, next) => {
const authHeader = req.headers.authorization;
if (!authHeader) return res.status(401).json({ message: 'Token não fornecido' });
const token = authHeader.split(' ')[1];
try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(payload.id).select('-password');
next();
} catch (err) {
return res.status(401).json({ message: 'Token inválido' });
}
};
module.exports = authMiddleware;
