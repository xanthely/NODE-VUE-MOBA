<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <!-- 
        native 监听el-form原生表单事件
        prevent 阻止表单默认提交，不要跳转页面
       -->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <!-- show-password 切换显示隐藏 -->
          <el-input v-model="model.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        model:{}
      }
    },
    methods:{
      async login(){
        const res = await this.$http.post('login', this.model)
        // 永久保存token
        localStorage.token = res.data.token
        // 保存token，关闭浏览器后没了
        // sessoinStorage.token = res.data.token

        this.$router.push('/')
        this.$message({
          type:'success',
          message:'登录成功'
        })
      }
    }
  }
</script>

<style>
  .login-card{
    width:30rem;
    margin:5rem auto;
  }
</style>
