const FoodsModel = require('../../models/foods.model');

exports.CreateFoods = async (req, res) => {

    const foods = new FoodsModel(req.body);
   
    try {
        await foods.save();
        res.send(foods)
        
    } catch (err) {
        res.status(500).send(err);
    }
}
