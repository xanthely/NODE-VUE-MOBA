const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title:{type:String},
  image:{type:String},
  category:{type:mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model('Video',schema)