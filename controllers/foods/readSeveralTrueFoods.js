const FoodsModel = require('../../models/foods.model');

exports.GetFoodsTrue =  async (req, res) => {
    
    const foodsTrue = await FoodsModel.find({enable: true})
    
    try {
        res.send(foodsTrue)
    } catch (err) {
        res.status(500).send(err);
    }
} 
