require('dotenv').config()

const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const glob = require('glob')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const routes = require('./routes')
const routerHandler = routes.getRequestHandler(app)

const Diamond = require('./models/diamond')
server.get('/api/diamonds', function (req, res) {
  let findQuery = {}
  if ('carat' in req.query) {
    let carat = req.query.carat.split('-')
    findQuery['Carat'] = { $gte: parseFloat(carat[0]), $lte: parseFloat(carat[1]) }
  }
  else {
    const allowedFields = ['Color', 'Clarity', 'Cut', 'Polish', 'Symmetry', 'Fluorescent']
    allowedFields.forEach((allowedField) => {
      if (allowedField in req.query) {
        findQuery[allowedField] = { $in: req.query[allowedField].split(',') }
      }
    })
  }
  let q = Diamond.find(findQuery)
  q.limit(100)
  q.exec((err, diamonds) => {
    res.send(diamonds)
  })
})
const { config } = require('../config/config')

app.prepare().then(() => {
  // Parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }))
  // Parse application/json
  server.use(bodyParser.json())

  // Allows for cross origin domain request:
  server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  // MongoDB
  mongoose.Promise = Promise
  mongoose.connect(config.databaseUrl, { useMongoClient: true })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  // REST API routes
  const rootPath = require('path').join(__dirname, '/..')
  glob.sync(rootPath + '/server/api/*.js').forEach(controllerPath => {
    if (!controllerPath.includes('.test.js')) require(controllerPath)(server)
  })

  // Next.js page routes
  server.get('*', routerHandler)

  // Start server
  server.listen(config.serverPort, () => console.log(`${config.appName} running on http://localhost:${config.serverPort}/`))
})
