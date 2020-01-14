<template>
    <div class="add-flies center">
        <el-input v-model="fileName" placeholder="请输入新建文件夹的名称">
            <el-button slot="append" type="primary" @click="addFiles">新建</el-button>
        </el-input>
        <el-divider></el-divider>
        <el-alert :title="alertTitle" :description="alertContent" type="success"></el-alert>
    </div>
</template>

<script>
    import { buildDir } from '@/api/file.js'
    export default {
        data() {
            return {
                fileName: null,
                ismkdir: null,
                alertTitle: "新建文件夹的根目录为 src/views/layouy/",
                alertContent: "例：新建文件夹的名称为 'test' ，会在 'src/views/layouy/' 下生成 'test' 这个目录，目录中包括空的component文件夹及index.vue文件"
            }
        },
        methods: {
            async addFiles() {
                if(this.fileName){
                    this.ismkdir = await buildDir(this.fileName.replace(/\//g, '98987'));
                    this.ismkdir = this.ismkdir.status;
                    // console.log(this.ismkdir);
                    if(this.ismkdir == "change:ok"){
                        this.$message({
                            message: "创建成功！",
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: this.ismkdir,
                            type: 'error'
                        });
                    }
                }else{
                    this.$message({
                        message: '请填写新建文件夹名称',
                        type: 'error'
                    });
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>