const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dbProduct = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        default: 0
    },
    photo: [],
    about: {
        type: String,
        default: "Продукция"
    },
    category: {
        type: String
    },
    dateNow : {
        type : String,
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('product', dbProduct)