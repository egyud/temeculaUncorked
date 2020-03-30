const Event = require('./event.model')
const mongoose = require('mongoose')

exports.attendEvent = async (req, res) => {
  const { userId, eventId } = req.body
  // if the user isn't logged in, don't allow them to attend an event
  if (!userId) return res.send({ message: 'You must be logged in to do this' })
  try {
    let event = await Event.findOne({ _id: eventId })
    // check to see if user is already attending that event
    if (!event.attending.includes(userId)) {
      event = await Event.updateOne({ _id: eventId }, { $push: { attending: userId } })
      return res.status(200).send({
        event,
        message: 'Success! You are now signed up for this event.'
       })
    }
    return res.send({ message: 'You are already attending this event' })
  } catch(error) {
    console.error(error)
    return res.status(400).send({ message: 'Error signing up for this event.' })
  }
}

exports.unattendEvent = async (req, res) => {
  const { userId, winery, eventId } = req.body
  // if the user isn't logged in, don't allow them to attend an event
  if (!userId) return res.send({ message: 'You must be logged in to do this' })
  try {
    let event = await Event.updateOne({ _id: eventId }, { $pull: { attending: userId } })
    return res.status(200).send({ event })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error })
  }
}

exports.getEventsForWinery = async (req, res) => {
  const { name } = req.params
  try {
    const events = await Event.find({ winery: name })
    return res.status(200).send({ events })
  } catch(error) {
    console.log('ERROR IN getEVENTS')
    return res.status(400).send({ error })
  }
}

exports.postEvent = async (req, res) => {
  // const { winery, title, date, time } = req.body
  try {
    const event = await Event.create({ ...req.body })
    return res.status(200).send({ event })
  } catch(error) {
    console.error(error)
    return res.status(400).send({ error })
  }
}

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: 1 })
    return res.status(200).send({ events })
  } catch(error) {
    console.error(error)
    return res.status(400).send({ error })
  }
}

exports.getUsersEvents = async (req, res) => {
  console.log('in getUserEvents')
  const { userId } = req.params
  try {
    const events = await Event.find({ attending: userId })
    return res.status(200).send({ events })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error })
  }
}