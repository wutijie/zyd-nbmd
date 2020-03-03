<template>
    <div>
        <el-row>
            <el-input v-if="nowEditData.add == 5" type="textarea" v-model="nowEditData.arShowContent" rows="5" placeholder=""></el-input>
            <el-input v-else type="textarea" v-model="nowEditData.arData" rows="5" placeholder=""></el-input>
        </el-row>
        <el-row class="cancle-btn">
            <el-button type="primary">取消</el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        props: {
            editData: {
                type: Object
            }
        },
        data() {
            return {
                nowEditData: {},
                btnMsg: ''
            }
        },
        watch: {
            editData: {
                immediate: true,
                handler(newValue, oldValue) {
                    // console.log(newValue);
                    this.nowEditData = { ...newValue };
                    // this.btnMsg = this.nowEditData.add && this.nowEditData.add == 1 ? '添加' : '修改';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cancle-btn {
        margin-top: 1rem;
    }
</style>