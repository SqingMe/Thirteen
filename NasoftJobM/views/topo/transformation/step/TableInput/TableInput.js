Nasoft.Topo.transferFns.TableInput=function(node){
	 return [{name:'TableInput'}];
  };
Nasoft.Window.fns.TableInput=function(node){
				Nasoft.Ui_extend.browser_even('#TableInput');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose
		    	onBeforeOpen=function(){
		    		var editor = null;
		    			var tab=$('#stepTabs').tabs('getSelected');
			    		var connections=Nasoft.GetProjectData.getConnectins();//获取树结构中数据连接的所有名称  		
			    		console.log(connections);
			    		$('#step_name_tableInput').textbox('setValue',node.text);
			    		if(node.variables_active == 'Y'){
			    			$('input[name="variables_active"]').prop("checked",true);
			    		}
			    		if(node.lazy_conversion_active == 'Y'){
			    			$('input[name="lazy_conversion_active"]').prop("checked",true);
			    		}
			    		if(node.execute_each_row == 'Y'){
			    			$('input[name="execute_each_row"]').prop("checked",true);
			    		}
						$('#lookup').combobox({
							data:TableInput_Up_steptname(node),
							valueField :"value",
							textField : "text",
						});
			    		$('#tbin_connection').combobox({    
			    			data:connections,
			    			valueField:'name',   //将connections的id字段绑定在下拉表单的value上 
			    			textField:'name',  //将connections的text字段绑定在下拉表单的显示字段上
			    			onLoadSuccess:function(data){
			    				var connectionName;
								/**
								 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
								 * 否则去直接获取connection的Name选中对应项,
								 * 若没有则不选中任何
								 */
								connectionName=node.getStep().connection!=''?node.getStep().connection:node.getConnectionName();
								console.log(connectionName)
								connectionName!='' && $(this).combobox('select',connectionName);
			    			},
			    			onChange:function(newValue,oldValue){
			    				$.each(connections,function(i,o){//遍历下拉表单的所有数据项
			    					if(newValue==o.name){//筛选出当前点击的下拉表单项的connection
										//当选项发生改变时将当前被选项的name赋值个node的connectionName
										node.setConnectionName(o.name);
			    					}
			    				});
			    			}
			    		});
			    		editor = Nasoft.Util.createEditor({
			    			mode:"sql",
							ele:"sql"
						});
			    		editor.setValue(node.getStep().sql?node.getStep().sql:'');//改成input的多行
			    		$('#tableInput_ok').unbind('click').click(function(){	//确定配置信息后执行
			      			console.log(node.getStep())
				    		var TableInput={};//定义一个TableInput的步骤
				    		var sql=editor.getValue();//获取sql输入框的内容
				    		TableInput.connection=node.getConnectionName();
				    		TableInput.sql=(sql==null||sql=='')?'':sql;
				    		node.text=$('#step_name_tableInput').textbox('getValue');
				    		
				    		
				    		TableInput.lazy_conversion_active= $('input[name="lazy_conversion_active"]').prop("checked")?'Y':'N';
				    		TableInput.variables_active= $('input[name="variables_active"]').prop("checked")?'Y':'N';
				    		TableInput.execute_each_row= $('input[name="execute_each_row"]').prop("checked")?'Y':'N';
				    		
				    		var limit = $('#limit').textbox('getValue');
				    		TableInput.limit = (limit==null || limit == '')?'':limit;
				    		
				    		var lookup = $('#lookup').combobox('getValue');
				    		TableInput.lookup = (lookup==null||lookup=='')?'':lookup;
				    		
				    		node.setStep(TableInput);
			    			$('#TableInput').window('close');//关闭弹窗
			    		});	
			    		$('#tableInput_cancel').unbind('click').click(function(){	//确定配置信息后执行			      	
			    			$('#TableInput').window('close');//关闭弹窗
			    		});	
		    	}
		    	onBeforeClose=function(){
		    	}
		    	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}

//默认步骤

function scgetStepUpName(node){
	  if(!!node.inLinks && node.inLinks.length > 0){
		  var stepname=[];
			for (var i = 0; i < node.inLinks.length; i++) {
				var nodeA={}
				nodeA.text= node.inLinks[i].nodeA.text//获取下个节点的name名称
				stepname.push(nodeA)
			}
			return stepname
	  }else{
		  return null;
	  }
  }; 
function TableInput_Up_steptname(node){
	var stepName=scgetStepUpName(node);			
	var data=[]
	if(stepName!=null){
			for (var i = 0; i < stepName.length; i++) {		
				var data_a={"text":stepName[i].text,"value":stepName[i].text}
				data.push(data_a)
			}
			return data;
	    }else{
	    	var data_b={"text":'',"value":''}
	    	data.push(data_b);
	    	return data;
	    }
}
