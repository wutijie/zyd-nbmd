<template>
    <div class="deviceadmin-classes-power">
        <el-table
            ref="deviceClassesPower"
            :data="nowEditData.classes"
            style="width: 100%;"
            height="50vh"
            border
            row-key="id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            default-expand-all
            @select="handleSelect"
            @select-all="handleSelectAll"
            @selection-change="handleSelectionChange"
            >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="csName" label="班次"></el-table-column>
            <el-table-column prop="clBeginTime" label="开始时间"></el-table-column>
            <el-table-column prop="clEndTime" label="结束时间"></el-table-column>
        </el-table>
        <el-row class="classes-power-handle">
            <el-button type="primary" @click="handleSubmit">分配</el-button>
            <el-button @click="$emit('editClose')">取消</el-button>
        </el-row>
    </div>
</template>

<script>
    import { allotClassesDevice } from '../../../../../api/spuerAdmin.js'
    export default {
        props: {
            editData: {
                type: Object
            },
        },
        data() {
            return {
                nowEditData: {},
                hasPowerData: {},
                nowSelect: [],
                nowRow: {}
            }
        },
        methods: {
            // 单选
            handleSelect(selection, row){
                this.$refs.deviceClassesPower.clearSelection();
                setTimeout( () => {
                    this.$refs.deviceClassesPower.toggleRowSelection(row, true);
                },0)
            },
            // 多选
            handleSelectAll(selection){
                this.$refs.deviceClassesPower.clearSelection();
            },
            handleSelectionChange(selection) {
                // console.log(selection);
                this.nowSelect = selection;
            },
            handleSubmit(){
                // console.log(this.nowSelect);
                // console.log(this.nowRow);return;
                allotClassesDevice({
                    cId: this.nowSelect[0].cid,
                    dId: this.nowRow.deviceId,
                    csId: this.nowSelect[0].csId
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
            getHasPower(){
                let isSelect = this.nowEditData.classes.find( (result) => {
                    return result.csId == this.hasPowerData.csId;
                })
                isSelect && this.$refs.deviceClassesPower.toggleRowSelection(isSelect, true);
            }
        },
        watch: {
            editData: {
                immediate: true,
                handler(newValue, oldValue) {
                    // console.log(newValue);
                    if(newValue.row){
                        this.nowEditData = { ...newValue.allData };
                        this.nowRow = { ...newValue.row };
                        this.nowEditData.classes.forEach( (item, index) => {
                            item.children = [ ...item.classes ];
                            item.level = 1;
                            item.children.forEach( (item2, index2) => {
                                // console.log(item2)
                                item2.csName = item2.clName;
                                item2.level = 2;
                            })
                        })
                        if(newValue.hasData){
                            this.hasPowerData = { ...newValue.hasData };
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
    .deviceadmin-classes-power {
        .classes-power-handle {
            margin-top: 1rem;
        }
    }
</style>
<style>
    .deviceadmin-classes-power .el-table__row--level-1 .cell .el-checkbox {
        display: none;
    }
</style>