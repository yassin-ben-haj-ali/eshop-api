const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    gallery: {
        type: [String],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
})

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product