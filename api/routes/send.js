const express = require('express');
const router = express.Router();

const { postSend} = require('../controller/send');

router.post('/send', postSend);

module.exports = router;
