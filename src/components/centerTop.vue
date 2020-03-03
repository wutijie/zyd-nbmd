<template>
    <div class="center-top">
        <el-row class="top-one">
            <el-col class="ct-left" :span="16">
                <centerbread class="ct-left"></centerbread>
            </el-col>
            <el-col class="ct-fresh" :span="2"><span @click="reload()">刷新</span></el-col>
            <el-col class="ct-right" :span="6"><i class="iconfont icon-clock"></i>{{ nowTime }}</el-col>
        </el-row>
        <!-- <el-row>
            <el-col :span="left">
                <centerbread class="ct-left"></centerbread>
            </el-col>
            <el-col :span="right">
                <slot></slot>
            </el-col>
        </el-row> -->
    </div>
</template>

<script>
    export default {
        inject: ['reload'],
        props: {
            left: {
                type: Number,
                default: 24
            },
            right: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                title: '汽车零部件加工',
                nowTime: ''
            }
        },
        created () {
            this.changeTime();
        },
        methods: {
            changeTime() {
                this.nowTime = this.$handleTime();
                setTimeout(() => {
                    this.changeTime();
                }, 1000);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .center-top {
        line-height: 1.8rem;
        font-size: 0.8rem;
        padding-bottom: 0.3rem;
        .top-one {
            margin: 0.3rem 0;
        }
        .ct-left {
            background: #cae0e2;
            color: inherit;
            padding-left: 1rem;
        }
        .ct-fresh {
            background: #339999;
            text-align: center;
            color: #ffffff;
            cursor: pointer;
            span {
                display: block;
            }
        }
        .ct-right {
            background: #f08300;
            color: #ffffff;
            padding-left: 1rem;
            i {
                font-size: 0.85rem;
            }
        }
    }
</style>