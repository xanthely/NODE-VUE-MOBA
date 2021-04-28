const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{type:String},
  // 表示类型为数据库中的id，ref表示关联的模型
  parent:{type:mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

schema.virtual('children',{
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})

schema.virtual('newsList',{
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})

module.exports = mongoose.model('Category',schema)
