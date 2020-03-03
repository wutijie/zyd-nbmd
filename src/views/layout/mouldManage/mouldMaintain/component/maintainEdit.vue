<template>
    <div>
        <el-form ref="maintainEdit" :rules="rules" label-width="110px" :model="nowEditData">
            <el-form-item label="保养级别">
                <el-select :disabled="nowEditData.add != 1" class="w100p" v-model="nowEditData.mr_genre" @change="handleLevelChange" placeholder="请选择">
                    <el-option label="二级保养" :value="1"></el-option>
                    <el-option label="周期保养" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="保养计划号" prop="mr_planno">
                <el-row :gutter="10">
                    <el-col :span="17">
                        <el-input v-model="nowEditData.mr_planno" :disabled="nowEditData.add != 1"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" size="mini" @click="createOrderNumber" :disabled="nowEditData.add != 1">自动生成</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="计划名称" prop="mr_maintain_planOrder">
                <el-input v-model="nowEditData.mr_maintain_planOrder" :disabled="nowEditData.add != 1"></el-input>
            </el-form-item>
            <el-form-item label="模具编号" prop="mids">
                <el-select :disabled="nowType == 2" v-model="nowEditData.mids" multiple placeholder="请选择" class="w100p">
                    <el-option
                        v-for="(item, index) in hasSelect.mouldSelect"
                        :key="index"
                        :label="item.m_number"
                        :value="item.m_id">{{ item.m_number + '-' + item.m_name }}
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-row :gutter="10">
                <el-col :span="12">
                </el-col>
                <el-col :span="12">
                    <el-form-item label="模具名称">
                        <el-input v-model="nowEditData.m_number" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->
            <el-row v-if="!isWeek" :gutter="10">
                <el-col :span="17">
                    <el-form-item label="计划时间">
                        <el-date-picker
                            v-for="(item, index) in planTimeChoose"
                            :key="index"
                            :disabled="nowType == 2"
                            v-model="item.value"
                            type="date"
                            style="width: 100%;"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button type="" @click="handleAddTime" icon="el-icon-plus"></el-button>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="17">
                    <el-form-item label="保养模板">
                        <el-select :disabled="nowType == 2" v-model="nowEditData.mt_id" placeholder="请选择" @change="handleTemplateSelect" class="w100p">
                            <el-option
                                v-for="(item, index) in maintainTemplate"
                                :key="index"
                                :label="item.mt_name"
                                :value="item.mt_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="handleTemplate(1, 10)">模板</el-button>
                </el-col>
            </el-row>
            <el-row v-if="isWeek" :gutter="10">
                <el-col :span="12">
                    <el-form-item label="间隔" prop="interval">
                        <el-input v-model.number="nowEditData.interval"></el-input>
                        <!-- <el-select class="w100p" v-model="nowEditData.interval" placeholder="请选择">
                            <el-option v-for="item in interval" :key="item" :label="item" :value="item"></el-option>
                        </el-select> -->
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="单位">
                        <el-select class="w100p" v-model="nowEditData.unit" @change="handleWeekChange" placeholder="请选择">
                            <!-- <el-option label="小时" :value="1"></el-option> -->
                            <el-option label="天" :value="2"></el-option>
                            <el-option label="周" :value="3"></el-option>
                            <el-option label="月" :value="4"></el-option>
                            <el-option label="年" :value="5"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="isWeek" :gutter="10">
                <el-col :span="12">
                    <el-form-item label="周期" prop="definite">
                        <el-input v-model.number="nowEditData.definite"></el-input>
                        <!-- <el-select class="w100p" v-model="nowEditData.definite" placeholder="请选择">
                            <el-option v-for="item in interval" :key="item" :label="item" :value="item"></el-option>
                        </el-select> -->
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="次数" prop="count">
                        <el-input v-model.number="nowEditData.count"></el-input>
                        <!-- <el-select class="w100p" v-model="nowEditData.count" placeholder="请选择">
                            <el-option v-for="item in interval" :key="item" :label="item" :value="item"></el-option>
                        </el-select> -->
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button v-if="nowType != 2" type="primary" @click="submitForm('maintainEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
        <!-- 保养模板 -->
        <el-dialog title="保养模板" :visible.sync="dialogTemplateVisible" width="60%" append-to-body>
            <TemplateEdit :editData="editDataTemplate"  @editClose="editCloseTemplate" @updateData="handleTemplate"></TemplateEdit>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getMouldInfoGetNumber, getMouldMaintainCycleMaintainAdd,
        getMouldMaintainSecondMaintainAdd, getMouldMaintainTemplate,
        getMouldMaintainSecondMaintainEdit, getMouldMaintainCycleMaintainEdit
    } from '../../../../../api/mouldManage.js'
    import TemplateEdit from './templateEdit.vue'
    export default {
        components: {
            TemplateEdit,
        },
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
                    mr_maintain_planOrder: [
                        { required: true, message: '请输入计划名称', trigger: 'change' }
                    ],
                    mr_planno: [
                        { required: true, message: '请输入维修编号', trigger: 'change' }
                    ],
                    mids: [
                        { required: true, message: '请选择模具编号', trigger: 'change' }
                    ],
                    interval: [
                        { type: 'number', message: '必须为数字值'}
                    ],
                    definite: [
                        { type: 'number', message: '必须为数字值'}
                    ],
                    count: [
                        { type: 'number', message: '必须为数字值'}
                    ],
                },
                hasSelect: {},
                dialogTemplateVisible: false,
                editDataTemplate: {},
                maintainTemplate: [],
                planTimeChoose: [{ value: '' }],
                isWeek: false,
                interval: 90,
                nowType: ''
            }
        },
        methods: {
            // 自动生成模具编号
            createOrderNumber(){
                getMouldInfoGetNumber({
                    type: this.nowEditData.mr_genre == 1 ? 5 : 4
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.$set(this.nowEditData, 'mr_planno', res.data);
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
                this.$set(this.nowEditData, 'm_number', nowSelect.m_name);
            },
            // 周期单位选择
            handleWeekChange(val) {
                // console.log(val);
                // this.$set(this.nowEditData, 'interval', "");
                // if(val == 1){
                //     this.interval = 24;
                // }else if(val == 2){
                //     this.interval = 7;
                // }else if(val == 3){
                //     this.interval = 31;
                // }else if(val == 4){
                //     this.interval = 12;
                // }else{
                //     this.interval = 5;
                // }
            },
            // 保养级别选择
            handleLevelChange(val) {
                this.$set(this.nowEditData, 'mr_planno', ' ');
                if(val == 1){
                    this.isWeek = false;
                    this.maintainTemplate =  this.hasSelect.secondTemplateSelect;
                }else{
                    this.isWeek = true;
                    this.maintainTemplate =  this.hasSelect.cycleTemplateSelect;
                }
            },
            // 模板选择
            handleTemplateSelect(val) {
                console.log(val);
                let nowSelect = this.maintainTemplate.find( result => {
                    return result.mt_id == val;
                })
                console.log(nowSelect);
                this.nowContent = nowSelect.mt_content;
            },
            // 查看模板
            handleTemplate(page, pageSize){
                console.log(page, pageSize)
                page = page ? page : 1;
                pageSize = pageSize ? pageSize : 10;
                getMouldMaintainTemplate({
                    page: page,
                    row: pageSize
                }).then( res => {
                    console.log(res);
                    if(res.code == 200){
                        // 
                        // this.hasSelect.maintainTemplate = { ...res.data };
                        this.editDataTemplate = {
                            listData: res.data,
                            count: res.count,
                            page, 
                            pageSize
                        };
                    }else{
                        this.editDataTemplate = {};
                    }
                    this.dialogTemplateVisible = true;
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 关闭模板弹窗
            editCloseTemplate() {
                this.dialogTemplateVisible = false;
                this.editDataTemplate = {};
            },
            // 增加时间
            handleAddTime() {
                this.planTimeChoose.push({ value: '' });
            },
            submitForm(formName, add) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.nowEditData);
                        if(this.nowEditData.add && this.nowEditData.add == 1){
                            if(!this.isWeek){
                                // this.planTimeChoose = this.planTimeChoose.map( item => item.value);
                                console.log(this.planTimeChoose);
                                getMouldMaintainSecondMaintainAdd({
                                    mids: this.nowEditData.mids.join(','),
                                    tempid: this.nowEditData.mt_id,
                                    planname: this.nowEditData.mr_maintain_planOrder,
                                    assgindate: this.planTimeChoose.map( item => item.value).join(','),
                                    planno: this.nowEditData.mr_planno.trim()
                                }).then( res => {
                                    // console.log(res);
                                    if(res.code == 200){
                                        this.$message({type: 'success', message: this.btnMsg + '成功!'});
                                        this.$emit('editClose');
                                        this.$emit('updateData', 2);
                                    }else{
                                        this.$message.error(res.msg);
                                    }
                                }).catch( err => {
                                    this.$message.error(err.message);
                                })
                            }else{
                                getMouldMaintainCycleMaintainAdd({
                                    mids: this.nowEditData.mids.join(','),
                                    tempid: this.nowEditData.mt_id,
                                    planname: this.nowEditData.mr_maintain_planOrder,
                                    interval: this.nowEditData.interval,
                                    unit: this.nowEditData.unit,
                                    definite: this.nowEditData.definite,
                                    count: this.nowEditData.count,
                                    planno: this.nowEditData.mr_planno.trim()
                                }).then( res => {
                                    // console.log(res);
                                    if(res.code == 200){
                                        this.$message({type: 'success', message: this.btnMsg + '成功!'});
                                        this.$emit('editClose');
                                        this.$emit('updateData', 3);
                                    }else{
                                        this.$message.error(res.msg);
                                    }
                                }).catch( err => {
                                    this.$message.error(err.message);
                                })
                            }
                        }else{
                            if(!this.isWeek){
                                this.planTimeChoose = this.planTimeChoose.map( item => item.value);
                                console.log(this.planTimeChoose);
                                getMouldMaintainSecondMaintainEdit({
                                    mids: this.nowEditData.mids.join(','),
                                    tempid: this.nowEditData.mt_id,
                                    planname: this.nowEditData.mr_maintain_planOrder,
                                    assgindate: this.planTimeChoose.join(','),
                                    id: this.nowEditData.ma_id
                                }).then( res => {
                                    // console.log(res);
                                    if(res.code == 200){
                                        this.$message({type: 'success', message: this.btnMsg + '成功!'});
                                        this.$emit('editClose');
                                        this.$emit('updateData', 2);
                                    }else{
                                        this.$message.error(res.msg);
                                    }
                                }).catch( err => {
                                    this.$message.error(err.message);
                                })
                            }else{
                                getMouldMaintainCycleMaintainEdit({
                                    mids: this.nowEditData.mids.join(','),
                                    tempid: this.nowEditData.mt_id,
                                    planname: this.nowEditData.mr_maintain_planOrder,
                                    interval: this.nowEditData.interval,
                                    unit: this.nowEditData.unit,
                                    definite: this.nowEditData.definite,
                                    count: this.nowEditData.count,
                                    id: this.nowEditData.mp_id
                                }).then( res => {
                                    // console.log(res);
                                    if(res.code == 200){
                                        this.$message({type: 'success', message: this.btnMsg + '成功!'});
                                        this.$emit('editClose');
                                        this.$emit('updateData', 3);
                                    }else{
                                        this.$message.error(res.msg);
                                    }
                                }).catch( err => {
                                    this.$message.error(err.message);
                                })
                            }
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
                        this.$refs.maintainEdit.clearValidate();
                    }, 0)
                    this.nowEditData = { ...newValue.editData };
                    this.hasSelect = { ...newValue.hasSelect };
                    this.nowType = newValue.type;
                    if(this.nowEditData.add && this.nowEditData.add == 1){
                        this.btnMsg = '添加';
                        this.nowEditData.mr_genre = 1;
                        this.maintainTemplate =  this.hasSelect.secondTemplateSelect;
                        this.planTimeChoose = [{ value: '' }];
                        this.isWeek = false;
                        // this.nowEditData.mids = [];
                        this.$set(this.nowEditData, 'mids', []);
                        console.log(this.nowEditData.mids)
                    }else{
                        this.btnMsg = '修改';
                        this.nowEditData.mids = `${this.nowEditData.mids}`.split(',').map( item =>  + item);
                        // console.log(this.nowEditData.mids)
                        this.isWeek = this.nowEditData.mr_genre == '二级保养' ? false : true;
                        this.nowEditData.mr_genre = this.nowEditData.mr_genre == '二级保养' ? 1 : 2;
                        if(newValue.type == 1){
                            // 
                        }else if(newValue.type == 2){
                            // 
                            this.isWeek = false;
                            this.nowEditData.mr_genre = 1;
                            this.maintainTemplate =  this.hasSelect.secondTemplateSelect;
                            this.nowEditData.mr_maintain_planOrder = this.nowEditData.ma_mamaintain_planName;
                            this.planTimeChoose = this.nowEditData.ma_assgindate.split(',').map( item => {
                                return { value: item };
                            });
                            this.nowEditData.mr_planno = this.nowEditData.ma_planno;
                        }else if(newValue.type == 3){
                            // 
                            this.isWeek = true;
                            this.nowEditData.mr_genre = 2;
                            this.maintainTemplate =  this.hasSelect.cycleTemplateSelect;
                            this.nowEditData.mr_maintain_planOrder = this.nowEditData.mp_maintain_planName;
                            this.nowEditData.mp_unit == '天' && this.$set(this.nowEditData, 'unit', 2);
                            this.nowEditData.mp_unit == '周' && this.$set(this.nowEditData, 'unit', 3);
                            this.nowEditData.mp_unit == '月' && this.$set(this.nowEditData, 'unit', 4);
                            this.nowEditData.mp_unit == '年' && this.$set(this.nowEditData, 'unit', 5);
                            this.$set(this.nowEditData, 'interval', this.nowEditData.mp_interval);
                            this.$set(this.nowEditData, 'definite', this.nowEditData.mp_interval);
                            this.$set(this.nowEditData, 'count', this.nowEditData.mp_count);
                            this.nowEditData.mr_planno = this.nowEditData.mp_planno;
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>