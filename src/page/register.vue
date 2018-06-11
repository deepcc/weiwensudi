<template>
    <div  class="login_page fillcontain">
        <!-- <head-top></head-top>  -->
		<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer"  >
		  		<div class="manage_tip">
		  			<p>微文速递-注册</p>    
		  		</div>
		    	<el-form :model="formData" :rules="rules" ref="formData" label-width="70px" class="demo-formData">
                   
					<el-form-item label="用户名" prop="name">
						<el-input v-model="formData.name" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="formData.email" placeholder="邮箱"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input type="password" v-model="formData.password" placeholder="密码"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="password_confirmation">
						<el-input type="password" v-model="formData.password_confirmation" placeholder="确认密码"></el-input>
					</el-form-item>

					<el-form-item>
				    	<el-button  :loading="registerLoading" type="success" @click="submitForm('formData')" class="submit_btn">注册</el-button>
				  	</el-form-item>

					
				</el-form>
				<!-- <p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p> -->
	  		</section>
	  	</transition>
        
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {witness, register} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				fileList:[],
				contentHtml:'1122',
				registerLoading:false,
    			formData: {
					
					name:'章程', // 用户名
					email:'d@qq.com', // 邮箱
					password:'fds322',// 密码 
					password_confirmation:'fds322', // 确认密码
       	 			
		        },
		        rules: {
					name: [
						{  message: '请输入用户名', trigger: 'blur' },
					] 
				},  
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		this.initData();
    	},
    	methods: {
			initData(){}, 
		    submitForm(formName) {
				console.log(this.formData);
				var _this = this;
										// _this.$router.push('/')
				this.registerLoading= true;
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						// Object.assign(this.formData, {activities: this.activities}, )
						// console.log(this.formData)
						try{
							let res = await register(this.formData);
							if (res.code == 0) {
								this.$message({
					            	type: 'success',
									message: '注册成功',
									onClose(){
										_this.$router.push('/')
									}
					          	});
							}else{
								this.$message({
					            	type: 'error',
					            	message: res.msg
					          	});
							}
							console.log(res)
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
			}, 
		}
    }
</script>
<style scoped>
.el-form-item{position: relative;}
 .el-form-item .el-icon-close{display:none;position: absolute;right: 5px;top:5px;;}
 .el-form-item:hover .el-icon-close{display:block}
</style>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #00b050;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 300px);
		.ctp(320px, 300px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
