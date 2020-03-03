<template>
    <div class="superAdmin-createPage h100p">
        <el-row class="h100p" :gutter="10">
            <el-col class="h100p border-right" :span="6">
                <ul class="create-component">
                    <CreateItem v-for="(item, index) in createArr" :key="index" :index="index">
                        {{ item }}
                    </CreateItem>
                </ul>
            </el-col>
            <el-col class="h100p border-right" :span="10">
                <AreaItem></AreaItem>
            </el-col>
            <el-col class="h100p" :span="8">
                <div>
                    132
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import CreateItem from './component/createItem.vue'

    import AreaItem from './component/areaItem.vue'

    export default {
        components: {
            CreateItem,
            AreaItem
        },
        data() {
            return {
                // 目标数组
                createArr: ['按钮', '图片', '搜索', '双栏', '三栏'],
                // 替换目标的数组
                replaceArr: ['000000000', '111111111', '222222222'],
            }
        },
        created() {
            // console.log(this.$store.getters);
            
        }
    }
</script>

<style lang="scss" scoped>
    .superAdmin-createPage {
        
    }
</style>
<style>
    .border-right {
        border-right: 1px solid black;
    }
    .place-box {
        height: 50px;
        border: 1px dashed red;
    }
    .target-area {
        height: 100%;
    }
    .target-area li {
        position: relative;
        border: 1px dashed transparent;
    }
    .target-area li:hover {
        border: 1px dashed red;
    }
    .target-area li:hover .close-span {
        display: block;
    }
    .close-span {
        position: absolute;
        top: 0;
        right: 0;
        color: red;
        display: none;
    }

</style>