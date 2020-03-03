<template>
	<div class="lay-left item flexnone h100p">
		<div class="h100p">
			<el-menu :default-active="nowRouter" :unique-opened="true" class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose" @select="handleSelect">
				<div v-for="(item, index) in routes" :key="index">
                    <!-- 二级 -->
                    <el-submenu v-if="item.children && item.children.length > 0" :index="item.name" :class="{ menuItemGroupActive : nowRouterParent == item.name }">
                        <template slot="title">
                            <i class="iconfont" :class="item.meta.iconClass"></i>
                            <span>{{ item.meta.title }}</span>
                            <el-badge :hidden="item.meta.mark == 0" class="mark" :value="item.meta.mark" />
                        </template>
                        <el-menu-item-group class="lay-group-title">
                            <div v-for="(item2, index2) in item.children" :key="index2">
                                <el-menu-item v-if="!item2.children || (item2.children && item2.children.length == 0)" :index="item2.path">
                                    {{ item2.meta.title }}<el-badge :hidden="item2.meta.mark == 0" class="mark" :value="item2.meta.mark" />
                                </el-menu-item>
                            </div>
                        </el-menu-item-group>
                        <!-- 三级 -->
                        <div v-for="(item2, index2) in item.children" :key="index2">
                            <el-submenu v-if="item2.children && item2.children.length > 0" :index="item2.name">
                                <template slot="title">{{ item2.meta.title }}</template>
                                <div v-for="(item3, index3) in item2.children" :key="index3">
                                    <el-menu-item :index="item3.path">{{ item3.meta.title }}</el-menu-item>
                                </div>
                            </el-submenu>
                        </div>
                    </el-submenu>
                    <!-- 一级 -->
                    <el-menu-item v-else :index="item.path" :class="{ menuItemGroupActive : nowRouterParent == item.name }">
                        <i class="iconfont" :class="item.meta.iconClass"></i>
                        <span slot="title">{{ item.meta.title }}</span>
                    </el-menu-item>

                </div>
                
                <!-- <el-submenu index="1" :class="{ menuItemGroupActive : nowRouterParent == 1 }">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>导航一</span>
					</template>
					<el-menu-item-group class="lay-group-title">
						<el-menu-item index="/first">选项1</el-menu-item>
						<el-menu-item index="/two">选项2</el-menu-item>
					</el-menu-item-group>
				</el-submenu> -->
			</el-menu>
		</div>
	</div>
</template>

<script>
	export default {
        data() {
            return {
                isChange: 1
            }
        },
        created () {
            // console.log(this.$store.state);
            // setTimeout(() => {
            //     console.log(this.$store.state.user.sidebarRoutes);
            // }, 1000)
            
        },
        computed: {
            nowRouter() {
                return this.$route.fullPath;
            },
            nowRouterParent() {
                return this.$route.meta.parentName;
            },
            routes() {
                return this.$store.state.user.sidebarRoutes;
            }
        },
		methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key);
                // console.log(this.routes);
                let allRoult = [];
                this.routes.forEach( (item, index) => {
                    item.children.forEach( (item2, index2) => {
                        allRoult.push(item2);
                    })
                })
                let nowSelect = allRoult.find( result => {
                    return result.path == key;
                })
                console.log(nowSelect);
                let nowPush = this.$store.getters.clickRoutes.find( result => {
                    return result.path == key;
                })
                console.log(nowPush);
                if(!nowPush){
                    this.$store.commit('user/SET_CLICKROUTES', nowSelect);
                }
                console.log(this.$store.getters.clickRoutes);
            },
        }
		
	}
</script>

<style lang="scss">
	.lay-left {
		width: 9rem!important;
		overflow: hidden;
		>div {
			width: 10rem;
			overflow-y: scroll;
            .el-menu {
                width: 9rem;
                min-height: 100%;
            }
            .lay-group-title {
                >div {
                    padding: 0!important;
                }
            }
            ul li ul .el-menu-item,
            ul li ul .el-submenu__title {
                padding-left: 50px!important;
            }

            .el-submenu__title,
            .el-menu-item {
                color: rgba(255, 255, 255, 0.8);
                border-left: 3px solid transparent;
            }
            .el-menu-item i,
            .el-submenu__title i {
                color: #fff
            }
            .el-submenu__title,
            .el-menu-item {
                font-size: 0.8rem;
            }
            .el-submenu__title:hover,
            .el-menu-item:focus,
            .el-menu-item:hover {
                color: #fff;
                /*border-left: 3px solid #fff;*/
                background: #179397;
            }
            .el-menu-item.is-active {
                color: #fff;
                border-left: 3px solid #fff;
                background: #179397;
            }
            >ul {
                border-right: none;
                background: #50a9b5;
            }
            >ul ul {
                background: #179397;
                overflow: hidden;
            }
            .menuItemGroupActive {
                background: #179397;
                .el-submenu__title {
                    border-left: 3px solid #fff;
                }
            }
		}
	}
</style>