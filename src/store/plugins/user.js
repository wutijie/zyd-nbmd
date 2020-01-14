export default store => {
    // 初始化时从localStorage获取数据
    if (sessionStorage) {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            store.commit('user/login', {userName: user.userName, addRouters: user.addRouters});
        }
    }
    // 用户状态发生变化时缓存之
    store.subscribe((mutation, state) => {
        // if (mutation.type.startsWith('user/')) {
        if (mutation.type === 'user/login') {
            sessionStorage.setItem('user', JSON.stringify(state.user));
        } else if (mutation.type === 'user/logout') {
            sessionStorage.removeItem('user');
        }
    })
}