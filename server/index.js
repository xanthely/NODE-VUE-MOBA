const express = require("express")

const app = express()

//在app的实例上设置一个密钥
app.set('secret','eirufoierufcskdxjodoie')

app.use(require('cors')())
app.use(express.json())

// 静态文件托管
// 使后面地址的文件可以直接通过/uploads访问
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000,()=>{
  console.log('http://localhost:3000')
})