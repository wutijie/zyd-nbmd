<template>
    <div>
        {{ nowClick }}
        <el-divider></el-divider>
        {{ menuData }}
        <el-form :model="menuData" status-icon :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="标题" prop="label">
                <el-input v-model="menuData.label" autocomplete="off"></el-input>
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
                menuData: JSON.parse(JSON.stringify(this.nowClick)),
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
                    this.menuData = JSON.parse(JSON.stringify(newValue));
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>