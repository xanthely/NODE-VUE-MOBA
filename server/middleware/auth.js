// 封装登录校验中间件
module.exports = options => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../models/AdminUser')

  return async(req,res,next) => {
    // 校验用户是否登录
    // 将token提取出来
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')

    // 解密token，与数据库中数据作比较
    // jwt.decode() 解密，不会验证对错
    const {id} = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录')

    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    await next()
  }
}