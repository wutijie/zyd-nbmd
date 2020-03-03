<template>
    <div class="lay-top pr">
        <h1 class="center">{{ $store.getters.company }}</h1>
        <img src="../assets/show_logo.png" class="centerv" alt="">
        <div class="top-right">
            <span>欢迎</span>
            <b>|</b>
            <span>{{ $store.getters.custName }}<i class="iconfont icon-ren"></i></span>
            <span class="top-out" @click="logout">退出<i class="iconfont icon-out"></i></span>
        </div>
        <!-- <el-button class="fr" type="primary" @click="logout">退出</el-button> -->
    </div>
</template>

<script>
    // import { mapGetters, mapActions } from 'vuex'
    export default {
        created () {
            // console.log(this.$store.getters);
        },
        methods: {
            // ...mapActions(["user/handleLogout"]),
            logout(){
                this.$store.dispatch('user/handleLogout').then( () => {
                    this.$router.push('/login');
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .lay-top {
        height: 3rem;
        background: #d1d1d1;
        line-height: 3rem;
        font-size: 0.8rem;
        color: #414141;
        img {
            height: 1.5rem;
            left: 1rem;
        }
        h1 {
            font-size: 1.2rem;
            line-height: 1;
        }
        .top-right {
            position: absolute;
            right: 0;
            span {
                margin: 0 0.5rem;
            }
            .top-out {
                margin-left: 1rem;
                margin-right: 3rem;
                cursor: pointer;
            }
            i {
                margin: 0 0.5rem;
                font-size: 1rem;
            }
        }
    }
</style>