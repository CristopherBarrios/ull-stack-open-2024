const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const logger = require('./utils/logger');
const config = require('./utils/config')
const app = express()



mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI);


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })


  app.use(cors())
  app.use(express.static('dist'))
  app.use(express.json())


app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter)

module.exports = app