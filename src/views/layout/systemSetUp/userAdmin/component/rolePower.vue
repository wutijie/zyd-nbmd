<template>
    <div class="useradmin-role-power">
        <el-table
            ref="userRolePower"
            :data="nowEditData"
            style="width: 100%;"
            height="50vh"
            border
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            @selection-change="handleSelectionChange"
            >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="rname" label="角色名称"></el-table-column>
        </el-table>
        <el-row class="role-power-handle">
            <el-button type="primary" @click="handleSubmit">授权</el-button>
            <el-button @click="$emit('editClose')">取消</el-button>
        </el-row>
    </div>
</template>

<script>
    import { allotRolesUser } from '../../../../../api/spuerAdmin.js'
    export default {
        props: {
            editData: {
                type: Object
            },
        },
        data() {
            return {
                nowEditData: [],
                hasPowerData: [],
                nowSelect: [],
                nowUid: ''
            }
        },
        methods: {
            handleSelectionChange(selection) {
                // console.log(selection);
                this.nowSelect = selection;
            },
            handleSubmit() {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_user_role_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(this.nowSelect);
                // return;
                let sedMids = [];
                this.nowSelect.forEach( (item, index) => {
                    sedMids.push(item.rid);
                })
                // console.log(sedMids);
                allotRolesUser({
                    rIds: sedMids.join(','),
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
            getHasPower(){
                this.hasPowerData.forEach( (item, index) => {
                    let isSelect = this.nowEditData.find( (result) => {
                        return result.rid == item.rid;
                    })
                    // console.log('---------------', isSelect)
                    this.$refs.userRolePower.toggleRowSelection(isSelect, true);
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
                        if(newValue.hasData){
                            this.hasPowerData = [...newValue.hasData];
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
    .useradmin-role-power {
        .role-power-handle {
            margin-top: 1rem;
        }
    }
</style>