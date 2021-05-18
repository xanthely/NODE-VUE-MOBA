<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}新建</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="model.category">
              <el-option v-for="item of categories" :key="item._id"
              :label="item.name" :value="item._id"></el-option>
            </el-select>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="res => $set(model, 'image', res.url)">
          <img v-if="model.image" :src="model.image" class="avatar">
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
      categories:[],
      model:{
        title:'',
        image:'',
        category:''
      }
    }
  },
  methods:{
    async save(){
      let res
      if(this.id){
        res = await this.$http.put(`rest/videos/${this.id}`,this.model)
      }else{
        res = await this.$http.post('rest/videos',this.model)
      }
      this.$router.push('/videos/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    async fetchCategories(){
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    async fetch(){
      const res = await this.$http.get(`rest/videos/${this.id}`)
      this.model = Object.assign({},this.model,res.data)
    }
  },
  created(){
    this.fetchCategories()
    this.id && this.fetch()
  }
}
</script>

<style scoped>

</style>