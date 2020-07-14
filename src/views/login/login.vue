<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/loginLogo.png" alt />
        <span class="titleName1">学员管理系统</span>
        <span class="titleLine"></span>
        <span class="titleName2">用户登录</span>
      </div>
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="8">
              <img
              class="codeImage"
                v-if="bol"
                @click="changeImg"
                :src = "imgUrl"
                alt
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="form.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login" @click="loginClick" type="primary">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="register" type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
    <register ref="register"></register>
  </div>
</template>

<script>
import register from "./register";
import {toLogin} from '@/api/login.js';
import {saveToken} from '@/untils/local.js'
export default {
  name: "login",
  components: {
    register
  },
  data() {
    return {
      bol: true,
      imgUrl:process.env.VUE_APP_URL + "/captcha?type=login",
      form: {
        phone: "",
        password: "",
        code: "",
        checked: []
      },
      rules: {
        phone: [
          { required: true, message: "手机号不能为空", trigger: "change" },
          { min: 11, max: 11, message: "请为11位手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("手机号格式输入错误"));
              }
            },
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "change" },
          { min: 6, max: 12, message: "密码为6-12个字符", trigger: "change" }
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "change" },
          { min: 4, max: 4, message: "请输入4位验证码", trigger: "change" }
        ],
        checked: [
          {
            required: true,
            message: "请确认用户协议及隐私条款并勾选",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    loginClick() {
      this.$refs.form.validate(res => {
        if (res) {
          // this.$message.success("输入格式正确");
          toLogin(this.form).then(()=>{
            // console.log('登录',res);
            saveToken()
            //跳转到layout页面
            this.$router.push('/layout')
          })
        } else {
          this.$message.error("输入格式错误");
        }
      });
    },
    changeImg() {
      this.bol = false;
      this.$nextTick(() => {
        this.bol = true;
      });
    },
    register() {
      this.$refs.register.isShow = true;
    }
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
    .codeImage{
      width: 100%;
      height: 42px;
    }
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