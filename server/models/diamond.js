const mongoose = require('mongoose')

const Schema = mongoose.Schema

const diamondSchema = new Schema({
  name: { type: String, required: true }
})

module.exports = mongoose.model('Diamond', diamondSchema)
