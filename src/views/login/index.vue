<template>
    <div>
        <el-row>
            <el-input v-model="username" placeholder=""></el-input>
        </el-row>
        <el-row>
            <el-input v-model="passwords" placeholder=""></el-input>
        </el-row>
        <el-button type="success" @click="login">登录</el-button>
    </div>
</template>

<script>
    // import { mapState, mapActions } from 'vuex'

    export default {
        data() {
            return {
                // 用户名
                username: '123',
                // 密码
                passwords: 'asd'
            }
        },
        created () {
            // let data = await getMsg();
            // console.log(data);
            // let detail = await getDetail({custid: '000018'});
            // console.log(detail);
        },
        methods: {
            // ...mapActions(['user/login']),
            login() {
                this.$store.dispatch("user/handleLogin", {username: this.username,pass: this.passwords})
                    .then( () => {
                        // 
                        this.$router.push('/');
                    }).catch(err => {
                        this.$router.push('/login');
                        // console.log(err)
                    })
            }
        },
        computed: {
            // ...mapState('user', ['isLogin'])
        },
    }
</script>

<style lang="scss" scoped>

</style>