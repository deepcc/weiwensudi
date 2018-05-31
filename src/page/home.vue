<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="读者名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="阅读书名" prop="description">
						<el-input v-model="formData.description"></el-input>
					</el-form-item>
					
					<el-form-item label="阅读页面" style="white-space: nowrap;">
						<el-input v-model="formData.startPageNum" style="width:50px"></el-input> 至
						<el-input v-model="formData.endPageNum" style="width:50px"></el-input> 页
					</el-form-item>
					<el-form-item label="精彩摘录" prop="zhailu">
						<div style="padding-bottom:10px;">
							第 <el-input v-model="formData.pagenum" style="width:50px"></el-input> 页
						</div>
						<el-input type="textarea" rows="5" v-model="formData.zhailu"></el-input>
					</el-form-item>
					<el-form-item label=" " >
						<el-button type="primary" @click="addZhailuFn()">添加摘录</el-button>
					</el-form-item>
					<el-form-item label="心得感悟" prop="ganwu">
						<el-input type="textarea" rows="5" v-model="formData.ganwu"></el-input>
					</el-form-item>

					<el-form-item class="button_submit">
						<el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
						<el-button type="primary" @click="yunxiangForm('formData')">生成已有悦享见证</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
				<h3 class="text-center" style="margin:20px;">导入文件生成悦享见证</h3>
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="读者名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="" prop="name">
						<el-input type="button" value="上传文件(.txt)" onclick="upload.click()" class="imgBtn"/>
						<input type="file" accept="image/*" id="upload" name="upload" style="display:none">
					</el-form-item>
					<el-form-item class="button_submit">
						<el-button type="primary" @click="submitForm('formData')">格式处理</el-button>
						<el-button type="primary" @click="yunxiangForm('formData')">生成悦享见证</el-button>
					</el-form-item>

				</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			city: {},
    			formData: {
					name: '', //店铺名称
					address: '', //地址
					latitude: '',
					longitude: '',
					description: '', //介绍
					promotion_info: '',
       	 			
		        },
		        rules: {
					name: [
						{  message: '请输入名称', trigger: 'blur' },
					],
					address: [
						{ required: true, message: '请输入详细', trigger: 'blur' }
					],
					pagenum: [
						{ required: true, message: '请输入页码' },
						{ type: 'number', message: '页码码必须是数字' }
					],
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
    		
		    handleDelete(index){
		    	this.activities.splice(index, 1)
		    },
		    submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						Object.assign(this.formData, {activities: this.activities}, {
							category: this.selectedCategory.join('/')
						})
						try{
							let result = await addShop(this.formData);
							if (result.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          	this.formData = {
									name: '', //店铺名称
									address: '', //地址
									latitude: '',
									longitude: '',
									description: '', //介绍
									phone: '',
									promotion_info: '',
									float_delivery_fee: 5, //运费
									float_minimum_order_amount: 20, //起价
									is_premium: true,
									delivery_mode: true,
									new: true,
									bao: true,
									zhun: true,
									piao: true,
									startTime: '',
				       	 			endTime: '',
				       	 			image_path: '',
				       	 			business_license_image: '',
				       	 			catering_service_license_image: '',	
						        };
						        this.selectedCategory = ['快餐便当', '简餐'];
						        this.activities = [{
						        	icon_name: '减',
						        	name: '满减优惠',
						        	description: '满30减5，满60减8',
							    }];
							}else{
								this.$message({
					            	type: 'error',
					            	message: result.message
					          	});
							}
							console.log(result)
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
