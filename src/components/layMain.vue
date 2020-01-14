<template>
    <div class="lay-main item h100p pr">
        <!-- 组件内容 -->
        <div v-if="!iframeSrc" class="h100p lay-main-view bsbb">
            <component v-for="item in nowComponents" :key="item" :is="item"></component>
        </div>
        <!-- 自定义链接内容 -->
        <div v-else class="h100p lay-main-iframe">
            <iframe :src="iframeSrc" frameborder="0"></iframe>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        computed: {
            // 自定义链接
            iframeSrc() {
                return this.$route.meta.iframeSrc;
            },
            // 组件名称
            nowComponents() {
                return this.$route.meta.components;
            }
        },
        beforeUpdate(){
            // console.log(this.$route);
        },
        created () {
            // console.log(this.$route);
        },
    }
</script>

<style lang="scss" scoped>
    .lay-main {
        // background-color: #00f;
        .lay-main-view {
            overflow-y: scroll;
            padding: 10px;
        }
        iframe {
            width: 100%;
            height: 100%;
        }
    }
</style>