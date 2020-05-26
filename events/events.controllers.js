const Event = require('./event.model')

exports.attendEvent = async (req, res) => {
  const { userId, eventId } = req.body
  // if the user isn't logged in, don't allow them to attend an event
  if (!userId) return res.send({ message: 'You must be logged in to do this' })
  try {
    let event = await Event.updateOne({ _id: eventId }, { $addToSet: { attending: userId } })
    return res.status(200).send({
      event,
      message: 'Success! You are now signed up for this event.'
      })
 
  } catch(error) {
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
    return res.status(400).send({ error })
  }
}

exports.getEventsForWinery = async (req, res) => {
  const { name } = req.params
  try {
    const events = await Event.find({ winery: name })
    return res.status(200).send({ events })
  } catch(error) {
    return res.status(400).send({ error })
  }
}

exports.postEvent = async (req, res) => {
  let { winery, title, date, time, description, price, membersOnly, adultsOnly } = req.body

  try {
    const eventDate = new Date(date)
    await Event.create({
      winery,
      title,
      date: eventDate,
      time,
      membersOnly,
      adultsOnly,
      price,
      description
    })
    return res.status(200).send({ message: 'Event posted' })
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