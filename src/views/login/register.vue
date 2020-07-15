<template>
  <div class="register">
    <el-dialog :visible="isShow" width="600px" :show-close="false">
      <!-- 标题 -->
      <h1 slot="title" class="header">用户注册</h1>
      <!-- 表单 -->
      <el-form :model="form" ref="form" label-width="65px" :rules="rules">
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="url"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="code">
          <el-row>
            <el-col :span="14">
              <el-input v-model="form.code"></el-input>
            </el-col>
            <el-col :span="9" :offset="1">
              <img v-if="bol" class="codeImg" @click="changeImg" :src="codeImg" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="rcode">
          <el-row>
            <el-col :span="14">
              <el-input v-model="form.rcode"></el-input>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-button :disabled="totleTime !=5 " @click="getCode">获取手机验证码 <span v-if="totleTime!=5">（{{totleTime+1}}）秒</span></el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <div slot="footer" class="bottom">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {registerUser,getPhoneCode} from '@/api/login.js'
export default {
  name: "register",
  data() {
    return {
      isShow: false,
      totleTime:5,
      url: process.env.VUE_APP_URL + "/uploads", //头像上传请求
      imageUrl: "", //图片预览
      codeImg:
        process.env.VUE_APP_URL + "/captcha?type=sendsms", //图片验证码地址
      bol: true, //图片验证码静默刷新
      form: {
        avatar: "", //	是	string	头像地址
        username: "", //	是	string	用户名
        phone: "", //	是	string	手机号
        email: "", //	是	string	邮箱
        password: "", //	是	string	密码
        rcode: "", //	是	string	手机验证码
        code: "" //	是	string	图片验证码
      },
      rules: {
        //表单验证
        avatar: [{ required: "ture", message: "内容不能为空", tigger: "blur" }],
        username: [
          { required: "ture", message: "内容不能为空", tigger: "blur" },
          { max: 6, min: 3, message: "请输入3-6个字符的内容", tigger: "blur" }
        ],
        phone: [
          { required: "ture", message: "内容不能为空", tigger: "blur" },
          { max: 11, min: 11, message: "请输入11个字符的内容", tigger: "blur" },
          {
            validator: (res, value, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("手机号格式输入不正确"));
              }
            },
            tigger: "blur"
          }
        ],
        email: [
          { required: "ture", message: "内容不能为空", tigger: "blur" },
          {
            validator: (res, value, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("邮箱格式输入不正确"));
              }
            },
            tigger: "blur"
          }
        ],
        password: [
          { required: "ture", message: "内容不能为空", tigger: "blur" },
          { max: 12, min: 6, message: "请输入6-12个字符的内容", tigger: "blur" }
        ],
        rcode: [
          { required: "ture", message: "内容不能为空", tigger: "blur" },
          { max: 4, min: 4, message: "请输入4个字符的内容", tigger: "blur" }
        ],
        code: [
          { required: "ture", message: "内容不能为空", tigger: "blur" },
          { max: 4, min: 4, message: "请输入4个字符的内容", tigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击取消按钮关闭注册页
    cancel() {
      this.isShow = false;
    },
    //验证上传的图片的格式和大小
    beforeAvatarUpload(file) {
      // console.log('前',file);
      const imgType = file.type === "image/jpeg" || file.type === "image/png";
      const imgSize = file.size / 1024 / 1024 < 2;
      if (!imgType) {
        this.$message.warning("只能上传JPG和PNG格式的图片");
      }
      if (!imgSize) {
        this.$message.warning("只能上传小于3M的图片");
      }
      return imgSize && imgType;
    },
    //上传换完成设置预览图片及为avatar设置图片地址
    handleAvatarSuccess(res, file) {
      // console.log(' 后',res);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.avatar = res.data.file_path;
      //因为上传的头像不是没有绑定表单属性，所以不能自动验证，需要手动触发：调用element的form的自带方法
      this.$refs.form.validateField("avatar");
    },
    //点击验证码更换：静默刷新
    changeImg() {
      (this.bol = false),
        this.$nextTick(() => {
          this.bol = true;
        });
    },
    getCode(){
      this.totleTime--
      let timeID= setInterval(() => {
        this.totleTime--
        if(this.totleTime<-1){
          this.totleTime=5
          clearInterval(timeID)
        }
      }, 1000);


      let num =0
      this.$refs.form.validateField(['phone','code'],err=>{
        if(err == ''){
          num++
        }
      })
      if(num==2){
        getPhoneCode({code:this.form.code,phone:this.form.phone}).then(res=>{
          this.$message.success(res.data.captcha+'')
          console.log(res);
        })
      }
    },
    submit() {
      this.$refs.form.validate(res => {
        if (res) {
          // this.$message.success("信息格式输入正确");
          registerUser(this.form).then(()=>{
              this.$message.success("注册成功,请登录")
              this.isShow = false;
          })
        } else {
          this.$message.error("信息格式输入错误");
        }
      });
    }
  }
};
</script>

<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
  .header {
    text-align: center;
    height: 53px;
    line-height: 53px;
    font-size: 14px;
    background: linear-gradient(225deg, #1493fa, #01c6fa);
    color: #fff;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  form {
    .codeImg {
      height: 41px;
      width: 100%;
    }
  }
  .bottom {
    text-align: center;
  }
}
</style>