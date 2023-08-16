const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        username: String,
        provider: String, // Store the provider (Google, Github, Facebook)
        providerId: String, // Store the unique ID from the provider
        photo: String
    },
    {
        timestamps: true
    }
);


const User = mongoose.model('User', userSchema);


module.exports = User;