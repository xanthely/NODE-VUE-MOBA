const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title:{type:String},
  body:{type:String},
  categories:[{type:mongoose.SchemaTypes.ObjectId, ref: 'Category'}]
},{
  timestamps:true // 时间戳，自动带有创建时间和更新时间
})

module.exports = mongoose.model('Article',schema)