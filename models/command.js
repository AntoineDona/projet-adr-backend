const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for todo
const CommandSchema = new Schema({
    name: {
        type: String
    },
    content: {
        type: Array,
        required: [true, 'The command content field is required'],
    },
    date: {
        type: String,
    }
});

// Create model for todo
const Command = mongoose.model('command', CommandSchema);

module.exports = Command;