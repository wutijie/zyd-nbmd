<template>
    <div>
        <el-form ref="menuEdit" label-width="120px" :model="nowEditData">
            <el-form-item label="方案名称">
                <el-input v-model="nowEditData.csName"></el-input>
            </el-form-item>
            <el-table
                :data="nowClass"
                style="width: 100%">
                <el-table-column label="班次名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.clName"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="开始时间">
                    <template slot-scope="scope">
                        <el-time-picker
                        arrow-control
                        style="width: 100%;"
                        v-model="scope.row.clBeginTime"
                        value-format="HH:mm:ss"
                        placeholder="任意时间点">
                        </el-time-picker>
                    </template>
                </el-table-column>
                <el-table-column label="结束时间">
                    <template slot-scope="scope">
                        <el-time-picker
                        arrow-control
                        style="width: 100%;"
                        v-model="scope.row.clEndTime"
                        value-format="HH:mm:ss"
                        placeholder="任意时间点">
                        </el-time-picker>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="90">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button @click="handleAddClass" type="warning" size="mini">添加班次</el-button>
            <el-form-item label="是否为默认方案">
                <el-switch v-model="nowEditData.csIsDefault"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('menuEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { manageClasses } from '../../../../../api/spuerAdmin.js'
    export default {
        props: {
            editData: {
                type: Object,
            }
        },
        data() {
            return {
                nowEditData: [],
                nowClass: [],
                btnMsg: ''
            }
        },
        methods: {
            // 添加班次
            handleAddClass(){
                this.nowClass.push(
                    {
                        clName: '',
                        clBeginTime: '',
                        clEndTime: ''
                    }
                );
            },
            handleDelete(index, row){
                this.nowClass.splice(index, 1);
            },
            submitForm(formName, add) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'power_fun_production_line_class_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.nowEditData);
                        console.log(this.nowClass);
                        // return;
                        manageClasses({
                            type: add == 1 ? 1 : 2,
                            cid: this.nowEditData.cid,
                            csId: this.nowEditData.csId,
                            csName: this.nowEditData.csName,
                            csIsDefault: this.nowEditData.csIsDefault ? 1 : 2,
                            classes: this.nowClass
                        }).then( res => {
                            // console.log(res);
                            if(res.code == 200){
                                this.$message({type: 'success', message: this.btnMsg + '成功!'});
                                this.$emit('editClose');
                                this.$emit('updateData');
                            }else{
                                this.$message.error(res.msg);
                            }
                        }).catch( err => {
                            // console.log(err);
                            this.$message.error(err.message);
                        })
                        
                        // this.$emit('editClose');

                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        watch: {
            editData: {
                immediate: true,
                handler(newValue, oldValue) {
                    // console.log(newValue);
                    this.nowEditData = { ...newValue };
                    newValue.classes && (this.nowClass = [ ...newValue.classes ]);
                    this.btnMsg = this.nowEditData.add && this.nowEditData.add == 1 ? '添加' : '修改';
                    this.nowEditData.csIsDefault = this.nowEditData.csIsDefault == 1 ? true : false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>