Nasoft.Window.fns.SIMPLE_EVAL=function(node){
				Nasoft.Ui_extend.browser_even('#SIMPLE_EVAL');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose
		    	onBeforeOpen=function(){
		    		try {
		    			$("#SIMPLE_EVAL").find("table").find("tr").show();
		    			$("#SIMPLE_EVAL_jobname").textbox("setValue",node.text);
		    			var SIMPLE_EVALdata = node.getEntry();
		    			var hideEles;// 隐藏的元素
						var tr1= $("#SIMPLE_EVAL").find("table:eq(1)").find("tr:last");// 掩码
						var tr6= $("#SIMPLE_EVAL").find("table:eq(1)").find("tr:eq(1)");// 源中的字段名
						var tr5= $("#SIMPLE_EVAL").find("table:eq(1)").find("tr:eq(2)");// 变量名
						var tr8= $("#SIMPLE_EVAL").find("table:eq(1)").find("tr:eq(3)");// 字段类型
						var tr7= $("#SIMPLE_EVAL").find("table:eq(2)").find("tr:first");// 当变量设置成功
						var tr2= $("#SIMPLE_EVAL").find("table:eq(2)").find("tr:last");// 成功条件的字段名
						var tr9= $("#SIMPLE_EVAL").find("table:eq(2)").find("tr:eq(1)");// 成功条件
						var tr3= $("#SIMPLE_EVAL").find("table:eq(2)").find("tr:eq(2)");// 最大值
						var tr4= $("#SIMPLE_EVAL").find("table:eq(2)").find("tr:eq(3)");// 最小值
						var setVar = false;
						var successCondition = {
							a:[{text:'如果值相等',value:'equal'},{text:'如果值不相等',value:'notequal'},{text:'如果值包含',value:'contains'},{text:'如果值不包含',value:'notcontains'},{text:'如果值的开始是',value:'startswith'},{text:'如果值的开始不是',value:'notstatwith'},
							   {text:'如果值的结尾是',value:'endswith'},{text:'如果值的结尾不是',value:'notendwith'},{text:'如果值验证正则',value:'regexp'},{text:'如果值在列表中',value:'inlist'},{text:'如果值不在列表中',value:'notinlist'}],
							b:[{text:'如果值不等于',value:'equal'},{text:'如果值小于',value:'smaller'},{text:'如果值小于或等于',value:'smallequal'},{text:'如果值大于',value:'greater'},
							   {text:'如果值大于或等于',value:'greaterequal'},{text:'如果值在一定范围',value:'between'},{text:'如果值在列表中',value:'inlist'},{text:'如果值不在列表中',value:'notinlist'}],
							c:[{text:'如果值是FALSE',value:'false'},{text:'如果值是TRUE',value:'true'}]
						}
						var fns = {
							string:function(){
							tr1.hide();
							tr2.show();
							tr3.hide();
							tr4.hide();
							DELAY_file_variable_type(successCondition.a);
							$("#SIMPLE_EVAL_file_variable_type").combobox("select",SIMPLE_EVALdata.successcondition?SIMPLE_EVALdata.successcondition:
                            "");
							setVarNow();
							},
							number:function(){
							tr1.hide();
							tr2.show();
							tr3.hide();
							tr4.hide();
							DELAY_file_variable_type(successCondition.b);
							$("#SIMPLE_EVAL_file_variable_type").combobox("select",SIMPLE_EVALdata.successnumbercondition?SIMPLE_EVALdata.successnumbercondition:
                            "");
							setVarNow();
							},
							datetime:function(){
							tr1.show();
							tr2.show();
							tr3.hide();
							tr4.hide();
							DELAY_file_variable_type(successCondition.b);
							$("#SIMPLE_EVAL_file_variable_type").combobox("select",SIMPLE_EVALdata.successnumbercondition?SIMPLE_EVALdata.successnumbercondition:
							                                                     "");
							setVarNow();	
							},
							boolean:function(){
							tr1.hide();
							tr2.hide();
							tr3.hide();
							tr4.hide();
							DELAY_file_variable_type(successCondition.c);
							$("#SIMPLE_EVAL_file_variable_type").combobox("select",SIMPLE_EVALdata.successbooleancondition?SIMPLE_EVALdata.successbooleancondition:
                            "");
							setVarNow();	
							},
							between:function(){
							var value =	$("#SIMPLE_EVAL_fieldtype").combobox("getValue");
							value!=="datetime" && tr1.hide();
							console.log(value)
							tr2.hide();
							tr3.show();
							tr4.show();
							},
							variable:function(){
								setVar = true;
								setVarNow();
							},
							field :function(){
								setVar = false;
								setValNow();
							}
						}
						$("#SIMPLE_EVAL_valuetype").combobox({
							onLoadSuccess:function(){
			       				SIMPLE_EVALdata.valuetype ? $(this).combobox('select',SIMPLE_EVALdata.valuetype):
			       					                        $(this).combobox('select','field');
			       			},
			       			onSelect : function(record){
			       				if(record.value === "variable"){
			       					fns["variable"]();
			       				}else{
			       					fns["field"]();
			       				}
			       				
			       			}
						});
						$("#SIMPLE_EVAL_fieldname").textbox("setValue",SIMPLE_EVALdata.fieldname?SIMPLE_EVALdata.fieldname:"");
						$("#SIMPLE_EVAL_variablename").textbox("setValue",SIMPLE_EVALdata.variablename?SIMPLE_EVALdata.variablename:"");
						$("#SIMPLE_EVAL_fieldtype").combobox({
							onSelect:function(r){
								fns[r.value]();
							},
							onLoadSuccess:function(){
								SIMPLE_EVALdata.fieldtype ? $(this).combobox('select',SIMPLE_EVALdata.fieldtype):
									                        $(this).combobox('select',"string");
			       			}
						});
						$("#SIMPLE_EVAL_mask").combobox({
							onLoadSuccess:function(){
								SIMPLE_EVALdata.fieldtype ? $(this).combobox('select',SIMPLE_EVALdata.mask):
			                                                $(this).combobox('select',"");   								
							}
						});
						$("#SIMPLE_EVAL_successwhenvarset").prop("checked",SIMPLE_EVALdata.successwhenvarset === "Y"?true:false);
						$("#SIMPLE_EVAL_successwhenvarset").unbind("click").click(checkClick);
						$("#SIMPLE_EVAL_max").textbox("setValue",SIMPLE_EVALdata.maxvalue?SIMPLE_EVALdata.maxvalue:'');
						$("#SIMPLE_EVAL_min").textbox("setValue",SIMPLE_EVALdata.minvalue?SIMPLE_EVALdata.minvalue:'');
						$("#SIMPLE_EVAL_comparevalue").textbox("setValue",SIMPLE_EVALdata.comparevalue?SIMPLE_EVALdata.comparevalue:'');
						function DELAY_file_variable_type(data){
							$("#SIMPLE_EVAL_file_variable_type").combobox({
								data:data,
							    onSelect:function(r){
							    	var value =	$("#SIMPLE_EVAL_fieldtype").combobox("getValue");
							    	fns[r.value] && value!="boolean"?fns[r.value]():function(){tr3.hide();tr4.hide();tr2.show()}();
							        value=="boolean" && tr2.hide();
							    }
							});
						}
						// 状态判断
						function setVarNow(){
							if(setVar){//设置变量状态
								tr5.show();
								tr6.hide();
								tr7.show();
								if($("#SIMPLE_EVAL_successwhenvarset").prop("checked")){// 完成变量设置状态
									tohide();
								}
							}else{
								tr5.hide();
								tr6.show();
								tr7.hide();
							}
						}
						function checkClick(){
							if($("#SIMPLE_EVAL_successwhenvarset").prop("checked")){// 完成变量设置状态
								tohide();
							}else{
								setValNow();
							}
						}
						function setValNow(){
							
								tr5.hide();
								tr6.show();
								tr7.hide();
								tr8.show();
								tr9.show();
							$("#SIMPLE_EVAL_fieldtype").combobox("select",SIMPLE_EVALdata.fieldtype);
							fns[SIMPLE_EVALdata.fieldtype]();
						}
						
						function tohide(){
							tr5.nextAll().hide();
							tr7.nextAll().hide();
						}
						function gethide(){
						hideEles = $("#SIMPLE_EVAL").find("table").find("tr:hidden");
						};
						function selectType(){
							var valueType = SIMPLE_EVALdata.valuetype;
							$("#SIMPLE_EVAL_valuetype").combobox("select",valueType);
						}
		    			$("#SIMPLE_EVAL_ok").unbind("click").click(function(){
		    				 node.text = $("#SIMPLE_EVAL_jobname").textbox("getValue");
		    				 SIMPLE_EVALdata.valuetype = $("#SIMPLE_EVAL_valuetype").combobox("getValue");
		    				 SIMPLE_EVALdata.fieldname = $("#SIMPLE_EVAL_fieldname").textbox("getValue");
		    				 SIMPLE_EVALdata.variablename = $("#SIMPLE_EVAL_variablename").textbox("getValue");
		    				 SIMPLE_EVALdata.fieldtype = $("#SIMPLE_EVAL_fieldtype").combobox("getValue");
		    				 SIMPLE_EVALdata.mask = $("#SIMPLE_EVAL_mask").combobox("getValue");
		    				 SIMPLE_EVALdata.comparevalue = $("#SIMPLE_EVAL_comparevalue").textbox("getValue");
		    				 SIMPLE_EVALdata.minvalue = $("#SIMPLE_EVAL_min").textbox("getValue");
		    				 SIMPLE_EVALdata.maxvalue = $("#SIMPLE_EVAL_max").textbox("getValue");
		    				 SIMPLE_EVALdata.successwhenvarset = $("#SIMPLE_EVAL_successwhenvarset").prop("checked")?"Y":"N";
		    				 if(SIMPLE_EVALdata.fieldtype === "string"){
		    					 SIMPLE_EVALdata.successcondition = $("#SIMPLE_EVAL_file_variable_type").combobox("getValue");
		    				 }else if(SIMPLE_EVALdata.fieldtype === "number" || SIMPLE_EVALdata.fieldtype === "datetime"){
		    					 SIMPLE_EVALdata.successnumbercondition = $("#SIMPLE_EVAL_file_variable_type").combobox("getValue");
		    				 }else if(SIMPLE_EVALdata.fieldtype === "boolean"){
		    					 SIMPLE_EVALdata.successbooleancondition = $("#SIMPLE_EVAL_file_variable_type").combobox("getValue");
		    				 }
		    				 $("#SIMPLE_EVAL").window("close");
		    			});
		    			$("#SIMPLE_EVAL_cancel").unbind("click").click(function(){
		    				$("#SIMPLE_EVAL").window("close");
		    			});
		    			
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