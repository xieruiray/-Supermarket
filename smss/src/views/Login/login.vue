<template>
    <div class="login">
        <div class="login-form">
            <h1 class="title">华联超市管理系统</h1>
            <el-form :model="loginForm" status-icon :rules="loginrules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input v-model.number="loginForm.checkPwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    //验证密码一致性
    const checkPwd = (rule, value, callback) => {
      //非空验证
      if (value === "") {
        callback(new Error("请输入密码"));
        //如果2次密码不一致
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        //合法输入
        callback();
      }
    };

    return {
      //表单对象
      loginForm: {
        username: "",
        password: "",
        checkPwd: ""
      },
      //   验证的字段
      loginrules: {
        //验证账号
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        //验证密码
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        // 验证确认密码 自定义
        checkPwd: [{ required: true, validator: checkPwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    //表单提交触发的函数
    submitForm(formName) {
      //获取整个表单 调用validate(valid => {  }) 方法验证
      // 否则 只要有一个表单验证不合法 valid就是false 那么不能提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("账号合法");
          //获取账号和密码
          let username = this.loginForm.user;
          let password = this.loginForm.password;
          console.log(username, password);

          // 通过路由跳转 跳转到后端系统首页
          //   console.log(this.$router) // vue实例可以直接获取路由对象
          this.$router.push("/");
        } else {
          console.log("非法输入，请输入正确的账号和密码");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
.login {
  background-color: #2d3a4b;
  height: 100%;
  .login-form {
    width: 500px;
    height: 350px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 7px;
    padding-right: 34px;
    // 居中
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    .title {
      text-align: center;
      color: #ffffff;
      font-size: 24px;
      margin-bottom: 30px;
    }
    .el-form {
      .el-form-item {
        .el-form-item__label {
          color: #ffffff;
        }
      }
    }
  }
}
</style>


