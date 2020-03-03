<template>
    <div class="lay-main item h100p pr">
        <!-- 组件内容 -->
        <centertop></centertop>
        <div v-if="!iframeSrc" class="lay-main-view bsbb" :class="{ 'lay-main-view-close' : isClose }">
            <component v-for="item in nowComponents" :key="item" :is="item"></component>
        </div>
        <!-- 自定义链接内容 -->
        <div v-else class="lay-main-iframe">
            <iframe :src="iframeSrc" frameborder="0"></iframe>
        </div>
        <div v-if="!isClose" class="lay-main-bottom">
            <i class="iconfont icon-laba centerv icon-left"></i>
            <marquee>{{ alarmContent }}</marquee>
            <i class="el-icon-close centerv icon-right" @click="handleClose"></i>
        </div>
    </div>
</template>

<script>
    import { alarmgetAlarmRecord } from '../api/alarmData.js'
    export default {
        data() {
            return {
                isClose: false,
                alarmContent: ''
            }
        },
        computed: {
            // 自定义链接
            iframeSrc() {
                return this.$route.meta.iframeSrc;
            },
            // 组件名称
            nowComponents() {
                return this.$route.meta.components;
            }
        },
        beforeUpdate(){
            // console.log(this.$route);
        },
        created () {
            // console.log(this.$route);
            this.getInit();
        },
        methods: {
            handleClose() {
                this.isClose = true;
            },
            getInit() {
                alarmgetAlarmRecord({
                    type: 2
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.alarmContent = '';
                        res.data.alarmRecordData.forEach( (item, index) => {
                            item.arStartTime = item.arStartTime ? this.$handleTime(item.arStartTime) : item.arStartTime;
                            item.arType = item.arType == 1 ? '设备' : '模具';
                            item.arSource == 1 && (item.arSource = '触屏');
                            item.arSource == 2 && (item.arSource = 'BOX');
                            item.arSource == 3 && (item.arSource = 'WEB');
                            item.arSource == 4 && (item.arSource = 'API');
                            this.alarmContent += item.arType + ' ' + item.arStartTime + ' ' + item.arSource + ' ' + item.atName + ' ' + item.arShowContent + ' --------------------- '
                        })
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .lay-main {
        /*background-color: #00f;*/
        /*overflow: hidden;*/
        .lay-main-view {
            height: calc(100% - 4.2rem);
            overflow-y: scroll;
            position: relative;
        }
        .lay-main-view-close {
            height: calc(100% - 2.7rem);
        }
        .lay-main-iframe {
            height: calc(100% - 4.2rem);
        }
        iframe {
            width: 100%;
            height: 100%;
        }
        .lay-main-bottom {
            height: 1.4rem;
            line-height: 1.4rem;
            background: #F56C6C;
            color: #fff;
            font-size: 0.7rem;
            position: relative;
            .icon-left {
                left: 0.5rem;
            }
            .icon-right {
                right: 0.5rem;
                cursor: pointer;
            }
            marquee {
                margin: 0 2rem;
                height: 100%;
            }
        }
    }
</style>