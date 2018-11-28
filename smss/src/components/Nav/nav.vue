<template>
    <el-menu :default-active="$router.path" :unique-opened="true" router >
        <!-- 系统信息 -->
        <el-submenu index='0'>
            <template slot="title">系统管理</template>
            <el-menu-item index='/'>
               
                系统信息
            </el-menu-item>
        </el-submenu>
        <!-- 分类管理 -->
        <el-submenu index="1">
            <template slot="title">管理</template>
            <el-menu-item index="1-1">分类管理</el-menu-item>
            <el-menu-item index="1-2">添加分类</el-menu-item>

        </el-submenu>
        <!-- 商品管理 -->
        <el-submenu index="2">
            <template slot="title">商品管理</template>
            <el-menu-item index="/commodity">商品管理</el-menu-item>
            <el-menu-item index="/commodityadd">添加商品</el-menu-item>

        </el-submenu>
        <!-- 进货管理 -->
        <el-submenu index="3">
            <template slot="title">进货管理</template>
            <el-menu-item index="1-1">库存管理</el-menu-item>
            <el-menu-item index="1-2">添加库存</el-menu-item>

        </el-submenu>
        <!-- 出货管理-->
        <el-submenu index="4">
            <template slot="title">出货管理</template>
            <el-menu-item index="1-1">销售列表</el-menu-item>
            <el-menu-item index="1-2">商品出库</el-menu-item>
            <el-menu-item index="1-3">商品退货</el-menu-item>

        </el-submenu>
        <!-- 统计管理 -->
        <el-submenu index="5">
            <template slot="title">统计管理</template>
            <el-menu-item index="sale">销售统计</el-menu-item>
            <el-menu-item index="stock">进货统计</el-menu-item>

        </el-submenu>
        <!-- 账号管理 -->
        <el-submenu index="6">
            <template slot="title">账号管理</template>
            <el-menu-item index="/usersmanage">账号管理 </el-menu-item>
            <el-menu-item index="/accountadd">添加账号</el-menu-item>
            <el-menu-item index="/editpwd">密码修改</el-menu-item>

        </el-submenu>
        <!-- 会员管理 -->
        <el-submenu index="7">
            <template slot="title">会员管理</template>
            <el-menu-item index="1-1">账号管理</el-menu-item>
            <el-menu-item index="1-2">添加账号</el-menu-item>

        </el-submenu>

    </el-menu>
</template>
<script>
export default {};
</script>
<style lang="less">
.el-menu {
  
}
.el-submenu {
  background-color: #6caf00;
  border-radius: 15px 0 0 15px;
  color: #f4ffff;
  
 
}


.el-submenu__title {
  color: #ffffff;
   margin-top: 10px;

  .el-submenu__icon-arrow {
    display: none;
  }
}
</style>


