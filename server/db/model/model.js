const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name : String,
    image : String,
    price : Number,
    category : String,
    use : String,
    description:String,
})
let product = mongoose.model('product',userSchema);
module.exports = product