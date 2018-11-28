<template>
  <div class="accountadd">
    <Header></Header>
    <el-main>
      <el-card class="box-card">
        <!-- 面板标题 -->
        <div slot="header" class="clearfix">
          <span>添加账号</span>
        </div>

        <!-- 面板内容 -->
        <div class="titemext ">
          <!-- 添加账户表单 -->
          <el-form :model="addUserForm" status-icon :rules="addUserRules" ref="addUserForm" label-width="20%" class="demo-ruleForm">
            <!-- 账号 -->
            <el-form-item label="账号" prop="username">
              <el-input type="text" v-model="addUserForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
              <el-input type="text" v-model="addUserForm.password" autocomplete="off"></el-input>
            </el-form-item>

            <!-- 用户组 -->
            <el-form-item label="选择用户组" prop="usergroup">
              <el-select v-model="addUserForm.usergroup" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
              </el-select>
            </el-form-item>
            <!-- 添加按钮 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('addUserForm')">添加</el-button>
              <el-button @click="resetForm('addUserForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>

    </el-main>

    <Footer></Footer>
  </div>
</template>
<script>
// 引入头部组件 和 尾部组件
import Header from "@/components/Header/header.vue";
import Footer from "@/components/Footer/footer.vue";
//引入qs库 对参数作处理
import qs from 'qs';
export default {
  //注册组件
  components: {
    Header,
    Footer
  },
  data() {
    return {
      addUserForm: {
        username: "",
        password: "",
        
        usergroup: ""
      },
      addUserRules: {
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
        
        usergroup:[
              { required: true, message: "请选择用户组", trigger: "change" },
        ]
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
          //获取账号和密码
          let params = {
          username : this.addUserForm.username,
          password : this.addUserForm.password,
          usergroup : this.addUserForm.usergroup
          }
          //  console.log(params);
          // console.log(this.axios);
      // 发送ajax请求  把数据发送给后端
      this.axios.post('http://192.168.20.50:3000/users/adduser',qs.stringify(params),
          { "headers": { 'Content-Type':'application/x-www-form-urlencoded' } // 设置请求头
     })
         .then(response=>{
           console.log(response.data)
           //如果请求状态码是1 请求成功
           if(response.data.rstCode ===1){
             //弹出提示信息
             this.$message({
               type:'success',
               message:response.data.msg
             })
             //跳转到账号管理列表页面
             this.$router.push('/usersmanage')
           }else{
             //添加失败
             this.$message.error(response.data.msg)
           }
         })
        }else{
          console.log("前段验证不通过，不能发送");
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
.accountadd {
  width: 100%;
  display: flex; //伸缩盒子
  flex-direction: column; //方向是纵向
}
//头部
.el-header {
  height: 60px;
  line-height: 60px;
  background: #e6e6e6;
}
//主体
.el-main {
  flex: 1; //自动撑满
  .box-card {
    width: 600px;
    margin: 0 auto;
  }
}
//底部
.footer {
  height: 60px;
  line-height: 60px;
  background: #e6e6e6;
}
</style>

