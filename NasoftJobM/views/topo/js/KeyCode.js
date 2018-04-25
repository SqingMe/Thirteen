Nasoft.KeyCode = function () {
	   this.SetKeyFns = function(){
		 //保存
		   this.save = function(mykey,e){
				if (e.ctrlKey===mykey.save.ctrlKey && e.shiftKey===mykey.save.shiftKey && e.altKey===mykey.save.altKey && e.keyCode===mykey.save.keyCode) {
					setTimeout(function(){
						Nasoft.TopButton.File.fns._save_file();// ※这里执行将页面数据保存到db的方法
						
					},1)
					e.keyCode = 0;
					if (e.preventDefault) {  // firefox
						e.preventDefault();
					} else { // other
						e.returnValue = false;
					}
				}       			
			}
		 //复制
		   this.copy = function(mykey,e){
				if (e.ctrlKey===mykey.copy.ctrlKey && e.shiftKey===mykey.copy.shiftKey && e.altKey===mykey.copy.altKey && e.keyCode===mykey.copy.keyCode) {
					setTimeout(function(){
						copyStep();// ※这里执行将页面数据保存到db的方法
						
					},1)
					e.keyCode = 0;
					if (e.preventDefault) {  // firefox
						e.preventDefault();
					} else { // other
						e.returnValue = false;
					}
				}       					
       }
		 //剪切
		   this.shear = function(mykey,e){
				if (e.ctrlKey===mykey.shear.ctrlKey && e.shiftKey===mykey.shear.shiftKey && e.altKey===mykey.shear.altKey && e.keyCode===mykey.shear.keyCode) {
					setTimeout(function(){
						
						cutStep();// ※这里执行将页面数据保存到db的方法
						
					},1)
					e.keyCode = 0;
					if (e.preventDefault) {  // firefox
						e.preventDefault();
					} else { // other
						e.returnValue = false;
					}
				}       	
			}
		 //粘贴
		   this.paste = function(mykey,e){
				if (e.ctrlKey===mykey.paste.ctrlKey && e.shiftKey===mykey.paste.shiftKey && e.altKey===mykey.paste.altKey && e.keyCode===mykey.paste.keyCode) {
		    		setTimeout(function(){
		    			
		    			pasteStep();// ※这里执行将页面数据保存到db的方法
		    			
		    		},1)
		    		e.keyCode = 0;
		    		if (e.preventDefault) {  // firefox
		    			e.preventDefault();
		    		} else { // other
		    			e.returnValue = false;
		    		}
		    	}       	
		}
		 //全选
		   this.choose = function(mykey,e){
				if (e.ctrlKey===mykey.choose.ctrlKey && e.shiftKey===mykey.choose.shiftKey && e.altKey===mykey.choose.altKey && e.keyCode===mykey.choose.keyCode) {
		    		setTimeout(function(){
		    			selectAllStep();// ※这里执行将页面数据保存到db的方法
		    		},1)
		    		e.keyCode = 0;
		    		if (e.preventDefault) {  // firefox
		    			e.preventDefault();
		    		} else { // other
		    			e.returnValue = false;
		    		}
		    	}       	
		}
		 //删除步骤
		   this.del = function(mykey,e){
				if (e.ctrlKey===mykey.del.ctrlKey && e.shiftKey===mykey.del.shiftKey && e.altKey===mykey.del.altKey && e.keyCode===mykey.del.keyCode) {
			  		setTimeout(function(){
			  			
			  			Nasoft.HandleStep.deleteStep();// ※这里执行将页面数据保存到db的方法
			  			
			  		},1)
			  		e.keyCode = 0;
			  		if (e.preventDefault) {  // firefox
			  			e.preventDefault();
			  		} else { // other
			  			e.returnValue = false;
			  		}
			  	}       	
			}
		 //搜索
		   this.search = function(mykey,e){
				if (e.ctrlKey===mykey.search.ctrlKey && e.shiftKey===mykey.search.shiftKey && e.altKey===mykey.search.altKey && e.keyCode===mykey.search.keyCode) {
			   		setTimeout(function(){
			   			
			   			Nasoft.TopButton.Edit.fns.menu_search_data();  // ※这里执行将页面数据保存到db的方法        			
			   		},1)
			   		e.keyCode = 0;
			   		if (e.preventDefault) {  // firefox
			   			e.preventDefault();
			   		} else { // other
			   			e.returnValue = false;
			   		}
			   	}       	
			}
		 //打开
		   this.openFile = function(mykey,e){
				if (e.ctrlKey===mykey.openFile.ctrlKey && e.shiftKey===mykey.openFile.shiftKey && e.altKey===mykey.openFile.altKey && e.keyCode===mykey.openFile.keyCode) {
			   		setTimeout(function(){
			   			
			   			Nasoft.TopButton.File.fns._open_project();// ※这里执行将页面数据保存到db的方法
			   			
			   		},1)
			   		e.keyCode = 0;
			   		if (e.preventDefault) {  // firefox
			   			e.preventDefault();
			   		} else { // other
			   			e.returnValue = false;
			   		}
			   	}       	
			}
		 //新建工程
		  this.newProject = function(mykey,e){
		   			if (e.ctrlKey===mykey.newProject.ctrlKey && e.shiftKey===mykey.newProject.shiftKey && e.altKey===mykey.newProject.altKey && e.keyCode===mykey.newProject.keyCode) {
		      		setTimeout(function(){
		      			
		      			Nasoft.TopButton.File.fns._new_project_plumbing();// ※这里执行将页面数据保存到db的方法
		      			
		      		},1)
		      		e.keyCode = 0;
		      		if (e.preventDefault) {  // firefox
		      			e.preventDefault();
		      		} else { // other
		      			e.returnValue = false;
		      		}
		      	}       	
		   }
		//保存为
		  this.saveAs = function(mykey,e){
		  		if (e.ctrlKey===mykey.saveAs.ctrlKey && e.shiftKey===mykey.saveAs.shiftKey && e.altKey===mykey.saveAs.altKey && e.keyCode===mykey.saveAs.keyCode) {
		    		setTimeout(function(){
		    			
		    			Nasoft.TopButton.File.fns._save_as();// ※这里执行将页面数据保存到db的方法
		    			
		    		},1)
		    		e.keyCode = 0;
		    		if (e.preventDefault) {  // firefox
		    			e.preventDefault();
		    		} else { // other
		    			e.returnValue = false;
		    		}
		    	}       	
		  }
		//新建文件
		  this.newFile = function(mykey,e){
		  			if (e.ctrlKey===mykey.newFile.ctrlKey && e.shiftKey===mykey.newFile.shiftKey && e.altKey===mykey.newFile.altKey && e.keyCode===mykey.newFile.keyCode) {
		      		setTimeout(function(){
		      			
		      			Nasoft.TopButton.File.fns._new_project_file();// ※这里执行将页面数据保存到db的方法
		      			
		      		},1)
		      		e.keyCode = 0;
		      		if (e.preventDefault) {  // firefox
		      			e.preventDefault();
		      		} else { // other
		      			e.returnValue = false;
		      		}
		      	}       	
		  }
		//导入
		 this.import = function(mykey,e){

		  		if (e.ctrlKey===mykey.import.ctrlKey && e.shiftKey===mykey.import.shiftKey && e.altKey===mykey.import.altKey && e.keyCode===mykey.import.keyCode) {
		    		setTimeout(function(){
		    			
		    			Nasoft.TopButton.File.fns._import_file();// ※这里执行将页面数据保存到db的方法
		    			
		    		},1)
		    		e.keyCode = 0;
		    		if (e.preventDefault) {  // firefox
		    			e.preventDefault();
		    		} else { // other
		    			e.returnValue = false;
		    		}
		    	}       	
		  }
		//关闭
		 this.close = function(mykey,e){
		 		if (e.ctrlKey===mykey.close.ctrlKey && e.shiftKey===mykey.close.shiftKey && e.altKey===mykey.close.altKey && e.keyCode===mykey.close.keyCode) {
		   		setTimeout(function(){
		   			
		   			Nasoft.TopButton.File.fns._close_project();// ※这里执行将页面数据保存到db的方法
		   			
		   		},1)
		   		e.keyCode = 0;
		   		if (e.preventDefault) {  // firefox
		   			e.preventDefault();
		   		} else { // other
		   			e.returnValue = false;
		   		}
		   	}       	
		 }
		//关闭所有
		 this.closeAll = function(mykey,e){

		 			if (e.ctrlKey===mykey.closeAll.ctrlKey && e.shiftKey===mykey.closeAll.shiftKey && e.altKey===mykey.closeAll.altKey && e.keyCode===mykey.closeAll.keyCode) {
		    		setTimeout(function(){
		    			
		    			Nasoft.TopButton.File.fns._close_all();// ※这里执行将页面数据保存到db的方法
		    			
		    		},1)
		    		e.keyCode = 0;
		    		if (e.preventDefault) {  // firefox
		    			e.preventDefault();
		    		} else { // other
		    			e.returnValue = false;
		    		}
		    	}       	
		 }
		//导出
		this.exp = function(mykey,e){
		 	
		 		if (e.ctrlKey===mykey.exp.ctrlKey && e.shiftKey===mykey.exp.shiftKey && e.altKey===mykey.exp.altKey && e.keyCode===mykey.exp.keyCode) {
		   		setTimeout(function(){
		   			
		   			Nasoft.TopButton.File.fns._export_file();// ※这里执行将页面数据保存到db的方法
		   			
		   		},1)
		   		e.keyCode = 0;
		   		if (e.preventDefault) {  // firefox
		   			e.preventDefault();
		   		} else { // other
		   			e.returnValue = false;
		   		}
		   	}       	
		 }
		//注销
		this.cancel = function(mykey,e){
				if (e.ctrlKey===mykey.cancel.ctrlKey && e.shiftKey===mykey.cancel.shiftKey && e.altKey===mykey.cancel.altKey && e.keyCode===mykey.cancel.keyCode) {
		  		setTimeout(function(){
		  			
		  			Nasoft.TopButton.File.fns._log_off();// ※这里执行将页面数据保存到db的方法
		  			
		  		},1)
		  		e.keyCode = 0;
		  		if (e.preventDefault) {  // firefox
		  			e.preventDefault();
		  		} else { // other
		  			e.returnValue = false;
		  		}
		  	}       		
		}
		//退出
		this.exit = function(mykey,e){
					if (e.ctrlKey===mykey.exit.ctrlKey && e.shiftKey===mykey.exit.shiftKey && e.altKey===mykey.exit.altKey && e.keyCode===mykey.exit.keyCode) {
		   		setTimeout(function(){
		   			
		   			Nasoft.TopButton.File.fns._quit();// ※这里执行将页面数据保存到db的方法
		   			
		   		},1)
		   		e.keyCode = 0;
		   		if (e.preventDefault) {  // firefox
		   			e.preventDefault();
		   		} else { // other
		   			e.returnValue = false;
		   		}
		   	}       		   	
		}
	   }
},
Nasoft.KeyCode.prototype.keycode_load = function(){
	var that = this;
	$.ajax({
		// 请求方式为get
		type : "GET",
		// json文件位置
		url : $.getRootPath() + '/views/topo/jsonData/KeyCode.json',
		// 返回数据格式为json
		dataType : "json",
		// 请求成功完成后要执行的方法
		success : function(keyall) {
			that.SetKey(keyall);
		}
	})
}
Nasoft.KeyCode.prototype.SetKey = function(mykey){
	var that = this;
	var setKeyFns = new that.SetKeyFns();
	function onkeydown(e) {
			for(var fn in setKeyFns){
				setKeyFns[fn](mykey,e);
		}
	} 
	  document.addEventListener("keydown",onkeydown,false);
	  $(document).data("keydown",onkeydown);
	 
	}
