const express = require('express')

const { message_index, message_create_post} = require('../controllers/messageController')


const router = express.Router()


// get all messages

router.get('/all', message_index)

// add message

router.post('/create', message_create_post)
 
 module.exports = router;

