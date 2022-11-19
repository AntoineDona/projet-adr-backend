import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create schema for todo
const CommandSchema = new Schema({
    name: {
        type: String
    },
    content: {
        type: [Object],
        required: [true, 'The command content field is required'],
    },
    date: {
        type: String,
    },
    last_update: {
        type: String,
    }
});

// Create model for todo
const Command = mongoose.model('command', CommandSchema);

export default Command;