<template>
    <li draggable="true" @dragstart="handleDragStart($event, index)" @drag="handleDrag" @dragend="handleDragEnd">
        <slot></slot>
    </li>
</template>

<script>
    export default {
        props: ['index'],
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
        }
    }
</script>

<style lang="scss" scoped>
    .create-component li {
        width: 50%;
        text-align: center;
        height: 50px;
        background-color: aquamarine;
        margin: 10px 0;
    }
</style>