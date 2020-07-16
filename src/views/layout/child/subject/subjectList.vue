<template>
  <div class="subject">
    <el-card>
      <el-form :model="form" ref="form" inline>
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="list">
        <el-table-column label="序号" >
          <template v-slot="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
               {{scope.row.status == 0?'禁用':'启用'}}        
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
              <el-button type="text">编辑</el-button>
              <el-button type="text">{{scope.row.status == 1?'禁用':'启用'}}</el-button>
              <el-button type="text">删除</el-button>     
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getSubjectList} from '@/api/subject.js'
export default {
  data() {
    return {
      form: {
        rid: "", //	否	string	学科编号
        name: "", //	否	string	学科名称
        page: "", //	否	string	页码 默认为1
        limit: "", //	否	string	页尺寸 默认为10
        username: "", //	否	string	创建者用户名
        status: "" //	否	string	状态 0(禁用) 1(启用)
      },
      list:[],
    };
  },
  methods: {
    clear(){
      this.$refs.form.resetFields()
    }
  },
  created() {
    getSubjectList().then(res=>{
      console.log(res);
      this.list = res.data.items
    })
  },
};
</script>

<style>
</style>