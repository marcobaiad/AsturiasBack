const mongoose = require('mongoose');
const OrderModel = require('../../models/order.model');

exports.DeleteOrder = async (req, res) => {

    try {

        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({mensaje: 'No hay resultado para la busqueda'});
        }
        
        const order = await OrderModel.findByIdAndDelete(req.params.id)
       
        if (!order) res.status(400).send('No hay resultados')

        res.send({ mensaje: 'Se elimino la orden' })
    } catch (err) {
        res.status(500).send(err);
    }
}