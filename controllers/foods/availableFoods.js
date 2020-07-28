const mongoose = require('mongoose');
const FoodsModel = require('../../models/foods.model');

exports.FoodsDis = async (req, res) => {

    try {        
        const FoodsDis = await FoodsModel.findByIdAndUpdate(req.params.id, {enable:true}, { new: true })
        res.send(FoodsDis)
    } catch (err) {
        res.status(500).send(err);
    }
}