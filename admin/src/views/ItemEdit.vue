<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload">
          <!-- 如果有图片显示图片，没有图片显示上传图标 -->
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  props:{
    id:{}
  },
  data(){
    return{
      model:{}
    }
  },
  methods:{
    afterUpload(res){
      // 可以理解为显式赋值，参数为赋值的主体，属性，要赋上的值
      // 如果不用这种方式，可以直接在定义model时加上icon属性
      this.$set(this.model,'icon',res.url)
    },
    async save(){
      let res
      if(this.id){
        res = await this.$http.put(`rest/items/${this.id}`,this.model)
      }else{
        res = await this.$http.post('rest/items',this.model)
      }
      this.$router.push('/items/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    async fetch(){
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    }
  },
  created(){
    this.id && this.fetch()
  }
}
</script>
