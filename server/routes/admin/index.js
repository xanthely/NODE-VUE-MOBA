module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    //合并URL参数
    mergeParams:true
  })

  //创建
  router.post('/',async(req,res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  //更新
  router.put('/:id',async(req,res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })

  //删除
  router.delete('/:id',async(req,res) => {
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({
      success:true
    })
  })

  //资源列表
  router.get('/', async(req,res) => {
    const queryOptions = {}
    if(req.Model.modelName === 'Category'){
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
  })

  //资源详情
  router.get('/:id',async(req,res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')

  //设置路由是什么，判断用户是否存在，req.Model对应的模型是哪一个，挂载路由
  app.use('/admin/api/rest/:resource',authMiddleware(), resourceMiddleware(), router)

  //上传图片
  const multer = require('multer')
  const upload = multer({dest:__dirname + '/../../uploads'})
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'),async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  //登录
  app.post('/admin/api/login', async (req,res) => {
    const {username,password} = req.body
    //根据用户名找用户
    //由于之前设置了页面取不到password，所以需要在这里取出password
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user, 422, '用户不存在')

    //校验密码
    //compareSync 比较明文和密文是否匹配
    const isValid = require('bcrypt').compareSync(password,user.password)
    assert(isValid, 422, '密码错误')
    
    //返回token
    const token = jwt.sign({id: user._id},app.get('secret'))
    res.send({token})
  })

  //错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
