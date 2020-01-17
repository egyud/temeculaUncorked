const express = require('express')
const router = express.Router()

const WineController = require('./wines.controllers')

// get /api/wines
router.get('/', WineController.getAllWines)

// get /api/wines/:winery
router.get('/:winery', WineController.getWines)

// get /api/wines/:winery/:name
router.get('/:winery/:name', WineController.getWine)

// post /api/wines/:winery/
router.post('/:winery', WineController.postWine)

module.exports = router