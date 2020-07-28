const mongoose = require('mongoose');
const FoodsModel = require('../../models/foods.model');

exports.ModifyFoods = async (req, res) => {

    try {

        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({mensaje: 'No hay resultado para la Busqueda'});
        }
        
        const foods = await FoodsModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send(foods)
    } catch (err) {
        res.status(500).send(err);
    }
}
