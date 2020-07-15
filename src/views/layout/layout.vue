<template>
  <el-container class="layout">
    <el-header class="header">
      <ul>
        <li class="el-icon-s-fold f20"></li>
        <li>
          <img src="@/assets/img/layout-logo.png" alt />
        </li>
        <li class="t1">面试宝</li>
        <li class="nouse"></li>
        <li>
          <img class="userIcon" :src="info.avatar" alt />
        </li>
        <li class="t2">{{info.username}}</li>
        <li>
          <el-button class="btn" @click="exit" type="primary">退出</el-button>
        </li>
      </ul>
    </el-header>
    <el-container class="content">
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getInfo, logout} from '@/api/layout.js'
import {removeToken} from '@/untils/local.js'
export default {
  data() {
    return {
      userIcon: "",
      info:''
    };
  },
  methods: {
    exit(){
      logout().then(()=>{
        removeToken()
        this.$router.push('/login')
      })
    }
  },
  created() {
    getInfo().then(res=>{
      res.data.avatar = process.env.VUE_APP_URL +'/'+ res.data.avatar
      this.info = res.data
    })
  },
};
</script>

<style lang="less">
@import url("~@/style/base.css");
.layout {
  height: 100%;
  .header {
    background-color: #ccc;
    padding-top: 10px;
    ul {
      display: flex;
      align-items: center;
      .nouse {
        flex: 1;
      }
      .f20{
        font-size: 20px;
        margin-right: 15px;
      }
      .t1 {
        font-size: 22px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: bold;
        text-align: left;
        color: #49a1ff;
        letter-spacing: 1px;
        margin-left: 15px;
      }
      .userIcon {
        width: 42px;
        height: 42px;
        border-radius: 50%;
      }
      .t2 {
        font-size: 14px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: bold;
        text-align: left;
        color: #636363;
        letter-spacing: 0px;
        margin: 0 15px;
      }
      // .btn {
      //   width: 57px;
      //   // height: 28px;
      //   padding-right: 50px;
      // }
    }
  }
  .content {
    height: 100%;
    .aside {
      background-color: rgb(145, 207, 187);
    }
  }
}
</style>