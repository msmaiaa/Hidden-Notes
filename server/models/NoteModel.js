const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    'content': String,
    'pageId': String,
    'iv': String,
})
module.exports = mongoose.model('Note',NoteSchema);
