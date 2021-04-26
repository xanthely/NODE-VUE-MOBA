<template>
  <div class="card bg-white p-3 mt-3">
      <div class="card-header d-flex ai-center pb-3">
        <i class="iconfont text-grey-1 fs-lg" :class="`icon-${icon}`"></i>
        <div class="fs-xl flex-1 px-2">{{title}}</div>
        <i class="iconfont icon-menu text-grey-1"></i>
      </div>
      <div class="card-body pt-3">
        <slot></slot>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    title: {type:String, require:true},
    icon: {type:String, require:true}
  }
}
</script>
<style lang="scss">
@import '../assets/scss/_variables.scss';
.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
}
</style>