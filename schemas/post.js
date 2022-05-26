const mongoose = require("mongoose");

// Schema 생성

const Postschema = new mongoose.Schema({
    
    postId:String,
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    postdate: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Post", Postschema)