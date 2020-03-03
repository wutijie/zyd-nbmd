<template>
    <div class="deviceMenu-deviceRunning">
        <el-row type="flex" class="row-bg" justify="space-around">
			<div class="searhs">
				<span>设备：</span>
				<el-select v-model="value" :placeholder="showDevice" @change="chooseDevice()" class="selectValue">
					<el-option v-for="item in deviceOptions" :label="item.deviceid +' '+ item.deviceName +' '+ item.Model" :key="item.deviceid" :value="item.deviceid" ></el-option>
				</el-select>
			</div>
			<div class="searhs">
				<span>时间：</span>
				<el-date-picker
					v-model="timedate"
					type="date"
					placeholder="选择日期">
				</el-date-picker>
			</div>
			<div class="searhs">
				<span>班次：</span>
				<el-select v-model="banciValue" placeholder="当天" @change="chooseDay()" >
					<el-option label="当天" value="00:00:00-23:59:59"></el-option>
					<el-option v-for="item in banciList" :label="item.classname" :key="item.begintime" :value="item.begintime+'-'+item.endtime" ></el-option>
				</el-select>
			</div>
		</el-row>
		<el-row type="flex" class="row-bg" justify="space-around" style="margin-top: 15px;">
			<div class="lists lists1">
				<h4>设备信息</h4>
				<p>设备序列号：{{deviceinfo.devicesno}}</p>
				<p>设备名称：{{deviceinfo.deviceName}}</p>
				<p>设备型号：{{deviceinfo.Model}}</p>
				<p>设备编号：{{deviceinfo.deviceid}}</p>
				<p>
					<img :src="deviceinfo.imgpath" alt="">
				</p>
			</div>
			<div class="lists lists2">
				<h4>设备运行</h4>
				<div class="listsChart">
					<div class="changeChart">
						<p>运行时间柱状图</p>
						<p>运行时间圆形图</p>
					</div>
					<div id="Chart1" style="margin: 0 26px;width: 250px; height: 300px; -moz-user-select: none; position: relative; background: transparent none repeat scroll 0% 0%;" _echarts_instance_="ec_1565141072978">
						<div></div>
						<p></p>
					</div>
					<div id="Chart2" style="margin: 0 26px;width: 80%; height: 400px; -moz-user-select: none; position: relative; background: transparent none repeat scroll 0% 0%;" _echarts_instance_="ec_1565141072979">
						<div id="immediatelyDeviceH5"></div>
						<div id="deviceInfo" style="display:none">
							<div class="timeClass">
								<div>
									<span class=""></span>
									<b>上电时间：</b>
								</div>
								<div>
									<span class=""></span>
									<b class="openTimeContent">0小时0分钟</b>
								</div>
								<div>
									<span class=""></span>
									<b class="openTimePeriod">00:00-00:00</b>
								</div>
							</div>
							<div class="timeClass">
								<div>
									<span class=""></span>
									<b>运行时间：</b>
								</div>
								<div>
									<span class=""></span>
									<b class="workTimeContent">0小时0分钟</b>
								</div>
								<div>
									<span class=""></span>
									<b class="workTimePeriod">00:00-00:00</b>
								</div>
							</div>
						</div>
					</div>
					<div class="wu_status wu_status1">
						<p><span class="wu_yellow"></span>待机：<i class="time_yellow"></i></p>
						<p><span class="wu_green"></span>工作：<i class="time_green"></i></p>
						<p><span class="wu_gray"></span>关机：<i class="time_gray"></i></p>
						<p><span class="wu_red"></span>报警：<i class="time_red"></i></p>
					</div>
				</div>
			</div>
			<div class="lists">
				<h4>设备报警</h4>
				<el-table :data="deviceWarning" style="width: 100%" height="150px">
					<el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
					<el-table-column prop="receivedTime" label="时间" width="120" align="center"></el-table-column>
					<el-table-column prop="alarm" label="代码" width="100" align="center"></el-table-column>
					<el-table-column prop="warningData" label="内容" width="120" align="center"></el-table-column>
				</el-table>
				<div id="chart4">
					
				</div>
			</div>
		</el-row>
		<!-- <div>
			<div class="block">
				<span class="demonstration">不显示间断点</span>
				<el-slider
				v-model="stepValue"
				:step="10">
				</el-slider>
			</div>
		</div> -->
			<el-table :data="deviceRunList" style="width: 100%">
				<el-table-column prop="0" label="" align="center"></el-table-column>
				<el-table-column prop="1" label="" align="center"></el-table-column>
				<el-table-column prop="2" label="" align="center"></el-table-column>
				<el-table-column prop="3" label="" align="center"></el-table-column>
				<el-table-column prop="4" label="" align="center"></el-table-column>
				<el-table-column prop="5" label="" align="center"></el-table-column>
				<el-table-column prop="6" label="" align="center"></el-table-column>
				<el-table-column prop="7" label="" align="center"></el-table-column>
				<el-table-column prop="8" label="" align="center"></el-table-column>
				<!-- <el-table-column prop = "linestatus" label="设备状态" width="100" align="center">
					<template slot-scope="scope">
						<span class="deviceStatus" :class="scope.row.linestatus==0?'gray':'red'"></span>
					</template>
				</el-table-column> -->
			</el-table>
    </div>
</template>

<script>
	import $ from 'jquery';
	import { getDeviceWarning,DeviceRun_DeviceInfo,DeviceRun_UPH,DeviceRun_RunTime,DeviceRun_ReceiveInfo } from '../../../../api/deviceMation.js';
    export default {
        data(){
			return{
				deviceOptions:[],
				deviceWarning:[],
				deviceRunList:[],
				deviceinfo:'',
				timedate:'',
				value:'',
				banciValue:'00:00:00-23:59:59',
				banciBegin:'00:00:00',  //开始时间
				banciEnd:'23:59:59',  //结束时间
				banciList:[],
				stepValue:'0',
				showDevice:'请选择',
				progressTime:'00:00:00',
				minNum:'',
				maxNum:'',
				new_interval:7200,
				dataArr:[],
				deg:Math.PI / 180, //表示一度的值
				alarmInitial: 0, //故障的初始值
				time:360 / 1440 ,//每一分钟所以旋转的度数
				windowWidth:400,
				custid:'000057',
				circleChart :'',
				UPH:[],
				dataArrXzhou:[],
			}
		},
		created() {
			this.getNowDate();
			DeviceRun_DeviceInfo('').then(res =>{
				this.deviceOptions = res.data.DeviceSelect;
				this.value = res.data.DeviceSelect[0].deviceid;
				this.banciList = res.data.ClassSelect;
				this.showDevice =  res.data.DeviceSelect[0].deviceid+' '+res.data.DeviceSelect[0].deviceName+' '+res.data.DeviceSelect[0].Model;
				// DeviceInfo
				this.deviceinfo = res.data.DeviceInfo;
				this.getUPH(this.value,this.timedate+" "+this.banciBegin,this.timedate+" "+this.banciEnd);
				this.getRunTime(this.value,this.timedate+" "+this.banciBegin,this.timedate+" "+this.banciEnd);
				this.getReceiveInfo(this.value,this.progressTime);
			}).catch(err => {
				this.$message.error(err.message)
			})
			
			
			
			
			// getDeviceRun('',this.timedate+" "+this.banciBegin,this.timedate+" "+this.banciEnd,this.timedate+" "+this.progressTime).then(res => {
			// 	let that = this;
			// 	if(res.code == 200) {
			// 		// that.deviceOptions = res.data.DeviceSelect;
			// 		// that.value = res.data.DeviceSelect[0].deviceid;
			// 		// that.deviceinfo = res.data.DeviceInfo;
			// 		// that.banciList = res.data.ClassSelect;
					
			// 		// that.drawTwo();
					
			// 		// if(item.deviceState == "online"){
			// 		// 		item.deviceState = "待机";
			// 		// 		stateColor = 'yellow';
			// 		// 		onlineNum += parseInt(item.deviceValue);
			// 		// 	}else if(item.deviceState == "outline"){
			// 		// 		item.deviceState = "关机";
			// 		// 		stateColor = 'gray';
			// 		// 		outlineNum += parseInt(item.deviceValue);
			// 		// 	}else if(item.deviceState == "run"){
			// 		// 		item.deviceState = "工作";
			// 		// 		stateColor = 'green';
			// 		// 		runNum += parseInt(item.deviceValue);
			// 		// 	}else if(item.deviceState == "alarm"){
			// 		// 		item.deviceState = "报警";
			// 		// 		stateColor = 'red';
			// 		// 		alarmNum += parseInt(item.deviceValue);
			// 		// 	}
			// 	}else{
			// 		that.$message.error(res.msg)
			// 	}
			// }).catch(err => {
			// 	this.$message.error(err.message)
			// });
			
			
		},
		methods:{
			getNowDate:function(){
				this.timedate = new Date().getFullYear() + "-"+this.addZero(new Date().getMonth()+1)+"-"+this.addZero(new Date().getDate());
			},
			addZero:function(num){
				if(num<10) return "0"+num;else return num;
			},
			getUPH:function(value,begintime,endtime){
				DeviceRun_UPH(value,begintime,endtime).then(res =>{
					this.UPH = res.data.UPH;
					this.drawTwo();
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
			getRunTime:function(value,begintime,endtime){
				DeviceRun_RunTime(value,begintime,endtime).then(res =>{
					var that = this;
					that.dataArr = res.data.ZhuChart;
					that.circleChart = res.data.YuanChart;
					that.UPH = res.data.UPH;
					that.getWarning(that.value,that.timedate);
					that.drawOne();
					that.initial(that.timedate,that.banciValue,that.value);
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
			getReceiveInfo:function(value,time){
				DeviceRun_ReceiveInfo(value,time).then(res =>{
					var that = this;
					that.deviceRunList = res.data.RecieveData;
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
			chooseDevice:function(){
				console.log(this.value);
			},
			chooseDay:function(){
				var that = this;
				that.banciBegin = that.banciValue.split("-")[0];
				that.banciEnd = that.banciValue.split("-")[1];
				this.getUPH(this.value,this.timedate+" "+this.banciBegin,this.timedate+" "+this.banciEnd);
				this.getRunTime(this.value,this.timedate+" "+this.banciBegin,this.timedate+" "+this.banciEnd);
			},
			getWarning:function(deviceid,time){
				var that = this;
				getDeviceWarning(deviceid,time).then(res => {
					if(res.code == 200) {
						that.deviceWarning = res.data;
					}else{
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			chart1:function(){
				var that = this;
				let Chart01 = that.$echarts.init(document.getElementById('Chart1'));
				let option = {
					grid: {
						top: '30%',
						left: '3%',
						right: '4%',
						bottom: '30%',
						containLabel: true
					},
					xAxis: {
						type: 'value',
						min: that.minNum,// 0 27000 70200
						max: that.maxNum, //设置X轴最大值 86400 70200 113400
						interval: that.new_interval,
						boundaryGap : true,
						axisLabel: {
							formatter: function (val) {
								val = val % (60 * 60) == 0 ? ((val / 60 / 60 > 24 ? (val / 60 / 60 - 24) : val / 60 / 60) + ":00") : ((parseInt(val / 60 / 60) > 24 ? (parseInt(val / 60 / 60) - 24+ ":" + (val % (60*60)/60)) : (parseInt(val / 60 / 60)) + ":" + (val % (60*60)/60)));
								return val;
							}
						}
						
					},
					yAxis: {
						type: 'category',
						axisLine: {
							onZero: false // y轴是否在x轴0刻度上
						},
						boundaryGap : true,
						data: ['']
					},
					series: that.dataArr
							
				}
				Chart01.setOption(option,true,true);
			},
			chart4:function(){
				var that = this;
				let myChart4 = that.$echarts.init(document.getElementById('chart4'));
				let option4 = {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        name: '时',
                        data: that.dataArrXzhou,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '件'
                    }
                ],
                series: [
                    {
                        name: '产量',
                        type: 'bar',
                        barWidth: '60%',
                        data: that.UPH
                    }
                ]
            }
				myChart4.setOption(option4);
				
			},
			drawOne:function(){
				var that = this;
				var timeDuan = that.timedate;   
				var timeArr = that.banciValue.split("-");
				var start = that.banciBegin.split(":")[0];
				var end = timeArr[1].split(":")[0];
				var startTime,endTime;
				that.new_interval = 7200;
				if( +end >  +start){
					startTime = timeDuan + ' ' + timeArr[0];
					endTime = timeDuan + ' ' + timeArr[1];
				}else{
					var timeLongStart = new Date(timeDuan + ' 00:00:00').getTime() + 86400000;
					var timeLongEnd = new Date(timeLongStart).getFullYear() + '-' + (new Date(timeLongStart).getMonth() + 1) + '-' + new Date(timeLongStart).getDate();
					startTime = timeDuan + ' ' + timeArr[0];
					endTime = timeLongEnd + ' ' + timeArr[1];
				}
				var timeLength = Math.ceil((new Date(endTime) - new Date(startTime))/3600000) +1 ;
				var setTimeArr = [];
				for(var i = 0; i < timeLength; i++){
					var num =  +start + i;
					if(num > 24){
						num = num - 24;
					}
					setTimeArr.push(num + ':' + timeArr[0].split(":")[1]);
				}
				if(( +end <  +start)){
					end =  +start + timeLength - 1;
				}
				that.minNum = (start*60*60) + (timeArr[0].split(":")[1]*60);
				that.maxNum = (end*60*60) + (timeArr[1].split(":")[1]*60);
				if(timeArr[1].split(":")[1] == '59'){
					end = +timeArr[1].split(":")[0] + 1;
					that.maxNum = end*60*60;
					that.new_interval = 14400;
				}
				that.chart1();
			},
			drawTwo:function(){
				var that = this;
				var timeDuan = that.timedate;
				var timeArr = that.banciValue.split("-");
				var start =that.banciBegin.split(":")[0];
				var end = timeArr[1].split(":")[0];
				var startTime,endTime;
				if( +end >  +start){
					startTime = timeDuan + ' ' + timeArr[0];
					endTime = timeDuan + ' ' + timeArr[1];
				}else{
					var timeLongStart = new Date(timeDuan + ' 00:00:00').getTime() + 86400000;
					var timeLongEnd = new Date(timeLongStart).getFullYear() + '-' + (new Date(timeLongStart).getMonth() + 1) + '-' + new Date(timeLongStart).getDate();
					startTime = timeDuan + ' ' + timeArr[0];
					endTime = timeLongEnd + ' ' + timeArr[1];
				}
				var timeLength = Math.ceil((new Date(endTime) - new Date(startTime))/3600000) + 1;
				that.dataArrXzhou = [];
				for(var i = 0; i < timeLength; i++){
					var num =  +start + i;
					if(num > 24){
						num = num - 24;
					}
					that.dataArrXzhou.push(num + ':' + timeArr[0].split(":")[1]);
				}
				that.chart4();
			},
			openCircleRun:function(startPot, endPot, ctx) {//开机时间的圆
				var that = this;
				var windowWidth = that.windowWidth;
				var deg = that.deg;
				ctx.beginPath();
				ctx.arc((windowWidth * 0.25).toFixed(2), (windowWidth * 0.25).toFixed(2), (windowWidth * 0.25 - 20).toFixed(2), startPot * that.deg - 90 * deg, endPot * that.deg - 90 * that.deg);
				ctx.lineWidth = 10;
				ctx.strokeStyle = "yellow";
				ctx.stroke();
				ctx.closePath();
			},
			workCircleRun:function(startPot, endPot, ctx) { //这个是工作时间的圆
				var that = this;
				var windowWidth = that.windowWidth;
				var deg = that.deg;
				ctx.beginPath();
				ctx.arc((windowWidth * 0.25).toFixed(2), (windowWidth * 0.25).toFixed(2), (windowWidth * 0.25 - 35).toFixed(2), startPot * deg - 90 * deg, endPot * deg - 90 * deg);
				ctx.lineWidth = 10;
				ctx.strokeStyle = "green";
				ctx.stroke();
				ctx.closePath();
			},
			//故障的圆
			alarmCircle: function(Pot, ctx) {
				var that = this;
				var windowWidth = that.windowWidth;
				var deg = that.deg;
				ctx.beginPath();
				ctx.arc((windowWidth * 0.25).toFixed(2), (windowWidth * 0.25).toFixed(2), (windowWidth * 0.25 - 35).toFixed(2), Pot * deg - 90 * deg, Pot * deg - 88 * deg);
				ctx.lineWidth = 40;
				ctx.strokeStyle = "red";
				ctx.stroke();
				ctx.closePath();
			},
			informationAlarm : function (deviceid, custid, alarmTime) {//故障时间
				var that = this;
				var canvas = document.getElementById("immediatelyDeviceCanvas"),
					ctx = canvas.getContext("2d"),
					alarmString = "",
					alarmArr = alarmTime.split("$");
				for (var i = 0; i < alarmArr.length; i++) {
					var hourObj = parseInt(alarmArr[i].split(":")[0]),
						minObj = parseInt(alarmArr[i].split(":")[1]), //获得分钟
						totalTime = hourObj * 60 + minObj; //总时间
					alarmString += ("$" + totalTime);
				}
				var alarmArrTwo = alarmString.split("$");
				for (var j = 1; j < alarmArrTwo.length; j++) {
					that.alarmCircle(parseInt(alarmArrTwo[j]) * that.time, ctx);
				}
				alarmString = "";
				alarmArr = "";
			},
			//开机时间
			informationOpen : function (deviceid, custid, openTime) {
				var that = this;
				var canvas = document.getElementById("immediatelyDeviceCanvas"),
					ctx = canvas.getContext("2d"),
					openInitial = 0, //开机的初始值
					kjrArr = openTime.split("$");
				//开机
				for (var i = 1; i < kjrArr.length; i++) {
					if (kjrArr[i].slice(0, 1) == "1") {
						that.openCircleRun(openInitial * that.time, (openInitial + parseInt(kjrArr[i].slice(1, 5))) * that.time, ctx);
					}
					openInitial += parseInt(kjrArr[i].slice(1, 5));
				}
			},
			//工作时间
			informationWork:function (deviceid, custid, workTime) {
				var that = this;
				var canvas = document.getElementById("immediatelyDeviceCanvas"),
					ctx = canvas.getContext("2d"),
					workInitial = 0,
					wrArr = workTime.split("$");
				for (var i = 1; i < wrArr.length; i++) {
					if (wrArr[i].slice(0, 1) == "1") {
						that.workCircleRun(workInitial * that.time, (workInitial + parseInt(wrArr[i].slice(1, 5))) * that.time, ctx);
					}
					workInitial += parseInt(wrArr[i].slice(1, 5));
				}
			},
			initial:function(timeDate, timeNewDuan, deviceid) { //数据初始化
				var that = this;
				timeNewDuan = timeNewDuan.split("-");
				var timeSpace = Math.abs(new Date("2019-11-11 " + timeNewDuan[0]) - new Date("2019-11-11 " + timeNewDuan[1]));
				var startTime = timeDate + " " + timeNewDuan[0];
				var endTime = timeDate + " " + timeNewDuan[1];
		
				if (parseInt(timeNewDuan[0].split(":")[0]) > parseInt(timeNewDuan[1].split(":")[0])) {
					timeDate = parseInt(new Date(timeDate + " " + timeNewDuan[0]).getTime()) + parseInt(timeSpace);
					
					endTime = that.handleDate(timeDate);
				}
				var html = '';
				$("#immediatelyDeviceH5").empty();
				$("#immediatelyDeviceH5").css("margin", "18px auto");
				$("#immediatelyDeviceH5").css("height",that.windowWidth / 2);
				$("#immediatelyDeviceH5").css("width", that.windowWidth / 2);
				$("#immediatelyDeviceH5").css("background", "url(../img/drawbg2.png) no-repeat");
				$("#immediatelyDeviceH5").css("background-size", "100% 100%");
				$("#immediatelyDeviceH5").append("<canvas id='immediatelyDeviceCanvas' height='" + that.windowWidth / 2 + "' width='" + that.windowWidth / 2 + "'></canvas>");
				if (that.circleChart.opentime != "$00") {
					that.informationOpen(that.value, that.custid, that.circleChart.opentime);
					//工作时间
					if (that.circleChart.worktime != "0") {
						that.informationWork(that.value, that.custid, that.circleChart.worktime);
					}
					//故障时间
					if (that.circleChart.alarmtime != "0") {
						that.informationAlarm(that.value, that.custid, that.circleChart.alarmtime);
					}
				}
			}
		}
    }
</script>

<style lang="scss" scoped>
    .deviceMenu-deviceRunning {
        .searhs{
			span{
				font-size: 14px;
			}
		}
		.lists{
			width: 33%;
			h4{
				width: 100%;
				text-align: center;
				line-height: 40px;
			}
		}
		.lists1{
			p{
				font-size: 16px;
				line-height: 25px;
				padding: 0 10%;
				img{
					width: 100%;
					margin-top: 15px;
				}
			}
		}
		.lists2{
			.changeChart{
				width: 100%;
				display: flex;
				justify-content: space-around;
				p{
					font-size: 14px;
					padding: 8px 15px;
					color: #fff;
					background: rgb(170, 170, 170);
					border-radius: 3px;
					cursor: pointer;	
				}
			}
		}
		#chart4{
			width: 376px;
			height: 234px;
		}
		#Chart2{
			display: none;
		}
		.wu_status p {
			color: #333;
			font-size: 14px;
			display: inline-block;
			width: 45%;
		}
		.wu_status i {
			font-style:normal;
		}
		.wu_green {
			background: green;
		}

		.wu_yellow {
			background: yellow;
		}

		.wu_gray {
			background: gray;
		}

		.wu_red {
			background: red;
		}
    }
</style>