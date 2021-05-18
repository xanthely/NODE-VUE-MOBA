<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex text-white ai-center" style="line-height:2.5rem">
      <img src="../assets/logo.png" height="30">
      <div class="px-2 flex-1">
        <span>王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm">
            皮肤：7 &gt;
          </router-link>
        </div>
      </div>
    </div>
    <!-- 介绍 -->
    
    <div class="bg-white pt-3 pb-1 px-3">
      <div class="nav pb-1 jc-around" style="border-bottom:1px solid #dce1e4">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">英雄初识</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">进阶攻略</router-link>
        </div>
      </div>

      <div class="d-flex w-100 my-3 text-center">
        <div class="btn bg-light mr-1">
          <p class="p1">英雄介绍视频</p>
        </div>
        <div class="btn bg-light ml-1">
          <p class="p2">一图识英雄</p>
        </div>
      </div>

      <div>
        <div class="d-flex pb-3">
          <div v-for="(item,index) in model.skills" :key="index">
            <img class="d-block p-1" :class="{'activeskill':skill == index}"
            @click="changeClass(index)" :src="`${item.icon}`" style="width:70%;margin:0 auto;"/>
          </div>
        </div>
        <div v-for="(item,index) in model.skills" :key="index" :class="{'activedes':index !== skill}">
          <span class="d-flex">
            <h3 class="mr-5 text-dark-1">{{item.name}}</h3>
            <p class="text-grey">(冷却值：{{item.delay}} 消耗：{{item.cost}})</p>
          </span>
          <p class="mt-1 w-100">{{item.description}}</p>
        </div>
      </div>
    </div>
    <!-- 技能 -->

    <div class="bg-white pt-1 pb-1 px-3 mt-3">
      <h3 class="tit1">出装顺序</h3>
      <div style="border-bottom:1px solid #d4d9de">
        <p class="text-height my-3" style="font-size:15px">顺风出装</p>
        <div class="d-flex">
          <div v-for="(item,index) in model.items1" :key="index" >
            <div class="text-center">
              <img class="itemimg mx-2" :src="item.icon">
              <p class="text-clip itemname">{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>

      <p class="text-height my-3" style="font-size:15px">逆风出装</p>
      <div class="d-flex">
        <div v-for="(item,index) in model.items2" :key="index" >
          <div class="text-center">
            <img class="itemimg mx-2" :src="item.icon">
            <p class="text-clip itemname">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 出装 -->

    <div class="bg-white pt-1 pb-1 px-3 mt-3">
      <h3 class="tit2">使用技巧</h3>
      <p>{{model.usageTips}}</p>
    </div>
    <div class="bg-white pt-1 pb-1 px-3 mt-3">
      <h3 class="tit3">对抗技巧</h3>
      <p>{{model.battleTips}}</p>
    </div>
    <div class="bg-white pt-1 pb-1 px-3 mt-3">
      <h3 class="tit4">团战思路</h3>
      <p>{{model.teamTips}}</p>
    </div>
    <!-- 技巧 -->

  <div class="bg-white pt-1 pb-1 px-3 mt-3">
    <h3 class="tit5">使用技巧</h3>
    <p class="mb-2" style="font-size:15px">最佳搭档</p>
    <div class="d-flex mb-3" v-for="(item,index) in model.partners" :key="index">
      <img class="d-inline-block mr-2" style="width:3.5rem; height:3.5rem" :src="item.hero.avatar">
      <p>{{item.hero.name}}：{{item.description}}</p>
    </div>
  </div>
  <!-- 搭档 -->

</div>
</template>

<script>
export default {
  props: {
    id: {required:true}
  },
  data(){
    return {
      model:null,
      skill:0
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
    },
    changeClass(index){
      this.skill = index
    }
  },
  created(){
    this.fetch()
  },
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.page-hero {
  p {
    color: map-get($colors,'dark-1');
  }
  .top {
    height:50vw;
    background:#fff no-repeat top center;
    background-size: 100% 100%;
  }
  .info {
    background:linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
    .scores {
      .badge{
        margin: 0 0.25rem;
        display:inline-block;
        width:1rem;
        height:1rem;
        line-height: 0.9rem;
        text-align:center;
        border-radius: 50%;
        font-size: 0.6rem;
        border:1px solid rgba(255,255,255,0.2)
      }
    }
  }
  .btn {
    text-indent: 1.2rem;
    border-radius: .3rem;
    border:1px solid #eceef0;
    position: relative;
    width:50%;
    p {
      line-height: .8rem;
    }
    .p1:before {
    content: '';
    position: absolute;
    left: 2.3rem;
    margin-top: -.4rem;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image:url(https://game.gtimg.cn/images/yxzj/m/m201706/images/herodetail/icon_06.png);
    background-size: contain;
    }
    .p2:before {
    content: '';
    position: absolute;
    left: 2.3rem;
    margin-top: -.4rem;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image:url(https://game.gtimg.cn/images/yxzj/m/m201706/images/herodetail/icon_07.png);
    background-size: contain;
    }
  }
  .activeskill {
    border:.2rem solid #d59b40;
    border-radius: 50%;
  }
  .activedes {
    display:none;
  }
  .tit1 {
    background:url(https://game.gtimg.cn/images/yxzj/m/m201706/images/herodetail/icon_11.png) no-repeat 0 0.02rem;
    background-size: 1rem 1rem;
    padding-left:1.5rem;
  }
  .tit2 {
    background:url(https://game.gtimg.cn/images/yxzj/m/m201706/images/herodetail/icon_13.png) no-repeat 0 0.02rem;
    background-size: 1rem 1rem;
    padding-left:1.5rem;
  }
  .tit3 {
    background:url(https://game.gtimg.cn/images/yxzj/m/m201706/images/herodetail/icon_14.png) no-repeat 0 0.02rem;
    background-size: 1rem 1rem;
    padding-left:1.5rem;
  }
  .tit4 {
    background:url(https://game.gtimg.cn/images/yxzj/m/m201706/images/herodetail/icon_15.png) no-repeat 0 0.02rem;
    background-size: 1rem 1rem;
    padding-left:1.5rem;
  }
  .tit5 {
    background:url(https://game.gtimg.cn/images/yxzj/m/m201706/images/herodetail/icon_08.png) no-repeat 0 0.02rem;
    background-size: 1rem 1rem;
    padding-left:1.5rem;
  }

  .itemimg {
    border-radius: 50%;
    width:3.4615rem;
  }
  .itemname {
    width:4rem; 
    line-height: 1rem;
    height:1rem;
    margin-block-end: 0;
    font-size:10px
  }
}
</style>
