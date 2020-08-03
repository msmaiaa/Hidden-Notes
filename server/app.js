require('dotenv').config({path: "C:\\Users\\msmai\\Desktop\\code\\angular\\projeto\\hidden-notes\\server" + '/.env'})
const { nanoid } = require("nanoid");
const NoteModel = require('./models/NoteModel');
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(bodyparser());
app.use(cors());


mongoose.connect(process.env.DB_LINK,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("conectado no banco de dados")
})

app.get('/note/:pageId', (req,res)=>{
    res.status(200).send({message: 'Teste'})
})

app.post('/note/new', async(req,res)=>{
    try{
        if(!req.body.content){
            return res.status(500).send({error: 'Error while trying to get message content'})
        }
        let newPageId = nanoid()
        let newNote = new NoteModel({content: req.body.content, pageId:newPageId})
    
        newNote.content = bcrypt.hashSync(req.body.content, parseInt(process.env.BCRYPT_SALT))
    
        await newNote.save()
        .then((n)=>{
            return res.status(200).send(n);
        })
    }catch(err){
        return res.status(500).send(err);
    }
})

app.listen(3000);