<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <!-- 
      @submit.native.prevent 提交事件
      native表示原生表单
      prevent阻止默认提交，不要跳转页面
     -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <!-- label 表示显示的值，value 表示真正选中的值 -->
          <el-option v-for="item in parents"
          :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- native-type 表示的是原生的html中的type -->
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  // 接收url传递的id
  props:{
    id:{}
  },
  data(){
    return{
      // 双向绑定
      model:{},
      parents:[]
    }
  },
  methods:{
    async save(){
      let res
      if(this.id){
        res = await this.$http.put(`rest/categories/${this.id}`,this.model)
      }else{
        res = await this.$http.post('rest/categories',this.model)
      }
      this.$router.push('/categories/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    async fetch(){
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },
    async fetchParents(){
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
    }
  },
  created(){
    this.fetchParents()
    // 前面this.id为true才执行fetch()
    this.id && this.fetch()
  }
}
</script>

<style scoped>

</style>