<template>
	<div class="zixunpage">
		<el-row :gutter="36">
			<el-col :span="6">
				<el-card shadow="hover" style="background-color:#6a8abe;color: #FFFFFF;">
					<div @click="$router.push('/home/kecheng')">
						<el-row style="width: 210px;white-space: nowrap;margin:10px auto;">
							<el-col :span="7"><i class="el-icon-date " style="font-size: 30px;line-height: 40px;margin-left: 20px;"></i>
							</el-col>
							<el-col :span="17">
								<div>课 程 管 理</div>
								<div style="font-size: 10px ;">COURSE MANAGEMENT</div>
							</el-col>
						</el-row>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card shadow="hover" style="background-color:#44bfca;color: #FFFFFF;">
					<div @click="$router.push('/home/tiku')">
						<el-row style="width: 210px;white-space: nowrap;margin:10px auto;">
							<el-col :span="7"><i class="iconfont icon-tiku " style="font-size: 30px;line-height: 40px;margin-left: 20px;"></i>
							</el-col>
							<el-col :span="17">
								<div>题 库 管 理</div>
								<div style="font-size: 10px ;">BANK MANAGEMENT</div>
							</el-col>
						</el-row>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card shadow="hover" style="background-color:#80c269;color: #FFFFFF;">
					<div @click="$router.push('/home/xiaoxi')">
						<el-row style="width: 210px;white-space: nowrap;margin:10px auto;">
							<el-col :span="7"><i class="iconfont icon-xiaoxi " style="font-size: 25px;line-height: 40px;margin-left: 20px;"></i>
							</el-col>
							<el-col :span="17">
								<div>消 息 管 理</div>
								<div style="font-size: 10px ;">MESSAGE MANAGEMENT</div>
							</el-col>
						</el-row>
					</div>

				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card shadow="hover" style="background-color:#eb6877;color: #FFFFFF;">
					<div @click="$router.push('/home/fankui')">
						<el-row style="width: 210px;white-space: nowrap;margin:10px auto;">
							<el-col :span="7"><i class="iconfont icon-fankuiliebiao- " style="font-size: 30px;line-height: 40px;margin-left: 20px;"></i>
							</el-col>
							<el-col :span="17">
								<div>用 户 反 馈</div>
								<div style="font-size: 10px ;">USER FEEDBACK</div>
							</el-col>
						</el-row>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<div class="mainbox">
				<el-button type="text" @click="addarticle" style="float: left;margin-left: 15px;">
							<i class="iconfont icon-jiahao" style="font-size: 20px;color:#71be59"></i>
							<span style="margin-left: 5px;white-space: nowrap;width: 50px;color: #000000;">添加</span>
						</el-button>
						<el-button type="text" @click="deletelot" style="float: left;margin-left: 15px;">
							<i class="iconfont icon-shanchu" style="font-size: 20px;color:#fd034f"></i>
							<span style="margin-left: 5px;white-space: nowrap;width: 50px;color: #000000;">删除</span>
						</el-button>
								<el-input placeholder="请输入关键字搜索" suffix-icon="el-icon-search" v-model="searchvalue" style="float: right;width: 30%;">
								</el-input>
			<!-- 发布文章弹窗 -->
			<el-dialog title="发布文章" :visible.sync="showtianjia" width="50%" center>
				<el-form label-width="50px" :model="article" style="margin: 10px auto;" v-loading="loading">
					<el-form-item label="标题">
						<el-input v-model="article.title"></el-input>
					</el-form-item>
					<el-form-item label="链接">
						<el-upload class="upload-demo" ref="htmlupload" :action="fabuurl" :show-file-list="false" :on-change="choicehtmlSuccess"
						 :before-upload="newHtml" :auto-upload="false">
							<span v-if="filename">{{filename}}</span>
							<el-button v-else size="small" type="primary">选择文件</el-button>

							<span slot="tip" class="el-upload__tip" style="margin-left: 20px;">只能上传html文件</span>
						</el-upload>
					</el-form-item>
					<el-form-item label="作者">
						<el-input v-model="article.author"></el-input>
					</el-form-item>
					<el-form-item label="来源">
						<el-input v-model="article.source"></el-input>
					</el-form-item>
					<el-form-item label="简要">
						<el-input v-model="article.introduction"></el-input>
					</el-form-item>
					<el-form-item label="封面">
						<el-upload class="upload-demo" ref="imgupload" :action="fabuurl" list-type="picture-card" :show-file-list="false"
						 :before-upload="newFiles" name="cover" :on-change="choiceSuccess" :auto-upload="false" >
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</el-form-item>


				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="showtianjia = false">取 消</el-button>
					<el-button type="primary" @click="postaddarticle">确 定</el-button>
				</span>
			</el-dialog>
			<el-table :data="articlelist" tooltip-effect="dark" style="width: 100%;height: 90%;" stripe @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="ID" type="index" width="55" show-overflow-tooltip>

				</el-table-column>
				<el-table-column prop="title" label="新闻标题" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="author" label="作者" width="100" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="source" label="来源" width="100" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="clicks" label="点击量" width="100" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="push" label="是否推荐" width="100" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="time" label="发表时间" width="180" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="work" label="操作" width="180" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="Editpush(scope.$index, scope.row)">修改推荐</el-button>
						<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="Deletearticle(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination v-show="all!=1" background :page-size="8" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper"
			 :page-count="all" style="float: right;">

			</el-pagination>
		</div>
	</div>
</template>

<script>
	
var formData = new FormData();
	export default {
		data() {
			return {
				pagenow: 1,
				all: null,
				loading:false,
				fabuurl: this.yuming + '/post/article' + '?loginId=' + localStorage.getItem('loginid') + '&token=' + localStorage.getItem(
					'Authorization'),
				imageUrl: '',
				filename: '',
				searchvalue: '',
				multipleSelection: [],
				showtianjia: false,
				articlelist: [],
				article: {
					title: '',
					author: '',
					source: '',
					introduction: '',
					loginId: localStorage.getItem('loginid'),
					token: localStorage.getItem('Authorization'),
				},
			}
		},
		methods: {
			//修改文章推荐状态
			Editpush(index, row) {
				console.log(index, row);
					var tui=null
								if(row.push=='是')
										tui=0
								if(row.push=='否')
										tui=1
								console.log(tui)
								this.axios({
										method: "post",
										url: this.yuming + '/change/article/punish' + '?loginId=' + localStorage.getItem('loginid') + '&token=' + localStorage.getItem(
											'Authorization'),
										dataType: 'json',
										data: {
											articleID: row.articleID,
											push:tui,
											loginId: localStorage.getItem('loginid'),
				
										},
									})
									.then((response) => {
										console.log(response.data)
										this.getzixunlist()
				
									})
									.catch(error => {
				
										console.log(error)
									})
			},
			//批量删除文章
			deletelot(){
				for(var i=0;i<this.multipleSelection.length;i++){
					this.Deletearticle(i, this.multipleSelection[i])
				}
			},
			//删除文章
			Deletearticle(index, row) {
				console.log(index, row);
				this.axios({
						method: "post",
						url: this.yuming + '/article/delete' + '?loginId=' + localStorage.getItem('loginid') + '&token=' + localStorage.getItem(
							'Authorization'),
						dataType: 'json',
						data: {
							articleID: row.articleID,
							loginId: localStorage.getItem('loginid'),

						},
					})
					.then((response) => {
						console.log(response.data)
						this.getzixunlist()

					})
					.catch(error => {

						console.log(error)
					})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleCurrentChange(val) {
				this.pagenow = val;
				this.getzixunlist()
				console.log(`当前页: ${val}`);
			},
			//选择html文件成功
			choicehtmlSuccess(file, fileList) {
				console.log(fileList)
				if (fileList.length != 1)
					fileList = fileList.slice(1, 2)
				console.log(fileList)

				this.filename = file.name;
			},
			//选择封面成功
			choiceSuccess(file, fileList) {
				console.log(fileList)
				if (fileList.length != 1)
					fileList = fileList.slice(1, 2)
				console.log(fileList)

				this.imageUrl = URL.createObjectURL(file.raw);
			},
			
			newHtml(file) {
				formData.append('article', file)
				return false
			},
			newFiles(file) {
				formData.append('cover', file)
				return false
			},
			//发布文章
			addarticle() {
				this.showtianjia = true
				this.article.title = ''
				this.article.author = ''
				this.article.source = ''
				this.article.introduction = ''
				this.imageUrl=''
				this.filename=''
				 formData = new FormData();
			},
			//提交文章信息
			postaddarticle() {
				this.loading=true
			
				formData.append('title', this.article.title)
				formData.append('author', this.article.author)
				formData.append('source', this.article.source)
				formData.append('introduction', this.article.introduction)

				this.$refs.htmlupload.submit()
				this.$refs.imgupload.submit()
				//console.log(formData)
				this.axios({
						method: "post",
						url: this.fabuurl,

						data: formData
					}).then((response) => {
						this.loading=false
						this.showtianjia = false
						console.log(response.data)
						this.getzixunlist()
						

					})
					.catch(error => {
						console.log('失败')
						console.log(error)
					})
			},
			//获取文章列表
			getzixunlist() {
				console.log(this.searchvalue)
				this.axios.get(this.yuming + '/msg/article/manage', {
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

						this.articlelist = response.data.data.info
						for (var i = 0; i < this.articlelist.length; i++) {
							this.articlelist[i].time = this.articlelist[i].time.substr(0, 19)
							if (this.articlelist[i].push)
								this.articlelist[i].push = '是'
							else
								this.articlelist[i].push = '否'
						
						}

					})
					.catch(function(error) {
						console.log(error)
					})
			},



		},
		created() {
			this.getzixunlist()

		},
		watch: {

		},
		mounted() {

		}
	}
</script>

<style>
	.zixunpage {
		min-width: 1100px;

	}

	.mainbox .el-dialog {
		min-width: 600px;
	}

	.avatar {
		width: 100%;
		height: 100%;
		display: block;
	}

	.mainbox {
		min-height: 600px;
		background-color: #FFFFFF;
		margin-top: 20px;
		padding: 20px;
		border-radius: 10px;
	}
</style>
