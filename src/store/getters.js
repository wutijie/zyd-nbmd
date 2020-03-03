const getters = {
    // user
    token: state => state.user.token,
    company: state => state.user.company,
    userName: state => state.user.userName,
    custName: state => state.user.custName,
    custId: state => state.user.custId,
    cId: state => state.user.cId,
    custPowers: state => state.user.custPowers,
    routes: state => state.user.routes,
    addRoutes: state => state.user.addRoutes,
    sidebarRoutes: state => state.user.sidebarRoutes,
    clickRoutes: state => state.user.clickRoutes,
    // admin
    allComponents: state => state.admin.allComponents,
    placeBoxStatues: state => state.admin.placeBoxStatues,
    menuLevelOne: state => state.admin.menuLevelOne,
    menuLevelTwo: state => state.admin.menuLevelTwo,
    organLevelOne: state => state.admin.organLevelOne,
    organLevelTwo: state => state.admin.organLevelTwo,
    powerLists: state => state.admin.powerLists,
}
export default getters