const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for todo
const CommandSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A commande name field is required'],
    },
    content: {
        type: Array,
        required: [true, 'The command content field is required'],
    },
});

// Create model for todo
const Command = mongoose.model('command', CommandSchema);

module.exports = Command;