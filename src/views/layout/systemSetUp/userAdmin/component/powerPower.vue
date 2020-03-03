<template>
    <div class="useradmin-power-power">
        <el-table
            ref="userPowerPower"
            :data="nowEditData"
            style="width: 100%;"
            height="50vh"
            row-key="porder"
            border
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            @selection-change="handleSelectionChange"
            @select="handleSelect"
            @select-all="handleSelectAll"
            >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="pname" label="权限名称"></el-table-column>
        </el-table>
        <el-row class="power-power-handle">
            <el-button type="primary" @click="handleSubmit">授权</el-button>
            <el-button @click="$emit('editClose')">取消</el-button>
        </el-row>
    </div>
</template>

<script>
    import { allotPowersUser } from '../../../../../api/spuerAdmin.js'
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
                totalLength: 0,
                isFirstClickAll: false,
                nowSelect: [],
                nowUid: ''
            }
        },
        methods: {
            // 全选切换
            handleSelectAll(selection){
                // console.log(selection);
                // console.log(this.isFirstClickAll);
                if(!this.isFirstClickAll){
                    selection.forEach( (item, index) => {
                        this.$refs.userPowerPower.toggleRowSelection(item, true);
                        if(item.children.length > 0){
                            item.children.forEach( (item2, index2) => {
                                this.$refs.userPowerPower.toggleRowSelection(item2, true);
                            });
                        }
                    });
                    this.isFirstClickAll = true;
                }else{
                    this.$refs.userPowerPower.clearSelection();
                    this.isFirstClickAll = false;
                }
            },
            // 单行选择
            handleSelect(selection, row){
                // console.log(selection, row);
                // console.log(selection.indexOf(row))
                // 点到了父级
                if(selection.indexOf(row) == -1){
                    if(row.children.length > 0){
                        setTimeout( () => {
                            row.children.forEach( (item, index) => {
                                this.$refs.userPowerPower.toggleRowSelection(item, false);
                            });
                        })
                    }
                }else{
                    if(row.children.length > 0){
                        setTimeout( () => {
                            row.children.forEach( (item, index) => {
                                this.$refs.userPowerPower.toggleRowSelection(item, true);
                            });
                        })
                    }
                }
                // 点到了子集
                let parentData = [];
                let hasLength = 0;
                if(row.children.length == 0){
                    parentData = this.nowEditData.find( (item, index) => {
                        return item.pid == row.ppater
                    })
                }
                // console.log(parentData);
                selection.forEach( (item, index) => {
                    if(item.ppater == row.ppater){
                        hasLength++;
                    }
                    // if(item.children.length > 0){
                    //     if(item.children.indexOf(row) != -1){
                    //         this.$refs.userPowerPower.toggleRowSelection(item, false);
                    //     }
                    // }
                })
                // console.log(hasLength)
                setTimeout( () => {
                    if(parentData && parentData.children && hasLength == parentData.children.length){
                        // console.log('父级选中')
                        this.$refs.userPowerPower.toggleRowSelection(parentData, true);
                    }else{
                        this.$refs.userPowerPower.toggleRowSelection(parentData, false);
                    }
                })
                
            },
            handleSelectionChange(selection) {
                // console.log(selection);
                // console.log(selection.length, this.totalLength)
                setTimeout( () => {
                    if(selection.length == this.totalLength){
                        this.isFirstClickAll = true;
                    }else{
                        this.isFirstClickAll = false;
                    }
                }, 0)
                // console.log(this.isFirstClickAll);
                this.nowSelect = selection;
            },
            handleSubmit() {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_user_power_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(this.nowSelect);
                let sedMids = [];
                this.nowSelect.forEach( (item, index) => {
                    let parentData = [];
                    parentData = this.nowEditData.find( (item2, index2) => {
                        return item2.pid == item.ppater
                    })
                    // console.log(parentData);
                    if(parentData && parentData.children.length > 0){
                        sedMids.indexOf(parentData.pid) == -1 && sedMids.push(parentData.pid);
                    }
                    sedMids.indexOf(item.pid) == -1 && sedMids.push(item.pid);
                })
                // console.log(sedMids);
                // return;
                allotPowersUser({
                    pIds: sedMids.join(','),
                    uId: this.nowUid
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.$message({type: 'success', message: '授权成功!'});
                        this.$emit('editClose');
                        this.$emit('updateData');
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
                let hasChild = [];
                this.hasPowerData.forEach( (item, index) => {
                    if(item.children.length > 0){
                        item.children.forEach( (item2, index2) => {
                            hasChild.push(item2);
                        })
                    }else{
                        hasChild.push(item);
                    }
                })
                let nowChild = [];
                this.nowEditData.forEach( (item, index) => {
                    if(item.children.length > 0){
                        item.children.forEach( (item2, index2) => {
                            nowChild.push(item2);
                        })
                    }else{
                        nowChild.push(item);
                    }
                })
                hasChild.forEach( (item, index) => {
                    let isSelect = nowChild.find( (result) => {
                        return result.porder == item.porder;
                    })
                    // console.log('---------------', isSelect)
                    this.handleSelect(hasChild, isSelect);
                    this.$refs.userPowerPower.toggleRowSelection(isSelect, true);
                })
            }
        },
        watch: {
            editData: {
                immediate: true,
                handler(newValue, oldValue) {
                    // console.log(newValue);
                    if(newValue.row){
                        this.nowUid = newValue.row.uid;
                        this.nowEditData = [...newValue.allData];
                        this.hasPowerData = [...newValue.hasData];
                        setTimeout( () => {
                            this.getHasPower();
                        },16)
                        // console.log(this.nowEditData);
                        // console.log(this.hasPowerData);
                        this.isFirstClickAll = false;
                        this.totalLength = this.nowEditData.length;
                        this.nowEditData.forEach( (item, index) => {
                            if(item.children.length > 0){
                                this.totalLength +=  +item.children.length;
                            }
                        })
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .useradmin-power-power {
        .power-power-handle {
            margin-top: 1rem;
        }
    }
</style>