<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/6fb45960f3578bdaf4daaf75c32cd0d2.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/5449cb0ee1ac08eddd5c9db7770b09f6.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/ed4f0a315b1c2d68002b609f00e76717.jpeg">
      </swiper-slide>
      <!-- 幻灯片指示点 -->
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" 
      slot="pagination">
      </div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3">
      <div class="d-flex flex-wrap" :class="{open: changeClass}" style="overflow:hidden">
        <div class="nav-item mb-3">
            <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
            <i class="sprite sprite-story"></i>
          <div class="py-2">故事站</div>
        </div>
        <div class="nav-item mb-3">
            <i class="sprite sprite-mall"></i>
          <div class="py-2">周边商城</div>
        </div>
        <div class="nav-item mb-3">
            <i class="sprite sprite-try"></i>
          <div class="py-2">体验服</div>
        </div>
        <div class="nav-item mb-3">
            <i class="sprite sprite-new"></i>
          <div class="py-2">新人专区</div>
        </div>
        <div class="nav-item mb-3">
            <i class="sprite sprite-smriti"></i>
          <div class="py-2">荣耀·传承</div>
        </div>
        <div class="nav-item mb-3">
            <i class="sprite sprite-camp"></i>
          <div class="py-2">王者营地</div>
        </div>
        <div class="nav-item mb-3">
            <i class="sprite sprite-accounts"></i>
          <div class="py-2">公众号</div>
        </div>
        <div class="nav-item mb-3">
            <i class="sprite sprite-version"></i>
          <div class="py-2">版本介绍</div>
        </div>
        <div class="nav-item mb-3">
            <i class="sprite sprite-ambient"></i>
          <div class="py-2">对局环境</div>
        </div>
        <div class="nav-item mb-3">
            <i class="sprite sprite-team"></i>
          <div class="py-2">无限王者团</div>
        </div>
        <div class="nav-item mb-3">
            <i class="sprite sprite-idea"></i>
          <div class="py-2">创意互动营</div>
        </div>
      </div>
      <div v-if="changeClass == 0" class="bg-right py-2 fs-sm bg-light" @click="change()">
        <i class="sprite sprite-arrow mr-1"></i>
        收起
      </div>
      <div v-else class="bg-right py-2 fs-sm bg-light" @click="change()">
        <i class="sprite sprite-arrow mr-1" style="transform: rotate(180deg);"></i>
        展开
      </div>
    </div>
    <!-- end of nav icons -->

    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <!-- 
        #items 表示与listCard中名为items的插槽相关
        {category} 从子组件中拿到category
       -->
      <template #items="{category}">
        <router-link
        tag="div"
        :to="`/articles/${news._id}`"
        class="py-2 fs-lg d-flex" 
        v-for="(news, i) in category.newsList" :key="i">
          <span class="title text-primary fs-sm">{{news.categoryName}}</span>
          <span class="px-2"></span>
          <span class="fs-lg flex-1 text-dark-1 text-ellipsis pr-2"> {{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | data}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <router-link 
          tag="div" :to="`/heroes/${hero._id}`"
          class="p-2 text-center" 
          style="width:20%;"
          v-for="(hero, i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    
    <m-list-card icon="card-video" title="精彩视频" :categories="videoCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <router-link 
          tag="div" :to="`/videos/${video._id}`"
          class="p-2 text-center" 
          style="width:50%; "
          v-for="(video, i) in category.videoList" :key="i">
            <img :src="video.image" class="w-100" style="height:7.3077rem">
            <div class=" text-ellipsis-2">{{video.title}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  filters: {
    data(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      swiperOption:{
        pagination: {
          el:".pagination-home",
        }
      },
      newsCats: [],
      heroCats: [],
      videoCats: [],
      changeClass:1
    };
  },
  methods: {
    // 获取新闻分类
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats(){
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    },
    async fetchVideoCats(){
      const res = await this.$http.get('videos/list')
      this.videoCats = res.data
    },
    change(){
      this.changeClass == 1 ? this.changeClass = 0 : this.changeClass = 1
    }
  },
  created(){
    this.fetchNewsCats();
    this.fetchHeroCats();
    this.fetchVideoCats();
  }
}
</script>

<style lang='scss'>
@import '../assets/scss/variables';

.pagination-home {
  .swiper-pagination-bullet {
    opacity:1;
    border-radius: 0.1538rem;
    background: map-get($colors,'white');
    &.swiper-pagination-bullet-active {
      background: map-get($colors,'info');
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width:25%;
    border-right: 1px solid $border-color;
    // 每4个child不加右边框
    &:nth-child(4n) {
      border-right:none;
    }
  }
}

.title {
  border-radius: .15rem;
  padding:.1rem .2rem;
  border: 1px solid map-get($colors,'primary')
}

.text-ellipsis-2{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.open{
  height:4.9rem;
}
</style>