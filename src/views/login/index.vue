<template>
	<div>
		<el-row class="full flex-grail">
			<el-row class="login-wrap main" :style="{'background-image': 'url(' + bggImg + ')'}">
				<el-row class="login-left">
					<p class="login-zyd"><img src="../../assets/zyd.png" ondragstart="return false;" /></p>
					<p class="login-ground"><img src="../../assets/ground.png" ondragstart="return false;" /></p>
					<p>从数据采集分析走向数字化智能化</p>
				</el-row>
				<el-row class="login-right" :style="{'background-image': 'url(' + loginRightImg + ')'}">
					<el-row class="login-bg">
						<img src="../../assets/login_bg.png" />
					</el-row>
					<el-row class="login-text">
						<h3>登录账号</h3>
						<p class="box">
							<span class="item flexnone"><img src="../../assets/phone.png" alt="username" ondragstart="return false;"/></span>
							<el-input type="text" class="item" v-model="login_username" placeholder="请输入账号" ></el-input>
						</p>
						<p class="box">
							<span class="item flexnone"><img src="../../assets/psw.png" alt="password" ondragstart="return false;"/></span>
							<el-input type="password" class="item" v-model="login_password" placeholder="请输入密码" ></el-input>
						</p>
						<p class="box loginBtn" @click="handleLogin">立即登录</p>
					</el-row>
					<el-row class="login-bg login-bg-bottom">
						<img src="../../assets/login-2.png" ondragstart="return false;" />
					</el-row>
				</el-row>
				<img src="../../assets/login_bottom.png" class="login-bottom" ondragstart="return false;" />
			</el-row>
		</el-row>
	</div>
</template>

<script>
	// import { mapState, mapActions } from 'vuex'
	// import { getHome } from '../../api/user.js'
	export default {
		data() {
			return {
				// 用户名
				login_username: '13501747179',
				// 密码
				login_password: '123456',
				bggImg: require('../../assets/bgg.jpg'),
				loginRightImg: require('../../assets/login-right.png')
			}
		},
		created() {
			// getHome().then( res => {
			// 	console.log(res)
			// }).catch( err => {
			// 	console.log(err)
			// })

			// let data = await getMsg();
			// console.log(data);
			// let detail = await getDetail({custid: '000018'});
			// console.log(detail);
		},
		methods: {
			handleLogin() {
				// if(this.login_username === "") {
				// 	alert("账号不能为空！");
				// 	return;
				// }

				// if(this.login_password === "") {
				// 	alert("密码不能为空！");
				// 	return;
				// }
				this.$store.dispatch("user/handleLogin", {
						login_username: this.login_username,
						login_password: this.login_password
					})
					.then(() => {
						// 
						this.$router.push('/');
					}).catch(err => {
						this.$router.push('/login');
						// console.log(err)
					})
			}
		},
		computed: {
			// ...mapState('user', ['isLogin'])
		},
	}
</script>

<style lang="scss" scoped>
	.el-input__inner{border:none !important;}
	.login-wrap {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		overflow: hidden;
		background-repeat: no-repeat;
		background-size: cover;
		padding-top: 20vh;
		display: flex;
		justify-content: space-around;
		.login-left {
			width: 130%;
			text-align: center;
			p {
				color: #fff;
				letter-spacing: 5px;
			}
			.login-zyd {
				margin-bottom: 5vh;
				img {
					width: 10rem;
				}
			}
			.login-ground {
				img {
					width: 25rem;
				}
			}
		}
		.login-right {
			width: 100%;
			height: 100%;
			background: no-repeat center center;
			background-size: auto 100%;
			position: relative;
			.login-bg {
				img {
					width: 21rem;
				}
			}
			.login-text {
				position: absolute;
				top: 6rem;
				left: 0;
				width: 21rem;
				text-align: center;
				color: #fff;
				h3 {
					margin-bottom: 1rem;
					font-size: 1.5rem;
				}
				.box {
					width: 60%;
					margin: 0 auto;
					background: #fff;
					box-sizing: border-box;
					padding: 0.25rem 0.5rem;
					margin-bottom: 0.8rem;
					span img {
						width: 1rem;
						margin-right: 0.5rem;
					}
					input {
						font-size: 0.8rem;
						border: none;
					}
					span{
						img{
							vertical-align: -webkit-baseline-middle;
						}
					}
				}
				.forgetpsw {
					display: inline-block;
					color: #fff;
					text-align: right;
					font-size: 0.8rem;
					background: transparent;
				}
				.loginBtn {
					display: inline-block;
					background: #fdc501;
					color: #000;
					padding-top: 0.5rem;
					padding-bottom: 0.5rem;
					text-align: center;
					margin-top: 1rem;
					cursor: pointer;
				}
			}
			.login-bg-bottom {
				width: 400px;
				text-align: center;
				img {
					width: 11rem;
					margin-top: -2.5rem;
				}
			}
		}
		.tit {
			text-align: center;
			padding-top: 5%;
			font-size: 2.8rem;
			letter-spacing: 0.5rem;
			font-weight: bold;
			color: white;
			margin-top: 1rem;
		}
		.login {
			margin: 2.5rem auto;
			width: 25rem;
			p {
				margin-top: 0.5rem;
			}
			input {
				height: 2.5rem;
				font-size: 0.8rem;
				color: #ccc;
				padding: 0 1.2rem;
				margin-left: 0.5rem;
				border-bottom: 1px solid #ccccff;
				border: none;
			}
			.btn {
				text-align: center;
				padding: 0 2rem;
				margin-top: 5rem;
				button {
					width: 8rem;
					height: 2.6rem;
					color: #fff;
					border: 2px solid #ccccff;
					-webkit-border-radius: 2.8rem;
					-moz-border-radius: 2.8rem;
					border-radius: 2.8rem;
					margin-bottom: 2.5rem;
				}
				span {
					color: #ccc;
					font-size: 0.9rem;
					letter-spacing: 2px;
				}
				img {
					width: 6.5rem;
					position: absolute;
					bottom: 0;
					right: -6.5rem;
					display: none;
				}
				.down_app {
					&:hover img {
						display: block;
					}
				}
			}
		}
		.login-bottom {
			width: 95%;
			position: fixed;
			bottom: 0;
			left: 2.5%;
		}
	}
</style>