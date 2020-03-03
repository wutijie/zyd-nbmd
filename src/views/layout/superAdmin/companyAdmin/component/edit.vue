<template>
    <div>
        <el-form ref="menuEdit" label-width="80px" :model="nowEditData">
            <el-form-item label="企业名称">
                <el-input v-model="nowEditData.cname"></el-input>
            </el-form-item>
            <el-form-item label="企业简称">
                <el-input v-model="nowEditData.cshortName"></el-input>
            </el-form-item>
            <el-form-item v-if="nowEditData.add == 1" label="联系人">
                <el-input v-model="nowEditData.uname"></el-input>
            </el-form-item>
            <el-form-item v-if="nowEditData.add == 1" label="联系电话">
                <el-input v-model="nowEditData.uuserName"></el-input>
            </el-form-item>
            <el-form-item label="企业图标">
                <el-upload
                    action=""
                    ref="fileUp"
                    :before-upload="handleBeforeUpload"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :file-list="fileList"
                    :limit="1"
                    :http-request="handleUploadImage"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('menuEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { addCompany, updateCompany, uploadImage } from '../../../../../api/spuerAdmin.js'
    export default {
        props: {
            editData: {
                type: Object,
            }
        },
        data() {
            return {
                nowEditData: this.editData,
                btnMsg: '',
                fileList: [],
                updateFile: null,
                imageSrc: ''
            }
        },
        methods: {
            handleBeforeUpload(file){
                // console.log(file)
                let formData = new FormData();
                // formData.append('file', file);
                formData.set('file', file);
                // console.log(formData.get('file'))
                // this.updateFile = file;
                this.updateFile = formData;
            },
            handleSuccess(response, file, fileList){
                // console.log(response, file, fileList)
            },
            handleError(err, file, fileList){
                // console.log(err, file, fileList)
            },
            handleUploadImage(){
                // return;
                uploadImage(this.updateFile).then( res => {
                    console.log(res)
                    if(res.code == 200){
                        // res.data.fullPath
                        this.imageSrc = res.data.path;
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            submitForm(formName, add) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_platform_manage_company_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(this.nowEditData);return;
                        if(add == 1){
                            // 添加
                            addCompany({
                                cName: this.nowEditData.cname,
                                cShortName: this.nowEditData.cshortName,
                                imageUrl: this.imageSrc,
                                username: this.nowEditData.uuserName,
                                password: this.nowEditData.password ? this.nowEditData.password : '123456',
                                name: this.nowEditData.uname
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
                        }else{
                            // 编辑
                            updateCompany({
                                cId: this.nowEditData.cid,
                                cName: this.nowEditData.cname,
                                cShortName: this.nowEditData.cshortName,
                                imageUrl: this.imageSrc ? this.imageSrc : this.fileList.url,
                                // imageUrl: this.nowEditData.cimage,
                                username: this.nowEditData.uusername
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
                        }
                        
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
                    this.nowEditData = { ...newValue };
                    if(this.nowEditData.add && this.nowEditData.add == 1){
                        this.btnMsg = '添加';
                        this.fileList = [];
                    }else{
                        this.btnMsg = '修改';
                        if(this.nowEditData.cImage){
                            this.fileList = [{
                                name: '',
                                url: this.nowEditData.cImage
                            }];
                        }else{
                            this.fileList = [];
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>