const mongoose = require('mongoose');
const OrderModel = require('../../models/order.model');
exports.pagoRechazado = async (req, res) => {
    try {
        await OrderModel.findByIdAndDelete(req.params.id)
        res.status(200).send({mensaje: 'No se Pudo Concretar El Pago'})
    } catch (err) {
        res.status(500).send(err);
        console.log(err)
    }
}