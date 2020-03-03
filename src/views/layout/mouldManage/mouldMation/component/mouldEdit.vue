<template>
    <div class="plan-order-manage">
        <el-form ref="mouldEdit" :rules="rules" label-width="80px" :model="nowEditData">
            <el-form-item label="模具编号" prop="m_number">
                <el-row :gutter="10">
                    <el-col :span="17">
                        <el-input v-model="nowEditData.m_number" :disabled="nowEditData.add != 1"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" size="mini" @click="createOrderNumber" :disabled="nowEditData.add != 1">自动生成</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="模具名称" prop="m_name">
                        <el-input v-model="nowEditData.m_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="资产编号">
                        <el-input v-model="nowEditData.m_assetNo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="产品">
                        <!-- <el-input v-model="nowEditData.planbegintime"></el-input> -->
                        <el-select v-model="nowEditData.proid" placeholder="请选择" class="w100p">
                            <el-option
                                v-for="(item, index) in hasSelectData.ProSelect"
                                :key="index"
                                :label="item.proname"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="模腔数">
                        <el-input v-model="nowEditData.m_CavityNum"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="重量">
                        <el-input v-model="nowEditData.m_weight"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="外观尺寸">
                        <el-input v-model="nowEditData.m_measure"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="顶出结构">
                        <el-input v-model="nowEditData.m_ejectionStructure"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="油缸数">
                        <el-input v-model="nowEditData.m_cylinderNum"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="设计寿命">
                        <el-input v-model="nowEditData.m_life"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="验收时间">
                        <el-date-picker style="width: 100%;" v-model="nowEditData.m_acceptanceTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期时间"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="图片上传">
                <!-- <el-input v-model="nowEditData.imgpath"></el-input> -->
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
            <el-row :gutter="10" v-for="(item, index) in customContent" :key="index">
                <el-col :span="11">
                    <el-form-item label="参数名称">
                        <el-input v-model="item.param"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="参数值">
                        <el-input v-model="item.value"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2" v-if="index == customContent.length - 1">
                    <el-button size="mini" icon="el-icon-plus" @click="handleAddCustom"></el-button>
                </el-col>
                <el-col :span="2" v-else>
                    <el-button size="mini" icon="el-icon-close" @click="handleDelCustom(index)"></el-button>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="submitForm('mouldEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mouldInfoAdd, mouldInfoEdit, getMouldInfoGetNumber } from '../../../../../api/mouldManage.js'
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
                    m_number: [
                        { required: true, message: '请输入模具编号', trigger: 'change' }
                    ],
                    m_name: [
                        { required: true, message: '请输入模具名称', trigger: 'change' }
                    ]
                },
                hasSelectData: {},
                classesSelect: [],
                customContent: [
                    {
                        param: '',
                        value: ''
                    }
                ],
                fileList: [],
                updateFile: null,
                imageSrc: ''
            }
        },
        methods: {
            // 自动生成模具编号
            createOrderNumber(){
                getMouldInfoGetNumber({
                    type: 1
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.$set(this.nowEditData, 'm_number', res.data);
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
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
            // 添加用户自定义
            handleAddCustom(){
                this.customContent.push(
                    {
                        param: '',
                        value: ''
                    }
                )
            },
            // 删除用户自定义
            handleDelCustom(index){
                this.customContent.splice(index, 1);
            },
            submitForm(formName, add) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_mould_manage_mould_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.nowEditData);
                        // return;
                        if(add == 1){
                            mouldInfoAdd({
                                mouldno: this.nowEditData.m_number,
                                mouldname: this.nowEditData.m_name,
                                assetno: this.nowEditData.m_assetNo,
                                proid: this.nowEditData.proid ? this.nowEditData.proid : 0,
                                cavitynum: this.nowEditData.m_CavityNum ? this.nowEditData.m_CavityNum : 0,
                                weight: this.nowEditData.m_weight,
                                measure: this.nowEditData.m_measure,
                                ejectionstructure: this.nowEditData.m_ejectionStructure,
                                cylindernum: this.nowEditData.m_cylinderNum ? this.nowEditData.m_cylinderNum : 0,
                                life: this.nowEditData.m_life ? this.nowEditData.m_life : 0,
                                acceptanceTime: this.nowEditData.m_acceptanceTime,
                                imgpath: this.imageSrc,
                                param: JSON.stringify(this.customContent)
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
                        }else{
                            mouldInfoEdit({
                                mouldname: this.nowEditData.m_name,
                                assetno: this.nowEditData.m_assetNo,
                                proid: this.nowEditData.proid ? this.nowEditData.proid : 0,
                                cavitynum: this.nowEditData.m_CavityNum ? this.nowEditData.m_CavityNum : 0,
                                weight: this.nowEditData.m_weight,
                                measure: this.nowEditData.m_measure,
                                ejectionstructure: this.nowEditData.m_ejectionStructure,
                                cylindernum: this.nowEditData.m_cylinderNum ? this.nowEditData.m_cylinderNum : 0,
                                life: this.nowEditData.m_life ? this.nowEditData.m_life : 0,
                                acceptanceTime: this.nowEditData.m_acceptanceTime,
                                imgpath: this.imageSrc ? this.imageSrc : this.fileList.url,
                                param: JSON.stringify(this.customContent),
                                id: this.nowEditData.m_id
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
                        }
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
                        this.$refs.mouldEdit.clearValidate();
                    }, 0)
                    this.classesSelect = [];
                    this.nowEditData = { ...newValue.editData };
                    this.hasSelectData = { ...newValue };
                    this.customContent = this.nowEditData.m_param ? JSON.parse(this.nowEditData.m_param) : [{param: '', value: ''}]
                    // console.log(this.nowEditData.json)
                    // console.log(this.customContent)
                    // console.log(this.nowEditData);
                    this.nowEditData.proid = this.nowEditData.proid == 0 ? '' : this.nowEditData.proid;
                    if(this.nowEditData.add && this.nowEditData.add == 1){
                        this.btnMsg = '添加';
                        this.fileList = [];
                    }else{
                        this.btnMsg = '修改';
                        if(this.nowEditData.m_imgPath){
                            this.fileList = [{
                                name: '',
                                url: this.nowEditData.m_imgPath
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