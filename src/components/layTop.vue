<template>
    <div class="lay-top pr">
        <p class="center">顶部</p>
        <el-button class="fr" type="primary" @click="logout">退出</el-button>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        methods: {
            ...mapActions(["user/handleLogout"]),
            logout(){
                this["user/handleLogout"]().then( () => {
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
    }
</style>