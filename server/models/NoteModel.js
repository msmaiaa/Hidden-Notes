const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    'content': String
})
module.exports = mongoose.model('Note',NoteSchema);
