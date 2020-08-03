require('dotenv').config({path: "C:\\Users\\msmai\\Desktop\\code\\angular\\projeto\\hidden-notes\\server" + '/.env'})
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
app.use(bodyparser());

mongoose.connect(process.env.DB_LINK,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("conectado no banco de dados")
})

app.get('/note/:id', (req,res)=>{
    res.status(200).send({message: 'Teste'})
})

app.post('/note/new',(req,res)=>{
    res.status(200).send({message: req.body.content})
})

app.listen(3000);