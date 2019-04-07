'use strict'

const mongooseCrudify = require('mongoose-crudify')

const helpers = require('../services/helpers')
const Diamond = require('../models/diamond')

module.exports = function (server) {
  // Docs: https://github.com/ryo718/mongoose-crudify
  server.use(
    '/api/diamonds',
    mongooseCrudify({
      Model: Diamond,
      selectFields: '-__v', // Hide '__v' property
      endResponseInAction: false,

      // beforeActions: [],
      // actions: {}, // list (GET), create (POST), read (GET), update (PUT), delete (DELETE)
      afterActions: [
        { middlewares: [helpers.formatResponse] }
      ]
    })
  )
}
