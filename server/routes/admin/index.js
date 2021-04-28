module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    // 合并URL参数 把父级的url参数合并到里面去，否则访问不到
    mergeParams:true
  })

  // 几个请求方法区别
  // post  专注于创建
  // get 专注于获取
  // put 专注于修改更新
  // delete 专注于删除

  // 创建
  router.post('/',async(req,res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 更新
  router.put('/:id',async(req,res) => {
    // 通过id查找到数据然后更新
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })

  // 删除
  router.delete('/:id',async(req,res) => {
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({
      success:true
    })
  })

  // 资源列表
  router.get('/', async(req,res) => {
    const queryOptions = {}
    if(req.Model.modelName === 'Category'){
      // 表明上级分类是一个对象，而不仅仅是上级分类的id
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
  })

  // 资源详情
  router.get('/:id',async(req,res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')

  // 设置路由是什么，判断用户是否存在，req.Model对应的模型是哪一个，挂载路由
  app.use('/admin/api/rest/:resource',
  authMiddleware(), resourceMiddleware(), router)

  // 上传图片
  const multer = require('multer')
  // __dirname 当前文件绝对地址
  const upload = multer({dest:__dirname + '/../../uploads'})
  // single() 接收单个文件
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'),async (req, res) => {
    const file = req.file
    file.url = `http:// localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 登录
  app.post('/admin/api/login', async (req,res) => {
    const {username,password} = req.body
    // 根据用户名找用户
    // 由于之前设置了页面取不到password，所以需要在这里取出password进行校验
    const user = await AdminUser.findOne({username}).select('+password')
    
    // 参数:确保user存在,如果不存在报422错误码,message是"用户不存在"
    assert(user, 422, '用户不存在')

    // 校验密码
    // compareSync 比较明文和密文是否匹配
    const isValid = require('bcrypt').compareSync(password,user.password)
    assert(isValid, 422, '密码错误')
    
    // 生成token并返回token
    // 第一个参数，需要放入token的数据（可以为多个）
    // 第二个参数是密钥，根据这个密钥生成token
    // 客户端可以不需要密钥解出数据，但是一旦要验证，需要用jwt.()校验，
    // 哪怕客户端修改了，服务端也能看出来
    const token = jwt.sign({id: user._id},app.get('secret'))
    res.send({token})
  })

  // 如果没有错误处理函数,浏览器会直接报错,而不会弹出message
  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
