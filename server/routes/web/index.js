module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  // const Article = require('../../models/Article')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Hero = mongoose.model('Hero')
  const Video = mongoose.model('Video')

  //导入新闻数据
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitles = ["狄某有话说丨新赛季首月回顾，4月峡谷数据大揭秘！", "“宇”你一起“墨”契开黑，玩转五五！", "骚白助力五五开黑节！百套玄策新皮肤在线送", "五五开黑节斗鱼节目单！宋茜、张佳宁降临峡谷", "5月5日晚9点来薇娅直播间，王者爆款联名首发！", "5月7日体验服停机更新公告", "5月6日净化游戏环境声明及处罚公告", "5月6日“演员”惩罚名单", "5月6日外挂专项打击公告", "5月6日体验服违规处罚公告", "【限时秒杀】盘古重装意志", "峡谷来欢聚，初夏享好礼", "【五五皮肤 由你做主】票选明年五五皮肤所属英雄活动公告", "5月5日，组队不掉星，一定要来！", "【五五开黑节一定要做的6件事】活动公告", "第三届王者荣耀全国大赛城市赛道辽宁第二期赛事活动，圆满收官！", "第三届王者荣耀全国大赛城市赛道第二期海选赛大连佳兆业广场站圆满结束！", "玩儿出名堂！第三届王者荣耀全国大赛第二期北京省赛圆满落幕", "赛点搬到家门口｜全国大赛盛况空前，王者人生助力全民绽放电竞魅力", "一路躺赢?现场求婚?全国大赛春日限定故事会大放送!"]

      const newsList = newsTitles.map(title => {
        const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
        return {
          categories: randomCats.slice(0, 2),
          title: title
        }
      })
      await Article.deleteMany({})
      await Article.insertMany(newsList)
      res.send(newsList)
  })

  //新闻列表接口
  router.get('/news/list', async (req, res) => {
    // const parent = await Category.findOne({
    //   name:'新闻分类'
    // }).populate({
    //   path:'children',
    //   populate: {
    //     path:'newsList'
    //   }
    // }).lean()

    // 找到顶级分类
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    //aggregate  mongoose中的聚合查询
    const cats = await Category.aggregate([
      //通过 $match 过滤数据 类似where
      { $match: { parent: parent._id } },
      {
        //关联查询 类似join
        $lookup: {
          from: 'articles',
          localField: '_id', // 主键
          foreignField: 'categories', // 外健
          as: 'newsList'
        }
      },
      {
        //修改newsList， 每个类别的newslist保留五个
        $addFields: {
          'newsList': { $slice: ['$newsList', 5] }
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    })
    cats.map(cat => {
      cat.newsList.map(news => {
        // 如果当前分类为热门的话，显示子分类的名称，如果不是分类显示真正的名称
        news.categoryName = (cat.name === '热门')
          ? news.categories[0].name : cat.name
        return news
      })
    })
    res.send(cats)
  })

  //导入英雄数据
  router.get('/heroes/init', async (req, res) => {
    await Hero.deleteMany({})
    const rawData = [{
      "name": "热门",
      "heroes": [{
        "name": "鲁班七号",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
      }, {
        "name": "安琪拉",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"
      }, {
        "name": "后羿",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
      }, {
        "name": "亚瑟",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
      }, {
        "name": "妲己",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"
      }, {
        "name": "孙悟空",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
      }, {
        "name": "瑶",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"
      }, {
        "name": "吕布",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
      }, {
        "name": "铠",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
      }, {
        "name": "虞姬",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"
      }]
    }, {
      "name": "战士",
      "heroes": [{
        "name": "赵云",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"
      }, {
        "name": "墨子",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"
      }, {
        "name": "钟无艳",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
      }, {
        "name": "吕布",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
      }, {
        "name": "夏侯惇",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
      }, {
        "name": "曹操",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"
      }, {
        "name": "典韦",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"
      }, {
        "name": "宫本武藏",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"
      }, {
        "name": "达摩",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
      }, {
        "name": "老夫子",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"
      }, {
        "name": "关羽",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"
      }, {
        "name": "程咬金",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
      }, {
        "name": "露娜",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"
      }, {
        "name": "花木兰",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"
      }, {
        "name": "橘右京",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"
      }, {
        "name": "亚瑟",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
      }, {
        "name": "孙悟空",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
      }, {
        "name": "刘备",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"
      }, {
        "name": "杨戬",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"
      }, {
        "name": "雅典娜",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"
      }, {
        "name": "哪吒",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"
      }, {
        "name": "铠",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
      }, {
        "name": "苏烈",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
      }, {
        "name": "梦奇",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
      }, {
        "name": "裴擒虎",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"
      }, {
        "name": "狂铁",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"
      }, {
        "name": "孙策",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
      }, {
        "name": "李信",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"
      }, {
        "name": "盘古",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"
      }, {
        "name": "云中君",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"
      }, {
        "name": "曜",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"
      }, {
        "name": "马超",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"
      }, {
        "name": "蒙恬",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg"
      }, {
        "name": "夏洛特",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/536/536.jpg"
      }, {
        "name": "司空震",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg"
      }]
    }, {
      "name": "法师",
      "heroes": [{
        "name": "小乔",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"
      }, {
        "name": "墨子",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"
      }, {
        "name": "妲己",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"
      }, {
        "name": "嬴政",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"
      }, {
        "name": "高渐离",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"
      }, {
        "name": "孙膑",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"
      }, {
        "name": "扁鹊",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"
      }, {
        "name": "芈月",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
      }, {
        "name": "周瑜",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"
      }, {
        "name": "甄姬",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
      }, {
        "name": "武则天",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"
      }, {
        "name": "貂蝉",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"
      }, {
        "name": "安琪拉",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"
      }, {
        "name": "露娜",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"
      }, {
        "name": "姜子牙",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"
      }, {
        "name": "王昭君",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"
      }, {
        "name": "张良",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"
      }, {
        "name": "不知火舞",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"
      }, {
        "name": "钟馗",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"
      }, {
        "name": "诸葛亮",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"
      }, {
        "name": "干将莫邪",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"
      }, {
        "name": "女娲",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"
      }, {
        "name": "杨玉环",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"
      }, {
        "name": "弈星",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"
      }, {
        "name": "米莱狄",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"
      }, {
        "name": "司马懿",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"
      }, {
        "name": "沈梦溪",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"
      }, {
        "name": "上官婉儿",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"
      }, {
        "name": "嫦娥",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
      }, {
        "name": "西施",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg"
      }, {
        "name": "司空震",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg"
      }]
    }, {
      "name": "坦克",
      "heroes": [{
        "name": "廉颇",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"
      }, {
        "name": "庄周",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
      }, {
        "name": "刘禅",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
      }, {
        "name": "钟无艳",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
      }, {
        "name": "白起",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
      }, {
        "name": "芈月",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
      }, {
        "name": "吕布",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
      }, {
        "name": "夏侯惇",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
      }, {
        "name": "达摩",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
      }, {
        "name": "项羽",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"
      }, {
        "name": "程咬金",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
      }, {
        "name": "刘邦",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"
      }, {
        "name": "亚瑟",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
      }, {
        "name": "牛魔",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
      }, {
        "name": "张飞",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
      }, {
        "name": "太乙真人",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
      }, {
        "name": "东皇太一",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
      }, {
        "name": "铠",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
      }, {
        "name": "苏烈",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
      }, {
        "name": "梦奇",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
      }, {
        "name": "孙策",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
      }, {
        "name": "盾山",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"
      }, {
        "name": "嫦娥",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
      }, {
        "name": "猪八戒",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
      }, {
        "name": "蒙恬",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg"
      }, {
        "name": "阿古朵",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg"
      }]
    }, {
      "name": "刺客",
      "heroes": [{
        "name": "赵云",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"
      }, {
        "name": "阿轲",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"
      }, {
        "name": "李白",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"
      }, {
        "name": "貂蝉",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"
      }, {
        "name": "韩信",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"
      }, {
        "name": "兰陵王",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"
      }, {
        "name": "花木兰",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"
      }, {
        "name": "不知火舞",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"
      }, {
        "name": "娜可露露",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"
      }, {
        "name": "橘右京",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"
      }, {
        "name": "孙悟空",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
      }, {
        "name": "百里守约",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"
      }, {
        "name": "百里玄策",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"
      }, {
        "name": "裴擒虎",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"
      }, {
        "name": "元歌",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"
      }, {
        "name": "司马懿",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"
      }, {
        "name": "上官婉儿",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"
      }, {
        "name": "云中君",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"
      }, {
        "name": "马超",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"
      }, {
        "name": "镜",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg"
      }, {
        "name": "澜",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/528/528.jpg"
      }]
    }, {
      "name": "射手",
      "heroes": [{
        "name": "孙尚香",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"
      }, {
        "name": "鲁班七号",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
      }, {
        "name": "马可波罗",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"
      }, {
        "name": "狄仁杰",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"
      }, {
        "name": "后羿",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
      }, {
        "name": "李元芳",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"
      }, {
        "name": "虞姬",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"
      }, {
        "name": "成吉思汗",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"
      }, {
        "name": "黄忠",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"
      }, {
        "name": "百里守约",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"
      }, {
        "name": "公孙离",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"
      }, {
        "name": "伽罗",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"
      }, {
        "name": "蒙犽",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg"
      }, {
        "name": "艾琳",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/155/155.jpg"
      }]
    }, {
      "name": "辅助",
      "heroes": [{
        "name": "庄周",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
      }, {
        "name": "刘禅",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
      }, {
        "name": "孙膑",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"
      }, {
        "name": "牛魔",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
      }, {
        "name": "张飞",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
      }, {
        "name": "钟馗",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"
      }, {
        "name": "蔡文姬",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"
      }, {
        "name": "太乙真人",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
      }, {
        "name": "大乔",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"
      }, {
        "name": "东皇太一",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
      }, {
        "name": "鬼谷子",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"
      }, {
        "name": "明世隐",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"
      }, {
        "name": "盾山",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"
      }, {
        "name": "瑶",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"
      }, {
        "name": "鲁班大师",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg"
      }, {
        "name": "阿古朵",
        "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg"
      }]
    }]

    for(let cat of rawData) {
      if(cat.name === '热门'){
        continue
      }
      //找到当前分类在数据库中对应的数据
      const category = await Category.findOne({
        name:cat.name
      })
      cat.heroes = cat.heroes.map(hero => {
        hero.categories = [category]
        return hero
      })
      //录入英雄
      await Hero.insertMany(cat.heroes)
    }

    res.send(await Hero.find())
  })

  //英雄列表接口
  router.get('/heroes/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '英雄分类'
    })
    //aggregate  mongoose中的聚合查询
    const cats = await Category.aggregate([
      //通过 $match 过滤数据
      { $match: { parent: parent._id } },
      {
        //关联查询
        $lookup: {
          from: 'heroes', //数据库表名
          localField: '_id',//主键
          foreignField: 'categories', //外键
          as: 'heroList'
        }
      }
    ])
    //手动查询热门
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      heroList: await Hero.find().where({
        categories: { $in: subCats }
      }).limit(10).lean()
    })
    res.send(cats)
  })

  //文章详情
  router.get('/articles/:id', async(req, res) => { 
    const data = await Article.findById(req.params.id)
    res.send(data)
  })

  //英雄详情
  router.get('/heroes/:id',async (req,res) => {
    const data = await Hero
      .findById(req.params.id)
      .populate('categories')
      .populate('items1')
      .populate('items2')
      .populate(`partners.hero`)
      .lean()
    res.send(data)
  })

  //导入视频数据
  router.get('/videos/init', async (req, res) => {
    await Video.deleteMany({})
    const videoData = [
      {
        "categoryName": "精品栏目",
        "videos": [
          {
            "title": "【整活吧小阿金】01：澜CG配音猛男版，BLUE坑惨澜朋友",
            "image": "https://img.tgl.qq.com/cover/20201231/2ea8fd5ab6c925d5221d3547fb971978_1609412233.jpg"
          },
          {
            "title": "【棋高一招2】第22期 总决赛阵容哪家强，总MVP—TES.简为你解析",
            "image": "https://shp.qpic.cn/cfwebcap/0/c472d27bc7bade6bd0eeb16517a0be3e/0/?width=230&height=140"
          },
          {
            "title": "澜被孙策救了后，变成了一只鲨狗【策见打】",
            "image": "https://itea-cdn.qq.com/file/tgl/2020121306/0cc21b298ec5ff5a1c37c2086e27b408.1607839483.842e0fc7bb76856dc4e95cf6fa64723e.230x140_62165.png"
          },
          {
            "title": "【狄仁杰封神榜】第29期 九人卡巅峰赛内排？统统封掉！",
            "image": "https://puui.qpic.cn/vpic/0/w3211xeukq9.png/0"
          }
        ]
      },
      {
        "categoryName": "英雄攻略",
        "videos": [
          {
            "title": "一个打法弥补貂蝉所有版本缺陷！",
            "image": "https://img.tgl.qq.com/cover/20210428/c10a11268e969563131765a67480ac29_1619600570.jpg"
          },
          {
            "title": "被造谣后的北慕游戏现状，大家都先检查一下电流音啊",
            "image": "https://img.tgl.qq.com/cover/20210428/c916cccdde42dced61b0cc89395aebf3_1619599242.png"
          },
          {
            "title": "成吉思汗“出装变化讲解”",
            "image": "https://img.tgl.qq.com/cover/20210428/42a95ffd2f38c91cc8ed04b94e2a3ac1_1619594701.jpg"
          },
          {
            "title": "细节韩信甩枪杀，真男人从不回头看爆炸！",
            "image": "https://img.tgl.qq.com/cover/20210428/f8a733f8431ce24e33b3cb78f0db836d_1619583570.jpg"
          }
        ]
      },
      {
        "categoryName": "赛事精品",
        "videos": [
          {
            "title": "【王者炸麦了】第四期：北京WB.暖阳、阿豆说起相声，是谁让江城直呼顶不住",
            "image": "https://puui.qpic.cn/vpic/0/c3242bly5a2.png/0"
          },
          {
            "title": "【荣耀大话王Ⅶ】精编版第五期 爱思因催债与笑影斗智斗勇 选手花式哄粉丝别熬夜快睡",
            "image": "https://shp.qpic.cn/cfwebcap/0/42311b9d30fab7becc1076e4193fc64c/0/?width=230&height=140"
          },
          {
            "title": "【王者炸麦了】第三期：TES.花卷神级上官婉儿，武汉ES.今屿版本答案？",
            "image": "https://shp.qpic.cn/cfwebcap/0/d8a96333092a6f48ee27ae527e79e686/0/?width=230&height=140"
          },
          {
            "title": "【荣耀大话王Ⅶ】第四期 冰尘变身冰尖主持一黑到底 游戏环节久龙惨遭鬼脸整蛊",
            "image": "https://shp.qpic.cn/cfwebcap/0/8cc4a8bed9b08b79df6fb148ce3363e7/0/?width=230&height=140"
          }
        ]
      }
    ]

    for(let cat of videoData) {
      //找到当前分类在数据库中对应的数据
      const category = await Category.findOne({
        name:cat.categoryName
      })
      cat.videos = cat.videos.map(video => {
        video.category = category
        return video
      })
      await Video.insertMany(cat.videos)
    }

    res.send(await Video.find())
  })

  //视频列表接口
  router.get('/videos/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '视频分类'
    })
    //aggregate  mongoose中的聚合查询
    const cats = await Category.aggregate([
      //通过 $match 过滤数据
      { $match: { parent: parent._id } },
      {
        //关联查询
        $lookup: {
          from: 'videos', //数据库表名
          localField: '_id',//主键
          foreignField: 'category', //外键
          as: 'videoList'
        }
      }
    ])
    res.send(cats)
  })

  app.use('/web/api', router)
}