<template>
    <div>
        <h1>{{ menuData.label }}</h1>
        <el-form v-if="JSON.stringify(menuData) != '{}'" :model="menuData" status-icon :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="">
                <el-radio-group v-model="menuData.type">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="定制"></el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="menuData.type == '定制'" label="客户号">
                <el-input v-model="menuData.custId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="菜单标题">
                <el-input v-model="menuData.label" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="组件内容">
                <el-select v-model="menuData.components" multiple placeholder="请选择">
                    <el-option v-for="item in $store.state.admin.allComponents" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单链接">
                <el-input v-model="menuData.link" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: {
            nowClick: {
                type: Object
            }
        },
        data() {
            return {
                // menuData: JSON.parse(JSON.stringify(this.nowClick)),
                menuData: {},
                rules: {
                    label :[
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ]
                }
            }
        },
        watch: {
            nowClick: {
                // immediate: true,
                handler(newValue, oldValue) {
                    // console.log(newValue);
                    this.menuData = {
                        ...newValue,
                        type: '全部'
                    };
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>