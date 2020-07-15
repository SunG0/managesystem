<template>
  <el-container class="layout">
    <el-header class="header">
      <ul>
        <li @click="isCollapse = !isCollapse" class="el-icon-s-fold f20"></li>
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
      <el-aside width="auto"  class="aside">
        <el-menu
          :default-active="$route.path"
          router
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <el-menu-item index="/layout/dataList">
            <i class="el-icon-s-data"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/layout/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/textList">
            <i class="el-icon-document"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/companyList">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/subjectList">
            <i class="el-icon-tickets"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getInfo, logout } from "@/api/layout.js";
import { removeToken } from "@/untils/local.js";
export default {
  data() {
    return {
      isCollapse: true,
      info: ""
    };
  },
  methods: {
    //退出
    exit() {
      logout().then(() => {
        removeToken();
        this.$router.push("/login");
      });
    }
  },
  created() {
    //获取用户信息
    getInfo().then(res => {
      res.data.avatar = process.env.VUE_APP_URL + "/" + res.data.avatar;
      this.info = res.data;
    });
  }
};
</script>

<style lang="less">
@import url("~@/style/base.css");
.layout {
  height: 100%;
  .header {
    padding-top: 10px;
    ul {
      display: flex;
      align-items: center;
      .nouse {
        flex: 1;
      }
      .f20 {
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
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
      }
    }
    .main{
      background-color: #E8E9EC;
    }
  }
}
</style>