Nasoft.Window.fns.SET_VARIABLES=function(node){
				Nasoft.Ui_extend.browser_even('#SET_VARIABLES');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose
		    	onBeforeOpen=function(){
		    		try {
		    			   var nodeData = node.getEntry();
		    			 	var comboboxData = [{text:'在JVM中有效',value:'JVM'},{text:'在当前作业中有效',value:'CURRENT_JOB'},
		    			 	                   {text:'在父作业中有效',value:'PARENT_JOB'},{text:'在根作业中有效',value:'ROOT_JOB'}];
		    			 	$("#SET_VARIABLES_jobname").textbox("setValue","设置变量");
		    			 	$("#SET_VARIABLES_filename").textbox("setValue",nodeData.filename?nodeData.filename:"");
		    			 	$("#SET_VARIABLES_file_variable_type").combobox({
		    			 	 	 data:comboboxData,
		    			         onLoadSuccess:function(){
		    			         	nodeData.file_variable_type?$(this).combobox("select",nodeData.file_variable_type):
		    			         	                                            $(this).combobox("select","");
		    			         }
		    			 	 });
		    			 	 $("#SET_VARIABLES_replacevars").prop("checked",nodeData.replacevars==="Y"?true:false);
		    			 	 $("#SET_VARIABLES_field").datagrid({
		    			 	 	data : parseData(nodeData.fields),
		    			 	 	singleSelect:true,
		    			 	 	toolbar:
		    			 	 		[{
		    					iconCls: 'icon-add',
		    					text:"增加",
		    					handler: appendRow
		    				},'-',{
		    					iconCls: 'icon-remove',
		    					text:"删除",
		    					handler: removeRow
		    				}
		    			 	 	],
		    			 	 		columns:[[
		    			 	 		 {field : "variable_name",
		    			 	 		 title : "变量名",
		    			 	 		 align : "center",
		    			 	 		 width : 100,
		    			 	 		 editor : {
		    			 	 		 	type : "text"
		    			 	 		 }
		    			 	 		},
		    			 	 		{field : "variable_value",
		    			 	 		 title : "值",
		    			 	 		 align : "center",
		    			 	 		 width : 100,
		    			 	 		 editor : {
		    			 	 		 	type : "text"
		    			 	 		 }
		    			 	 		},
		    			 	 		{field : "variable_type",
		    			 	 		 title : "有效范围",
		    			 	 		 align : "center",
		    			 	 		 width : 100,
		    			 	 		 formatter : formatterFortype,
		    			 	 		 editor : {
		    			 	 		 	type : "combobox",
		    			 	 		 	options : {
		    			 	 		 		data : comboboxData
		    			 	 		 	}
		    			 	 		 }
		    			 	 		}
		    			 	 		]],
		    			 	 		onClickCell : onClickCell,
		    						onSelect : function(i,r){
		    							var that = this;
		    							$(document).unbind('keydown');
		    							$(document).keydown(function(event){
		    								console.log(event);
		    								  switch(event.keyCode) {
		    								  case 38:
		    									  event.ctrlKey && $(that).datagrid("selectmoveUp",r);
		    								  case 40:
		    									  event.ctrlKey && $(that).datagrid("selectmoveDown",r);
		    								  }
		    								});
		    						}
		    			 	 });
		    			 	 $("#SET_VARIABLES_ok").unbind("click").click(SET_VARIABLES_ok);
		    			 	 $("#SET_VARIABLES_cancel").unbind("click").click(SET_VARIABLES_cancel);
		    			 	 function parseData(mydata){
		    			 	 if(mydata){
		    			 	 	if(mydata.field){
		    			 	 		if($.isArray(mydata.field)){
		    			 	 			return mydata.field;
		    			 	 		}
		    			 	 			return [mydata.field];
		    			 	 		}
		    			 	 	return [];
		    			 	 	}
		    			 	 	 return [];
		    			 	 }
		    			    function formatterFortype(v,r,i){
		    			    	if(!v){
		    			    		return "";
		    			    	}
		    			    	for (var j = 0;j < comboboxData.length;j++) {
		    			    		if(comboboxData[j].value === v){
		    			    			return comboboxData[j].text;
		    			    		}
		    			    	}
		    			    }
		    			 	 function appendRow(){
		    			 	 	$("#SET_VARIABLES_field").datagrid("appendRow",{
		    			 	 		                                         variable_name:"",
		    			 	 		                                         variable_value:"",
		    			 	 		                                         variable_type:""
		    			 	 		                                        });
		    			 	 }
		    			 	 function removeRow(){
		    			 	 	var select = $("#SET_VARIABLES_field").datagrid("getSelected");
		    			 	 	var index = $("#SET_VARIABLES_field").datagrid("getRowIndex");
		    			 	 	$("#SET_VARIABLES_field").datagrid("deleteRow",index)
		    			 	 }
		    			 	 function onClickCell(i,f,v){
		    			 	 	endEdit(this);// 结束编辑一行
		    			 	 	$(this).datagrid("beginEdit",i);
		    			 	 }
		    			 	 function endEdit(ele){
		    			 	 	var rows = $(ele).datagrid("getRows");
		    			 	 	$.each(rows,function(i,o){
		    			 	 		$(ele).datagrid("endEdit",i);
		    			 	 	});
		    			 	 }
		    			 	 function SET_VARIABLES_ok(e){
		    			 	 	endEdit("#SET_VARIABLES_field");
		    			 	 	node.text = $("#SET_VARIABLES_jobname").textbox("getValue");
		    			 	 	nodeData.filename = $("#SET_VARIABLES_filename").textbox("getValue");
		    			 	 	nodeData.file_variable_type = $("#SET_VARIABLES_file_variable_type").combobox("getValue");
		    			 	 	nodeData.replacevars =  $("#SET_VARIABLES_replacevars").prop("checked")?"Y":"N";
		    			 	 	nodeData.fields = Nasoft.GetProjectData.getFields("#SET_VARIABLES_field");
		    			 	 	$("#SET_VARIABLES").window("close");
		    			 	 }
		    			 	  function SET_VARIABLES_cancel(e){
		    			 	 	$("#SET_VARIABLES").window("close");
		    			 	 }
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    		
		    	};
		    	onBeforeClose=function(){
                 try {
						
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    	}
		    	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}