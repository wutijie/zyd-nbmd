<template>
    <div class="first-page">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="7">
                <div class="grid-content bg-purple">
                    <div class="ul-top">
                        <div class="ul-top-left">
                            <p>设备数量：{{indexData.count}}台</p>
                            <p>在线：{{indexData.online}}台</p>
                            <p>离线：{{indexData.offline}}台</p>
                        </div>
                        <div class="ul-top-right">
                            <div id="chart1" class="charts"></div>
                        </div>
                    </div>
                    <div class="ul-bottom">
                        <div class="ul-bottom-left"></div>
                        <div class="ul-bottom-right">
                            详情<i class="el-icon-back"></i>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple-light">
                    <div class="ul-top">
                        <div class="ul-top-left">
                            <div id="chart2" class="charts"></div>
                        </div>
                        <div class="ul-top-right">
                            <div id="chart3" class="charts"></div>
                        </div>
                    </div>
                    <div class="ul-bottom ul-bottom2">
                        <div class="ul-bottom-left">
                            <p>计划完成率：{{indexData.planRate}}%</p>
                            <p>产品合格率：{{indexData.passRate}}%</p>
                        </div>
                        <div class="ul-bottom-right">
                            <div class="ul-bottom-left"></div>
                            <div class="ul-bottom-right">
                                详情<i class="el-icon-back"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple">
                    <div class="ul-top">
                        <div class="ul-top-left">
                            <p>OEE:{{indexData.OEE}}%</p>
                            <p>有效开机率：{{indexData.openRate}}%</p>
                            <p>报警次数：{{indexData.alarmcount}}</p>
                        </div>
                        <div class="ul-top-right"></div>
                    </div>
                    <div class="ul-bottom ul-bottom3">
                        <div class="ul-bottom-left"></div>
                        <div class="ul-bottom-right">
                            详情<i class="el-icon-back"></i>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <div class="linecharts">
				<div class="linechart-left">
					<p><span>设备运行时间</span></p>
					<div id="lineChart" class="linechart"></div>
				</div>
				<div class="linechart-right">
					<p><span>UPH每小时产量</span></p>
					<div id="columnChart" class="linechart"></div>
				</div>
			</div>
        </el-row>
    </div>
</template>

<script>
    import { getIndex } from '../../../api/homeIndex.js';
    export default {
        data() {
            return {
                indexData: ''
            }
        },
        created () {
            getIndex().then( res => {
				let that = this;
				if( res.code == 200 ){
                    that.indexData = res.data;
                    that.getChart();
                }else{
					that.$message.error(res.msg);
                }
            }).catch(err =>{
				this.$message.error(err.message)
           });
        },
        mounted () {},
        methods: {
            getChart() {
                let that = this;
                let myChart1 = that.$echarts.init(document.getElementById('chart1'));
                let myChart2 = that.$echarts.init(document.getElementById('chart2'));
                let myChart3 = that.$echarts.init(document.getElementById('chart3'));
                let myChart4 = that.$echarts.init(document.getElementById('lineChart'));
                let myChart5 = that.$echarts.init(document.getElementById('columnChart'));
                let option1 = {
                    tooltip: {},
                    series: [
                        {
                            type: 'pie',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                            },
                            center: ['70%', '50%'],
                            data: [
                                {value: that.indexData.online,name:"在线设备"},
                                {value: that.indexData.offline,name:"离线设备"},
                            ]
                        }
                    ],
                    color: ['#28a745',"rgb(128,128,128)"]
                };
                let option2 = {
                    tooltip: {},
                    series: [
                        {
                            type: 'pie',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                            },
                            radius: ['50%', '70%'],
                            center: ['50%', '50%'],
                            data: [
                                {value: that.indexData.planRate,name:"计划完成率"},
                                {value: Number(100 - that.indexData.offline).toFixed(2),name:""},
                            ]
                        }
                    ],
                    color: ['#28a745',"rgb(128,128,128)"]
                };
                let option3 = {
                    tooltip: {},
                    series: [
                        {
                            type: 'pie',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                            },
                            radius: ['50%', '70%'],
                            center: ['70%', '50%'],
                            data: [
                                {value: that.indexData.passRate,name:"产品合格率"},
                                {value: Number(100 - that.indexData.passRate).toFixed(2),name:"不合格率"},
                            ]
                        }
                    ],
                    color: ['#28a745',"rgb(128,128,128)"]
                };
                let option4 = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['开机', '工作', '空闲'],
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: that.indexData.runtime.weekDate
                    },
                    yAxis: {
                        type: 'value'
                    },
                    color: ['#28a745','#ffc107','#6c757d'],
                    series: [
                        {
                            name: '开机',
                            type: 'line',
                            data: that.indexData.runtime.opentime
                        },
                        {
                            name: '工作',
                            type: 'line',
                            data: that.indexData.runtime.worktime
                        },
                        {
                            name: '空闲',
                            type: 'line',
                            data: that.indexData.runtime.resttime
                        }
                    ]
                };
                let option5 = {
                    color: ['#3398DB'],
                    xAxis: {
                        name: '时',
                        data: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
                        axisLine: {
                            show: true
                        },
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        name: '件',
                        type: 'value',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                width: 1,
                                type: 'solid'
                            }
                        }
                    },
                    series: {
                        type: 'bar',
                        barWidth: '60%',
                        data: that.indexData.UPH
                    }
                };
                myChart1.setOption(option1);
                myChart2.setOption(option2);
                myChart3.setOption(option3);
                myChart4.setOption(option4);
                myChart5.setOption(option5);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .grid-content {
        background: rgb(242,242,242);
        border-radius: 5px;
        overflow: hidden;
        font-size: 16px;
    }
    .ul-top:after {
        content: '';
        display: block;
        clear: both;
    }
    .ul-top {
        height: 140px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .ul-top-left {
            line-height: 30px;
        }
        /*.ul-top-right{padding-left: 20px;}*/
    }
    .ul-bottom {
        height: 40px;
        background: #179397;
        padding: 10px;
        font-size: 16px;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        .ul-bottom-right {
            /*width: 100%;*/
            text-align: right;
        }
        i {
            border: 1px solid #ffffff;
            padding: 5px;
            border-radius: 50%;
            margin-left: 10px;
            transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
            -o-transform: rotate(180deg);
        }
    }
    .ul-bottom2 {
        background: rgb(128,128,128);
    }
    .ul-bottom3 {
        background: rgb(128,128,128);
    }
    .charts{
        width: 200px;
        height: 120px;
    }
    .linecharts {
		margin-top: 20px;
		padding: 10px;
		width: 100%;
		display: flex;
		justify-content: space-around;
		>div{
			width: 48%;
			height: 360px;
			/*margin-left: 10px;*/
			border: 1px solid #eaeaea;
			padding-top: 20px;
			text-align: center;
			position: relative;
			p{
				position: absolute;
				width: 100%;
				text-align: center;
				top: -15px;
				left: 0;
				span{
					background: #fff;
				}
			}
			.linechart{
				width: 100%;
				height: 100%;
			}
		}
		
	}
</style>