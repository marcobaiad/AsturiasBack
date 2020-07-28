const mongoose = require('mongoose');
const OrderModel = require('../../models/order.model');

exports.getOrder =  async(req, res) => {
    try {
    
        const orders = await OrderModel.findById(req.params.id)
        .populate({ path: 'user', select: '-_id, name' })
        .populate({ path: 'food', select: '-_id, title' })
        
        res.send(orders)
    } catch (err) {
        res.status(500).send(err);
    }
}
