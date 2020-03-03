<template>
    <div class="deviceadmin-line-set-power">
        <el-table
            ref="deviceLinePower"
            :data="nowEditData"
            style="width: 100%;"
            height="50vh"
            border
            @select="handleSelect"
            @select-all="handleSelectAll"
            @selection-change="handleSelectionChange"
            >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="plName" label="产线"></el-table-column>
        </el-table>
        <el-row class="line-set-power-handle">
            <el-button type="primary" @click="handleSubmit">分配</el-button>
            <el-button @click="$emit('editClose')">取消</el-button>
        </el-row>
    </div>
</template>

<script>
    import { allotProductionLine } from '../../../../../api/spuerAdmin.js'
    export default {
        props: {
            editData: {
                type: Object
            },
        },
        data() {
            return {
                nowEditData: [],
                hasPowerData: {},
                nowSelect: [],
                nowRow: {}
            }
        },
        methods: {
            // 单选
            handleSelect(selection, row){
                this.$refs.deviceLinePower.clearSelection();
                setTimeout( () => {
                    this.$refs.deviceLinePower.toggleRowSelection(row, true);
                },0)
            },
            // 多选
            handleSelectAll(selection){
                this.$refs.deviceLinePower.clearSelection();
            },
            handleSelectionChange(selection) {
                // console.log(selection);
                this.nowSelect = selection;
            },
            // 提交授权
            handleSubmit(){
                allotProductionLine({
                    dId: this.nowRow.deviceId,
                    plId: this.nowSelect[0] ? this.nowSelect[0].plId  : ''
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.$message({type: 'success', message: '授权成功!'});
                        this.$emit('editClose');
                        // this.$emit('updateData');
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    // console.log(err);
                    this.$message.error(err.message);
                })
            },
            // 标记已授权
            getHasPower(){
                let isSelect = this.nowEditData.find( (result) => {
                    return result.plId == this.hasPowerData.pl_id && result.plName == this.hasPowerData.pl_name;
                })
                isSelect && this.$refs.deviceLinePower.toggleRowSelection(isSelect, true);
            }
        },
        watch: {
            editData: {
                immediate: true,
                handler(newValue, oldValue) {
                    // console.log(newValue);
                    if(newValue.row){
                        this.nowEditData = [...newValue.allData];
                        this.nowRow = { ...newValue.row };
                        if(newValue.hasData){
                            this.hasPowerData = {...newValue.hasData};
                            setTimeout( () => {
                                this.getHasPower();
                            },16);
                        }
                        // console.log(this.nowEditData);
                        // console.log(this.hasPowerData);
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .deviceadmin-line-set-power {
        .line-set-power-handle {
            margin-top: 1rem;
        }
    }
</style>