<template>
    <div class="target-wrap">
        <div ref="targetArea" class="target-area" @dragenter="handleDragEnter" @dragover="handleDragOver" @dragleave="handleDragLeave" @drop="handleDragDrop">
            <div v-show="$store.getters.placeBoxStatues" ref="placeBox" class="place-box bsbb"></div>
        </div>
        <div ref="replaceComponent" class="dn">
            <ReplaceItem></ReplaceItem>
        </div>
    </div>
</template>

<script>
    import ReplaceItem from './replaceItem.vue'
    export default {
        components: {
            ReplaceItem,
        },
        methods: {
            // 目标源
            handleDragEnter(ev){
                // console.log('目标进入', ev);
                // 阻止默认
                ev.preventDefault();
                // this.placeBoxStatues = true;
                this.$store.commit('admin/SET_PLACEBOXSTATUS', true);
            },
            handleDragOver(ev){
                // console.log('目标拖拽中', ev, ev.target, ev.target.dataset);
                // 阻止默认
                ev.preventDefault();
                let targetEv = ev.target;
                // console.log(ev.target)
                // 目标处于默认源 或者 多栏源中
                if(targetEv.className == 'double-area' || targetEv.className == 'target-area'){
                    targetEv.appendChild(this.$refs.placeBox);
                    return;
                }
                // 目标不在默认源 或者 多栏源中
                if(targetEv.className != 'place-box bsbb' && targetEv.className != 'target-area'){
                    while (!targetEv.dataset.replace) {
                        targetEv = targetEv.parentNode;
                    }
                    let itOffsetTop = targetEv.offsetTop;
                    if(itOffsetTop == 0){
                        itOffsetTop = targetEv.parentNode.parentNode.parentNode.offsetTop;
                    }
                    // 相差高度
                    let differHeight = ev.clientY - 70 - itOffsetTop;
                    // 一半的高度
                    let halfHeight = targetEv.offsetHeight / 2;

                    // console.log(ev.clientY, targetEv.offsetTop, differHeight, halfHeight);
                    // console.log(differHeight, halfHeight)
                    // 鼠标在目标上半区域
                    if(differHeight < halfHeight){
                        // console.log('鼠标在目标上半区域')
                        // console.log(targetEv)
                        targetEv.parentNode.insertBefore(this.$refs.placeBox, targetEv);
                    }
                    // 鼠标在目标下半区域
                    if(differHeight > halfHeight){
                        // console.log('鼠标在目标下半区域')
                        targetEv.parentNode.insertBefore(this.$refs.placeBox, targetEv.nextElementSibling);
                    }
                }
                
            },
            handleDragLeave(ev){
                // console.log('目标离开', ev);
                // 阻止默认
                ev.preventDefault();
            },
            handleDragDrop(ev){
                // console.log('目标停止', ev);
                // 阻止默认
                ev.preventDefault();
                let targetEv = ev.target;
                // 获取拖动的目标
                let index = ev.dataTransfer.getData('index');
                // 进入占位框
                if(targetEv.className == 'place-box bsbb'){
                    // 多栏
                    // while (targetEv.className != 'double-area') {
                    //     targetEv = targetEv.parentNode;
                    // }
                    if(targetEv.parentNode.className == 'target-area' || targetEv.parentNode.className == 'double-area'){
                        targetEv = targetEv.parentNode;
                    }
                }else{
                    // 不是占位框
                    // 是否存在className属性,不存在添加默认
                    if(!targetEv.className){
                        targetEv.className = '';
                    }
                    // console.log(targetEv.className)
                    // 判断目标处于默认源 还是 多栏源中
                    if(targetEv.className != 'target-area'){
                        // console.log(!targetEv.className && targetEv.className != 'double-area')

                        while (targetEv.className != 'double-area') {
                            if(!targetEv.parentNode.className){
                                targetEv.parentNode.className = '';
                            }
                            if(targetEv.parentNode.className == 'target-wrap'){
                                break;
                            }else{
                                targetEv = targetEv.parentNode;
                            }
                            // console.log(targetEv)
                        }
                    }
                }

                // console.log(targetEv)
                // 克隆替换目标的组件
                let cloneDv = '';
                // console.log(window.cloneComponent)
                if(!index){
                    cloneDv = window.cloneComponent;
                }else{
                    cloneDv = this.$refs.replaceComponent.children[0].children[index].cloneNode(true);
                }
                // console.log(cloneDv)
                // 添加移除事件
                this.createClose(cloneDv);
                // 添加样式事件
                this.addStyle(cloneDv);
                // 替换目标为对应组件
                if(!index){
                    targetEv.replaceChild(cloneDv, this.$refs.placeBox);
                }else{
                    targetEv.insertBefore(cloneDv, this.$refs.placeBox);
                }
                // if(targetEv.className == 'double-area'){
                // }else{
                //     // console.log(targetEv);
                //     targetEv.insertBefore(cloneDv, this.$refs.placeBox);
                // }
                // 初始化占位框
                this.$refs.targetArea.appendChild(this.$refs.placeBox);
                // this.$refs.targetArea.replaceChild(this.$refs.replaceComponent.children[index], this.$refs.placeBox);
                // this.placeBoxStatues = false;
                this.$store.commit('admin/SET_PLACEBOXSTATUS', false);
                window.cloneComponent = null;
            },
            createClose(node){
                // 克隆组件移除事件
                let closeDv = document.createElement('span');
                closeDv.innerHTML = 'X';
                closeDv.className = 'close-span';
                node.appendChild(closeDv);
                closeDv.onclick = function(){
                    this.parentNode.parentNode.removeChild(this.parentNode);
                }
            },
            addStyle(node){
                let that = this;
                // 克隆组件样式
                node.onclick = function(){
                    // console.log(this)
                    // console.log(that)
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .target-wrap {
        height: 100%;
    }
</style>