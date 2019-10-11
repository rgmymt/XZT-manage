<template>
	<div class="zixunpage">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px;background-color: #FFFFFF;margin-bottom: 40px;">
			<el-breadcrumb-item>后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>题库管理</el-breadcrumb-item>
			<el-breadcrumb-item><span style="color: #2c74ba;">当前用户：ADMIN</span></el-breadcrumb-item>
		</el-breadcrumb>
		<div class="mainbox">
			<el-breadcrumb separator-class="el-icon-arrow-right" style="float: left;">
				<el-breadcrumb-item><span style="color: #2c74ba;">后台管理</span></el-breadcrumb-item>
				<el-breadcrumb-item>招聘管理</el-breadcrumb-item>

			</el-breadcrumb>
			<el-input placeholder="请输入关键字搜索" suffix-icon="el-icon-search" v-model="searchvalue" style="float: right;width: 30%;">
			</el-input><br><br>
			<el-button type="text" @click="deletegroup" style="float: right;margin-left: 15px;">
				<i class="iconfont icon-shanchu" style="font-size: 20px;color:#fd034f"></i>
				<span style="margin-left: 5px;white-space: nowrap;width: 50px;color: #000000;">删除</span>
			</el-button>

			<el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top: 10px;">
				<el-tab-pane label="招聘" name="招聘">
					<div>
						<el-table :data="zhaopinlist" tooltip-effect="dark" style="width: 100%;height: 90%;" stripe @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column label="ID" type="index" width="55" show-overflow-tooltip>

							</el-table-column>
							<el-table-column prop="company" label="公司名称" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="career" label="职位名称" width="200" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="applyNumber" label="报名人数" width="100" show-overflow-tooltip>
							</el-table-column>

							<el-table-column prop="postTime" label="发布时间" width="180" show-overflow-tooltip>

							</el-table-column>
							<el-table-column prop="deadline" label="截止时间" width="180" show-overflow-tooltip>
							</el-table-column>

							<el-table-column prop="work" label="操作" width="180" show-overflow-tooltip>
								<template slot-scope="scope">
									<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="deletezhaopin(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>

						<el-pagination v-show="all!=1" background :page-size="8" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper"
						 :page-count="all" style="float: right;">

						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="招聘会" name="招聘会">
					<el-table :data="zhaopinhuilist" tooltip-effect="dark" style="width: 100%;height: 90%;" stripe @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column label="ID" type="index" width="55" show-overflow-tooltip>

						</el-table-column>
						<el-table-column prop="title" label="标题" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="finish" label="状态" width="100" show-overflow-tooltip>

						</el-table-column>
						<el-table-column prop="recommend" label="是否推荐" width="100" show-overflow-tooltip>

						</el-table-column>

						<el-table-column prop="postTime" label="发布时间" width="180" show-overflow-tooltip>

						</el-table-column>


						<el-table-column prop="work" label="操作" width="180" show-overflow-tooltip>
							<template slot-scope="scope">
								<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="changetui(scope.$index, scope.row)">修改推荐</el-button>
								<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="deletezhaopinhui(scope.$index, scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>

					<el-pagination v-show="all!=1" background :page-size="8" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper"
					 :page-count="all" style="float: right;">

					</el-pagination>
				</el-tab-pane>
				<el-tab-pane label="定向委培" name="定向委培">
					<el-table :data="weipeilist" tooltip-effect="dark" style="width: 100%;height: 90%;" stripe @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column label="ID" type="index" width="55" show-overflow-tooltip>

						</el-table-column>
						<el-table-column prop="title" label="标题" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="companyName" label="公司" width="100" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="career" label="职位" width="100" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="finish" label="状态" width="100" show-overflow-tooltip>

						</el-table-column>

						<el-table-column prop="postTime" label="发布时间" width="180" show-overflow-tooltip>

						</el-table-column>


						<el-table-column prop="work" label="操作" width="180" show-overflow-tooltip>
							<template slot-scope="scope">
								<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="editweipei(scope.$index, scope.row)">查看</el-button>
								<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="deleteweipei(scope.$index, scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>

					<el-pagination v-show="all!=1" background :page-size="8" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper"
					 :page-count="all" style="float: right;">

					</el-pagination>

				</el-tab-pane>
			</el-tabs>
			<!-- 处理定向委培的弹窗 -->
			<el-dialog :title="weipeidetil.title" :visible.sync="showeditweipei" width="50%" center>
				<el-form label-width="80px" :model="weipei" style="margin: 10px auto;">
					<el-form-item label="委培公司">
						<span>{{weipeidetil.companyName}}</span>
					</el-form-item>
					<el-form-item label="招收工作">
						<span>{{weipeidetil.career}}</span>
					</el-form-item>
					<el-form-item label="薪水">
						<span>{{weipeidetil.salary+'元/月'}}</span>
					</el-form-item>
					<el-form-item v-if="weipeidetil.officeAgree" label="学费原价">
						<span>{{weipeidetil.tuitionOriginal}}</span>
					</el-form-item>
					<el-form-item v-if="weipeidetil.officeAgree" label="学费现价">
						<span>{{weipeidetil.tuitionCurrent}}</span>
					</el-form-item>
					<el-form-item v-if="!weipeidetil.officeAgree" label="是否通过">
						<el-radio v-model="weipei.officeAgree" :label="false">不通过</el-radio>

						<el-radio v-model="weipei.officeAgree" :label="true">通过</el-radio>

					</el-form-item>

					<el-form-item v-if="!weipeidetil.officeAgree" label="价格">
						<el-input v-model="weipei.price" :disabled="!weipei.officeAgree"></el-input>

					</el-form-item>
					<el-form-item v-if="!weipeidetil.officeAgree" label="折扣">
						<el-input v-model="weipei.discount" :disabled="!weipei.officeAgree">
							 <template slot="append">折</template>
						</el-input>
					</el-form-item>
					<el-form-item v-if="!weipeidetil.officeAgree" label="地点">
						<el-input v-model="weipei.place" :disabled="!weipei.officeAgree"></el-input>
					</el-form-item>

				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="showeditweipei = false">取 消</el-button>
					<el-button v-if="!weipeidetil.officeAgree" type="primary" @click="posteditweipei">确 定</el-button>
					<el-button v-if="weipeidetil.officeAgree" type="primary" @click="showeditweipei = false">确 定</el-button>
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
				activeName: '招聘',
				all: null,
				multipleSelection: [],
				showeditweipei: false,
				zhaopinlist: [],
				zhaopinhuilist: [],
				weipeilist: [],
				weipeidetil: [],

				weipei: {
					trainID: null,
					loginId: localStorage.getItem('loginid'),
					officeAgree: false,
					price: null,
					discount: null,
					place: '',
				}
			}
		},
		methods: {
			//招聘会修改推荐
			changetui(index, row) {
				console.log(index, row);
				var tui = null
				if (row.recommend == '是')
					tui = 0
				if (row.recommend == '否')
					tui = 1
				console.log(row.jobFairID)
				this.axios({
						method: "post",
						url: this.yuming + '/post/jobfair/push' + '?loginId=' + localStorage.getItem('loginid') + '&token=' +
							localStorage.getItem(
								'Authorization'),
						dataType: 'json',
						data: {
							jobfairID: row.jobFairID,
							push: tui,
							loginId: localStorage.getItem('loginid'),

						},
					})
					.then((response) => {
						console.log(response.data)
						this.getzhaopinhuilist()

					})
					.catch(error => {

						console.log(error)
					})
			},
			//删除招聘
			deletezhaopin(index, row) {
				console.log(index, row);
				this.axios.delete(this.yuming + '/delete/recruit', {
						params: {
							recruitID: row.id,
							loginId: localStorage.getItem('loginid'),
							token: localStorage.getItem('Authorization'),
						},

					})
					.then((response) => {

						this.getzhaopinlist()
					})
					.catch(error => {

						console.log(error)
					})
			},
			//删除招聘会
			deletezhaopinhui(index, row) {
				console.log(index, row);
				this.axios.delete(this.yuming + '/delete/jobFair', {
						params: {
							jobFairID: row.jobFairID,
							loginId: localStorage.getItem('loginid'),
							token: localStorage.getItem('Authorization'),
						},

					})
					.then((response) => {

						this.getzhaopinhuilist()
					})
					.catch(error => {

						console.log(error)
					})
			},
			//处理委培
			editweipei(index, row) {
				this.showeditweipei = true
				this.weipeidetil = row
				this.weipei.trainID = row.id
				console.log(this.weipeidetil)
			},
			//提交委培处理
			posteditweipei() {
				this.showeditweipei = false
				
				this.axios({
						method: "post",
						url: this.yuming + '/post/train/officeAgree' + '?loginId=' + localStorage.getItem('loginid') + '&token=' +
							localStorage.getItem(
								'Authorization'),
						dataType: 'json',
						data: this.weipei
					})
					.then((response) => {
						console.log(response.data)
						this.getweipeilist()

					})
					.catch(error => {

						console.log(error)
					})
			},
			//删除委培
			deleteweipei(index, row) {
				console.log(index, row);
				this.axios.delete(this.yuming + '/delete/train', {
						params: {
							trainID: row.id,
							loginId: localStorage.getItem('loginid'),
							token: localStorage.getItem('Authorization'),
						},

					})
					.then((response) => {

						this.getweipeilist()
					})
					.catch(error => {

						console.log(error)
					})
			},
			handleCurrentChange(val) {
				this.pagenow = val;
				console.log(`当前页: ${val}`);
				this.getzhaopinlist()

			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleClick(tab, event) {
				this.pagenow = 1
				this.searchvalue = ''
				this.all = null
				this.multipleSelection = []
				console.log(tab.name);
				if (tab.name == '招聘')
					this.getzhaopinlist()
				if (tab.name == '招聘会')
					this.getzhaopinhuilist()
				if (tab.name == '定向委培')
					this.getweipeilist()
			},
			//批量删除招聘/招聘会/定向委培
			deletegroup() {
				if (tab.name == '招聘')
					for (var i = 0; i < this.multipleSelection.length; i++) {
						this.deletezhaopin(i, this.multipleSelection[i])
					}
				if (tab.name == '招聘会')
					for (var i = 0; i < this.multipleSelection.length; i++) {
						this.deletezhaopinhui(i, this.multipleSelection[i])
					}
				if (tab.name == '定向委培')
					for (var i = 0; i < this.multipleSelection.length; i++) {
						this.deleteweipei(i, this.multipleSelection[i])
					}
			},
			//获取招聘列表
			getzhaopinlist() {
				console.log(this.searchvalue)
				this.axios.get(this.yuming + '/msg/recruit/manage', {
						params: {
							page: this.pagenow,
							search: this.searchvalue,
							loginId: localStorage.getItem('loginid'),
							token: localStorage.getItem('Authorization'),

						}
					})
					.then((response) => {
						console.log(response.data)
						this.all = response.data.data.all

						this.zhaopinlist = response.data.data.info
						for (var i = 0; i < this.zhaopinlist.length; i++) {
							this.zhaopinlist[i].postTime = this.zhaopinlist[i].postTime.substr(0, 19)
							this.zhaopinlist[i].deadline = this.zhaopinlist[i].deadline.substr(0, 19)

						}

					})
					.catch(function(error) {
						console.log(error)
					})
			},
			//获取招聘会列表
			getzhaopinhuilist() {
				console.log(this.searchvalue)
				this.axios.get(this.yuming + '/msg/jobfair/manage', {
						params: {
							page: this.pagenow,
							search: this.searchvalue,
							loginId: localStorage.getItem('loginid'),
							token: localStorage.getItem('Authorization'),

						}
					})
					.then((response) => {
						console.log(response.data)
						this.all = response.data.data.all

						this.zhaopinhuilist = response.data.data.info
						for (var i = 0; i < this.zhaopinhuilist.length; i++) {
							this.zhaopinhuilist[i].postTime = this.zhaopinhuilist[i].postTime.substr(0, 19)
							if (this.zhaopinhuilist[i].finish)
								this.zhaopinhuilist[i].finish = '已结束'
							else
								this.zhaopinhuilist[i].finish = '未结束'
							if (this.zhaopinhuilist[i].recommend)
								this.zhaopinhuilist[i].recommend = '是'
							else
								this.zhaopinhuilist[i].recommend = '否'
						}

					})
					.catch(function(error) {
						console.log(error)
					})
			},
			//获取委培列表
			getweipeilist() {
				console.log(this.searchvalue)
				this.axios.get(this.yuming + '/msg/train/manage', {
						params: {
							page: this.pagenow,
							search: this.searchvalue,
							loginId: localStorage.getItem('loginid'),
							token: localStorage.getItem('Authorization'),

						}
					})
					.then((response) => {
						console.log(response.data)
						this.all = response.data.data.all

						this.weipeilist = response.data.data.info
						for (var i = 0; i < this.weipeilist.length; i++) {
							this.weipeilist[i].postTime = this.weipeilist[i].postTime.substr(0, 19)
							this.weipeilist[i].deadline = this.weipeilist[i].deadline.substr(0, 19)
							if (this.weipeilist[i].finish)
								this.weipeilist[i].finish = '已结束'
							else
								this.weipeilist[i].finish = '未结束'
						}

					})
					.catch(function(error) {
						console.log(error)
					})
			},
		},
		created() {
			this.getzhaopinlist()

		},
		mounted() {

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
