<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/loginLogo.png" alt />
        <span class="titleName1">学员管理系统</span>
        <span class="titleLine"></span>
        <span class="titleName2">用户登录</span>
      </div>
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="8">
              <img src="@/assets/img/key.jpg" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login" type="primary">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="register" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        phone: "",
        password: "",
        code: "",
        checked: []
      }
    };
  }
};
</script>

<style lang="less">
@import url("~@/style/base.css");
.login {
  height: 100%;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  display: flex;
  align-items: center;
  justify-content: space-around;
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 44px;
    .title {
      display: flex;
      align-items: center;
      .titleName1 {
        font-size: 24px;
        margin: 0 15px;
        color: #0c0c0c;
      }
      .titleLine {
        width: 1px;
        height: 28px;
        background: #c7c7c7;
      }
      .titleName2 {
        font-size: 22px;
        margin: 0 15px;
        color: #0c0c0c;
      }
    }
    form {
      margin-top: 28px;
      input {
        width: 100%;
        height: 45px;
        background: #ffffff;
        border: 1px solid #cccfd5;
        border-radius: 4px;
      }
      .register,
      .login {
        width: 100%;
      }
    }
  }
}
</style>