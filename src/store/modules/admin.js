export default {
    namespaced: true,
    state: {
        // 所有可选组件
        allComponents: [],
        // 占位框
        placeBoxStatues: false,
        // 所有一级菜单
        menuLevelOne: [],
        // 所有二级菜单
        menuLevelTwo: [],
        // 所有一级组织
        organLevelOne: [],
        // 所有二级组织
        organLevelTwo: [],
        // 权限列表
        powerLists: [],
    },
    mutations: {
        SET_ALLCOMPONENTS(state, components) {
            state.allComponents = components;
        },
        SET_PLACEBOXSTATUS(state, bool) {
            state.placeBoxStatues = bool;
        },
        SET_MENULEVELONE(state, menu) {
            state.menuLevelOne = menu;
        },
        SET_MENULEVELTWO(state, menu) {
            state.menuLevelTwo = menu;
        },
        SET_ORGANLEVELONE(state, organ) {
            state.organLevelOne = organ;
        },
        SET_ORGANLEVELTWO(state, organ) {
            state.organLevelTwo = organ;
        },
        SET_POWERLISTS(state, power) {
            state.powerLists = power;
        }
    }
}