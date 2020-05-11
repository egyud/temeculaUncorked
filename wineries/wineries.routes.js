const express = require('express')
const router = express.Router()

const WineriesController = require('./wineries.controller')

// post /api/wineries
router.post('/', WineriesController.postWinery)

// get /api/wineries
router.get('/', WineriesController.getWineries)

// get /api/wineries/wines
router.get('/wines', WineriesController.getAllWines)

// put /api/wineries/keys/:name
router.put('/keys/:name', WineriesController.postKeywords) 

// post /api/wineries/club
router.post('/club', WineriesController.postWineClub)

// post /api/wineries/music/:name
router.post('/music/:name', WineriesController.postLiveMusic)

// get /api/wineries/music
router.get('/music', WineriesController.getLiveMusic)

// post /api/wineries/keywords/:name
router.post('/keywords/:name', WineriesController.postKeywords)

// get /api/wineries/club
router.get('/club', WineriesController.getWineClubs)

// post /api/wineries/:name
router.post('/:name', WineriesController.postWines)

// get /api/wineries/page/:name
router.get('/page/:name', WineriesController.getWinery)

// get /api/winieries/wine/:name/:wine
router.get('/wine/:name/:wine', WineriesController.getWine)

// patch /api/wineries/wine/:name/:wine/:rating
// router.patch('/wine/:name/:wine/:rating', WineriesController.updateWineRating)

// get /api/wineries/wine/:name/:wine/rating
router.get('/wine/:name/:wine/rating', WineriesController.getWineRating)

// post /api/wineries/events/:winery
router.post('/events/:winery', WineriesController.postEvents)

// get /api/wineries/events
router.get('/events', WineriesController.getAllEvents)

// get /api/wineries/events/:winery
router.get('/events/:winery', WineriesController.getEventsForOne)

module.exports = router