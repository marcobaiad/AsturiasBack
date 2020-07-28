const mongoose = require('mongoose')
const OrderModel = require('../../models/order.model');

exports.searchOrder = async (req, res) => {

    const order = await OrderModel.find({ user: res.locals.user.id })
    .populate({ path: 'user', select: '-_id, name' })
    .populate({ path: 'food', select: '-_id, title' })
    
    try {

       let newOrder = order.filter( orden => {
            return orden.state !== 'Finalizado' && orden.state !== 'Cancelado';
          });

          res.send(newOrder)

    } catch (error) {
        console.log(error)
    }
    
      
}