# NODE-VUE-MOBA
# 【全栈之巅】Node.js + Vue.js 全栈开发王者荣耀手机端官网和管理后台
> 本项目是 [Bilibili 全栈之巅](https://space.bilibili.com/341919508) 视频教程相关源码
> https://github.com/wxs77577/node-vue-moba
> 持续更新中... 敬请关注

## 一、 入门
1. 项目介绍
1. 工具安装和环境搭建(nodejs,npm,mongodb)
1. 初始化项目

## 二、 管理后台
1. 基于Element UI的后台管理基础界面搭建
    * `vue add element` 命令安装element-ui，`vue add router`安装路由

1. 主界面搭建
    * 在main.vue中写入主界面，并在路由中添加

1. 创建分类
    * 在main.vue中创建菜单“分类”，并在views中写入分类界面，同时在路由中添加。

    * npm安装axios，用于提交数据，请求接口。新建http.js引入axios，再到main.js中引入http.js

    * 在服务器端创建接口，npm安装express(node框架),mongoose(数据库),cors(跨域请求)
    * 在服务器端新建routes文件夹用于存放路由，新建plugins文件夹存放数据库相关代码。在index.js中引入这些文件。新建models文件夹用于存放数据模型

    * 在routes文件夹中写入请求代码，在index.js文件夹中引入express和cors就可以使用了

1. 分类列表
    * 在CategoryList.vue中的data写一个空数组items用于保存后台获取的数据并通过prop显示在页面中。利用created在页面创建后获取数据
    * 服务器端在courtes中index.js写入获取数据的接口

1. 修改分类
    * 首先实现点击list页面跳转到编辑页面，同时通过url获取传递该行id

    * 在更改数据后，通过id是否有值判断是新建操作还是编辑操作。编辑操作时，前台使用put网络请求，后台使用findByIdAndUpdate更新该条数据内容

1. 删除分类
    * 与修改同理，增加了element-ui的确认提示框

1. 子分类
    * 在edit页面中先添加上级分类，使用下拉菜单实现。这就需要在页面创建后获取分类数据，前端使用一个空数组保存它

    * 在分类model中添加上级分类属性，为了便于展示，上级分类在应该为一个对象，而不只是id


1. **通用 CRUD 接口**
    * 给通用接口加一个前缀，避免接口地址冲突。将原先固定的Category改成不确定的:resource。

    * 同时，增加一个中间件，用于得到model，需要npm安装inflection,用于处理将小写复数的参数转换成大写单数的类名。通过req.model把保存，使其可以在请求中使用

1. 装备管理

1. 图片上传 (multer)
    * 在edit页面使用element-ui中的upload组件，设定action（上传的url）和on-success（成功之后执行）

    * 不符合前面CRUD通用接口，所以在后台接口单独写入。npm安装multer（处理上传文件），利用中间件上传图片

    * 在edit页面对icon显式赋值，并在list中自定义显示内容以显示图标而不是图片地址

1. 英雄管理
1. 编辑英雄 (关联,多选,el-select, multiple)
1. 技能编辑

1. 文章管理
1. 富文本编辑器 (quill)
    * npm安装vue2-editor，用于实现富文本编辑器

1. 首页广告管理

1. 管理员账号管理 (bcrypt)
    * npm安装bcrypt，对管理员model的密码散列加密。

1. 登录页面
    * 在前端路由添加login路由，在views中写入对应组件

1. 登录接口 (jwt,jsonwebtoken)
    * npm安装jsonwebtoken，用于token验证

    * 在index.js中设置全局的密钥，在routes中的index.js中查找用户校验密码并生成token

1. 服务端登录校验
    * 在客户端http.js中加一个请求头，用于放置token。服务端就是要把token提取出来，判断是不是数据库中的用户

    * 前端传递token，后端解密得到id，再通过id去数据库里找用户。最终把用户挂载到req.user（便于后面使用）

    * npm安装http-assert，用于抛出错误。在http.js中添加一个相应拦截，跳转到登录页面

    * 将中间件提取成一个函数独立放置到middleware文件夹中

1. 客户端路由限制 (beforeEach, meta)
    * 服务器端限制之后，请求接口会自动跳转到登录界面，但是如果没有请求接口，直接进入新建界面，就不会跳转，所以需要在客户端在加上一层路由限制

    * 在前端路由中加上导航守卫。给login设置ispublic为true，设置ispublic不为true的全都跳转到登录页面，否则正常进入

1. 上传文件的登录校验 (el-upload, headers)
    * 由于上传文件并没有带上Authorization请求头，上传图片会报错

    * 在全局加上Vue.mixin（可以理解为全局的代码块，便于各地方使用）用于获取Authorization。在需要上传图片的代码处加上:headers添加请求头

    * 上传图片action的地址也可以放入mixin

## 三、移动端网站
1. "工具样式"概念和 SASS (SCSS)
    * npm安装sass和sass-loader

    * 将网站常用字体，边距，背景等提前设置好

1. 样式重置
1. 网站色彩和字体定义 (colors, text)
1. 通用flex布局样式定义 (flex)
1. 常用边距定义 (margin, padding)

1. 主页框架和顶部菜单
    * 由于顶部在多个页面会用到。将顶部写入main.vue中，主页面其他部分放入home.vue中作为默认子路由，将其他含有相同顶部的页面也作为子路由

1. 首页顶部轮播图片 (vue swiper)
    * npm安装vue-awesome-swiper插件，用于制作幻灯片。在main中全局引用，在home中使用

1. 使用精灵图片 (sprite)
    * 精灵图片：在一张图片中放入很多需要的小图片，通过css背景定位获取所需图片

    * 用于获取精灵图片定位的网站：http://www.spritecow.com/

1. 使用字体图标 (iconfont)
    * 阿里巴巴矢量图标库:https://www.iconfont.cn/
    选择合适的图标加入购物车，点击购物车下载代码（需要同时下载项目所需所有图标），将下载好的代码解压放入assets/iconfont文件夹中，在main中引用。可以打开HTML查看类名，在项目中直接通过类名使用图标

1. 卡片组件 (card)
1. 列表卡片组件 (list-card, nav, swiper)
1. 首页新闻资讯-数据录入(+后台bug修复)
    * 获取所有新闻资讯标题:
      ```js
      $$('.news_list .title').map( el => el.innerHTML).slice(5) 
      ```

    * 通过js手动录入数据。当使用b模型引用a模型时，如果a模型没有引用或使用过，可能会报错。npm安装require-all，用于将所有模型引用进来使用一遍。在服务器端plugins中的db.js中引用并将model中所有模型使用一遍

    * 在服务器端接口中直接录入数据，在服务器端的index还要引入路由。

1. 首页新闻资讯-数据接口
    * 在路由中将数据修改以符合系统界面展示需要

1. 首页新闻资讯-界面展示
    * npm安装axios，并在main.js中引用

    * 在home.vue中获取新闻分类，在listcard组件中实现新闻滑动和导航关联

    * 更改事件格式，npm安装dayjs，用于将事件格式化成想要的格式

1. 首页英雄列表-提取官网数据
    * 浏览器抓取数据(转成json对象形式)：
      ```js 
      JSON.stringify($$('.hero-nav > li').map((li, i) => {
        return {
          categoryName:li.innerText,
          heroes: $$('li',$$('.hero-list')[i]).map(el => {
            return {
              name: $$('h3',el)[0].innerHTML,
              avatar:$$('img',el)[0].src
            }
          })
        }
      }))
      ```

1. 首页英雄列表-录入数据
    * 热门数据是不需要的，应该是从其他类型中随机挑选的

1. 首页英雄列表-界面展示
1. 新闻详情页
    * 在前端路由添加为子组件（因为使用的是首页的顶部），将新闻名称写成router-link便于跳转链接。新建组件并对照官网写好样式

    * 在后端写好接口

    * 在article组件中写一个方法用于页面一创建就执行获取数据

1. 新闻详情页-完善
1. 英雄详情页-1-前端准备
    * 在前端添加路由，作为一个单独路由（有独立的顶部）

1. 英雄详情页-2-后台编辑
    * 完善后台数据，在模型与界面中增加一些之前没有考虑到的属性（banner，冷却值，消耗，最佳搭档）

    * 在后台添加必须的装备、图片、介绍等用于前台展示

    * 由于需要最佳搭档，所以需要在后台页面创建英雄时获取所有英雄

1. 英雄详情页-3-前端顶部
1. 英雄详情页-4-完善

## 自我完善
1. 精彩视频部分
    * 增加视频模型，管理员首页对其管理
    * 浏览器抓取数据：
      ```js
      JSON.stringify(
        $$('.video-nav > li').map((li, i) => {
          return {
            categoryName:li.innerText,
            videos: $$('li',$$('.video_list')[i]).map(el => {
              return {
                title: $$('a',el)[0].title,
                image:$$('a > img',el)[0].src
              }
            })
          }
        })
      )
      ```

1. 导航部分
    * 将导航部分还原官网
    * 实现收起效果

1. 新闻与详情相互跳转
1. 新闻详情部分数据导入
1. 完善英雄详情界面

## 四、发布和部署 (阿里云)

1. 生产环境编译
1. 购买域名和服务器
1. 域名解析
1. Nginx 安装和配置
1. MongoDB数据库的安装和配置
1. git 安装、配置ssh-key
1. Node.js 安装、配置淘宝镜像
1. 拉取代码，安装pm2并启动项目
1. 配置 Nginx 的反向代理
1. 迁移本地数据到服务器 (mongodump)

## 五、进阶
1. 使用免费SSL证书启用HTTPS安全连接
1. 使用阿里云OSS云存储存放上传文件
