<template>
    <div class="superAdmin-permissionSettings">
        <h1>superAdmin-permissionSettings</h1>
        <!-- <el-row :gutter="10">
            <el-col :span="12">
                <Wtree @getNowClick="getNowClick"></Wtree>
            </el-col>
            <el-col class="left-border" :span="12">
                <Wedit :nowClick="nowClick"></Wedit>
            </el-col>
        </el-row> -->
    </div>
</template>

<script>
    // import Wtree from './component/wTree.vue'
    // import Wedit from './component/edit.vue'
    export default {
        data() {
            return {
                nowClick: {}
            }
        },
        components: {
            // Wtree, Wedit
        },
        methods: {
            getNowClick(data) {
                // console.log(data);
                this.nowClick = data;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .superAdmin-permissionSettings {
        .left-border {
            border-left: 1px solid #cccccc;
        }
    }
</style>