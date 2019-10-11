<template>
	<div>
		<el-container>
			<el-header style="background-color: #6972AB;">
				<el-row style="float: left;">
					<el-col :span="1/2"> <img src="../../assets/icon/logo.png" style="margin: 10px auto;"></el-col>
					<el-col :span="4"> <span style="font-size: 25px;color: #FFFFFF;margin-left: 20px;line-height: 60px;white-space: nowrap;"><b>新职通</b></span></el-col>
				</el-row>
				<el-button type="text" @click="$router.push('/')" style="float: right;">
					<i class="iconfont icon-fanhui" style="font-size: 25px;line-height: 40px;color: #FFFFFF;"></i>
					<span style="color: #FFFFFF;font-size: 15px;margin-left: 5px;">返回</span>
				</el-button>
			</el-header>
			<el-main style="padding-top: 20px;">
				<div style="text-align: center;border-bottom: 1px solid #CCCCCC;padding-bottom: 30px;white-space: nowrap;">
					<img src="../../assets/icon/zhaohui.png" style="width: 100px;vertical-align: bottom">
					<span style="font-size: 35px;width: 300px;white-space: nowrap;">找回密码</span>
				</div>
				<el-steps :active="active" simple process-status="wait" style="width: 300px;padding-left: 0px;padding-top: 50px;padding-bottom: 20px;margin-left: 50px;background-color: #FFFFFF;white-space: nowrap;">
					<el-step title="确认账号"></el-step>
					<el-step title="重置密码"></el-step>
				</el-steps>
				<div v-show="active==1" style="margin-left: 50px;">
					<span style="line-height: 80px;white-space: nowrap;font-size: 20px;">请填写您需要找回的账号：</span><br>
					<el-input v-model="input" placeholder="请输入您的手机号" style="width: 300px;margin-bottom: 20px;"></el-input><br>
					<el-input v-model="input" placeholder="请输入验证码" style="width: 150px;margin-bottom: 20px;"></el-input>
					
					<canvas id="CAPTCHA" v-on:click="capOn" style="height: 39px;vertical-align:middle;width: 76px;"></canvas>
					<span v-on:click="capOn" style="color: #999999;width: 50px;font-size: 10px;">
						<span>换一张</span>
							<i class="iconfont icon-huanfang" style="font-size: 10px;line-height: 40px;"></i>
					</span><br>
					 <el-button type="primary" style="width: 130px;margin-top: 20px;" @click="next">下一步</el-button>
				</div>
				<div v-show="active==2"></div>
			</el-main>
			<el-footer style="text-align: center;position: absolute;bottom: 0px;width: 100%;background-color: #D7D7D7;font-size: 10px;line-height: 30px;">
				<span style="white-space: nowrap;line-height: 60px;">www. xinzhitong. com版权所有新职通一新时期务工人员转 型升级助推者备案号粤ICP备10054973号-5</span>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	var yanzhengma = ""

	export default {
			data() {
				return {
					input:'',
					active:1,
					username:'',
					password:'',
					checknum:'',
				
				}
			},
			methods:{
				next(){
					this.active=2
				},
				randomNum: function(min,max){
					return Math.floor(Math.random()*(max-min)+min);
				},
				randomColor: function(min,max){
					var _r = this.randomNum(min,max);
					var _g = this.randomNum(min,max);
					var _b = this.randomNum(min,max);
					return "rgb("+_r+","+_g+","+_b+")";
				},
				drawPic: function(){
					var $canvas = document.getElementById("CAPTCHA");
					var _str = "0123456789";//设置随机数库
					var _picTxt = "";//随机数
					var _num = 4;//4个随机数字
					var _width = $canvas.width;
					var _height = $canvas.height;
					var ctx = $canvas.getContext("2d");//获取 context 对象
					ctx.textBaseline = "bottom";//文字上下对齐方式--底部对齐
					ctx.fillStyle = "#8998dc"//填充画布颜色
					ctx.fillRect(0,0,_width,_height);//填充矩形--画画
					for(var i=0; i<_num; i++){
						var x = (_width-10)/_num*i+10;
						var y = this.randomNum(_height/2,_height);
						var deg = this.randomNum(-45,45);
						var txt = _str[this.randomNum(0,_str.length)];
						_picTxt += txt;//获取一个随机数
						ctx.fillStyle = this.randomColor(10,100);//填充随机颜色
						ctx.font = this.randomNum(40,90)+"px SimHei";//设置随机数大小，字体为SimHei
						ctx.translate(x,y);//将当前xy坐标作为原始坐标
						ctx.rotate(deg*Math.PI/180);//旋转随机角度
						ctx.fillText(txt, 0,0);//绘制填色的文本
						ctx.rotate(-deg*Math.PI/180);
						ctx.translate(-x,-y);
					}
					for(var i=0; i<_num; i++){
						//定义笔触颜色
						ctx.strokeStyle = this.randomColor(90,180);
						ctx.beginPath();
						//随机划线--4条路径
						ctx.moveTo(this.randomNum(0,_width), this.randomNum(0,_height));
						ctx.lineTo(this.randomNum(0,_width), this.randomNum(0,_height));
						ctx.stroke();
					}
					for(var i=0; i<_num*10; i++){
						ctx.fillStyle = this.randomColor(0,255);
						ctx.beginPath();
						//随机画原，填充颜色
						ctx.arc(this.randomNum(0,_width),this.randomNum(0,_height), 1, 0, 2*Math.PI);
						ctx.fill();
					}
					return _picTxt;//返回随机数字符串
				},
				capOn(e){
					e.preventDefault();
					yanzhengma = this.drawPic();
					console.log(yanzhengma);
				}
			},
			mounted(){
				
				yanzhengma = this.drawPic();
				console.log(yanzhengma);
				
			}
		
	}
</script>

<style>
.el-step__title{
	white-space: nowrap;
}
</style>
