const mongoose = require('mongoose');
const OrderModel = require('../../models/order.model');

exports.sendOrder =  async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ mensaje: 'No hay resultado para la busqueda' });
    }
    const order = await OrderModel.findById(req.params.id)
        
    try {
            if(order.state === 'En Proceso'){
                order.state = 'Enviado'
                await order.save();
                res.send(order)
            }else{
                return res.send({mensaje: 'ERR: Verificar el estado de la Orden.'})
            }
     

    } catch (err) {
        res.status(500).send(err);
    }
}