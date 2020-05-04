const express = require('express')
const router = express.Router()

const ManagementController = require('./management.controller')

// log-in page
router.get('/', ManagementController.getLoginPage)

// index page
router.get('/index', ManagementController.getIndexPage)

// add event form
router.get('/addEvent', ManagementController.getAddEventForm)

// update/delete event form
router.get('/updateEvent', ManagementController.getUpdateEventForm)

// add wine form
router.get('/addWine', ManagementController.getAddWineForm)

// update/delete wine form
router.get('/updateWine', ManagementController.getUpdateWineForm)

// add club form
router.get('/addClub', ManagementController.getAddClubForm)

// update/delete club form
router.get('/updateClub', ManagementController.getUpdateClubForm)

// update winery info form
router.get('/updateInfo', ManagementController.getUpdateInfoForm)

router.get('/eventList', ManagementController.getEventListPage)

router.get('/clubList', ManagementController.getClubListPage)

router.get('/wineList', ManagementController.getWineListPage)

module.exports = router