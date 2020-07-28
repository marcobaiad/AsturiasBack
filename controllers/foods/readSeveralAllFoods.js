const FoodsModel = require('../../models/foods.model');

exports.GetFoods =  async (req, res) => {
    
    const foods = await FoodsModel.find({})
    
    try {
        res.send(foods)
    } catch (err) {
        res.status(500).send(err);
    }
} 
