require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./services/db');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);


const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGODB_URI || 'mongodb://localhost:27017/project_n1')
.then(() => app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`)))
.catch(err => console.error('Erro conectando ao DB:', err));
