const express = require('express')
const router = express.Router()

const ManagementController = require('./management.controller')

// index page
router.get('/', ManagementController.getIndexPage)

// add event form
router.get('/addEvent', ManagementController.getAddEventForm)

// add wine form
router.get('/addWine', ManagementController.getAddWineForm)

// add club form
router.get('/addClub', ManagementController.getAddClubForm)

module.exports = router