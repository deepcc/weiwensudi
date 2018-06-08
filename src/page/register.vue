<template>
    <div>
        <!-- <head-top></head-top>  -->
				
        <el-row style="margin-top: 20px;">
  			<el-col :span="20" :offset="2">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                   
					<el-form-item label="用户名" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="formData.email"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input type="password" v-model="formData.password"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="password_confirmation">
						<el-input type="password" v-model="formData.password_confirmation"></el-input>
					</el-form-item>

					 

					<el-form-item class="button_submit">
						<el-button type="primary" @click="submitForm('formData')">注册</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row> 
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
				
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						// Object.assign(this.formData, {activities: this.activities}, )
						// console.log(this.formData)
						try{
							let res = await register(this.formData);
							if (res.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          
						        
							}else{
								this.$message({
					            	type: 'error',
					            	message: res.message
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

<style lang="less">
	@import '../style/mixin';
	.text-center{text-align: center;}
	.button_submit{
		text-align: center;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
</style>
