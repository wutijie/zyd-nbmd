<template>
    <div>
        <el-form ref="mouldChangeEdit" :rules="rules" label-width="110px" :model="nowEditData">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="模具编号" prop="m_id">
                        <el-select :disabled="nowEditData.add == 3" v-model="nowEditData.m_id" placeholder="请选择" @change="handleMouldChange" class="w100p">
                            <el-option
                                v-for="(item, index) in hasSelect.mouldSelect"
                                :key="index"
                                :label="item.m_number"
                                :value="item.m_id">{{ item.m_number + '-' + item.m_name }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="模具名称">
                        <el-input :readonly="true" v-model="nowEditData.cr_number"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="变更模具编号">
                        <el-input v-model="nowEditData.cr_newnumber" :readonly="nowEditData.add != 1"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="变更模具编号" prop="cr_newnumber">
                        <el-row :gutter="10">
                            <el-col :span="17">
                                <el-input v-model="nowEditData.cr_newnumber" :readonly="nowEditData.add != 1"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary" size="mini" @click="createOrderNumber" :disabled="nowEditData.add != 1">自动生成</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item> -->
                </el-col>
                <el-col :span="12">
                    <el-form-item label="变更时间">
                        <el-date-picker :readonly="nowEditData.add == 3" style="width: 100%;" v-model="nowEditData.cr_changetime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="变更内容">
                <el-input :maxlength="100" show-word-limit :readonly="nowEditData.add == 3" type="textarea" :rows="3" v-model="nowEditData.cr_content"></el-input>
            </el-form-item>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="变更前">
                        <el-image
                            style="width: 100%;"
                            :src="afterImg"
                            :preview-src-list="srcList"
                            ><div slot="error" class="image-slot">暂无图片</div></el-image>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="变更后">
                        <el-image
                            style="width: 100%;"
                            v-if="nowEditData.add == 3"
                            :src="newImg"
                            :preview-src-list="srcList"
                            ><div slot="error" class="image-slot">暂无图片</div></el-image>
                        <el-upload
                            action=""
                            v-else
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
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="变更人">
                        <el-select :disabled="nowEditData.add == 3" v-model="nowEditData.cr_changeuser" placeholder="请选择" @change="handleMouldChange" class="w100p">
                            <el-option
                                v-for="(item, index) in hasSelect.userSelect"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <!-- <el-form-item label="变更审核人">
                        <el-select :disabled="nowEditData.add == 3" v-model="nowEditData.cr_checkuser" placeholder="请选择" @change="handleMouldChange" class="w100p">
                            <el-option
                                v-for="(item, index) in hasSelect.userSelect"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                </el-col>
            </el-row>
            <el-form-item>
                <el-button v-if="nowEditData.add == 1" type="primary" @click="submitForm('mouldChangeEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button v-if="nowEditData.add == 3 && !nowEditData.cr_checkuser " type="primary" @click="handleChangeContent">审核</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { getMouldInfoGetNumber, getMouldChangeRecordAdd, getMouldChangeRecordCheck } from '../../../../../api/mouldManage.js'
    import { uploadImage } from '../../../../../api/spuerAdmin.js'
    export default {
        props: {
            editData: {
                type: Object
            }
        },
        data() {
            return {
                nowEditData: {},
                btnMsg: '',
                rules: {
                    m_id: [
                        { required: true, message: '请选择模具编号', trigger: 'change' }
                    ],
                    cr_newnumber: [
                        { required: true, message: '请输入变更模具编号', trigger: 'change' }
                    ],
                    m_name: [
                        { required: true, message: '请输入模具名称', trigger: 'change' }
                    ]
                },
                hasSelect: {},
                customContent: [
                    {
                        param: '',
                        value: ''
                    }
                ],
                fileList: [],
                updateFile: null,
                imageSrc: '',
                afterImg: '',
                newImg: '',
                srcList: []
            }
        },
        methods: {
            // 自动生成模具编号
            createOrderNumber(){
                getMouldInfoGetNumber({
                    type: 2
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.$set(this.nowEditData, 'cr_newnumber', res.data);
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 模具选择
            handleMouldChange(val){
                console.log(val);
                let nowSelect = this.hasSelect.mouldSelect.find( result => {
                    return result.m_id == val;
                })
                console.log(nowSelect);
                this.$set(this.nowEditData, 'cr_number', nowSelect.m_name);
                this.afterImg = nowSelect.m_imgpath;
                this.srcList = [nowSelect.m_imgpath];
            },
            // 图片上传
            handleBeforeUpload(file){
                // console.log(file)
                let formData = new FormData();
                formData.set('file', file);
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
            // 审核
            handleChangeContent() {
                this.$confirm('是否确认审核?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    getMouldChangeRecordCheck({
                        id: this.nowEditData.cr_id
                    }).then(res => {
                        // console.log(res);
                        if(res.code == 200){
                            this.$message({type: 'success', message: '审核成功!'});
                            this.$emit('editClose');
                            this.$emit('updateData');
                        }else{
                            this.$message.error(res.msg);
                        }
                    }).catch( err => {
                        // console.log(err);
                        this.$message.error(err.message);
                    })
                }).catch(err => {
                    this.$message({type: 'info', message: '已取消审核!'});
                })
            },
            submitForm(formName, add) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_mould_manage_modify_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.nowEditData);
                        // return;
                        getMouldChangeRecordAdd({
                            mid: this.nowEditData.m_id,
                            changetime: this.nowEditData.cr_changetime,
                            newnumber: this.nowEditData.cr_newnumber,
                            newimgpath: this.imageSrc,
                            content: this.nowEditData.cr_content,
                            changeuser: this.nowEditData.cr_changeuser ? this.nowEditData.cr_changeuser : 0,
                            checkuser: this.nowEditData.cr_checkuser ? this.nowEditData.cr_checkuser : 0
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
                            this.$message.error(err.message);
                        })
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
                    console.log(newValue);
                    setTimeout( () => {
                        this.$refs.mouldChangeEdit.clearValidate();
                    }, 0)
                    this.nowEditData = { ...newValue.editData };
                    this.hasSelect = { ...newValue.hasSelect };
                    if(this.nowEditData.add && this.nowEditData.add == 1){
                        this.btnMsg = '添加';
                        this.fileList = [];
                    }else{
                        this.afterImg = this.nowEditData.m_imgPath;
                        this.newImg = this.nowEditData.cr_newimgpath;
                        this.btnMsg = '修改';
                        if(this.nowEditData.cr_newimgpath){
                            this.fileList = [{
                                name: '',
                                url: this.nowEditData.cr_newimgpath
                            }];
                        }else{
                            this.fileList = [];
                        }
                        if(this.nowEditData.add && this.nowEditData.add == 3){
                            this.nowEditData.m_id = this.nowEditData.m_number;
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>