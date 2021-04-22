//资源中间件
module.exports = options => 
{
  return async(req,res,next) => {
    //用于将小写的复数的模型名称改为首字母大写的单数的类名
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}