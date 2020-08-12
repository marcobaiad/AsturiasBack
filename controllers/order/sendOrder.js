const mongoose = require('mongoose');
const OrderModel = require('../../models/order.model');
const SendOrderEmail = require('../../middlewares/sendOrderEmail');
exports.sendOrder = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ mensaje: 'No hay resultado para la busqueda' });
    }
    const order = await OrderModel.findById(req.params.id)
        .populate({ path: 'user', select: '-_id, email name' })
    const mailContent = {
        email: order.user.email,
        subject: 'Pedido en Camino ' + order.user.name,
        msg: '¡' + order.user.name  + ' Tu Pedido Se Ha Enviado' + '!'
    } 
    try {
        if (order.state === 'En Proceso') {
            order.state = 'Enviado'
            await order.save();
            await SendOrderEmail(mailContent.email, mailContent.subject, mailContent.msg)
            res.send(order)
        } else {
            return res.send({ mensaje: 'ERR: Verificar el estado de la Orden.' })
        }
    } catch (err) {
        res.status(500).send(err);
    }
}