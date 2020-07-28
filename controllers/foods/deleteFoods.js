const mongoose = require('mongoose');
const FoodsModel = require('../../models/foods.model');

exports.RemoveFoods = async (req, res) => {

    try {

        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({mensaje: 'No hay resultado para la busqueda'});
        }
        
        const foods = await FoodsModel.findByIdAndDelete(req.params.id)
       
        if (!foods) res.status(400).send('No hay resultados')

        res.send({ mensaje: 'Se elimino de la Lista' })
    } catch (err) {
        res.status(500).send(err);
    }
}