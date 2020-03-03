import Vue from 'vue'
import store from '../store'

// views
const requireViews = require.context(
    // 其组件目录的相对路径
    '@/views',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /\w+\.vue$/
)
let components = [];
requireViews.keys().forEach(fileName => {
    // 获取组件配置
    const viewsConfig = requireViews(fileName);
    // console.log(fileName)
    if(fileName.split('/')[2] != 'index.vue'){
        fileName = fileName.replace('./layout/', '');
    }
    // console.log(fileName)
    const viewsName = fileName.replace(/\.\/|\/index\.vue/g, '').replace(/\//g, '-').toLowerCase();
    // console.log(viewsName, '*****************')
    // console.log(viewsName.indexOf('.vue'), viewsName.indexOf('.vue') != '-1', '*****************')
    // console.log('---------------------------------------')
    if(viewsName.indexOf('.vue') != '-1'){
        return;
    }
    components.push(viewsName);
    // 全局注册组件
    Vue.component(
        viewsName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        viewsConfig.default || viewsConfig
    )
})
// components
const requireComponents = require.context(
    // 其组件目录的相对路径
    '@/components',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /\w+\.vue$/
)
requireComponents.keys().forEach(fileName => {
    // 获取组件配置
    const componentsConfig = requireComponents(fileName);
    const componentsName = fileName.replace(/\.\/|\.vue/g, '').toLowerCase();
    // console.log(componentsName)
    components.push(componentsName);
    // 全局注册组件
    Vue.component(
        componentsName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentsConfig.default || componentsConfig
    )
})
store.commit('admin/SET_ALLCOMPONENTS', components);