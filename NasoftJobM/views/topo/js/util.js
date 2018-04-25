Nasoft.Util={
		createEditor : function(options){
			 ace.require("ace/ext/language_tools");
		        var editor = ace.edit(options.ele);
		        editor.session.setMode("ace/mode/"+options.mode);
		        editor.setOptions({
		        	enableBasicAutocompletion: true,
		        	enableSnippets: true,
		        	enableLiveAutocompletion: true
		   });
		   return editor;
		},
	    uiParse : function(container,html){
	    	var div = $("<div></div>");// 创建一个div文档对象
	    	var html = $(html)
	 		    div.append(html);// 将获取到的参数页面的html加入div
	 		    container.append(div);// 将创建的div加入主页面
	 		    $.parser.parse(html.parent());// 解析节点参数页面中的easyui组件
	 		    return html[0];
	    },
		/**
		 * @param parent 文件树的容器
		 * @returns {___anonymous_parjectFileTree} 文件树jQuery对象
		 */
		createProjectFileTree:function(parent){
				var projectFileTree = null;
				if(parent){
					parjectFileTree=$('<ul></ul>');
					parent.empty().append(parjectFileTree);
				}
				window.parjectFileTree=parjectFileTree;
				return parjectFileTree;
		},
		/**
		 * @author rsq0113
		 * 创建一个可以操作数字,自增,自减,归零的对象
		 */
		 myNumber:function(){
	           function  Obj(){
	        	   this.number=0;
	        	   this.handle=function(){
	                               
				  var add,sub,zero,set,that=this;
				  set=function(){
					  if(typeof arguments[0]!=='number') throw new Error('请传入一个数字类型的参数!');
					  that.number=arguments[0];
				  }
				  zero=function(){
					  that.number=0;
				  }
				  add=function(){
					  if(arguments[0]){
						  if(typeof  arguments[0]!='number') throw new Error('参数不是数字');
						  that.number+=arguments[0];
					  }else{
						  that.number++;//每次都增加一
					  }
					 
				};
				 sub=function(){
					 if(arguments[0]){
						  if(typeof  arguments[0]!='number') throw new Error('参数不是数字');
						  that.number-=arguments[0]
					  }else{
						  that.number--;
					  }
				 };
				 if(arguments.length>=1 && arguments[0]==='add'){
					 
					 arguments[1] ||  add();//调用增加
					 arguments[1] &&  add(arguments[1]);//调用增加
				 }else if(arguments.length>=1 && arguments[0]==='sub'){
					 arguments[1] ||  sub();//调用递减		
					 arguments[1] && sub(arguments[1])
				 }else if(arguments.length>=1 && arguments[0]==='zero'){
					 zero();//归零
				 }else if(arguments.length>=2 && arguments[0]==='set'){
					 set(arguments[1]);//设置数字
				 }
				 return this.number;
			
	             }
	           }
	         return new Obj();
			},
		createTab:function(id){
			var parent=$('#'+id),tab=document.getElementById('_create_tab_');
			if(!tab){
				tab=$('<div id="_create_tab_"></div>');
			}else{
				$(tab).remove();
				tab=$('<div id="_create_tab_"></div>');
			}
			parent.append(tab);
			return tab;
		},
		/**
		 * @author rsq0113
		 * 构造一个弹出窗口
		 */
		createWindow:function(options,fun){
			var isHaven=$('#'+options.id).length;
			if(isHaven){
				return $("#"+options.id).get(0);
			};
			var thisWin=document.createElement('div');
			thisWin.setAttribute("id", options.id);
			fun && fun(thisWin);
			return thisWin;
		},
		/**
		 * @author rsq0113
		 * 构造一个数据表格
		 */
		createTable:function(options){
			var isHaven=$('#'+options.id).length;
			if(isHaven){throw new Error("id冲突!"); };
			var thisTable=document.createElement('table');
			$(thisTable).datagrid(options);
			return $(thisTable);
		},
		/**
		 *打开最近配置
		 * @param node
		 */
		_open_configuration:function(tab){
			console.log(tab)
			var path=tab.project().file_path;
			console.log(path)
           //将字母/替换成\
            var path_a=path.replace(/\\/g, "/");
            var kk = path_a.split("/");//以'/'作为分隔字符串
			var name=tab.project().project_name;
			var name_a=name+'/'+kk[1];//组成 文件/工程
			var	obj={project_name:name_a,file_path:path_a};
	    	$.ajax({
	    		// 请求方式为get
	    		type : "POST",
	    		// json文件位置
	    		url : $.getRootPath() + '/views/topo/jsonData/Configuration.json',
	    		async:false,
	    		// 返回数据格式为json
	    		dataType : "json",
	    		// 请求成功完成后要执行的方法
	    		success : function(mykey) {
	    			var ischange = false;
    				$.each(mykey,function(i,o){
    					if(o['file_path']===obj['file_path']){
    						mykey.splice(i,1);
							mykey.unshift(obj);
							ischange = true;
							return false;
						}
    				});
	    			if(mykey.length==5){
	    				if(!ischange){
	    					mykey.unshift(obj);
	    					mykey.pop();
	    				}
	    			   var	keycodeString=JSON.stringify(mykey);
	    			}else{
	    				if(!ischange){
	    					mykey.unshift(obj);
	    				}
		    	}
	    			var	keycodeString=JSON.stringify(mykey);
		    		console.log(keycodeString)
		    		updateConfiguration(keycodeString);	    	
	    		}
	    	});
//把修改后的值存入json文件中
function updateConfiguration(keycodeString){
	$.ajax({
		url:$.getRootPath()+'/KeyCode/handleConfiguration.do',
		data:{keycodeset:keycodeString},
		async:false,
		type:'POST',
		dataType:'json',
		success : function(mykey) {
			var pathObj = {};
	    	var item = $('#filemenu').menu('findItem','打开最近配置');  // 查找“打开最近配置”项   	
  			$.each(mykey,function(i,o){
  				var itemEl = $('#Configuration'+i).remove();
  				var file_path = o.file_path;
				var text = o.project_name;
				pathObj[text] = file_path;
				$('#filemenu').menu('appendItem', {
					id:'Configuration'+i,
					parent: item.target,  // 设置父菜单元素
					text: text,	
					onclick: function(node){	
						var text = node.target.innerHTML;
						var file_path = pathObj[text];
						Nasoft.Project.openProject(file_path);
					}
				});	
  			});		
			}
	});
	
}
},
   //查询json文件信息并把值写入menu菜单树的子菜单中
    _configuration:function(){
    	var item = $('#filemenu').menu('findItem','打开最近配置');  // 查找“打开最近配置”项   	
    	$.ajax({
    		// 请求方式为get
    		type : "GET",
    		// json文件位置
    		url : $.getRootPath() + '/views/topo/jsonData/Configuration.json',
    		async:false,
    		// 返回数据格式为json
    		dataType : "json",
    		// 请求成功完成后要执行的方法
    		success : function(mykey) {
    			var pathObj = {};
    			for(var i=mykey.length-1;i>=0;i--){
    				var file_path = mykey[i].file_path;
    				var text = mykey[i].project_name;
    				pathObj[text] = file_path;
    				$('#filemenu').menu('appendItem', {
    					id:'Configuration'+i,
    					parent: item.target,  // 设置父菜单元素
    					text: text,
    					onclick: function(node){
    						//补充打开文件方法
    					   var text = node.target.innerHTML;
    					   var file_path = pathObj[text];
    					   Nasoft.Project.openProject(file_path);
    					}
    				});	
    				
    			}
    		}
    	})
    	
    	
    },
    /**
     * 字段传递,获取下拉列表的字段name
     */
    file_name_combobox:function(transfer){
    	if(!!transfer){
    	var data=[]
    	for (var i = 0; i < transfer.length; i++) {		
    		console.log(transfer[i].name);	
    		var data_a={"text":transfer[i].name,"value":transfer[i].name}
    		data.push(data_a)
    	}
    	return data;
    	}else{
    	return [];
    	}
    },
    /**
     * 字段传递,复制transfer
     */
    transferArray_copy:function(transfer){
    	var data=[]
    	for (var i = 0; i < transfer.length; i++) {			
    		var data_a=$.extend(true, {}, transfer[i]);
    		data.push(data_a)
    	}
    	return data;
    },
  //传递的字段去重复
    transferFns_repeat_filed : function (transferFiled){
    	for(var i=0;i<transferFiled.length;i++){
    		for(j=i+1;j<transferFiled.length;j++){
    			if(transferFiled[i].name===transferFiled[j].name){
    				transferFiled.splice(j, 1);
    			}
    		}
    	}
    	return transferFiled;
    },
    treeExpand:function(node){
    	var child_data=null;
		if(node.state=='closed'|| node.children){// 判断此节点是否为文件夹,是则同步请求数据
			$.ajax({
				url:$.getRootPath()+'/HandleFile/getFileList.do',
				data:{path:node.path},
				type:"post",
				async:false,
				dataType:'json',
				success:function(child){
					child_data=child;
			}
			});
			if(node.children && node.children.length>0){
				var that = this;
				var childs = $(this).tree("getChildren",node.target);
				$.each(childs,function(i,o){
					$(that).tree("remove",o.target);
				});
				$(this).tree('append', {// 更新子节点
					parent: node.target,
					data: child_data
				});
			}else if(child_data.length>0){											
				$(this).tree('append', {// 添加子节点
					parent: node.target,
					data: child_data
				});
			}else{
				console.log('空文件夹')
				return false;// 阻止打开节点
			}	
		}else{
			return false;// 阻止打开节点
		}
    },    
    treeExpandTest:function(node){
    	var child_data=null;
		if(node.state=='closed'|| node.children){// 判断此节点是否为文件夹,是则同步请求数据
			$.ajax({
				url:$.getRootPath()+'/HandleFile/getFileListPostfix.do',
				data:{path:node.path,postfix:node.postfix,openPath:node.openPath},
				async:false,
				type:"post",
				dataType:'json',
				success:function(child){
					child_data=child;
			}
			});
			console.log(child_data);
			if(node.children && node.children.length>0){
				var that = this;
				var childs = $(this).tree("getChildren",node.target);
				$.each(childs,function(i,o){
					$(that).tree("remove",o.target);
				});
				$(this).tree('append', {// 更新子节点
					parent: node.target,
					data: child_data
				});
			}else if(child_data.length>0){											
				$(this).tree('append', {// 添加子节点
					parent: node.target,
					data: child_data
				});
			}else{
				console.log('空文件夹')
				return false;// 阻止打开节点
			}	
		}else{
			return false;// 阻止打开节点
		}
    }
}
