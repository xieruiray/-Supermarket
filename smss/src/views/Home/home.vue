<template>
    <div class="home">
         <Header></Header>
        <el-main>

         我是默认组件
         我是默认组件
         我是默认组件
         我是默认组件
         我是默认组件
         我是默认组件
         我是默认组件
         我是默认组件
         我是默认组件
         我是默认组件
         我是默认组件
         我是默认组件
         我是默认组件
         我是默认组件
         我是默认组件
        </el-main>

         <Footer></Footer>
    </div>
</template>
<script>
// 引入头部组件 和 尾部组件
import Header from "@/components/Header/header.vue";
import Footer from "@/components/Footer/footer.vue";
export default {
    //注册组件
    components: {
        Header,
        Footer
    },
}
</script>
<style lang="less">
    .home{
        width: 100%;
        display: flex;//伸缩盒子
        flex-direction: column;//方向是纵向
    }
    //头部
    .el-header{
        height: 60px;
        line-height: 60px;
        background: #e6e6e6;
    }
    //主体
    .el-main{
        flex:1;//自动撑满
    }
    //底部
    .footer{
        height: 60px;
        line-height: 60px;
        background: #e6e6e6;
    }

</style>

