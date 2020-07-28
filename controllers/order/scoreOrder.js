const mongoose = require('mongoose');
const OrderModel = require('../../models/order.model');

exports.scoreOrder =  async (req, res) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({mensaje: 'No hay resultado para la busqueda'});
    }

    const order = await OrderModel.findById(req.params.id)

    try {
       if(order.state !== 'Enviado'){
        return res.status(400).send({mensaje: 'ERR: solo se puede Puntuar un Pedido Enviado.'})
       }
        if(order.score > 5 || order.score < 1){
            res.status(400).send({mensaje:'Solamente se puede puntuar de 1 a 5'})
        }else{
            order.score = req.body.score
            order.state = 'Finalizado'
            await order.save();
            res.send({mensaje: 'Muchas Gracias Por Puntuarnos', order})
        }
        
    } catch (err) {
        res.status(500).send(err);
    }
}

