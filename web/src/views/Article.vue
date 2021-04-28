<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back text-blue"></div>
        <strong class="flex-1 text-blue pl-2">
          {{model.title}}
        </strong>
        <div class="text-grey">
          2019-06-19
        </div>
    </div>
    <!-- v-html 将富文本编辑器中html样式保留显示 -->
    <div v-html="model.body" class="px-4 body fs-lg"></div>
  </div>
</template>

<script>
export default {
  props: {
    id: {required:true}
  },
  data(){
    return {
      model:null
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss">
.page-article {
  .incon-back{
    font-size:1.5rem;
  }
  .body {
    img {
      max-width: 100%;
      height:auto;
    }
  }
}
.body h1 {
  background: url(https://game.gtimg.cn/images/yxzj/m/m201706/images/news/h1_back.png);
  height: 2.5385rem;
  line-height: 2.5385rem;
  padding-left: .2rem;
  font-size: 1.1538rem;
  color: #caf2ff;
  margin: 20px 0;
  // font-weight: 700;
}

.body h3 {
  background: url(https://game.gtimg.cn/images/yxzj/m/m201706/images/news/h3_back.png) right center no-repeat;
  height: 2.2692rem;
  font-size:1.0769rem;
  line-height:2.2692rem;
  padding-left: 4.2308rem;
  color: #1f1e1f;
  position: relative;
}
.body h3 img {
  width: 3.3077rem !important;
  height: 3.3077rem !important;
  border-radius: 100%;
  position: absolute;
  left: 0px;
  top: -0.5rem;
  margin: 0;
}
</style>
