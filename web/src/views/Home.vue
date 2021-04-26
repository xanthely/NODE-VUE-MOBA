<template>
  <div>
    <swiper  :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/6fb45960f3578bdaf4daaf75c32cd0d2.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/5449cb0ee1ac08eddd5c9db7770b09f6.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/ed4f0a315b1c2d68002b609f00e76717.jpeg">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" 
      slot="pagination">
      </div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" 
          v-for="n in 12" :key="n">
            <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>    
      <div class="bg-right py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        收起
      </div>
    </div>
    <!-- end of nav icons -->

    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
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

    <m-card icon="card-hero" title="英雄列表">
      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">公告</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">活动</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">赛事</div>
        </div>
      </div>
      <div class="pt-3">
          <swiper>
            <swiper-slide v-for="m in 5" :key="m">
              <div class="py-2" v-for="n in 5" :key="n">
                <span class="title text-primary fs-sm">新闻</span>
                <span class="fs-lg flex-1"> 4月23日体验服停机更新公告</span>
                <span>04/23</span>
              </div>
            </swiper-slide>
          </swiper>
        </div>
    </m-card>

    <m-card icon="video" title="精彩视频">
      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">公告</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">活动</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">赛事</div>
        </div>
      </div>
      <div class="pt-3">
          <swiper>
            <swiper-slide v-for="m in 5" :key="m">
              <div class="py-2" v-for="n in 5" :key="n">
                <span class="title text-primary fs-sm">新闻</span>
                <span class="fs-lg flex-1"> 4月23日体验服停机更新公告</span>
                <span>04/23</span>
              </div>
            </swiper-slide>
          </swiper>
        </div>
    </m-card>

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
        autoplay:true,
        pagination: {
          el:".pagination-home",
        }
      },
      newsCats: [],
      heroCats: []
    };
  },
  methods: {
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats(){
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  created(){
    this.fetchNewsCats();
    this.fetchHeroCats();
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
</style>