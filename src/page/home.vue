<template>
    <div>
        <head-top></head-top>
		<el-tabs type="border-card">
			<el-tab-pane label="表单提交">
				
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="读者名称" prop="reader_name">
						<el-input v-model="formData.reader_name"></el-input>
					</el-form-item>
					<el-form-item label="阅读书名" prop="book_name">
						<el-input v-model="formData.book_name"></el-input>
					</el-form-item>
					
					<el-form-item label="阅读页面" style="white-space: nowrap;">
						<el-input v-model="formData.begin_page" style="width:50px"></el-input> 至
						<el-input v-model="formData.end_page" style="width:50px"></el-input> 页
					</el-form-item>
					<el-form-item label="精彩摘录" v-for="(item,index) in formData.excerpt" :key="index"  >
						<i  v-if="formData.excerpt.length>1" @click="removeExcerptFn(index)" class="el-icon-close"></i>
						<el-input type="textarea" :rows="5" v-model="item.content"></el-input>
						<div style="padding-top:10px; padding-bottom:10px;">
							<span>第 <el-input v-model="item.page" style="width:50px"></el-input> 页 </span>
							<span><el-button type="text" @click="item.commentFlag = !item.commentFlag">点评</el-button></span>
						
						</div>
						<el-input v-if="item.commentFlag" type="textarea" :rows="3" v-model="item.comment"></el-input>
					</el-form-item>
					<el-form-item label=" " >
						<el-button type="primary" icon="el-icon-arrow-left" @click="addExcerptFn()">  添加摘录</el-button>
					</el-form-item>
					<el-form-item label="心得感悟" >
						<el-input type="textarea" :rows="5" v-model="formData.feelings"></el-input>
					</el-form-item>

					<el-form-item class="button_submit">
						<el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
						<el-button type="primary" @click="yunxiangForm('formData')">生成已有悦享见证</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
			</el-tab-pane>
			<el-tab-pane label="文件提交">
				
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
				<h3 class="text-center" style="margin:20px;">导入文件生成悦享见证</h3>
		        <el-form :model="formDataFile" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="读者名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="" prop="name">
						<!-- <el-input type="button" value="上传文件(.txt)" onclick="upload.click()" class="imgBtn"/>
						<input type="file" accept="image/*" id="upload" name="upload" style="display:none"> -->

						<el-upload
							class="upload-demo"
							ref="upload"
							action=''
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:on-change="handleChange"
							:file-list="fileList"
							accept = ".txt"
							:auto-upload="false">
							<el-button slot="trigger"   type="primary">选取文件</el-button>
							<!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
							<div slot="tip" class="el-upload__tip">只能上传txt文件，且不超过500kb</div>
						</el-upload>
					</el-form-item>
					
					<el-form-item class="">
						<div v-html="contentHtml"></div>
					</el-form-item>

					<el-form-item class="button_submit">
						<el-button type="primary" @click="submitForm('formDataFile')">格式处理</el-button>
						<el-button type="primary" @click="yunxiangForm('formDataFile')">生成悦享见证</el-button>
					</el-form-item>

				</el-form>
  			</el-col>
  		</el-row>
			</el-tab-pane>
		</el-tabs>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {witness} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				fileList:[],
				contentHtml:'1122',
				formDataFile:{
					
					reader_name:'', // 读者名称：

				},
    			formData: {
					
					reader_name:'11111111111', // 读者名称：
					book_name:'111111111', // 阅读书名：
					begin_page:'1',// 阅读页面开始： 
					end_page:'2', // 阅读页面结束：
					excerpt:[{
						page:'1',
						content:'111111111111',
						commentFlag:false // 显示点评
					}], // 精彩摘录：
					feelings:'11111111111111',// 心得感悟： 
       	 			
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
			initData(){},
			addExcerptFn(){// 添加摘要
				var _this = this;
				_this.formData.excerpt.push({
						page:'',
						content:'',
						commentFlag:false
					})
			},
			removeExcerptFn(i){ // 删除摘要
				var _this = this;
				_this.formData.excerpt.splice(i,1)
				
			},
			
		    handleDelete(index){
		    	this.activities.splice(index, 1)
		    },
		    submitForm(formName) {
				console.log(this.formData);
				
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						// Object.assign(this.formData, {activities: this.activities}, )
						console.log(this.formData)
						try{
							let result = await witness(this.formData);
							if (result.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          
						        
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
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handleChange(file, fileList) {
				var _this = this;
				if (file.raw) {					
					let reader = new FileReader()  
                    reader.onload = function (e) {
						var html = e.target.result.replace(/[\n|\r\n]+/g,'<br>')
						html = html.replace(/——P\.[0-9]+/g,function($1,$2){
							console.log($1,$2);
							return '<div style="text-align:right">'+$1+'</div>'
						})
                       _this.contentHtml = html;
                    };
                    reader.readAsText(file.raw,'gb2312');
                
				}
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			}
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
