<template>
  <div class="users-manage">
    <!-- 头部 -->
    <Header></Header>
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <!-- 面板标题 -->
        <div slot="header" class="clearfix">
          <span>账号管理</span>
        </div>
        <!-- 面板内容 -->
        <div class="text item">
          <!-- 账号管理列表 -->
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <!-- 选择框 -->
            <el-table-column type="selection">
            </el-table-column>
            <!-- 用户名称 -->
            <el-table-column prop="username" label="用户名称">
            </el-table-column>
            <!-- 用户组别 -->
            <el-table-column prop="usergroup" label="用户组">
            </el-table-column>

            <!-- 日期 -->
            <el-table-column label="日期">
              <template slot-scope="scope">{{ scope.row.cdate | formatCdate }}</template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)"><i class="el-icon-edit"></i>修改</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)"><i class="el-icon-delete"></i>删除</el-button>
              </template>
            </el-table-column>

          </el-table>
          <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
            <el-form :model="editForm" ref="editForm">
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="editForm.username" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="editForm.password" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="用户组" :label-width="formLabelWidth">
                <el-select v-model="editForm.usergroup" placeholder="请选择用户组">
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                  <el-option label="普通用户" value="普通用户"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('editForm'),dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 选择按钮 -->
          <!-- <div style="margin-top: 20px">
                        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
                        <el-button @click="toggleSelection()">取消选择</el-button>
                    </div> -->
        </div>
      </el-card>
    </el-main>
    <!-- 尾部 -->
    <Footer></Footer>
  </div>
</template>
<script>
// 引入moment 事件格式化插件
import moment from "moment";
import qs from "qs";

// 引入头部组件 和 尾部组件
// import Header from "@/components/Header/Header.vue";
// import Footer from "@/components/Footer/Footer.vue";

import Header from "@/components/Header/header.vue";
import Footer from "@/components/Footer/footer.vue";

// 暴露出去 暴露的是当前组件的vue实例对象（new Vue({  })）
export default {
  // 注册组件
  components: {
    Header,
    Footer
  },
  // 数据
  data() {
    return {
      dialogFormVisible: false, // 默认隐藏模态框
      tableData: [], //用户账号列表的数据
      dialogFormVisible: false, // 控制修改模态框的显示和隐藏的变量
      editId: "", //保存要修改数据的id
      seletedUser: [], //保存选中的用户数据
      // 修改表单双向绑定的数据

      formLabelWidth: "120px",
      editForm: {
        username: "",
        password: "",
        usergroup: ""
      },
      //验证的字段 修改表单的验证规则
      rules: {
        //验证用户名
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证密码
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证用户组
        usergroup: [
          { required: true, message: "请选择用户组", trigger: "change" } // 非空验证
        ]
      }
    };
  },
  // 方法
  methods: {
    // 编辑触发函数
    handleEdit(id) {
      //把要修改的ID 保存到一个变量里面
      this.editId = id;
      // 发送一个ajax 把需要修改的数据的id发送给后端
      this.axios
        .get(`http://192.168.20.50:3000/users/edituser?id=${id}`)
        .then(response => {
          //一一对应 把数据回填到模态框里面
          this.editForm.username = response.data[0].username;
          this.editForm.password = response.data[0].password;
          this.editForm.usergroup = response.data[0].usergroup;
          //回显数据以后在弹出模态框
          this.dialogFormVisible = true;
        });
    },



    // 删除触发的函数
    handleDelete(id) {
      // 发送一个请求 把id发送给后端
      this.axios
        .get(`http://192.168.20.50:3000/users/deluser?id=${id}`)
        .then(response => {
          // 根据后端响应的数据判断
          if (response.data.rstCode === 1) {
            // 弹出删除成功的提示
            this.$message({
              type: "success",
              message: response.data.msg
            });

            // 重新请求一下所有账号数据（刚才已经把数据删除了 所有再次请求就是只有删除后的数据）
            this.getUserList();
          } else {
            this.$message.error(response.data.msg);
          }
        });
    },

    //取消选择的函数
    toggleSelection() {
      // 取消选择
      this.$refs.userlist.clearSelection();
    },

    //当选择状态改变  触发这个函数
    handleSelectionChange(val) {
      // 把选中的数据 保存到一个变量里面
      this.seletedUser = val;
    },

    //批量删除函数
    // 下面两个是选择相关的函数
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 封装一个请求所有用户账号数据的函数
    getUserList() {
        // 发送ajax请求 获取所有数据
      this.axios
        .get(`http://192.168.20.50:3000/users/userlist`)
        .then(response => {
          // 直接把请求到的所用用户账号的数据 赋值给 tableData 渲染用户账号列表
          this.tableData = response.data;
        });
    },

      
   
     // 修改表单提交函数
    // 表单提交触发的函数
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         
          // 收集修改后的新数据 和 一个原来的id
          let params = {
            username: this.editForm.username,
            password: this.editForm.password,
            usergroup: this.editForm.usergroup,
            editId: this.editId
          }
          // console.log(params);

          // 发送ajax 把修改后的新数据 和 原来的id 一起发送给后端
          this.axios.post(`http://192.168.20.50:3000/users/saveedit`,
          qs.stringify(params),
          { Header: { 'Content-Type': 'application/x-www-form-urlencoded' } }
          ).then(response => {
            // 根据后端响应的数据判断
            if (response.data.rstCode === 1) {
              // 成功 弹出修改成功的提示
              this.$message({
                type: 'success',
                message: response.data.msg
              })
              // 重新调用一下获取数据的方法（刷新一遍页面 获取最新数据）
              this.getUserList()
            } else {
              this.$message.error(response.data.msg);
            }
          })

          // 关闭模态框
          this.dialogFormVisible = false;

        } else {
          console.log("前端验证不通过, 不能发送");
          return false;
        }
      });
    }
  },
  // 生命周期钩子函数(vue实例创建完成 但是还没有挂载dom 适合请求数据) 只要进入组件 组件就会经历这个周期 会自动触发这个函数
  created() {
    // 调用请求所有数据的函数
     this.getUserList();
  },
  // 过滤器
  filters: {
    // 过滤器
    formatCdate(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style lang="less">
.users-manage {
  width: 100%;
  display: flex; // 让这个盒子 变为一个可以伸缩的盒子
  flex-direction: column; // 方向是 纵向
  // 主体
  .el-main {
    .box-card {
      width: 100%;
    }
    flex: 1; // 自动增长 撑满
    .el-card {
      .el-card__header {
        font-weight: 700;
        font-size: 15px;
        background-color: #f1f1f1;
      }
      .el-card__body {
        .item {
        }
      }
    }
  }
}
</style>


