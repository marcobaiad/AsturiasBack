const mongoose = require('mongoose');
const OrderModel = require('../../models/order.model');
exports.pagoExitoso = async (req, res) => {
    const order = await OrderModel.findByIdAndUpdate(req.params.id)
    try {
        if(order.state === 'Pendiente de Pago'){
            order.amountTopay = 'Pagado con Tarjeta',
            order.state = 'Pendiente',
            await order.save();
            res.status(200).send({mensaje: 'se actualizo correctamente'})
        }else{
            return res.send({mensaje: 'ERR: Verificar el estado de la Orden.'})
        }
    } catch (err) {
        res.status(500).send(err);
        console.log(err)
    }
}