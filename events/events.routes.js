const express = require('express')
const router = express.Router()

const eventsController = require('./events.controllers')

// post /api/events
router.post('/', eventsController.postEvent)

// post /api/events/attend
router.post('/attend', eventsController.attendEvent)

// post /api/events/unattend
router.post('/unattend', eventsController.unattendEvent)

// get /api/events
router.get('/', eventsController.getAllEvents)

// // get /api/events/user/:user
// router.get('/user/:user', eventsController.getUsersEvents)

// get /api/events/winery/:name
router.get('/winery/:name', eventsController.getEventsForWinery)

module.exports = router