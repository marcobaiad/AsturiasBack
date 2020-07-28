const express = require('express');
const router = express.Router(); 

const statusServer = require('../controllers/status/status')

router.get('/', statusServer.status)

module.exports = router;