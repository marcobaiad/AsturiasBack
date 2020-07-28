const express = require('express');
const router = express.Router();

const dishesRouter = require('./foods.routes')
const orderRouter = require('./order.routes')
const usersRouter = require('./users.routes')
const statusRouter = require('./status.routes')

router.use('/comidas', dishesRouter)
router.use('/orden', orderRouter)
router.use('/usuarios', usersRouter)
router.use('/status', statusRouter)

module.exports = router;
