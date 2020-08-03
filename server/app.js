require('dotenv').config({path: "C:\\Users\\msmai\\Desktop\\code\\angular\\projeto\\hidden-notes\\server" + '/.env'})
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const { nanoid } = require("nanoid");
const NoteModel = require('./models/NoteModel');
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
//const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(bodyparser());
app.use(cors());


mongoose.connect(process.env.DB_LINK,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("conectado no banco de dados")
})

app.get('/note/:pageId', async(req,res)=>{
    try{
        if(!req.params.pageId){
            return res.status(500).send({error: 'missing params'})
        }
        NoteModel.findOneAndDelete({pageId:req.params.pageId},(err,note)=>{
            if(err || !note){
                return res.status(500).send({message:'Could not find the note, maybe its already deleted.',error:err})
            }
            let newNote = note;
            let encryptedData = newNote.content;
            newNote.content = decrypt({iv: newNote.iv, encryptedData: encryptedData});
            res.status(200).send(note);
        })
    }catch(err){
        return res.status(500).send(err)
    }
})

app.post('/note/new', async(req,res)=>{
    try{
        if(!req.body.content){
            return res.status(500).send({error: 'Error while trying to get message content'})
        }
        let newPageId = nanoid()
        let newNote = new NoteModel({content: req.body.content, pageId:newPageId, iv: ''})
        let encrypted = encrypt(req.body.content)
        newNote.content = encrypted.encryptedData;
        newNote.iv = encrypted.iv;

        await newNote.save()
        .then((n)=>{
            console.log(n)
            return res.status(200).send(n);
        })
    }catch(err){
        return res.status(500).send(err);
    }
})

app.listen(3000);

function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}
   
function decrypt(text) {
let iv = Buffer.from(text.iv, 'hex');
let encryptedText = Buffer.from(text.encryptedData, 'hex');
let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
let decrypted = decipher.update(encryptedText);
decrypted = Buffer.concat([decrypted, decipher.final()]);
return decrypted.toString();
}