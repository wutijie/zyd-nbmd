<template>
    <div class="w-tree">
        <el-tree :data="data" :show-checkbox="showCheckbox" node-key="id" default-expand-all :expand-on-click-node="false" :default-checked-keys="defaultChecked" @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                    <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>
                    <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
                </span>
            </span>
        </el-tree>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showCheckbox: true,
                defaultChecked: [5],
                nowClick: {},
                data: [
                    {
                        id: 5,
                        label: '设备数据',
                        children: [
                            {
                                id: 5,
                                label: '基础信息'
                            },
                            {
                                id: 6,
                                label: '设备运行'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            getTreeData() {
                this.data = [
                    {
                        id: 1,
                        label: '一级 1',
                    }
                ]
            },
            append(data) {
                // console.log(data);
                
                // const newChild = { id:  +id++, label: 'testtest', children: [] };
                // if (!data.children) {
                //     this.$set(data, 'children', []);
                // }
                // data.children.push(newChild);
            },
            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            handleNodeClick(data, vnode) {
                // console.log(data);
                if(this.showCheckbox) {
                    this.nowClick = data;
                    if(vnode.level == 1){
                        // console.log('主菜单');
                        // this.nowClick = {};
                    }
                    this.$emit('getNowClick', this.nowClick);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .w-tree {
        .custom-tree-node {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
        }
    }
</style>