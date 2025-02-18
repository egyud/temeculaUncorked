const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = require('./config/config').mongoURI
const passport = require('passport')
const cloudinaryConfig = require('./config/cloudinaryConfig').cloudinaryConfig

const app = express()

require('dotenv').config()

app.use(express.static('public'))

const wineryRoutes = require('./wineries/wineries.routes')
const userRoutes = require('./users/users.routes')
const reviewRoutes = require('./reviews/reviews.routes')
const ratingRoutes = require('./ratings/ratings.routes')
const wineRoutes = require('./wines/wines.routes')
const eventRoutes = require('./events/events.routes')
const imageRoutes = require('./images/images.routes')
const commentRoutes = require('./comments/comments.routes')

const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(passport.initialize())
require('./config/passport')(passport)

app.use('*', cloudinaryConfig)

app.use('/api/wineries', wineryRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/ratings', ratingRoutes)
app.use('/api/wines', wineRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/comments', commentRoutes)

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err))


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))