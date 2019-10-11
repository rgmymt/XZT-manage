<template>
	<div class="zixunpage">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px;background-color: #FFFFFF;margin-bottom: 40px;">
			<el-breadcrumb-item>后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>题库管理</el-breadcrumb-item>
			<el-breadcrumb-item><span style="color: #2c74ba;">当前用户：ADMIN</span></el-breadcrumb-item>
		</el-breadcrumb>
		<div class="mainbox">
			<!-- 顶部操作栏 -->
			<el-button type="text" @click="addtiku" style="float: left;margin-left: 15px;">
						<i class="iconfont icon-jiahao" style="font-size: 20px;color:#71be59"></i>
						<span style="margin-left: 5px;white-space: nowrap;width: 50px;color: #000000;">添加</span>
					</el-button>
					<el-button type="text" @click="deletlot" style="float: left;margin-left: 15px;">
						<i class="iconfont icon-shanchu" style="font-size: 20px;color:#fd034f"></i>
						<span style="margin-left: 5px;white-space: nowrap;width: 50px;color: #000000;">删除</span>
					</el-button>
		
					
							<el-input placeholder="请输入关键字搜索" suffix-icon="el-icon-search" v-model="searchvalue" style="float: right;width: 30%;">
							</el-input>
			<!-- 添加试卷弹窗 -->
			<el-dialog title="添加试卷" :visible.sync="showtianjia" width="50%" center>
				<el-form label-width="50px" :model="tiku" style="margin: 10px auto;">
					<el-form-item label="标题">
						<el-input v-model="tiku.name"></el-input>
					</el-form-item>

					<el-form-item label="类型">
						<el-input v-model="tiku.type"></el-input>
					</el-form-item>
				
					<el-form-item label="封面">
						<el-upload class="upload-demo" ref="upload" :action="url" list-type="picture-card" :show-file-list="false"
						 :on-success="successupload" name="cover" :data="tiku" :on-change="choiceSuccess" :auto-upload="false">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</el-form-item>

				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="showtianjia = false">取 消</el-button>
					<el-button type="primary" @click="submitUpload">确 定</el-button>
				</span>
			</el-dialog>
			<!-- 题库列表 -->
			<el-table :data="tikulist" tooltip-effect="dark" style="width: 100%;height: 90%;" stripe @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="ID" type="index" width="55" show-overflow-tooltip>

				</el-table-column>

				<el-table-column prop="name" label="试卷名称" show-overflow-tooltip>
				</el-table-column>
				<!-- <el-table-column prop="level" label="难度" width="150" show-overflow-tooltip>
				</el-table-column> -->

				<el-table-column prop="type" label="类别" width="180" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="number" label="总题数" width="100" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="postID" label="上传人ID" width="180" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="work" label="操作" width="180" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="edittiku(scope.$index, scope.row)">修改</el-button>
						<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="deletetiku(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination v-show="all!=1" background :page-size="8" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper"
			 :page-count="all" style="float: right;">
			</el-pagination>
			<!--题库内容弹窗 -->
				<el-dialog title="修改内容" :visible.sync="showtiku" width="50%"  center>
							<el-table :data="tilist" style="width: 100%">
							
								<el-table-column label="题目" type="index" width="50">
								</el-table-column>
									<el-table-column prop="type" width="100">
								</el-table-column>
								<el-table-column prop="stem">
								</el-table-column>
						
								<el-table-column prop="work"  width="180" show-overflow-tooltip>
												<template slot="header" slot-scope="scope">
											<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="showaddquestion=true">添加题目</el-button>							
									</template>
									<template slot-scope="scope">
										<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="editti(scope.$index, scope.row)">修改</el-button>
										<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="deleteti(scope.$index, scope.row)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
							<span slot="footer" class="dialog-footer">
								<el-button @click="showtiku = false">取 消</el-button>
								<el-button type="primary" @click="showtiku = false">确 定</el-button>
							</span>
						</el-dialog>
			<!-- 添加题目弹窗 -->
			<el-dialog title="添加题目" :visible.sync="showaddquestion" width="50%" center>
						<el-form label-width="100px" :model="question" style="margin: 10px auto;">
										<el-form-item label="题干">
											<el-input v-model="question.stem"></el-input>
										</el-form-item>
										<el-form-item label="答案">
											<el-input v-model="question.answer"></el-input>
										</el-form-item>
										<el-form-item label="解析">
											<el-input v-model="question.analysis"></el-input>
										</el-form-item>
										<el-form-item label="题型">
											<el-input v-model="question.type"></el-input>
										</el-form-item>
										<el-form-item label="考点">
											<el-input v-model="question.examPoint"></el-input>
										</el-form-item>
										<el-form-item label="分值">
											<el-input v-model="question.value"></el-input>
										</el-form-item>
										<el-form-item label="选项(选填)">
											<el-input v-model="question.answerA" style="margin-top:10px;"></el-input>
											<el-input v-model="question.answerB" style="margin-top:10px;"></el-input><br>
											<el-input v-model="question.answerC" style="margin-top:10px;"></el-input><br>
											<el-input v-model="question.answerD" style="margin-top:10px;"></el-input>

										</el-form-item>
										
									</el-form>
									<span slot="footer" class="dialog-footer">
										<el-button @click="showaddquestion = false">取 消</el-button>
										<el-button type="primary" @click="addquestion">确 定</el-button>
									</span>
					</el-dialog>
						<!-- 修改题目弹窗 -->
								<el-dialog title="添加题目" :visible.sync="showchangequestion" width="50%" center>
											<el-form label-width="100px" :model="changequestion" style="margin: 10px auto;">
															<el-form-item label="题干">
																<el-input v-model="changequestion.stem"></el-input>
															</el-form-item>
															<el-form-item label="答案">
																<el-input v-model="changequestion.answer"></el-input>
															</el-form-item>
															<el-form-item label="解析">
																<el-input v-model="changequestion.analysis"></el-input>
															</el-form-item>
														
															<el-form-item label="考点">
																<el-input v-model="changequestion.examPoint"></el-input>
															</el-form-item>
															<el-form-item label="分值">
																<el-input v-model="changequestion.value"></el-input>
															</el-form-item>
															<el-form-item label="选项(选填)">
																<el-input v-model="changequestion.answerA" style="margin-top:10px;"></el-input>
																<el-input v-model="changequestion.answerB" style="margin-top:10px;"></el-input><br>
																<el-input v-model="changequestion.answerC" style="margin-top:10px;"></el-input><br>
																<el-input v-model="changequestion.answerD" style="margin-top:10px;"></el-input>
					
															</el-form-item>
															
														</el-form>
														<span slot="footer" class="dialog-footer">
															<el-button @click="showchangequestion = false">取 消</el-button>
															<el-button type="primary" @click="postchange">确 定</el-button>
														</span>
										</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: '',
				url:this.yuming +'/post/questionGroup'+'?loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization'),
				showtiku:false,
				showaddquestion:false,
				showchangequestion:false,
				showtianjia:false,
				pagenow: 1,
				all: 0,
				searchvalue: '',
				multipleSelection: '',
				questionnum:null,
				tikulist: [],
				tilist:[],
				tiku: {
					name: '',
					type: '',
					loginId: localStorage.getItem('loginid'),
				},
				question:{
					stem:'',
					answer:'',
					analysis:'',
					type:'',
					examPoint:'',
					value:null,
					answerA:'',
					answerB:'',
					answerC:'',
					answerD:'',
					loginId:localStorage.getItem('loginid'),
					groupID:'',
				},
				changequestion:{
					stem:'',
					answer:'',
					analysis:'',
					examPoint:'',
					value:null,
					answerA:'',
					answerB:'',
					answerC:'',
					answerD:'',
					loginId:localStorage.getItem('loginid'),
					groupID:'',
					realID:null,
				}
			}
		},
		methods: {
			//修改题库
			edittiku(index, row) {
				//console.log(index, row);
				this.showtiku=true
				this.question.groupID=row.groupID
				this.questionnum=row.number-1
				console.log(this.questionnum)
				for(var i=0;i<row.number-1;i++){
				this.gettilist(row.groupID,i)
				}
				
			},
			//添加题库
			addtiku(){
				this.tiku.name=''
				this.tiku.type=''
				this.imageUrl=''
				this.showtianjia=true
				
			},
			//删除题库
			deletetiku(index, row) {
					this.axios.delete(this.yuming + '/delete/questionGroup'+'?loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization'), {
										data: {
											groupID: row.groupID,
											loginId: localStorage.getItem('loginid'),
											token: localStorage.getItem('Authorization'),
										},
				
									})
									.then((response) => {
										console.log(response.data)
										this.gettikulist()
									})
									.catch(error => {
									
										console.log(error)
									})
			},
			//删除多个题库
			deletlot(){
				for(var i=0;i<this.multipleSelection.length;i++){
					this.deletetiku(i, this.multipleSelection[i])
				}
			},
			//获取当前页
			handleCurrentChange(val) {
				this.pagenow = val;
				this.gettikulist()
				//console.log(`当前页: ${val}`);
			},
			//获取多选框值
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection)
			},
			//文件选择成功
			choiceSuccess(file, fileList) {
							console.log(fileList)
							if (fileList.length != 1)
								fileList = fileList.slice(1, 2)
							console.log(fileList)
			
							this.imageUrl = URL.createObjectURL(file.raw);
						},
			//题库信息提交成功
			successupload() {
				console.log('a')
				this.gettikulist()
				this.imageUrl= ''
			},
			//提交新的题库
			submitUpload() {
							this.showtianjia = false
							this.$refs.upload.submit();
							this.gettikulist()
			
						},
			//添加题目
			addquestion(){
				this.showaddquestion=false
				this.postquestion()
			},
			//修改题目
			editti(index, row){
				this.showchangequestion=true
				this.changequestion.realID=row.realID
				this.changequestion.groupID=this.question.groupID
			},
			//提交修改
			postchange(){
				this.showchangequestion=false
				this.postchangequestion()
			},
			//删除题目
			deleteti(index, row){
				this.questionnum=this.questionnum-1
					this.axios.delete(this.yuming + '/delete/question'+'?loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization'), {
										
										data: {
											groupID: this.question.groupID,
											realID:row.realID,
											loginId: localStorage.getItem('loginid'),
											token: localStorage.getItem('Authorization'),
										},
				
									})
									.then((response) => {
										console.log(response.data)
										console.log(this.questionnum)
										for(var i=0;i<this.questionnum;i++){

										this.gettilist(this.question.groupID,i) 
										}
									})
									.catch(error => {
									
										console.log(error)
									})
			},
			//获取题库列表
			gettikulist() {
				console.log(this.searchvalue)
				this.axios.get(this.yuming + '/msg/questionGroup/manage', {
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

						this.tikulist = response.data.data.info
					})
					.catch(function(error) {
						console.log(error)
					})
			},
			//获取题目
			gettilist(id,i){
				
					this.tilist=[]
						this.axios.get(this.yuming + '/msg/exercises', {
								params: {
									number: i+1,
									groupID: id,
									token: localStorage.getItem('Authorization'),
									loginId: localStorage.getItem('loginid'),
								}
							})
										.then((response) => {
											console.log(response.data)
											this.$set(this.tilist, i, response.data.data.info)
											//this.tilist[i]=response.data.data.info
										
										})
										.catch(function(error) {
											console.log(error)
										})
			
				
			},
			//添加题目请求
			postquestion(){
				this.questionnum=this.questionnum+1
				this.axios({
								method:"post",
								url:this.yuming +'/post/question'+'?loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization'),
								dataType:'json',
								data:this.question
					}).then((response) => {
						for(var i=0;i<this.questionnum;i++){

								this.gettilist(this.question.groupID,i)
									}
								})
									.catch(error => {
										console.log('失败')
										console.log(error)
									})
			},
			//改变题目请求
			postchangequestion(){
				
				this.axios({
								method:"post",
								url:this.yuming +'/change/question'+'?loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization'),
								dataType:'json',
								data:this.changequestion
					}).then((response) => {
						console.log(response.data)
						for(var i=0;i<this.questionnum;i++){

								this.gettilist(this.question.groupID,i)
									}
								})
									.catch(error => {
										console.log('失败')
										console.log(error)
									})
			},
		},
		created() {
			this.gettikulist()
			
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
