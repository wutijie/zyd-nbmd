<template>
    <div class="superAdmin-userAdmin h100p bsbb">
        <el-row class="h100p" :gutter="10">
            <el-col class="wtree-wrap" :span="6">
                <Wtree ref="superUserTree" @setNowClick="setNowClick"></Wtree>
            </el-col>
            <el-col class="h100p" :span="18">
                <Wtable :nowClick="nowClick" @updateOrgan="updateOrgan"></Wtable>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Wtree from './component/wTree.vue'
    import Wtable from './component/wTable.vue'
    export default {
        components: {
            Wtree, Wtable
        },
        data() {
            return {
                nowClick: {}
            }
        },
        methods: {
            updateOrgan() {
                this.$refs.superUserTree.getInit();
                this.nowClick = {};
            },
            setNowClick(val){
                this.nowClick = val;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .superAdmin-userAdmin {
        padding: 0.5rem;
        padding-top: 0.2rem;
        .wtree-wrap {
            height: 100%;
            overflow-y: scroll;
        }
    }
</style>