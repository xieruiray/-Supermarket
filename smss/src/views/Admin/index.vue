<template>
    <div class="index">
        <!-- 大盒子 -->
        <el-container>
            <!-- 左边导航 -->
            <el-aside width="200px">
             <Nav></Nav>
            </el-aside>
            <!-- 右边大盒子 -->
            <el-container>
               <!-- 路由出口 -->
               <router-view></router-view>
            </el-container>
        </el-container>
    </div>

</template>
<script>
//引入导航组件
import Nav from "@/components/Nav/nav.vue"
export default {
    // 注册组件
    components: {
        Nav
    }
};
</script>
<style lang="less">
.index {
  height: 100%;
  // 大容器
  .el-container {
    height: 100%;
    // 左边导航
    .el-aside {
      
      
      text-align:right;
    

    }
    
    // 右边
    .el-container {
      // 头部
      .el-header {
      }
      // 主体

      .el-main {
        
        color: #333;
        text-align: center;
      }
      // 底部
      .el-footer {
        background-color: #b3c0d1;
        color: #333;
        text-align: center;
      }
    }
  }
}
</style>




