const { getWines } = require('../utils/getWines') 
const { getClubs } = require('../utils/getClubs') 
const { getEvents } = require('../utils/getEvents') 
const wineryList = require('../data/wineryList')

exports.getLoginPage = (req, res) => {
  res.render('login')
}

exports.getIndexPage = (req, res) => {
  res.render('index')
}

exports.getAddEventForm = (req, res) => {
  res.render('addEvent', {
    wineryList
  })
}

exports.getAddWineForm = (req, res) => {
  res.render('addWine', {
    wineryList
  })
}

exports.getAddClubForm = (req, res) => {
  res.render('addClub', {
    wineryList
  })
}