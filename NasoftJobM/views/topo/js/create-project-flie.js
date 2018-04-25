Nasoft.Window.createProject = {
		/**
		 * @author rsq0113
		 * 重置输入项
		 */
		resetInput : function() { 
			  $('#user_newFile').show();
			  $('#projectChild_name').textbox('setValue','');
			  $('#projectFile_name').textbox('setValue','');
			  $('#project_type').combobox('setValue','0');
		},
		projectTreeOpts : function() {
			return {
			lines:true,
			onLoadSuccess : function(){
				$(this).on("contextmenu",function(){
					return false;
				});
			},
			onBeforeEdit:function(node){
				node.oldtext = node.text;
			},
			onAfterEdit:function(node){
				var state = Nasoft.Ajax.fileRename(node.path,node.text);
				if(state === "0"){
					alert("修改失败");
					return false;
				}else if(state === "2"){
					node.text = node.oldtext;
					$(node.target).find(".tree-title").text(node.text);
					alert("文件名重复");
					return false;
				}
				$(this).tree("reload");
			},
			onContextMenu : Nasoft.Window.createProject.show_project_menus,
			onBeforeExpand:Nasoft.Util.treeExpand
		}
		},
		
		show_project_menus : function(e,node){
			$(this).tree("select",node.target);
			// 获取目录操作菜单的“重命名”选项
			var d = $("#project_menus").menu("getItem",$("#rename_project_d"));
			var n = $("#project_menus").menu("getItem",$("#project_new"));
			// 是文件夹则启用重命名，并且将当前树对象以及需要操作的节点传递给菜单
			$("#project_menus").data("target",{target:this,node:node});
			if(node.state==="closed" || node.children){
				$("#project_menus").menu("enableItem",d.target);
				$("#project_menus").menu("enableItem",n.target);
			}else{
				// 是文件就禁用重命名
				$("#project_menus").menu("disableItem",d.target);
				$("#project_menus").menu("disableItem",n.target);
			}
			// 显示菜单
			$("#project_menus").menu('show', {    
				  left: e.pageX,    
				  top: e.pageY    
				});  
		},
		// 初始化菜单
		init_menus_doc : function(){
			var that = this;
			Nasoft.Ajax.loadDoc($.getRootPath()+"/views/topo/menuHtml/projectMenus.html","body",function(){
				var fns = {
						del_project_d : function(){
							var target = $("#project_menus").data("target");
							Nasoft.Ajax.deleteFile($(target.target),target.node.path);
						},
						rename_project_d : function(){
							var target = $("#project_menus").data("target");
							$(target.target).tree("beginEdit",target.node.target);
						},
						project_new_dir : function(){
							var target = $("#project_menus").data("target");
							Nasoft.Ajax.createDir($(target.target),target.node,"新建文件夹");
						},
						new_data_tran : function(){
							$('#project_new_file_win').data("new_file_type","1");
							$('#project_new_file_win').window("setTitle",'新建数据处理文件');
							$('#project_new_file_win').window("open");
						},
						new_job_dispathc : function(){
							$('#project_new_file_win').data("new_file_type","2");
							$('#project_new_file_win').window("setTitle",'新建作业处理文件');
							$('#project_new_file_win').window("open");
						},
						new_main_ctrl : function(){
							$('#project_new_file_win').data("new_file_type","3");
							$('#project_new_file_win').window("setTitle",'新建总流程控制文件');
							$('#project_new_file_win').window("open");
						}
					}
					 $('#project_new_file_win').window({
					   width:405,
					   height:180,
					   modal:true,
					   closed:true,
					   minimizable:false,
					   maximizable:false,
					   collapsible:false
					});
				    $("#new_file_ok").click(function(e){
				    	that.toCreateFile({
							selectNode : $("#project_menus").data("target").node,
	    					fileName :  $('#new_file_name').textbox('getValue'),
	    					textName :  $('#new_file_text_name').textbox('getValue'),
	    					type : $('#project_new_file_win').data("new_file_type")
	    				});
				    	$(".easyui-window").window("close");
				    });
				
					$('#database_menu').menu({
	    				onClick:function(item){
	    					Nasoft.Tree.deleteSelfByMenuId(item.id);
	    				}
	    			});
	    			$('#close_project').menu({
	    				onClick : function(item) {
	    					Nasoft.Tree.closeProject(item.id);
	    				}
	    			});
	    			
	    			$('#dblink_menu').menu({
	    				onClick : function(item) {
	    					Nasoft.Tree.createCon(item.id);
	    				}
	    			});	
					$("#project_menus").menu({    
					    onClick:function(item){ 
				               if(typeof fns[item.id]=='function'){
				            	   fns[item.id](); 
				               }
					    }    
					});
			});
		},
		
		createFileWin:function(){//用戶	
			$('#project_name').next('span').find('input')[0].onkeyup=function(e){//文本发生变化时执行
			if (!!this.value.trim()) {
				$('#project_btnEp').linkbutton('enable');//文本不为空启用按钮	
			}else{
				$('#projectr_btnEp').linkbutton('disable');//文本为空禁用按钮					
			}
			$('#project_name_error').html('');
			}
	       	var user_project_dir_tree_ul =  $('#user_project_dir_tree_ul'); 
	       	var userParjectFileTree=user_project_dir_tree_ul.tree($.extend(true,{
				url:$.getRootPath()+"/HandleFile/getFileList.do?path="
			},Nasoft.Window.createProject.projectTreeOpts()));
	       	
	      //点击确定按钮
	   		$('#project_btnEp').unbind('click').click(function(e){//确定按钮
	       		var project_name = $('#project_name').textbox("getValue");
	   			if(project_name==""){//
	   				alert("工程名不能为空");
	   				$('#user_project_dir_tree_ul').find('.tree-node-selected').removeClass('tree-node-selected');
	   			}else{
	   				if(project_name!="" && $("#user_project_dir_tree_ul").tree("getSelected")!=null){
	   					alert("创建用户工程不用选择");
	   					$('#user_project_dir_tree_ul').find('.tree-node-selected').removeClass('tree-node-selected');
	   				}else if(project_name!="" && $("#user_project_dir_tree_ul").tree("getSelected")==null){//创建用户工程
	   					createUserFolder();
	   					$('#project_btnEp').linkbutton('disable');//初始化按钮禁止
	   				} 
	   				
	   			}
	   	});
	   		$("#project_new_cancel").click(function(){
	   			$("#project_dir_name_win").window("close");
	   		});
	   		
	   	    function createUserFolder(){//创建用户
				 	Nasoft.Ajax.createDir($('#user_project_dir_tree_ul'),
				 			$("#user_project_dir_tree_ul").tree("getSelected"),
				 			$('#project_name').textbox('getValue')) ?//文件夹创建结果
		       				(function(){
		       					$('#project_dir_name_win').window('open');
	       					$('#project_name').textbox('setValue','');
		       				})(): $('#project_name_error').html('目标工程已存在!').css('color','red');
				 
	   	}	
	       },
		/**
		 * @author rsq0113
		 * 加载用户文件列表
		 */
		init_user_new_file_tree : function() {
				var that = this;
				$('#user_new_file_tree').tree($.extend(true,{
					url:$.getRootPath()+"/HandleFile/getFileList.do?path=",
					onSelect:function(node){
						if(node.state=='closed' || node.children){// 被选中节点为目录
							if($('#projectFile_name').textbox('getValue').trim()!="" && //项目文件名称不为空
									$('#projectChild_name').textbox('getValue').trim()!="" && //项目面熟不为空
									$('#project_type').combobox('getValue')!=='0'){
								    // 启用按钮
								$('#file_btnEp').linkbutton('enable');
							}else{
								$('#file_btnEp').linkbutton('disable');//确定按钮禁用
							}
						}else{
							$('#file_btnEp').linkbutton('disable');//确定按钮禁用
						}
					},
				},Nasoft.Window.createProject.projectTreeOpts()));		
				$('#user_new_file_tree').on('contextmenu', function(){
					  return false; //设置返回为false，设置为true则返回右键菜单
					});
		},
		/**
		 * @author rsq0113
		 * 初始化工程类型
		 */
		init_file_type : function() {
			var  that = this;
			var data = [{value:'0',text:"---请选择---"},{value:'1',text:"数据处理"},
			            {value:'2',text:"作业处理"},{value:'3',text:"总流程控制"}]
		    // 选择工程类型
			$('#project_type').combobox({
				data:data,
				onChange:function(nv,ov){
					var selectNode = $('#user_new_file_tree').tree?$('#user_new_file_tree').tree("getSelected"):null;
					if('0'!==nv && !!$('#projectFile_name').textbox('getValue').trim() && selectNode &&
							!!$('#projectChild_name').textbox('getValue').trim()){
						$('#file_btnEp').linkbutton('enable');
					}else{
						$('#file_btnEp').linkbutton('disable');
					}
				}
			});
		},
		// 绑定一些执行事件
       bind_event : function() {
    	   var that = this;
    	   // 取消按钮
    	   $('#file_new_cancel').unbind('click').click(function(e){// 取消退出
    			e.preventDefault();
    			$('#user_file_name_win').window('close');
    		});
    		// 确定按钮
    	   $('#file_btnEp').unbind('click').click(function(e){//用户新建文件-》点击确定
    			e.preventDefault();
    			var selectNode = $('#user_new_file_tree').tree('getSelected');
    			if(selectNode!=null ){
    				$('#file_btnEp').linkbutton('disable');
    				that.toCreateFile({
    					selectNode : selectNode,
    					fileName :  $('#projectFile_name').textbox('getValue'),
    					textName :  $('#projectChild_name').textbox('getValue'),
    					type : $('#project_type').combobox('getValue')
    				});
    			}else{
    				$('#file_btnEp').linkbutton('disable');
    			}
    		})
	},
	init_user_file_name_win : function(){
		var that = this;
		$('#user_file_name_win').window({
			title:'用户或组新建文件',
			width:805,
			height:560,
			modal:true,
			closed:true,
			minimizable:false,
			maximizable:false,
			collapsible:false,
		    onBeforeOpen:function(){$('#user_new_file_tree').tree("reload");}
		});
	},
	/**
	 * @author rsq0113
	 * 禁用按钮
	 */
	disable_event : function() {
	    // 禁用确定按钮
		$('#file_btnEp').linkbutton('disable');
	},
	// 初始化话窗口面板
	init : function() {
		this.init_user_file_name_win();
		this.createFileWin();//用户新建工程文件夹
		this.init_menus_doc();
		// 加载用户文件列表
		this.init_user_new_file_tree();
	    // 加载工程类型选项
	    this.init_file_type();
        // 绑定按钮事件
	    this.bind_event();
	},
	// 打开创建工程文件的窗口
	windowOpen : function() {
		// 重置输入框
		this.resetInput();	
		// 禁用按钮事件
		this.disable_event();
		// 打开窗口
		$("#user_file_name_win").window('open');
	},
	toCreateFile : function(options){
		if(!options.type||!options.fileName||!options.textName){
			alert("文件参数不完全!");
			return ;
		}
		var fileTypes = ['数据处理','作业处理','总流程控制'];// 工程类型数组
		var suffixs = ['.d','.j','.m']; // 文件后缀名数组
		var prjectsConstruction = ['createTransformation','createJob','createJob'];// 创建工程需要执行的方法数组
		var fileType = fileTypes[parseInt(options.type)-1]; 
		var suffix = suffixs[parseInt(options.type)-1];
		var prjectConstruction = prjectsConstruction[parseInt(options.type)-1];
		$.ajax({
			url:$.getRootPath()+'/HandleFile/createFile.do',
			data:{path:options.selectNode.path+options.selectNode.separator+options.fileName+suffix},
			type:'post',
			success:function(data){
				if(data==='2'){ 														
					var mydata;
					mydata=Nasoft.Tree[prjectConstruction]({//创建一个数据处理
						project_name:options.textName+'('+fileType+')',//项目名
						filePath:options.selectNode.path+options.selectNode.separator+options.fileName+suffix,//项目路径
						project_type:options.type     //项目类型
					});
					Nasoft.Topo.addProjectTab(mydata[0])
					$('#user_file_name_win').window('close');//关闭项目窗口
					$('#step_project').tabs('select',1);
					saveProject('createProject');
					$.messager.show({
						title:'系统提示',
						msg:'创建  '+options.textName+' 成功',
						timeout:5000,
						showType:'slide'
					});
				}else if(data==='1'){
					$.messager.alert('系统提示',options.textName+'工程文件名冲突!','warning');
				}
			}
		});
	}
}

