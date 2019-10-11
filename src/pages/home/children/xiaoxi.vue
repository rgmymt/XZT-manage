<template>
	<div class="zixunpage">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px;background-color: #FFFFFF;margin-bottom: 40px;">
			<el-breadcrumb-item>后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>消息管理</el-breadcrumb-item>
			<el-breadcrumb-item><span style="color: #2c74ba;">当前用户：ADMIN</span></el-breadcrumb-item>
		</el-breadcrumb>
		<div class="mainbox">
			<el-row>

				<el-col :span="20">
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item><span style="color: #2c74ba;">后台管理</span></el-breadcrumb-item>
						<el-breadcrumb-item>消息管理</el-breadcrumb-item>

					</el-breadcrumb>
				</el-col>

				<el-col :span="4">
					<el-input placeholder="请输入关键字搜索" suffix-icon="el-icon-search" v-model="searchvalue">
					</el-input>

				</el-col>
			</el-row>
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="招聘消息" name="招聘"></el-tab-pane>
				<el-tab-pane label="考试消息" name="考试"></el-tab-pane>
				<el-tab-pane label="课程消息" name="课程"></el-tab-pane>
				<el-tab-pane label="其他消息" name="其他"></el-tab-pane>

			</el-tabs>
			<el-table :data="messagelist" tooltip-effect="dark" style="width: 100%;height: 90%;" stripe @selection-change="handleSelectionChange">

				<el-table-column label="ID"  type="index" width="55" show-overflow-tooltip>
			
				</el-table-column>
				
				<el-table-column prop="content" label="信息内容" show-overflow-tooltip>
				</el-table-column>

				<el-table-column prop="type" label="信息类别" width="200" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="posttime" label="发送时间" width="200" show-overflow-tooltip>

				</el-table-column>
			</el-table>
			<el-pagination background :page-size="11" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper"
			 :total="400" style="float: right;">

			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: '招聘',
				pagenow: 1,
				multipleSelection:[],
				searchvalue:'',
				messagelist: [],
			}
		},
		methods: {
			//切换标签页
			handleClick(tab, event) {
				console.log(tab, event);
				this.getmessagelist()
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection)
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			handleCurrentChange(val) {
				this.pagenow = val;
				this.getmessagelist()
				console.log(`当前页: ${val}`);
			},
			getmessagelist() {
				this.axios.get(this.yuming + '/msg/message/manage', {
						params: {
							page: this.pagenow,
							search: this.searchvalue,
							type:this.activeName,
							loginId: localStorage.getItem('loginid'),
							token: localStorage.getItem('Authorization'),

						}
					})
					.then((response) => {
						console.log(response.data)
						this.all = response.data.data.all
						console.log(response.data.data.all)
						this.messagelist = response.data.data.info
					})
					.catch(error => {
						this.messagelist = [];
						console.log(error)
					})
			},
		},
		created() {
			this.getmessagelist()

		},
		mounted() {
			var body = document.getElementsByClassName('mainbox')[0]
			console.log(body)
			var height = document.documentElement.clientHeight - 240
			console.log(height.toString() + 'px')
			body.style.height = height.toString() + 'px'
			console.log(body.style.height)
		}
	}
</script>

<style>
	.zixunpage {
		min-width: 1200px;

	}
	.mainbox .el-dialog {
		min-width: 600px;
	}
	.mainbox {
		min-height: 600px;
		background-color: #FFFFFF;
		margin-top: 20px;
		padding: 20px;
		border-radius: 10px;
	}
</style>
