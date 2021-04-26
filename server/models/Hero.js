const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{type:String},
  avatar:{type:String},
  banner:{type:String},
  title:{type:String},
  //可以有多个职业，所以定义为数组
  categories:[{type:mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  //评分
  scores:{
    difficult:{type:Number},
    skills:{type:Number},
    attack:{type:Number},
    survive:{type:Number},
  },
  //技能
  skills:[{
    icon:{type:String},
    name:{type:String},
    delay:{type:String},
    cost:{type:String},
    decription:{type:String},
  }],
  //出装
  items1:[{type:mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
  items2:[{type:mongoose.SchemaTypes.ObjectId, ref: 'Item'}],

  //技巧
  usageTips:{type:String},
  battleTips:{type:String},
  teamTips:{type:String},
  //英雄关系
  partners:[{
    hero:{type:mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
    description:{type:String}
  }],
})

module.exports = mongoose.model('Hero',schema,'heroes')
