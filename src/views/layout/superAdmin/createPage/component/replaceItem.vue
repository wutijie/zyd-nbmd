<template>
    <ul class="replace-component">
        <li data-replace="0" draggable="true" onDragStart="event.stopPropagation();window.cloneComponent = this;setTimeout( () => {this.parentNode.removeChild(this)}, 0)">
            <el-button type="primary">按钮</el-button>
        </li>
        <li data-replace="1" draggable="true" onDragStart="event.stopPropagation();window.cloneComponent = this;setTimeout( () => {this.parentNode.removeChild(this)}, 0)">
            <img draggable="false" src="@/assets/logo.png" alt="">
        </li>
        <li data-replace="2" draggable="true" onDragStart="event.stopPropagation();window.cloneComponent = this;setTimeout( () => {this.parentNode.removeChild(this)}, 0)">
            <el-input placeholder="搜索"></el-input>
        </li>
        <li data-replace="3" draggable="true" onDragStart="event.stopPropagation();window.cloneComponent = this;setTimeout( () => {this.parentNode.removeChild(this)}, 0)">
            <el-row :gutter="10">
                <!-- <el-col class="min-h" :span="12"></el-col> -->
                <DoubleColumn :span="12"></DoubleColumn>
                <DoubleColumn :span="12"></DoubleColumn>
            </el-row>
        </li>
        <li data-replace="4" draggable="true" onDragStart="event.stopPropagation();window.cloneComponent = this;setTimeout( () => {this.parentNode.removeChild(this)}, 0)">
            <el-row :gutter="10">
                <!-- <el-col class="min-h" :span="12"></el-col> -->
                <DoubleColumn :span="8"></DoubleColumn>
                <DoubleColumn :span="8"></DoubleColumn>
                <DoubleColumn :span="8"></DoubleColumn>
            </el-row>
        </li>
    </ul>
</template>

<script>
    import DoubleColumn from './doubleColumn.vue'
    export default {
        components: {
            DoubleColumn,
        },
        methods: {
            // 目标
            handleDragStart(ev, index){
                // console.log('拖拽开始', ev);
                ev.dataTransfer.setData("index", index);
            },
            handleDrag(ev){
                // console.log('拖拽中', ev);
            },
            handleDragEnd(ev){
                // console.log('拖拽结束', ev);
                // this.placeBoxStatues = false;
                this.$store.commit('admin/SET_PLACEBOXSTATUS', false);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .replace-component li {
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none
    }
</style>