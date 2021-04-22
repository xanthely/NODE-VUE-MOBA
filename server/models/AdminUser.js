const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username:{type:String},
  //set  自定义修改和保存，这里用于对密码加密
  password:{
    type:String, 
    //使密码在界面查不出来
    select:false,
    set(val) {
    //hashSync  生成密码的散列值
    //第二个参数代表加密强度，越大越安全，但是越慢。一般为10-12
    return require('bcrypt').hashSync(val,10)
  }}
})

module.exports = mongoose.model('AdminUser',schema)