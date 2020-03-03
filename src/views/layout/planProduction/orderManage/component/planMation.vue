<template>
    <div class="plan-order-plan-wrap">
        <el-table id="out-planmation-order" :data="nowEditData" 
            style="width: 100%"
            border>
            <el-table-column align="center" prop="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="type" label="项目" width="100"></el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
            <el-table-column align="center" prop="index2" label="序号" width="60"></el-table-column>
            <el-table-column prop="type2" label="项目" width="100"></el-table-column>
            <el-table-column prop="content2" label="内容"></el-table-column>
        </el-table>
        <el-row :gutter="10" class="tac">
            <el-col :span="24">
                <el-button size="small" type="primary" @click="handlePrint" v-print="'#out-planmation-order'">打印</el-button>
                <el-button size="small" type="primary" @click="handleExport">导出</el-button>
            </el-col>
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
                nowEditData: [],
                tableHeader: [
                    { label: '工单编号', value: 'orderno' },
                    { label: '计划号', value: 'planno' },
                    { label: '产品型号', value: 'promodel' },
                    { label: '产品名称', value: 'proname' },
                    { label: '设备编号', value: 'deviceid' },
                    { label: '模具编号', value: 'modelnumber' },
                    { label: '工序', value: 'workno' },
                    { label: '产线', value: 'groupname' },
                    { label: '员工', value: 'usermation' },
                    { label: '班次', value: 'classname' },
                    { label: '产量', value: 'plannum' },
                    { label: '完成率', value: 'planrate' },
                    { label: '生产日期', value: 'addtime' },
                    { label: '开始时间', value: 'planbegintime' },
                    { label: '完成时间', value: 'planendtime' },
                    { label: '开始时间', value: 'actualbegintime' },
                    { label: '完成时间', value: 'actualendtime' },
                    { label: '逾期时间', value: 'overtime' },
                    { label: '报工产量', value: 'worknum' },
                    { label: '计划完成率', value: 'planrate' },
                    { label: '合格率', value: 'passrate' },
                    { label: '不合格数', value: 'notpassnum' },
                    { label: '状态', value: 'status' }
                ],
                isPrint: false
            }
        },
        methods: {
            handlePrint() {},
            handleExport() {
                this.$exportExcel('#out-planmation-order','计划排产-工单计划信息');
            }
        },
        watch: {
            editData: {
                immediate: true,
                handler(newValue, oldValue) {
                    console.log(newValue)
                    let getData = { ...newValue };
                    let handleData = [];
                    let showIndex = 0;
                    Object.keys(getData).forEach( (item, index) => {
                        let newChoose = this.tableHeader.find( result => {
                            return result.value == item;
                        })
                        // console.log(newChoose)
                        if(newChoose){
                            showIndex++;
                            if(handleData.length > 0 && !handleData[handleData.length - 1].type2){
                                    handleData[handleData.length - 1] = {
                                        ...handleData[handleData.length - 1],
                                        type2: newChoose ? newChoose.label : '',
                                        content2: getData[item],
                                        index2: showIndex
                                    }
                            }else{
                                handleData.push({
                                    type: newChoose ? newChoose.label : '',
                                    content: getData[item],
                                    index: showIndex
                                })
                            }
                        }
                    })
                    this.nowEditData = handleData;
                    let showJson = getData.json ? JSON.parse(getData.json) : [];
                    console.log(handleData);
                    console.log(showJson);
                    showJson.forEach( (item, index) => {
                        if(item.param || item.value){
                            showIndex++;
                            if(handleData.length > 0 && !handleData[handleData.length - 1].type2){
                                    handleData[handleData.length - 1] = {
                                        ...handleData[handleData.length - 1],
                                        type2: item.param ? item.param : '',
                                        content2: item.value,
                                        index2: showIndex
                                    }
                            }else{
                                handleData.push({
                                    type: item.param ? item.param : '',
                                    content: item.value,
                                    index: showIndex
                                })
                            }
                        }
                    })
                    console.log(this.nowEditData);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .plan-order-plan-wrap {
        .tac {
            margin-top: 1rem;
        }
    }
</style>