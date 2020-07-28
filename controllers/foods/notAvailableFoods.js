const mongoose = require('mongoose');
const FoodsModel = require('../../models/foods.model');

exports.FoodsND = async (req, res) => {

    try {        
        const foodnd = await FoodsModel.findByIdAndUpdate(req.params.id, {enable:false}, { new: true })
        res.send(foodnd)
    } catch (err) {
        res.status(500).send(err);
    }
}
 