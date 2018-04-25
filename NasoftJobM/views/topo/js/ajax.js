Nasoft.Ajax = {
	    dataValidation : function(data){
	    	console.log(data);
	    	if(!data.success){
	    		$.alertE(data.message);
	    	}
	    	return data.success;
	    },
		fileRename : function(path,newName){
		var state;
		$.ajax({
			url : $.getRootPath()+"/HandleFile/rename.do",
			type : "post",
			data : {path : path , newName : newName},
			async : false,
			success : function(data){
				state = data;
			}
		});
		return state;
	},
	loadDoc : function(url,selector,fuc){
		$.ajax({
			 url:url,
			 type:'get',
			 dataType:'html',
			 success:function(data){
				 var doc = Nasoft.Util.uiParse($(selector),data);
				 // 参数fuc是用来doc 加载完成后处理一些事件绑定
				 fuc && fuc(doc);
			 }
		});
	},
	ajaxParm : {// 用来存放ajax请求的公共配置参数以及事件
		error : function(XRq, msg, error) {
			console.log({
				'XMLRequest' : XRq
			});
			console.log({
				'错误信息' : msg
			});
			console.log({
				'异常对象' : error
			})
		}
	},
	createDir : function($id,target, dir_name) {// 创建文件夹
		var dirError;
		$.ajax({
			url : $.getRootPath() + '/HandleFile/createDirectory.do',
			data : {
				path : target?target.path+target.separator + dir_name:"" + dir_name
			},
			async : false,
			type : 'post',
			success : function(data) {
				if ('error' !== data) {
					$id.tree("reload",target);
				} else {
					dirError = data;
				}
			}
		});
		return dirError ? false : true;
	},
	deleteFile : function($id, filePath) {// 创建文件夹
		var tabs = $('#stepTabs').tabs('tabs');
		for(var i = 0;i<tabs.length;i++){
              var o = tabs[i];			
			if(i>0){
				var project = o._project;
				if(filePath === project.file_path){
					var onBeforeClose = $('#stepTabs').tabs("options").onBeforeClose;
					$('#stepTabs').tabs("options").onBeforeClose = function(){};
					$('#stepTabs').tabs('close',project.text);
					$('#stepTabs').tabs("options").onBeforeClose = onBeforeClose;
					break;
				}
			}
		}

		$.ajax({
			url : $.getRootPath() + '/HandleFile/directoryLength.do',
			data : {
				path : filePath
			},
			async : false,
			type : 'post',
			dataType : 'json',
			success : function(data) {
				if ('0' === data.length) {
					$.ajax({
						url : $.getRootPath() + '/HandleFile/deleteFolder.do',
						data : {
							path : data.filePath
						},
						async : false,
						type : 'post',
						success : function(data) {
							$.messager.show({
								title : '系统提示',
								msg : '删除成功!',
								timeout : 5000,
								showType : 'slide'
							});
						}
					})
					var opts = $id.tree('options');
					$id.tree(opts);
				} else {
					$.messager.confirm('提示', '文件目录不为空,是否删除?', function(r) {
						if (r) {
							$.ajax({
								url : $.getRootPath()
										+ '/HandleFile/deleteFolder.do',
								data : {
									path : data.filePath
								},
								async : false,
								type : 'post',
								success : function(data) {
									$.messager.show({
										title : '系统提示',
										msg : '删除成功!',
										timeout : 5000,
										showType : 'slide'
									});
								}
							})
							var opts = $id.tree('options');
							$id.tree(opts);
						}
					});
				}
			}
		});
	},
	/**
	 * 获取工程数据主数据的模板json
	 */
	getProjectRootData : function(parojectType) {
		var url, root;
		var urls = [$.getRootPath()+ '/views/topo/transformation/root/root.json',
		            $.getRootPath() + '/views/topo/job/root/root.json',
		            $.getRootPath() + '/views/topo/job/root/root.json']
		url = urls[parseInt(parojectType)-1];
		url && $.ajax({
			url : url,
			type : 'get',
			async : false,
			dataType : 'json',
			success : function(data) {
				console.log(data);
				root = data;
			}
		});
		return root;
	},
	getLinkError : function() {
		var error;
		 $.ajax({
			url : $.getRootPath()+"/views/topo/transformation/error/error.json",
			type : 'get',
			async : false,
			dataType : 'json',
			success : function(data) {
				console.log(data);
				error = data;
			}
		});
		return error;
	}
}