const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    address:{
        type: String,
        trim:true
    },
  
    quantity:{
        type: Number,
        trim: true
    },

    
    amountTopay:{
        type: Number,
        trim: true
    },

    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'usuario' 
    },

    food: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'comida' 
    },

    state:{
        type: String,
        required:true,
        default: 'Pendiente'
    },

    score:{
        type: Number
    }
})

const OrderModel = mongoose.model('orden', OrderSchema)

module.exports = OrderModel;