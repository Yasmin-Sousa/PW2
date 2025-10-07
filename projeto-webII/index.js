const express = require('express');
const app = express();
app.use(express.json());

const db = require('./models');

const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () =>{
    console.log("Servidor rodando na porta 3001");
    })
})

