<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动管理</el-breadcrumb-item> -->
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        created () {
            // console.log(this.$route);
        }
    }
</script>

<style lang="scss" scoped>
    .el-breadcrumb {
        line-height: 1.8rem;
        font-size: 0.8rem;
    }
</style>