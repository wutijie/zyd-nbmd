<template>
	<div class="lay-left item flexnone h100p">
		<div class="h100p">
			<el-menu :default-active="nowRouter" :unique-opened="true" class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose">
				
                <el-submenu v-for="(item, index) in routes" :key="index" :index="item.name" :class="{ menuItemGroupActive : nowRouterParent == item.name }">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>{{ item.meta.title }}</span>
					</template>
					<el-menu-item-group class="lay-group-title">
						<el-menu-item v-for="(item2, index2) in item.children" :key="index2" :index="item2.path">{{ item2.meta.title }}</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
                
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
            // console.log(this.$store.state.user.sidebarRoutes);
            
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
            }
        }
		
	}
</script>

<style lang="scss">
	.lay-left {
		width: 9rem;
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
            ul li ul .el-menu-item {
                padding-left: 50px!important;
            }

            .el-submenu__title,
            .el-menu-item {
                color: rgba(255, 255, 255, 0.8);
                border-left: 3px solid transparent;
            }
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