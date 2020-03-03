<template>
    <el-col :span="span">
        <div class="double-area"></div>
    </el-col>
</template>

<script>
    export default {
        props: ['span']
    }
</script>

<style lang="scss" scoped>
    .double-area {
        min-height: 100px;
        background: #ccc;
    }
</style>