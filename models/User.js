const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        emailVerifiedAt: {
            type: Date,
            default: null,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: false,
        },
        location: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);


const User = mongoose.model('User', UserSchema);
module.exports = User;