<template>
	<div>
		<el-container>
			<el-header style="background-color: #2c70c1;">
				<el-row style="float: left;">
					<el-col :span="1/2"> <img src="../../assets/icon/logo.png" style="margin: 10px auto;"></el-col>
					<el-col :span="4"> <span style="font-size: 25px;color: #FFFFFF;margin-left: 20px;line-height: 60px;white-space: nowrap;"><b>新职通</b></span></el-col>
				</el-row>
				<el-button type="text" @click="exit" style="float: right;margin-left: 15px;">
					<i class="iconfont icon-tuichu" style="font-size: 25px;line-height: 40px;color: #FFFFFF;"></i>
					<span style="color: #FFFFFF;font-size: 15px;margin-left: 5px;">退出</span>
				</el-button>
			
			</el-header>
			<el-container>
				<el-aside style="width: 140px;text-align: center;">
					<el-menu :default-active="$route.path" class="el-menu-vertical-demo" router >
						<el-menu-item index="/home/zixun">
							<i class="iconfont icon-zixun" style="font-size: 35px;"></i>
							<div slot="title" style="line-height: 20px;">资讯管理</div>
						</el-menu-item><br>
						<el-menu-item index="/home/kecheng">
							<i class="el-icon-date " style="font-size: 35px;"></i>
							<div slot="title" style="line-height: 20px;">课程管理</div>
						</el-menu-item><br>
						<el-menu-item index="/home/tiku">
							<i class="iconfont icon-tiku" style="font-size: 35px;"></i>
							<div slot="title" style="line-height: 20px;">题库管理</div>
						</el-menu-item><br>
						<el-menu-item index="/home/xiaoxi">
							<i class="iconfont icon-xiaoxi" style="font-size: 35px;"></i>
							<div slot="title" style="line-height: 20px;">消息管理</div>
						</el-menu-item><br>
						<el-menu-item index="/home/fankui">
							<i class="iconfont icon-fankuiliebiao-" style="font-size: 35px;"></i>
							<div slot="title" style="line-height: 20px;">用户反馈</div>
						</el-menu-item><br>
						<el-menu-item index="/home/zhaoping">
							<i class="iconfont icon-Group" style="font-size: 35px;"></i>
							<div slot="title" style="line-height: 20px;">招聘管理</div>
						</el-menu-item>
					</el-menu>
				</el-aside>
				<el-main style="background-color: #F1F1F1;">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			
			}
		},
		 methods: {
			exit(){
				localStorage.setItem('Authorization', '');
				localStorage.setItem('loginid', '');
				localStorage.setItem('phone', '');
				localStorage.setItem('password', '');
				this.$router.push({path:'/'})

			}
    },
	mounted() {
	
	}
	}
</script>

<style>
	.el-menu-item,
	.el-submenu__title {
		height: auto !important;
		width: 140px;
		margin: 10px 0px;
	}
</style>
