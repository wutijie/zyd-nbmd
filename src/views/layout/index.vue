<template>
    <div class="layout-container full flex-grail">
        <!-- 顶部 -->
        <LayTop></LayTop>
        <div class="main">
            <div class="box h100p">
                <!-- 侧边栏 -->
                <LayLeft></LayLeft>
                <!-- 中间内容 -->
                <LayMain></LayMain>
            </div>
        </div>
    </div>
</template>

<script>
    import LayTop from '@/components/layTop.vue'
    import LayLeft from '@/components/layLeft.vue'
    import LayMain from '@/components/layMain.vue'
    export default {
        components: {
            LayTop, LayLeft, LayMain
        }
    }
</script>

<style lang="scss" scoped>
    .layout-container {
        
    }
</style>