Nasoft.Topo.transferFns.Calculator = function(node) {
	var fds = [];
	if (!!node.getStep().calculation) {
		if (node.getStep().calculation.constructor == Array) {
			$.each(node.getStep().calculation, function(i, o) {
				if (o.remove == 'N') {
					var field = {};
					field.name = o.field_name;
					field.type = o.value_type;
					field.format = o.conversion_mask;
					field.length = o.value_length;
					field.precision = o.value_precision;
					fds.push(field);
				}
			});
		} else {
			return fds;
		}
	}
	return fds;
};
Nasoft.Window.fns.Calculator = function(node) {
	Nasoft.Ui_extend.browser_even('#Calculator');// 限制组件不能超出浏览器上边缘

	var onBeforeOpen, onBeforeClose, onBeforeOpen = function() {
		try {
			// console.log("node="+node);
			$('#step_name_Calculator').textbox('setValue', node.text);
			var Calculator_table_value;
			var transferArry = Nasoft.Topo.transferFns.getTransfer(node);// 获取当前节点可用的字段
			if (transferArry.length > 0) {
				var transfer = Nasoft.Util.transferArray_copy(transferArry);
				transfer = Nasoft.Util.transferFns_repeat_filed(transfer);
			}

			var calctypeVal = [ {
				"value" : '-',
				"text" : "-"
			}, {
				"value" : 'CONSTANT',
				"text" : "Set field to constant value A"
			}, {
				"value" : 'COPY_FIELD',
				"text" : "Create a copy of field A"
			}, {
				"value" : 'ADD',
				"text" : "A+B"
			}, {
				"value" : "SUBTRACT",
				"text" : "A-B"
			}, {
				"value" : "MULTIPLY",
				"text" : "A*B"
			}, {
				"value" : 'DIVIDE',
				"text" : "A/B"
			}, {
				"value" : "SQUARE",
				"text" : "A*A"
			}, {
				"value" : "SQUARE_ROOT",
				"text" : "SQRT(A)"
			}, {
				"value" : "PERCENT_1",
				"text" : "100*A/B"
			}, {
				"value" : "PERCENT_2",
				"text" : "A-(A*B/100)"
			}, {
				"value" : "PERCENT_3",
				"text" : "A+(A*B/100)"
			}, {
				"value" : "COMBINATION_1",
				"text" : "A+B*C"
			}, {
				"value" : "COMBINATION_2",
				"text" : "SQRT(A*A+B*B)"
			}, {
				"value" : "ROUND_1",
				"text" : "ROUND(A)"
			}, {
				"value" : "ROUND_2",
				"text" : "ROUND(A,B)"
			}, {
				"value" : "ROUND_STD_1",
				"text" : "STDROUND(A)"
			}, {
				"value" : "ROUND_STD_2",
				"text" : "STDROUND(A,B)"
			}, {
				"value" : "CEIL",
				"text" : "CEIL(A)"
			}, {
				"value" : "FLOOR",
				"text" : "FLOOR(A)"
			}, {
				"value" : "NVL",
				"text" : "NVL(A,B)"
			}, {
				"value" : "ADD_DAYS",
				"text" : "Date A + B Days"
			}, {
				"value" : 'YEAR_OF_DATE',
				"text" : "Year of date A"
			}, {
				"value" : 'MONTH_OF_DATE',
				"text" : "Month of date A"
			}, {
				"value" : 'DAY_OF_YEAR',
				"text" : "Day of year of date A"
			}, {
				"value" : 'DAY_OF_MONTH',
				"text" : "Day of month of date A"
			}, {
				"value" : 'DAY_OF_WEEK',
				"text" : "Day of week of date A"
			}, {
				"value" : 'WEEK_OF_YEAR',
				"text" : "Week of year of date A"
			}, {
				"value" : 'WEEK_OF_YEAR_ISO8601',
				"text" : "ISO8601 Week of year of date A"
			}, {
				"value" : 'YEAR_OF_DATE_ISO8601',
				"text" : "ISO8601 Year of date A"
			}, {
				"value" : 'BYTE_TO_HEX_ENCODE',
				"text" : "Byte to hex encode of string A"
			}, {
				"value" : 'HEX_TO_BYTE_DECODE',
				"text" : "Hex to byte decode of string A"
			}, {
				"value" : 'CHAR_TO_HEX_ENCODE',
				"text" : "Char to hex encode of string A"
			}, {
				"value" : 'HEX_TO_CHAR_DECODE',
				"text" : "Hex to char decode of string A"
			}, {
				"value" : 'CRC32',
				"text" : "Checksum of a file A using CRC-32"
			}, {
				"value" : 'ADLER32',
				"text" : "Checksum of a file A using Adler-32"
			}, {
				"value" : 'MD5',
				"text" : "Checksum of a file A using MD5"
			}, {
				"value" : 'SHA1',
				"text" : "Checksum of a file A using SHA-1"
			}, {
				"value" : 'LEVENSHTEIN_DISTANCE',
				"text" : "Levenshtein Distance(source A and target B)"
			}, {
				"value" : 'METAPHONE',
				"text" : "Metaphone of A(phonetics)"
			}, {
				"value" : 'DOUBLE_METAPHONE',
				"text" : "Double metaphone of A(phonetics)"
			}, {
				"value" : 'ABS',
				"text" : "Absolute value ABS(A)"
			}, {
				"value" : 'REMOVE_TIME_FROM_DATE',
				"text" : "Remove time from a date A"
			}, {
				"value" : 'DATE_DIFF',
				"text" : "Date A - Date B(in days)"
			}, {
				"value" : 'ADD3',
				"text" : "A+B+C"
			}, {
				"value" : 'INIT_CAP',
				"text" : "First letter of each word of a string A in capital"
			}, {
				"value" : 'UPPER_CASE',
				"text" : "UpperCase of a string A"
			}, {
				"value" : 'LOWER_CASE',
				"text" : "LowerCase of a string A"
			}, {
				"value" : 'MASK_XML',
				"text" : "Mask XML content from string A"
			}, {
				"value" : 'USE_CDATA',
				"text" : "Protect(CDATA) XML content from string A"
			}, {
				"value" : 'REMOVE_CR',
				"text" : "Remove CR from a string A"
			}, {
				"value" : 'REMOVE_LF',
				"text" : "Remove LF from a string A"
			}, {
				"value" : 'REMOVE_CRLF',
				"text" : "Remove CRLF from a string A"
			}, {
				"value" : 'REMOVE_TAB',
				"text" : "Remove TAB from a string A"
			}, {
				"value" : 'GET_ONLY_DIGITS',
				"text" : "Return only digits from string A"
			}, {
				"value" : 'REMOVE_DIGITS',
				"text" : "Remove digits from string A"
			}, {
				"value" : 'STRING_LEN',
				"text" : "Return the length of a string A"
			}, {
				"value" : 'LOAD_FILE_CONTENT_BINARY',
				"text" : "Load file content in binary"
			}, {
				"value" : 'ADD_TIME_TO_DATE',
				"text" : "Add time B to date A"
			}, {
				"value" : 'QUARTER_OF_DATE',
				"text" : "Quarter of date A"
			}, {
				"value" : 'SUBSTITUTE_VARIABLE',
				"text" : "variable substitution in string A"
			}, {
				"value" : 'UNESCAPE_XML',
				"text" : "Unescape XML content"
			}, {
				"value" : 'ESCAPE_HTML',
				"text" : "Escape HTML content"
			}, {
				"value" : 'UNESCAPE_HTML',
				"text" : "Unescape HTML content"
			}, {
				"value" : 'ESCAPE_SQL',
				"text" : "Escape SQL content"
			}, {
				"value" : 'DATE_WORKING_DIFF',
				"text" : "Date A - Date B(working days)"
			}, {
				"value" : 'ADD_MONTHS',
				"text" : "Date A + B Months"
			}, {
				"value" : 'ADD_HOURS',
				"text" : "Date A + B Hours"
			}, {
				"value" : 'ADD_MINUTES',
				"text" : "Date A + B Minutes"
			}, {
				"value" : 'DATE_DIFF_MSEC',
				"text" : "Date A - B (milliseconds)"
			}, {
				"value" : 'DATE_DIFF_SEC',
				"text" : "Date A - B (seconds)"
			}, {
				"value" : 'DATE_DIFF_MN',
				"text" : "Date A - B (minutes)"
			}, {
				"value" : 'DATE_DIFF_HR',
				"text" : "Date A - B (hours)"
			}, {
				"value" : 'HOUR_OF_DAY',
				"text" : "Hour of Day of Date A"
			}, {
				"value" : 'MINUTE_OF_HOUR',
				"text" : "Minute of Hour of Date A"
			}, {
				"value" : 'SECOND_OF_MINUTE',
				"text" : "Second of Minute of Date A"
			}, ]
			function selectType() {// 自定义更新选定行信息方法
				var Calculator_table_datalist_value = $(
						'#Calculator_table_datalist').datalist('getSelected')
				$('#Calculator_table_calctytype').window('close');
				if (Calculator_table_datalist_value) {
					$('#Calculator_table').datagrid('updateRow', {
						index : Calculator_table_value,
						row : {
							calc_type : Calculator_table_datalist_value.value
						}
					});
					$('#Calculator_table').datagrid(
							'cancelEdit', Calculator_table_value);
				}
			}
			$('#Calculator_table_calctytype')
					.window(
							// 设置弹出框
							{
								width : 340,
								height : 600,
								modal : true,
								minimizable : false,
								maximizable : false,
								collapsible : false,
								closable : true,
								title : '选择计算类型',
								content : '<br><center><span style="color:#balick">过滤:</span><input class="easyui-textbox" name="Calculator_search" id="Calculator_search" style="width:200px;"/>&nbsp;&nbsp;<a class="easyui-linkbutton"  id="Calculator_inquiries" style="width:50px;">查询</a><br><br><ul class="easyui-datalist" title="选择计算类型来执行" style="width:300px;height:450px" id="Calculator_table_datalist"></ul><br><a class="easyui-linkbutton" name="Calculator_shut_ok" id="Calculator_shut_ok" style="width:50px;">确定</a>&nbsp;&nbsp;<a class="easyui-linkbutton" name="systemInfo_shut_cancel" id="Calculator_shut_cancel" style="width:50px;">取消</a></center>'

							});
			$('#Calculator_table_calctytype').window('close');// 关闭选择信息类型弹出框
			$('#Calculator_table_datalist').datalist(// 设置弹出框表格属性
			{
				data : calctypeVal,
				valueField : "value",
				textField : "text",
				onDblClickCell : function(index, field, value) {
					selectType();
				}
			});
			$('#Calculator_inquiries').unbind('click').click(function() {// 点击查询
				var sFind = $('#Calculator_search').textbox('getValue');
				var vData = calctypeVal;// 获取当前页面中所有的行
				if (sFind != "") {
					var vResult = [];
					$.each(vData, function(i, o) {
						var nPos = -1;

						for ( var key in o) {
							if (key === 'text') {
								nPos = o[key].indexOf(sFind)
							}
						}
						if (nPos >= 0) {
							vResult[vResult.length] = o;
						}
					});
					$('#Calculator_table_datalist').datalist({

						data : vResult,

					});
				}

			});
			$('#Calculator_shut_ok').unbind('click').click(function(e) {// 弹出框确定
				selectType();
			});
			$('#Calculator_shut_cancel').unbind('click').click(function(e) {// 弹出框取消
				$('#Calculator_table_calctytype').window('close');
			});

			var caltacomval = Nasoft.Util.file_name_combobox(transfer);
			if (!!node.getStep().calculation) {
				for (var i = 0; i < node.getStep().calculation.length; i++) {
					var fieldcomval = {}
					fieldcomval.value = node.getStep().calculation[i].field_name;
					fieldcomval.text = node.getStep().calculation[i].field_name;
					caltacomval.push(fieldcomval);
				}
			}

			$('#Calculator_table')
					.datagrid(
							{// 字段的界面
								fit:true,
								rownumbers:true,
								singleSelect:false,
								frozenColumns : [ [ {
									field : 'ck',
									checkbox : true,
								} ] ],
								ctrlSelect:true,
								checkOnSelect:false,
								data : !!node.getStep().calculation ? {
									total : 1,
									rows : $
											.isArray(node.getStep().calculation) ? node
											.getStep().calculation
											: [ node.getStep().calculation ]
								}
										: {
											total : 0,
											rows : []
										},
								toolbar : [
										{
											iconCls : 'icon-add',
											text : "增加",
											fitColumns : true,
											handler : function() {// 添加一行
												$('#Calculator_table')
														.datagrid(
																// 新增加一行
																'appendRow',
																{
																	field_name : '',
																	calc_type : '',
																	field_a : '',
																	field_b : '',
																	field_c : '',
																	value_type : '',
																	value_length : '',
																	value_precision : '',
																	remove : '',
																	conversion_mask : '',
																	decimal_symbol : '',
																	grouping_symbol : '',
																	currency_symbol : ''
																});
											}
										},
										{
											text : "删除",
											iconCls : 'icon-remove',
											handler : function() {
												$('#Calculator_table').datagrid('deleteSelections');
											}
										} ],

								columns : [ [
										{
											field : 'field_name',
											title : '新字段',
											width : 100,
											editor : {
												type : 'text'
											}
										},
										{
											field : 'calc_type',
											title : '计算',
											width : 100,
											formatter : function(value, row,
													index) {
												if (value == '-') {
													return value = '-';
												} else if (value == 'COPY_FIELD') {
													return value = 'Create a copy of field A';
												} else if (value == 'SUBTRACT') {
													return value = 'A-B';
												} else if (value == 'DIVIDE') {
													return value = 'A/B';
												} else if (value == 'SQUARE_ROOT') {
													return value = 'SQRT(A)';
												} else if (value == 'PERCENT_2') {
													return value = 'A-(A*B/100)';
												} else if (value == 'COMBINATION_1') {
													return value = 'A+B*C';
												} else if (value == 'ROUND_1') {
													return value = 'ROUND(A)';
												} else if (value == 'ROUND_STD_1') {
													return value = 'STDROUND(A)';
												} else if (value == 'CEIL') {
													return value = 'CEIL(A)';
												} else if (value == 'NVL') {
													return value = 'NVL(A,B)';
												} else if (value == 'YEAR_OF_DATE') {
													return value = 'Year of date A';
												} else if (value == 'DAY_OF_YEAR') {
													return value = 'Day of year of date A';
												} else if (value == 'MONTH_OF_DATE') {
													return value = 'Month of date A';
												} else if (value == 'DAY_OF_MONTH') {
													return value = 'Day of month of date A';
												} else if (value == 'ADD_DAYS') {
													return value = 'Date A + B Days';
												} else if (value == 'FLOOR') {
													return value = 'FLOOR(A)';
												} else if (value == 'ROUND_STD_2') {
													return value = 'STDROUND(A,B)';
												} else if (value == 'ROUND_2') {
													return value = 'ROUND(A,B)';
												} else if (value == 'COMBINATION_2') {
													return value = 'SQRT(A*A+B*B)';
												} else if (value == 'PERCENT_3') {
													return value = 'A+(A*B/100)';
												} else if (value == 'PERCENT_1') {
													return value = '100*A/B';
												} else if (value == 'SQUARE') {
													return value = 'A*A';
												} else if (value == 'MULTIPLY') {
													return value = 'A*B';
												} else if (value == 'CONSTANT') {
													return value = 'Set field to constant value A';
												} else if (value == 'ADD') {
													return value = 'A+B';
												} else if (value == 'DAY_OF_WEEK') {
													return value = 'Day of week of date A'
												} else if (value == 'WEEK_OF_YEAR_ISO8601') {
													return value = 'ISO8601 Week of year of date A'
												} else if (value == 'BYTE_TO_HEX_ENCODE') {
													return value = 'Byte to hex encode of string A'
												} else if (value == 'CHAR_TO_HEX_ENCODE') {
													return value = 'Char to hex encode of string A'
												} else if (value == 'CRC32') {
													return value = 'Checksum of a file A using CRC-32'
												} else if (value == 'MD5') {
													return value = 'Checksum of a file A using MD5'
												} else if (value == 'WEEK_OF_YEAR') {
													return value = 'Week of year of date A'
												} else if (value == 'YEAR_OF_DATE_ISO8601') {
													return value = 'ISO8601 Year of date A'
												} else if (value == 'HEX_TO_BYTE_DECODE') {
													return value = 'Hex to byte decode of string A'
												} else if (value == 'HEX_TO_CHAR_DECODE') {
													return value = 'Hex to char decode of string A'
												} else if (value == 'ADLER32') {
													return value = 'Checksum of a file A using Adler-32'
												} else if (value == 'SHA1') {
													return value = 'Checksum of a file A using SHA-1'
												} else if (value == 'LEVENSHTEIN_DISTANCE') {
													return value = 'Levenshtein Distance(source A and target B)'
												} else if (value == 'DOUBLE_METAPHONE') {
													return value = 'Double metaphone of A(phonetics)'
												} else if (value == 'REMOVE_TIME_FROM_DATE') {
													return value = 'Remove time from a date A'
												} else if (value == 'ADD3') {
													return value = 'A+B+C'
												} else if (value == 'UPPER_CASE') {
													return value = 'UpperCase of a string A'
												} else if (value == 'MASK_XML') {
													return value = 'Mask XML content from string A'
												} else if (value == 'METAPHONE') {
													return value = 'Metaphone of A(phonetics)'
												} else if (value == 'ABS') {
													return value = 'Absolute value ABS(A)'
												} else if (value == 'DATE_DIFF') {
													return value = 'Date A - Date B(in days)'
												} else if (value == 'INIT_CAP') {
													return value = 'First letter of each word of a string A in capital'
												} else if (value == 'LOWER_CASE') {
													return value = 'LowerCase of a string A'
												} else if (value == 'USE_CDATA') {
													return value = 'Protect(CDATA) XML content from string A'
												} else if (value == 'REMOVE_CR') {
													return value = 'Remove CR from a string A'
												} else if (value == 'REMOVE_CRLF') {
													return value = 'Remove CRLF from a string A'
												} else if (value == 'GET_ONLY_DIGITS') {
													return value = 'Return only digits from string A'
												} else if (value == 'STRING_LEN') {
													return value = 'Return the length of a string A'
												} else if (value == 'ADD_TIME_TO_DATE') {
													return value = 'Add time B to date A'
												} else if (value == 'SUBSTITUTE_VARIABLE') {
													return value = 'variable substitution in string A'
												} else if (value == 'REMOVE_LF') {
													return value = 'Remove LF from a string A'
												} else if (value == 'REMOVE_TAB') {
													return value = 'Remove TAB from a string A'
												} else if (value == 'REMOVE_DIGITS') {
													return value = 'Remove digits from string A'
												} else if (value == 'LOAD_FILE_CONTENT_BINARY') {
													return value = 'Load file content in binary'
												} else if (value == 'QUARTER_OF_DATE') {
													return value = 'Quarter of date A'
												} else if (value == 'UNESCAPE_XML') {
													return value = 'Unescape XML content'
												} else if (value == 'ESCAPE_HTML') {
													return value = 'Escape HTML content'
												} else if (value == 'ESCAPE_SQL') {
													return value = 'Escape SQL content'
												} else if (value == 'ADD_MONTHS') {
													return value = 'Date A + B Months'
												} else if (value == 'ADD_MINUTES') {
													return value = 'Date A + B Minutes'
												} else if (value == 'DATE_DIFF_SEC') {
													return value = 'Date A - B (seconds)'
												} else if (value == 'DATE_DIFF_HR') {
													return value = 'Date A - B (hours)'
												} else if (value == 'MINUTE_OF_HOUR') {
													return value = 'Minute of Hour of Date A'
												} else if (value == 'UNESCAPE_HTML') {
													return value = 'Unescape HTML content'
												} else if (value == 'DATE_WORKING_DIFF') {
													return value = 'Date A - Date B(working days)'
												} else if (value == 'ADD_HOURS') {
													return value = 'Date A + B Hours'
												} else if (value == 'DATE_DIFF_MSEC') {
													return value = 'Date A - B (milliseconds)'
												} else if (value == 'DATE_DIFF_MN') {
													return value = 'Date A - B (minutes)'
												} else if (value == 'HOUR_OF_DAY') {
													return value = 'Hour of Day of Date A'
												} else if (value == 'SECOND_OF_MINUTE') {
													return value = 'Second of Minute of Date A'
												}
											}
										},
										{
											field : 'field_a',
											title : '字段A',
											width : 100,
											editor : {
												type : 'combobox',
												options : {
													valueField : "value",
													textField : "text",
													data : caltacomval
												}
											}
										},
										{
											field : 'field_b',
											title : '字段B',
											width : 100,
											editor : {
												type : 'combobox',
												options : {
													valueField : "value",
													textField : "text",
													data : caltacomval
												}
											}
										},
										{
											field : 'field_c',
											title : '字段C',
											width : 100,
											editor : {
												type : 'combobox',
												options : {
													valueField : "value",
													textField : "text",
													data : caltacomval
												}
											}
										},
										{
											field : 'value_type',
											title : '值类型',
											width : 100,
											editor : {
												type : 'combobox',
												options : {
													valueField : 'label',
													textField : 'value',
													editable : false,
													data : [
															{
																label : 'String',
																value : 'String'
															},
															{
																label : 'Date',
																value : 'Date'
															},
															{
																label : 'Number',
																value : 'Number'
															},
															{
																label : 'InternetAddress',
																value : 'InternetAddress'
															},
															{
																label : 'BigNumber',
																value : 'BigNumber'
															},
															{
																label : 'Integer',
																value : 'Integer'
															},
															{
																label : 'Boolean',
																value : 'Boolean'
															},
															{
																label : 'Timestamp',
																value : 'Timestamp'
															},
															{
																label : 'Binary',
																value : 'Binary'
															} ],
													onSelect : function(
															newValue) {
														change(newValue.value);
													}
												}
											}
										},
										{
											field : 'value_length',
											title : '长度',
											width : 100,
											editor : {
												type : 'text'
											},
											formatter : function(value, row,
													index) {
												if (value == '-1') {
													value = '';
												}
												return value;
											}
										},
										{
											field : 'value_precision',
											title : '精度',
											width : 100,
											editor : {
												type : 'text'
											},
											formatter : function(value, row,
													index) {
												if (value == '-1') {
													value = '';
												}
												return value;
											}
										},
										{
											field : 'remove',
											title : '移除',
											width : 100,
											editor : {
												type : 'combobox',
												options : {
													valueField : 'value',
													textField : 'label',
													editable : false,
													data : [ {
														label : '是',
														value : 'Y'
													}, {
														label : '否',
														value : 'N'
													} ],
												}
											},
											formatter : function(value, row,
													index) {
												if (value == 'N') {
													value = '否';
												} else {
													value = '是';
												}
												return value;
											}
										},
										{
											field : 'conversion_mask',
											title : 'Conversion mask',
											width : 110,
											editor : {
												type : 'combobox',
												options : {
													valueField : 'text',
													textField : 'text',
													formatter : function(row) {
														var opts = $(this)
																.combobox(
																		'options');
														return row[opts.textField];
													}

												}
											}
										}, {
											field : 'decimal_symbol',
											title : '小数点符号',
											width : 100,
											editor : {
												type : 'text'
											}
										}, {
											field : 'grouping_symbol',
											title : '分组符号',
											width : 100,
											editor : {
												type : 'text'
											}
										}, {
											field : 'currency_symbol',
											title : '货币符号',
											width : 100,
											editor : {
												type : 'text'
											}
										} ] ],
								onClickRow : function(i, r) {
									var rows = $(this).datagrid('getRows');
									$
											.each(
													rows,
													function(j, o) {
														j === i
																|| $(
																		'#Calculator_table')
																		.datagrid(
																				'endEdit',
																				j);
													});

									$(this).datagrid('beginEdit', i);// 编辑点击的行
									$(this).datagrid('unselectRow', i);//取消选择一行

									var newOld = change2(r.type, i);
									if (newOld == '') {
										var ed = $(this).datagrid('getEditor',
												{
													index : i,
													field : 'currency_symbol'
												});
										$(ed.target).combobox('setValue',
												r.format);
									} else {
										var ed = $(this).datagrid('getEditor',
												{
													index : i,
													field : 'currency_symbol'
												});
										$(ed.target).combobox('setValue',
												newOld);
									}
								},
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
								},
								onClickCell : function(index, field, value) {
									if (field == "calc_type") {
										$('#Calculator_table').datagrid(
												'endEdit', index);
										$('#Calculator_table_datalist')
												.datalist({
													data : calctypeVal,
													valueField : "value",
													textField : "text",
												});

										$('#Calculator_table_calctytype')
												.window('open');

										Calculator_table_value = index;
									} else {
										$(this).datagrid('beginEdit', index);
										var ed = $(this).datagrid('getEditor',
												{
													index : index,
													field : field
												});
										$(ed.target).focus();
									}
								}
							});

			// 取消按钮
			$('#Calculator_cancel').unbind('click').click(function(e) {
				$('#Calculator').window('close');
			});
			// 确认按钮
			$('#Calculator_ok')
					.unbind('click')
					.click(
							function(e) {
								var Calculator = {};
								node.text = $('#step_name_Calculator').textbox(
										'getValue');
								var rows = $('#Calculator_table').datagrid(
										'getRows');
								$.each(rows, function(i, o) {
									$('#Calculator_table').datagrid('endEdit',
											i);// 结束编辑所有行
								});
								var fields = Nasoft.GetProjectData
										.getFields('#Calculator_table');
								if (!!fields
										&& fields.field.constructor == Array) {// 数组
									$
											.each(
													fields.field,
													function(i, o) {
														if (o.calc_type == ''
																|| o.calc_type == null) {
															o.calc_type = '-'
														}
														if (o.value_type == ''
																|| o.value_type == null) {
															o.value_type = 'None'
														}
														if (o.value_length == ''
																|| o.value_length == null) {
															o.value_length = '-1'
														}
														if (o.value_precision == ''
																|| o.value_precision == null) {
															o.value_precision = '-1'
														}
														if (o.remove == ''
																|| o.remove == null) {
															o.remove = 'N'
														}
													});
									Calculator.calculation = fields.field;
								} else if (!!fields) {// 对象
									if (fields.field.calc_type == ''
											|| fields.field.calc_type == null) {
										fields.field.calc_type = '-'
									}
									if (fields.field.value_type == ''
											|| fields.field.value_type == null) {
										fields.field.value_type = 'None'
									}
									if (fields.field.value_length == ''
											|| fields.field.value_length == null) {
										fields.field.value_length = '-1'
									}
									if (fields.field.value_precision == ''
											|| fields.field.value_precision == null) {
										fields.field.value_precision = '-1'
									}
									if (fields.field.remove == ''
											|| fields.field.remove == null) {
										fields.field.remove = 'N'
									}
									Calculator.calculation = [ fields.field ];
								}

								node.setStep(Calculator);

								node.setTransfer();// 把定义的常量set出去
								$('#Calculator').window('close');// 关闭窗口
							});

		} catch (e) {
			console.log(e)
		}
	}, onBeforeClose = function() {
	}
	/**
	 * type方法
	 */
	function change(newValue) {
		var date = [ {
			"id" : 1,
			"text" : "yyyy/MM/dd HH:mm:ss.SSS"
		}, {
			"id" : 2,
			"text" : "yyyy/MM/dd HH:mm:ss.SSS XXX"
		}, {
			"id" : 3,
			"text" : "yyyy/MM/dd HH:mm:ss"
		}, {
			"id" : 4,
			"text" : "yyyy/MM/dd HH:mm:ss XXX"
		}, {
			"id" : 5,
			"text" : "yyyyMMddHHmmss"
		}, {
			"id" : 6,
			"text" : "yyyy/MM/dd"
		}, {
			"id" : 7,
			"text" : "yyyy-MM-dd"
		}, {
			"id" : 8,
			"text" : "yyyy-MM-dd HH:mm:ss"
		}, {
			"id" : 9,
			"text" : "yyyy-MM-dd HH:mm:ss XXX"
		}, {
			"id" : 10,
			"text" : "yyyyMMdd"
		}, {
			"id" : 11,
			"text" : "MM/dd/yyyy"
		}, {
			"id" : 12,
			"text" : "MM/dd/yyyy HH:mm:ss"
		}, {
			"id" : 13,
			"text" : "MM-dd-yyyy"
		}, {
			"id" : 14,
			"text" : "MM-dd-yyyy HH:mm:ss"
		}, {
			"id" : 15,
			"text" : "MM/dd/yy"
		}, {
			"id" : 15,
			"text" : "MM-dd-yy"
		}, {
			"id" : 16,
			"text" : "dd/MM/yyyy"
		}, {
			"id" : 17,
			"text" : "dd-MM-yyyy"
		}, {
			"id" : 18,
			"text" : "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
		} ];// 定义下拉表单数据
		var number = [ {
			"id" : 1,
			"text" : "#,##0.###"
		}, {
			"id" : 2,
			"text" : "0.00"
		}, {
			"id" : 3,
			"text" : "0000000000000"
		}, {
			"id" : 4,
			"text" : "#.#"
		}, {
			"id" : 5,
			"text" : "#"
		}, {
			"id" : 6,
			"text" : "###,###,###.#"
		}, {
			"id" : 7,
			"text" : "#######.###"
		}, {
			"id" : 8,
			"text" : "#####.###%"
		} ];//
		var empty = [ {} ];

		rowIndex = $('#Calculator_table').datagrid('getRowIndex',
				$("#Calculator_table").datagrid('getSelected'));
		// 得到编辑行的id
		if (newValue == 'Date') {
			// 方案1
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : date,
				valueField : "text",
				textField : "text"
			});
		} else if (newValue == 'Number') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : number,
				valueField : "text",
				textField : "text"
			});
		} else if (newValue == 'BigNumber') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : number,
				valueField : "text",
				textField : "text"
			});
		} else if (newValue == 'Integer') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : number,
				valueField : "text",
				textField : "text"
			});
		} else if (newValue == 'String') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : empty
			});
		} else if (newValue == 'InternetAddress') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : empty
			});
		} else if (newValue == 'Boolean') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : empty
			});
		} else if (newValue == 'Timestamp') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : empty
			});
		} else if (newValue == 'Binary') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : empty
			});
		} else {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : empty
			});
		}
	}
	/**
	 * type方法2
	 */
	function change2(newValue, rowIndex) {
		var date = [ {
			"id" : 1,
			"text" : "yyyy/MM/dd HH:mm:ss.SSS"
		}, {
			"id" : 2,
			"text" : "yyyy/MM/dd HH:mm:ss.SSS XXX"
		}, {
			"id" : 3,
			"text" : "yyyy/MM/dd HH:mm:ss"
		}, {
			"id" : 4,
			"text" : "yyyy/MM/dd HH:mm:ss XXX"
		}, {
			"id" : 5,
			"text" : "yyyyMMddHHmmss"
		}, {
			"id" : 6,
			"text" : "yyyy/MM/dd"
		}, {
			"id" : 7,
			"text" : "yyyy-MM-dd"
		}, {
			"id" : 8,
			"text" : "yyyy-MM-dd HH:mm:ss"
		}, {
			"id" : 9,
			"text" : "yyyy-MM-dd HH:mm:ss XXX"
		}, {
			"id" : 10,
			"text" : "yyyyMMdd"
		}, {
			"id" : 11,
			"text" : "MM/dd/yyyy"
		}, {
			"id" : 12,
			"text" : "MM/dd/yyyy HH:mm:ss"
		}, {
			"id" : 13,
			"text" : "MM-dd-yyyy"
		}, {
			"id" : 14,
			"text" : "MM-dd-yyyy HH:mm:ss"
		}, {
			"id" : 15,
			"text" : "MM/dd/yy"
		}, {
			"id" : 15,
			"text" : "MM-dd-yy"
		}, {
			"id" : 16,
			"text" : "dd/MM/yyyy"
		}, {
			"id" : 17,
			"text" : "dd-MM-yyyy"
		}, {
			"id" : 18,
			"text" : "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
		} ];//定义下拉表单数据
		var number = [ {
			"id" : 1,
			"text" : "#,##0.###"
		}, {
			"id" : 2,
			"text" : "0.00"
		}, {
			"id" : 3,
			"text" : "0000000000000"
		}, {
			"id" : 4,
			"text" : "#.#"
		}, {
			"id" : 5,
			"text" : "#"
		}, {
			"id" : 6,
			"text" : "###,###,###.#"
		}, {
			"id" : 7,
			"text" : "#######.###"
		}, {
			"id" : 8,
			"text" : "#####.###%"
		} ];//
		var empty = [ {} ];
		if (newValue == 'Date') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : date,
				valueField : "text",
				textField : "text"
			});
		} else if (newValue == 'Number') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : number,
				valueField : "text",
				textField : "text"
			});
		} else if (newValue == 'BigNumber') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : number,
				valueField : "text",
				textField : "text"
			});
		} else if (newValue == 'Integer') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : number,
				valueField : "text",
				textField : "text"
			});
		} else if (newValue == 'String') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : empty
			});
		} else if (newValue == 'InternetAddress') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : empty
			});
		} else if (newValue == 'Boolean') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : empty
			});
		} else if (newValue == 'Timestamp') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : empty
			});
		} else if (newValue == 'Binary') {
			var ed = $('#Calculator_table').datagrid('getEditor', {
				index : rowIndex,
				field : 'format'
			});
			$(ed.target).combobox({
				data : empty
			});
		} else {
			return '';
		}
		return $(ed.target).combobox('getValue');
	}
	return {
		onBeforeOpen : onBeforeOpen,
		onBeforeClose : onBeforeClose
	}
}
