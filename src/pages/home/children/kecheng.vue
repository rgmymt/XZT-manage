<template>
	<div class="zixunpage">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px;background-color: #FFFFFF;margin-bottom: 40px;">
			<el-breadcrumb-item>后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>课程管理</el-breadcrumb-item>
			<el-breadcrumb-item><span style="color: #2c74ba;">当前用户：ADMIN</span></el-breadcrumb-item>
		</el-breadcrumb>
		<div class="mainbox">
			<el-button type="text" @click="addkecheng" style="float: left;margin-left: 15px;">
				<i class="iconfont icon-jiahao" style="font-size: 20px;color:#71be59"></i>
				<span style="margin-left: 5px;white-space: nowrap;width: 50px;color: #000000;">添加</span>
			</el-button>
			<el-button type="text" @click="deletelot" style="float: left;margin-left: 15px;">
				<i class="iconfont icon-shanchu" style="font-size: 20px;color:#fd034f"></i>
				<span style="margin-left: 5px;white-space: nowrap;width: 50px;color: #000000;">删除</span>
			</el-button>

			
					<el-input placeholder="请输入关键字搜索" suffix-icon="el-icon-search" v-model="searchvalue" style="float: right;width: 30%;">
					</el-input>

				
		<!-- 添加课程弹窗 -->
			<el-dialog title="添加课程" :visible.sync="showtianjia" width="50%"  center>
				<el-form label-width="50px" :model="formLabelAlign" style="margin: 10px auto;" v-loading="uploading">
					<el-form-item label="标题">
						<el-input v-model="formLabelAlign.title"></el-input>
					</el-form-item>

					<el-form-item label="老师">
						<el-input v-model="formLabelAlign.teacher"></el-input>
					</el-form-item>
					<el-form-item label="职业">
						<el-input v-model="formLabelAlign.type"></el-input>
					</el-form-item>
					<el-form-item label="价格">
						<el-input v-model="formLabelAlign.price"></el-input>
					</el-form-item>
					<el-form-item label="来源">
						<el-input v-model="formLabelAlign.source"></el-input>
					</el-form-item>
					<el-form-item label="介绍">
						<el-input v-model="formLabelAlign.introduction"></el-input>
					</el-form-item>
					<el-form-item label="封面">
						<el-upload class="upload-demo" ref="upload" :action="url" list-type="picture-card" :show-file-list="false"
						 :on-success="successupload" name="cover" :data="formLabelAlign" :on-change="choiceSuccess" :auto-upload="false">
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
			<el-table :data="kechenglist" tooltip-effect="dark" style="width: 100%;height: 90%;" stripe @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
					<el-table-column label="ID"  type="index" width="55" show-overflow-tooltip>
				
					</el-table-column>
				<el-table-column prop="title" label="课程名称" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="teacher" label="教师" width="100" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="type" label="类型" width="100" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="grades" label="评分" width="90" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="price" label="原价" width="90" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="discount" label="现价" width="90" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="views" label="点击量" width="100" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="work" label="操作" width="180" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
						<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination v-show="all!=1" background :page-size="8" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper"
			 :page-count="all" style="float: right;">

			</el-pagination>
			<!-- 章节内容弹窗 -->
			<keep-alive>
			<el-dialog title="修改内容" :visible.sync="showedit" width="50%"  center>
				<el-table :data="videogrouplist" style="width: 100%">
					<el-table-column type="expand">
						<template slot-scope="props">
								<el-table :data="props.row.data.videoList " tooltip-effect="dark" style="width: 100%;" :show-header="false" >
											<el-table-column  type="index" width="50">
										
											</el-table-column>
											<el-table-column prop="videoTitle" show-overflow-tooltip>
											</el-table-column>
											<el-table-column prop="videoTime"  show-overflow-tooltip>
											</el-table-column>
										
											<el-table-column prop="work"  width="180" show-overflow-tooltip>
												<template slot-scope="scope">
													<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="deletvideo(scope.$index, scope.row)">删除</el-button>
												</template>
											</el-table-column>
										</el-table>
						</template>
					</el-table-column>
					<el-table-column label="章节" type="index" width="50">
				
					</el-table-column>
					<el-table-column prop="unitTitle">
					</el-table-column>

					<el-table-column prop="work"  width="180" show-overflow-tooltip>
									<template slot="header" slot-scope="scope">
								<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="showaddgroup=true">添加章节</el-button>							
						</template>
						<template slot-scope="scope">
							<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="editgroup(scope.$index, scope.row)">添加</el-button>
							<el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="deletegroup(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<span slot="footer" class="dialog-footer">
					<el-button @click="showedit = false">取 消</el-button>
					<el-button type="primary" @click="showedit = false">确 定</el-button>
				</span>
			</el-dialog>
			</keep-alive>
				<el-dialog title="添加章节" :visible.sync="showaddgroup" width="50%" center>
							<el-form label-width="100px" :model="videogroup" style="margin: 10px auto;">
											<el-form-item label="章节序号">
												<el-input v-model="videogroup.unitNumber"></el-input>
											</el-form-item>
											<el-form-item label="章节名称">
												<el-input v-model="videogroup.unitName"></el-input>
											</el-form-item>
										</el-form>
										<span slot="footer" class="dialog-footer">
											<el-button @click="showaddgroup = false">取 消</el-button>
											<el-button type="primary" @click="addgroup">确 定</el-button>
										</span>
						</el-dialog>
				<el-dialog title="添加视频" :visible.sync="showaddvideo" width="50%" center>
							<el-form label-width="100px" :model="video" style="margin: 10px auto;">
											<el-form-item label="标题">
												<el-input v-model="video.title"></el-input>
											</el-form-item>
						
											<el-form-item label="视频时长">
												<el-input v-model="video.videoTime"></el-input>
											</el-form-item>
											<el-form-item label="视频">
												<el-upload class="upload-demo" ref="uploadvideo" :action="videouploadurl" list-type="picture-card" :show-file-list="false"
												 name="video" :data="video" :on-change="choicevideoSuccess" :auto-upload="false" :on-success="uploadVideoSuccess" :on-progress="uploadVideoProcess" >
													<video v-if="videoUrl!=''&&loading==false" :src="videoUrl" class="avatar"></video>
													<i v-if="videoUrl==''&&loading==false" class="el-icon-plus avatar-uploader-icon"></i>
													 <el-progress v-if="loading==true"  type="circle" :percentage="videoUploadPercent" style="margin-top: 10px;"></el-progress>
													<div slot="tip" class="el-upload__tip">请保证视频格式正确，且不超过10M</div>
												</el-upload>
											</el-form-item>
						
										</el-form>
								
										<span slot="footer" class="dialog-footer">
											<el-button @click="showaddvideo = false">取 消</el-button>
											<el-button type="primary" @click="addvideo">确 定</el-button>
										</span>
						</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				uploading:false,
				imageUrl: '',
				videoUrl: '',
				videouploadurl: this.yuming + '/post/video?loginId=' + localStorage.getItem('loginid') + '&token=' + localStorage.getItem(
					'Authorization'),
				url: this.yuming + '/post/videoGroup?loginId=' + localStorage.getItem('loginid') + '&token=' + localStorage.getItem(
					'Authorization'),
				fileList: [],
				pagenow: 1,
				all: null,
				searchvalue: '',
				kechenglist: [],
				videogrouplist: [],
				videoUploadPercent:0,
				loading:false,
				multipleSelection: [],
				showtianjia: false,
				showedit: false,
				showaddgroup:false,
				showaddvideo:false,
				editnow:'',
				videogroup: {
					unitName: '',
					unitNumber: '',
					loginId: localStorage.getItem('loginid'),
					groupID:'',
				},
				video:{
					unitID:'',
					title:'',
					videoTime:'',
					loginId: localStorage.getItem('loginid'),
					groupID:'',
				},
				formLabelAlign: {
					title: '',
					price: '',
					type: '',
					source: '',
					introduction: '',
					teacher: '',
				}
			}
		},
		methods: {
			choiceSuccess(file, fileList) {
				console.log(fileList)
				if (fileList.length != 1)
					fileList = fileList.slice(1, 2)
				console.log(fileList)

				this.imageUrl = URL.createObjectURL(file.raw);
			},
			choicevideoSuccess(file, fileList) {
				console.log(fileList)
				if (fileList.length != 1)
					fileList = fileList.slice(1, 2)
				console.log(fileList)

				this.videoUrl = URL.createObjectURL(file.raw);
			},
			addkecheng(){
				this.showtianjia=true
				this.imageUrl= ''
			},
			submitUpload() {
				this.uploading=true
				this.$refs.upload.submit();
		
			},
			successupload() {
				console.log('a')
				this.showtianjia = false
				this.uploading=false
				this.formLabelAlign.title=''
				this.formLabelAlign.price=''
				this.formLabelAlign.type=''
				this.formLabelAlign.source=''
				this.formLabelAlign.introduction=''
				this.formLabelAlign.teacher=''
				
				this.getkechenglist()
				
			},
			uploadVideoSuccess(){
				this.showaddvideo = false
				this.getvideogroup(this.videogroup.groupID)
				this.videoUploadPercent=0
				this.loading=false
			 
			  this.video.title=''
				this.video.videoTime=''
			  
			},
			uploadVideoProcess(event, file, fileList){
			
    this.videoUploadPercent = Number(file.percentage.toFixed(0));
},
			//批量删除课程
			deletelot(){
				for(var i=0;i<this.multipleSelection.length;i++){
					this.handleDelete(i, this.multipleSelection[i])
				}
			},
			//修改章节
			handleEdit(index, row) {
				console.log(index, row);
				this.videogroup.groupID=row.groupID
				this.showedit = true
				this.getvideogroup(row.groupID)
			},
			//添加章节
			addgroup(){
					this.showaddgroup = false
					this.axios({
									method:"post",
									url:this.yuming +'/post/videoGroup/unit'+'?loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization'),
									dataType:'json',
									data:this.videogroup
						}).then((response) => {
									this.getvideogroup(this.videogroup.groupID)
									this.videogroup.unitName=''
									this.videogroup.unitNumber=null
									})
										.catch(error => {
											console.log('失败')
											console.log(error)
										})
									
			},
			editgroup(index, row){
				this.showaddvideo=true
				console.log(index, row);
				this.video.unitID=row.unitID
				this.video.groupID=this.videogroup.groupID
				this.videoUrl=''

			},
			//添加视频
			addvideo(){
				this.loading=true;
				this.$refs.uploadvideo.submit();
			

			},
			//删除章节
			deletegroup(index, row){
				console.log(row)
						this.axios.delete(this.yuming + '/delete/videoUnit', {
										params: {
											unitID:row.unitID,
											groupID: this.videogroup.groupID,
											loginId: localStorage.getItem('loginid'),
											token: localStorage.getItem('Authorization'),
										},
				
									})
									.then((response) => {
										console.log(response.data)
										this.getvideogroup(this.videogroup.groupID) 
									})
									.catch(error => {
									
										console.log(error)
									})				
			},
			//删除视频
			deletvideo(index, row){
				console.log(row)
						this.axios.delete(this.yuming + '/delete/video', {
										params: {
											videoID:row.videoID,
											groupID: this.videogroup.groupID,
											loginId: localStorage.getItem('loginid'),
											token: localStorage.getItem('Authorization'),
										},
				
									})
									.then((response) => {
										console.log(response.data)
										this.getvideogroup(this.videogroup.groupID) 
									})
									.catch(error => {
									
										console.log(error)
									})
			},
			handleDelete(index, row) {
				console.log(index, row);
				this.deletekecheng(row.groupID)
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection)
			},
			handleCurrentChange(val) {
				this.pagenow = val;
				this.getkechenglist()
				console.log(`当前页: ${val}`);
			},
		
			deletekecheng(id) {
				this.axios.delete(this.yuming + '/delete/videoGroup', {
						params: {
							groupID: id,
							loginId: localStorage.getItem('loginid'),
							token: localStorage.getItem('Authorization'),
						},

					})
					.then((response) => {
						console.log(response.data)
						this.getkechenglist() 
					})
					.catch(error => {
					
						console.log(error)
					})
			},
			getvideogroup(groupid){
					this.axios.get(this.yuming + '/list/video/detail?loginId=' + localStorage.getItem('loginid') + '&token=' +
										localStorage.getItem('Authorization'), {
											params: {
												VideoGroupNumber: groupid,
											}
										})
									.then((response) => {
										console.log(response.data.list)
										this.videogrouplist = response.data.list
								
									})
									.catch(error => {
				
										console.log(error)
									})
			},
			getkechenglist() {
				console.log(this.searchvalue)
				this.axios.get(this.yuming + '/videoGroup/msg/manage', {
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
						console.log(response.data.data.all)
						this.kechenglist = response.data.data.info
					})
					.catch(error => {
						this.kechenglist = [];
						console.log(error)
					})
			},



		},
		watch: {
			searchvalue() {
				this.getkechenglist()
			},
		},
		created() {
			this.getkechenglist()

		},
// 		mounted() {
// 						var body = document.getElementsByClassName('mainbox')[0]
// 						console.log(body)
// 						var height = document.documentElement.clientHeight - 240
// 						console.log(height.toString() + 'px')
// 						body.style.height = height.toString() + 'px'
// 						console.log(body.style.height)
// 		}
	}
</script>

<style>
	.zixunpage {
		min-width: 1200px;

	}

	.avatar {
		width: 100%;
		height: 100%;
		display: block;
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
