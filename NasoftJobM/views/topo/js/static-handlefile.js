Nasoft.Static={};
/**
 * @param $show(需要展示的文本框的id选择器),$hide(需要隐藏的文本框的id选择器)
 */
Nasoft.Static.handleFile=function($show,$hide,options){
	Nasoft.Ui_extend.win_event('#static_handleFile_win',{
		onBeforeOpen:function(){
			  var parjectFileTree=Nasoft.Util.createProjectFileTree($('#static_handleFile_tree'));
				parjectFileTree && //动态创建工程文件树
				parjectFileTree.tree($.extend(true,{
					url:$.getRootPath()+"/HandleFile/getFileList.do?path=",
					lines:true,
					onSelect:onSelect,
					onBeforeExpand: Nasoft.Util.treeExpand
				},options));
				function onSelect(node){
						if(!(node.state=='closed' || node.children)){
							$('#static_handleFile_ok').linkbutton('enable');
							var nasoftProjectrootpath='${nasoftProjectrootpath}';
							var usdir='${usdir}';
							var path=node.path.split(node.separator);
							var pathval='';
							for(var i=2;i<path.length-1;i++){
								pathval=pathval+path[i]+'/';
							}
							pathval=pathval+path[path.length-1];
							$('#static_handleFile_path').textbox('setValue',nasoftProjectrootpath+usdir+pathval);
						}else{
							$('#static_handleFile_ok').linkbutton('disable');
						}
				};
		},
		onBeforeClose:function(){
			$('#static_handleFile_path').textbox('setValue','');
		}	
	});
	$('#static_handleFile_cancel').unbind('click').click(function(e){
		e.preventDefault();	
		$('#static_handleFile_win').window('close');//关闭当前的窗口
	});
	$('#static_handleFile_ok').unbind('click').click(function(e){
		var node=parjectFileTree.tree('getSelected');
		if(!(node.state=='closed' || node.children)){
			$($show).data("path",node.path);
			$($show).textbox('setValue',$('#static_handleFile_path').textbox('getValue'));
			$('#static_handleFile_win').window('close');//关闭当前窗口
		}	
	});
	$('#static_handleFile_win').window('open');//打开当前窗口
}

/**
 * @param $show(需要展示的文本框的id选择器),$hide(需要隐藏的文本框的id选择器)
 */
Nasoft.Static.handleFilePostfix =function($show,$hide,options,postfix,path){
	Nasoft.Ui_extend.win_event('#static_handleFile_win',{
		onBeforeOpen:function(){
			  var parjectFileTree=Nasoft.Util.createProjectFileTree($('#static_handleFile_tree'));
				parjectFileTree && //动态创建工程文件树
				parjectFileTree.tree($.extend(true,{
					url:$.getRootPath()+"/HandleFile/getFileListPostfix.do",
					queryParams:{path:"",postfix:postfix,openPath:path},
					lines:true,
					onSelect: onSelect,
					onBeforeExpand: Nasoft.Util.treeExpandTest,
				},options));
				function onSelect(node){
					if(!(node.state=='closed' || node.children)){//被选中节点为文件
						$('#static_handleFile_ok').linkbutton('enable');
						var nasoftProjectrootpath='${nasoftProjectrootpath}';
						var usdir='${usdir}';
						var usfile='${usfile}';
						var path=node.path.split(node.separator);
						var pathval='';
						for(var i=2;i<path.length-1;i++){
							pathval += path[i]+'/';
						}
						pathval=pathval+path[path.length-1];
						// 将组织好的通配符路径存入输入框中
						if(postfix==="3"){
							$('#static_handleFile_path').textbox('setValue',nasoftProjectrootpath+usfile+pathval);	
						}else{
							$('#static_handleFile_path').textbox('setValue',nasoftProjectrootpath+usdir+pathval);
							}
					}else{
						$('#static_handleFile_ok').linkbutton('disable');
					}
				};
				function onBeforeExpand(node){
				 return Nasoft.Util.treeExpand.call(this,node);
				};
		},
		onBeforeClose:function(){
			$('#static_handleFile_path').textbox('setValue','');
		}	
	});
	$('#static_handleFile_cancel').unbind('click').click(function(e){
		e.preventDefault();	
		$('#static_handleFile_win').window('close');//关闭当前的窗口
	});
	$('#static_handleFile_ok').unbind('click').click(function(e){
		   var node=parjectFileTree.tree('getSelected');
			if(!(node.state=='closed' || node.children)){
				// 获取当前选中节点的路径存入组件的浏览输入框的data中
					$($show).data("path",node.path);
				// 将文件操作窗口的输入框值转给组件的浏览输入框
					$($show).textbox('setValue',$('#static_handleFile_path').textbox('getValue'));	
			}	
			$('#static_handleFile_win').window('close');//关闭当前窗口
	});
	$('#static_handleFile_win').window('open');//打开当前窗口
}



