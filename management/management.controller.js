const { getWines } = require('../utils/getWines') 
const { getClubs } = require('../utils/getClubs') 
const { getEvents } = require('../utils/getEvents') 

exports.getLoginPage = (req, res) => {
  res.render('login')
}

exports.getIndexPage = (req, res) => {
  res.render('index')
}

exports.getAddEventForm = (req, res) => {
  res.render('addEvent')
}

exports.getUpdateEventForm = (req, res) => {
  res.render('updateEvent')
}

exports.getAddWineForm = (req, res) => {
  res.render('addWine')
}

exports.getUpdateWineForm = (req, res) => {
  res.render('updateWine')
}

exports.getAddClubForm = (req, res) => {
  res.render('addClub')
}

exports.getUpdateClubForm = (req, res) => {
  res.render('updateClub')
}

exports.getUpdateInfoForm = (req, res) => {
  res.render('updateInfo')
}

exports.getClubListPage = async (req, res) => {
  let clubs = await getClubs()
  res.render('clubList')
}

exports.getEventListPage = async (req, res) => {
  let events = await getEvents()
  res.render('eventList')
}

exports.getWineListPage = async (req, res) => {
  let wines = await getWines()
  res.render('wineList')
}