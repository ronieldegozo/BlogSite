const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    
    title: { 
        type: String, 
        required: true
    },
    content: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    }


});

module.exports = mongoose.model('Blog', blogSchema);