<template>
	<div class="zixunpage">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px;background-color: #FFFFFF;margin-bottom: 40px;">
			<el-breadcrumb-item>后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户反馈</el-breadcrumb-item>
			<el-breadcrumb-item><span style="color: #2c74ba;">当前用户：ADMIN</span></el-breadcrumb-item>
		</el-breadcrumb>
		<div class="mainbox">
			<el-breadcrumb separator-class="el-icon-arrow-right" style="float: left;">
									<el-breadcrumb-item><span style="color: #2c74ba;">后台管理</span></el-breadcrumb-item>
									<el-breadcrumb-item>用户反馈</el-breadcrumb-item>
			
								</el-breadcrumb>
			<el-input placeholder="请输入关键字搜索" suffix-icon="el-icon-search" v-model="searchvalue" style="width:30%;float: right;">
			</el-input>

		
			<el-table :data="fankuilist" tooltip-effect="dark" style="width: 100%;height: 90%;" stripe>
				<el-table-column type="selection" width="55">
				</el-table-column>
					<el-table-column label="ID"  type="index" width="55" show-overflow-tooltip>
				
					</el-table-column>
					<el-table-column prop="content" label="反馈内容" show-overflow-tooltip>
					</el-table-column>
				<el-table-column prop="handle"  label="状态" width="150" show-overflow-tooltip>
					
				</el-table-column>

				<el-table-column prop="nickname" label="用户名" width="180" show-overflow-tooltip>
				</el-table-column>

				

				<el-table-column prop="time" label="发表时间" width="180" show-overflow-tooltip>

				</el-table-column>
				<el-table-column label="操作" width="180" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="lookfankui(scope.$index, scope.row)">查看</el-button>
						<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="donefankui(scope.$index, scope.row)">处理</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination v-show="all!=1" background :page-size="8" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper"
			 :page-count="all" style="float: right;">

			</el-pagination>
			<!-- 反馈详情弹窗 -->
			<el-dialog :title="'用户反馈'+'('+fankuidetil.handle+')'" :visible.sync="showfankui" width="50%" center>
				<el-row :gutter="20">
					<el-col :span="6">反馈用户：</el-col>
					<el-col :span="18">{{fankuidetil.nickname}}</el-col>
					
					<el-col :span="6">反馈时间：</el-col>
					<el-col :span="18">{{fankuidetil.time}}</el-col>
					
					<el-col :span="6">反馈内容：</el-col>
					<el-col :span="18">{{fankuidetil.content}}</el-col>					
				</el-row>
				<span slot="footer" class="dialog-footer">
					<el-button @click="showfankui = false">确 定</el-button>

				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pagenow: 1,
				searchvalue: '',
				all: null,
				showfankui: false,
				fankuilist: [],
				fankuidetil: [],
			}
		},
		methods: {
			//点击查看
			lookfankui(index, row) {
				console.log(index, row);
				this.showfankui = true
				this.getkankuidetil(row.id)
			},
			donefankui(index, row) {
				console.log(index, row);
			},
			handleCurrentChange(val) {
				this.pagenow = val;
				this.getfankuilist()
				console.log(`当前页: ${val}`);
			},
			//获取反馈列表
			getfankuilist() {
				console.log(this.searchvalue)
				this.axios.get(this.yuming + '/msg/feedback', {
						params: {
							page: 1,
							search: this.searchvalue,
							loginId: localStorage.getItem('loginid'),
							token: localStorage.getItem('Authorization'),

						}
					})
					.then((response) => {
						console.log(response.data)
						this.all = response.data.data.all

						this.fankuilist = response.data.data.info
						for (var i = 0; i < this.fankuilist.length; i++) {
							this.fankuilist[i].time = this.fankuilist[i].time.substr(0, 19)
							if(this.fankuilist[i].handle)
								this.fankuilist[i].handle='已处理'
							else
								this.fankuilist[i].handle='未处理'
						}

					})
					.catch(function(error) {
						console.log(error)
					})
			},
			//获取反馈内容
			getkankuidetil(id) {
				this.axios.get(this.yuming + '/msg/feedback/detail', {
						params: {
							ID: id,
							loginId: localStorage.getItem('loginid'),
							token: localStorage.getItem('Authorization'),

						}
					})
					.then((response) => {
						console.log(response.data)
						this.fankuidetil = response.data.data

						console.log(this.fankuidetil)
						this.fankuidetil.time = this.fankuidetil.time.substr(0, 19)
						if (this.fankuidetil.handle)
							this.fankuidetil.handle = '已处理'
						else
							this.fankuidetil.handle = '未处理'


					})
					.catch(function(error) {
						console.log(error)
					})
			},
		},
		created() {
			this.getfankuilist()

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
