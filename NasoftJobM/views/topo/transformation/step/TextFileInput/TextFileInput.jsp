<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>

<div id="TextFileInput" title="文本文件输入 " class="easyui-window"
	data-options="modal:true,collapsible:false,minimizable:false,maximizable:false,closable:true"
	closed="true"
	style="width: 1150px; height: 600px; padding: 5px; background: #fafafa;">
	<div region="north">
		<table style="margin-left: 200px;">
			<tr>
				<td align="right">步骤名称</td>
				<td><input class="easyui-textbox" name="fri-name_textFileInput"
					id="fri-name_textFileInput" style="width: 400px"></td>
			</tr>
		</table>
	</div>
	<!--  -->
	<div style="width: 1150; height: 480px;">
		<div id="textFileInput_tabs" class="easyui-tabs"
			data-options="fit:true">
			<div id="file" title="文件" style="padding: 20px; display: none;">
				<table>
					<tr>
						<td align="right">文件或目录</td>
						<td><input class='easyui-textbox'
							id='textFileInput_handle_file' name='textFileInput_handle_file'
							style="width: 200px" /> <a class='easyui-linkbutton'
							id="filelook">浏览</a> <input type="hidden"
							id="textFileInput_handle_file_h"></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">规则表达式</td>
						<td><input class='easyui-textbox' style="width: 200px"
							id="rule_textFileInput" name="rule_textFileInput" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">正则表达式(排除)</td>
						<td><input class='easyui-textbox' style="width: 200px"
							id="regular_textFileInput" name="regular_rule_textFileInput" /></td>
						<td><a href="#" id="add_textFileInput"
							class="easyui-linkbutton">增加</a> <a href="#"
							id="delete_textFileInput" class="easyui-linkbutton">删除</a></td>
					</tr>
					<tr>
						<td></td>
						<td colspan="2">
							<div style="width: 800px; height: 160px;">
								<table id="Selected_file_textFileInput"
									data-options="singleSelect:true"></table>
							</div>
						</td>
						<td></td>
					</tr>
				</table>
				<div>
					<form>
						<fieldset>
							<legend>从上一步获取文件名</legend>
							<table>
								<tr>
									<td align="right">从之前步骤接受文件名</td>
									<td><input type="checkbox"
										id="beforfilename_textFileInput"
										name="beforfilename_textFileInput" /></td>
								</tr>
								<tr>
									<td align="right">从之前步骤接受字段名</td>
									<td><input disabled="disabled" type="checkbox"
										id="beforfield_textFileInput" name="beforfield_textFileInput" />
									</td>
								</tr>
								<tr>
									<td align="right">步骤读取的文件名来自</td>
									<td><input id="readfilename_textFileInput"
										class="easyui-combobox" name="readfilename_textFileInput"
										style="width: 200px;"
										data-options="valueField:'id',textField:'text'"
										disabled="false" /></td>
								</tr>
								<tr>
									<td align="right">在输入里的字段被当做文件名</td>
									<td><input class='easyui-textbox'
										id="inputfieldfilename_textFileInput"
										name="inputfieldfilename_textFileInput" style="width: 200px"
										disabled="false" /></td>
								</tr>
							</table>
						</fieldset>
					</form>
				</div>
				<div>
					<a href="#" id="textFileInput_filename" class="easyui-linkbutton">显示文件名</a>
					<a href="#" id="textFileInput_line" class="easyui-linkbutton">显示文件内容</a>
				</div>
				<div id="TextFileInput_window_filename"></div>
				<div id="TextFileInput_window_line"></div>
				<div id="textFileInput_window_fileProperty"></div>
			</div>
			<div title="内容" style="overflow: auto; padding: 20px; display: none;">
				<table>
					<tr>
						<td align="right">文件类型</td>
						<td colspan="2"><select id="filetype_textFileInput"
							name="filetype_textFileInput" class="easyui-combobox"
							style="width: 200px;" data-options="editable:false">
								<option>CSV</option>
								<option>Fixed</option>
						</select></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">分隔符</td>
						<td colspan="2"><input id="separate_textFileInput"
							name="separate_textFileInput" class='easyui-textbox'
							style="width: 200px" /></td>
						<td><a id="separate_button_textFileInput"
							name="separate_button_textFileInput" href="#"
							class="easyui-linkbutton">insertTAB</a></td>
					</tr>
					<tr>
						<td align="right">文本限定符</td>
						<td colspan="2"><input id="textlimite_textFileInput"
							name="textlimite_textFileInput" class='easyui-textbox'
							style="width: 200px" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">文本限定符里允许换行?</td>
						<td colspan="2"><input type="checkbox"
							id="textlimitelinebreak_textFileInput"
							name="textlimitelinebreak_textFileInput" disabled="disabled" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">逃逸字符</td>
						<td colspan="2"><input id="escapefont_textFileInput"
							name="escapefont_textFileInput" class='easyui-textbox'
							style="width: 200px" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">头部</td>
						<td><input type="checkbox" id="head_textFileInput"
							name="head_textFileInput" />头部行数量</td>
						<td><input id="inputhead_textFileInput"
							name="inputhead_textFileInput" class='easyui-textbox'
							style="width: 200px" disabled="false" /></td>
					</tr>
					<tr>
						<td align="right">尾部</td>
						<td><input type="checkbox" id="endcount_textFileInput"
							name="endcount_textFileInput" />尾部行数量</td>
						<td><input id="end_textFileInput" name="end_textFileInput"
							class='easyui-textbox' style="width: 200px" disabled="false" /></td>
					</tr>
					<tr>
						<td align="right">包装行?</td>
						<td><input id="packlinecount_textFileInput"
							name="packlinecount_textFileInput" type="checkbox" />以时间包装的行数</td>
						<td><input id="packline_textFileInput"
							name="packline_textFileInput" class='easyui-textbox'
							style="width: 200px" disabled="false" /></td>
					</tr>
					<tr>
						<td align="right">分页布局?</td>
						<td><input id="pagelayout_textFileInput"
							name="pagelayout_textFileInput" type="checkbox" />每页记录的行数</td>
						<td><input id="each_recorde_textFileInput"
							name="each_recorde_textFileInput" class='easyui-textbox'
							style="width: 200px" disabled="false" /></td>
					</tr>
					<tr>
						<td align="right"></td>
						<td>文档头部行</td>
						<td><input id="word_head_textFileInput"
							name="word_head_textFileInput" class='easyui-textbox'
							style="width: 200px" disabled="false" /></td>
					</tr>
					<tr>
						<td align="right">压缩</td>
						<td colspan="2"><select id="compress_textFileInput"
							name="compress_textFileInput" class="easyui-combobox"
							style="width: 200px;" data-options="editable:false">
								<option>None</option>
								<option>GZip</option>
								<option>Snappy</option>
								<option>Zip</option>
								<option>Hadoop-snappy</option>
						</select></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">没有空行</td>
						<td colspan="2"><input id="nonenull_textFileInput"
							name="nonenull_textFileInput" type="checkbox" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">在输出包括字段名?</td>
						<td><input id="intoincludefield_textFileInput"
							name="intoincludefield_textFileInput" type="checkbox" />包含文件名的字段名称
						</td>
						<td><input id="intoincludefield_input_textFileInput"
							name="intoincludefield_input_textFileInput"
							class='easyui-textbox' style="width: 200px" disabled="false" /></td>
					</tr>
					<tr>
						<td align="right">输出包含行数?</td>
						<td><input id="intoincludeline_textFileInput"
							name="intoincludeline_textFileInput" type="checkbox" />行数字段名称</td>
						<td><input id="intoincludeline_input_textFileInput"
							name="intoincludeline_input_textFileInput" class='easyui-textbox'
							style="width: 200px" disabled="false" /></td>
					</tr>
					<tr>
						<td align="right"></td>
						<td>按文件取行号</td>
						<td><input disabled="disabled"
							id="fieldoutlinenumber_textFileInput"
							name="fieldoutlinenumber_textFileInput" type="checkbox" /></td>
					</tr>
					<tr>
						<td align="right">格式</td>
						<td colspan="2"><select id="format_textFileInput"
							class="easyui-combobox" name="format_textFileInput"
							style="width: 200px;" data-options="editable:false">
								<option>DOS</option>
								<option>Unix</option>
								<option>mixed</option>
						</select></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">编码方式</td>
						<td colspan="2"><select id="codetype_textFileInput"
							class="easyui-combobox" name="codetype_textFileInput"
							style="width: 200px;" data-options="editable:false">
								<!-- 								<option>GBK</option> -->
								<!-- 								<option>UTF-8</option> -->
								<!-- 								<option>ISO-8859-1</option> -->
						</select></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">记录数量限制</td>
						<td colspan="2"><input id="recodecountlimiete_textFileInput"
							name="recodecountlimiete_textFileInput" class='easyui-textbox'
							style="width: 200px" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">解析日期时候是否严格要求格式</td>
						<td colspan="2"><input id="dateisask_textFileInput"
							name="dateisask_textFileInput" type="checkbox" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">本地日期格式</td>
						<td colspan="2"><select id="local_date_textFileInput"
							class="easyui-combobox" name="local_date_textFileInput"
							style="width: 200px;" data-options="editable:false">
								<option value="aa">zh_CN</option>
								<option>en_GB</option>
								<option>zh_TW</option>
						</select></td>
						<td></td>
					</tr>
				</table>
				<div>
					<form>
						<fieldset>
							<legend>结果文件名</legend>
							<table>
								<tr>
									<td align="right">添加文件名</td>
									<td><input type="checkbox" id="addfilename_textFileInput"
										name="addfilename_textFileInput" /></td>
								</tr>
							</table>
						</fieldset>
					</form>
				</div>
			</div>
			<div title="错误处理"
				style="overflow: auto; padding: 20px; display: none;">
				<table>
					<tr>
						<td align="right">忽略错误</td>
						<td colspan="2"><input id="error_hidden_textFileInput"
							name="error_hidden_textFileInput" type="checkbox" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">忽略错误文件</td>
						<td colspan="2"><input id="error_hiddenFile_textFileInput"
							name="error_hiddenFile_textFileInput" type="checkbox" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">错误文件字段名</td>
						<td colspan="2"><input id="error_fileField_textFileInput"
							name="error_fileField_textFileInput" class='easyui-textbox'
							style="width: 200px" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">文件错误信息字段名</td>
						<td colspan="2"><input
							id="error_informationField_textFileInput"
							name="error_informationField_textFileInput"
							class='easyui-textbox' style="width: 200px" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">跳过错误行?</td>
						<td colspan="2"><input id="error_breakline_textFileInput"
							name="error_breakline_textFileInput" type="checkbox" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">错误计数字段</td>
						<td colspan="2"><input id="error_countField_textFileInput"
							name="error_countField_textFileInput" class='easyui-textbox'
							style="width: 200px" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">错误字段文件名</td>
						<td colspan="2"><input id="error_fieldfilename_textFileInput"
							name="error_fieldfilename_textFileInput" class='easyui-textbox'
							style="width: 200px" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">错误文本字段</td>
						<td colspan="2"><input id="error_textfield_textFileInput"
							name="error_textfield_textFileInput" class='easyui-textbox'
							style="width: 200px" /></td>
						<td></td>
					</tr>
						<tr>
						<td align="right">告警文件目录</td>
						<td colspan="2"><input class='easyui-textbox'
							id='error_jinggao_textFileInput'
							name='error_jinggao_textFileInput' style="width: 200px" /> <input
							type="hidden" id="error_jinggao_textFileInput_h"></td>
						<td>扩展名<input id="error_jinggao_input_textFileInput"
							name="error_jinggao_input_textFileInput" class='easyui-textbox'
							style="width: 100px" /><a class='easyui-linkbutton'
							id="extend_textFileInput">浏览</a></td>
					</tr>
					<tr>
						<td align="right">错误文件目录</td>
						<td colspan="2"><input class='easyui-textbox'
							id='error_fileMuLu_textFileInput'
							name='error_fileMuLu_textFileInput' style="width: 200px" /> <input
							type="hidden" id="error_fileMuLu_textFileInput_h"></td>
						<td>扩展名<input id="error_extendName_textFileInput"
							name="error_extendName_textFileInput" class='easyui-textbox'
							style="width: 100px" /><a class='easyui-linkbutton'
							id="extend1_textFileInput">浏览</a></td>
					</tr>
					<tr>
						<td align="right">失败行数文件目录</td>
						<td colspan="2"><input id="error_failLine_textFileInput"
							name="error_failLine_textFileInput" class='easyui-textbox'
							style="width: 200px" /> <input type="hidden"
							id="error_failLine_textFileInput_h"></td>
						<td>扩展名<input id="error_extendTwo_textFileInput"
							name="error_extendTwo_textFileInput" class='easyui-textbox'
							style="width: 100px" /><a class='easyui-linkbutton'
							id="extend2_textFileInput">浏览</a></td>
					</tr> 
				</table>
			</div>
			<div title="过滤"
				style="width: auto; overflow: auto; padding: 20px; display: none;">
				<table id="filter_textFileInput" data-options="singleSelect:true"></table>
			</div>
			<div title="字段" id="wordfield_textFileInput"
				name="wordfield_textFileInput"
				style="overflow: auto; padding: 20px; display: none;">
				<table id='field_big_fixedInput' data-options="singleSelect:true"></table>
			</div>
			<div title="其他输出字段"
				style="overflow: auto; padding: 20px; display: none;">
				<table>
					<tr>
						<td align="right">文件名字段</td>
						<td colspan="2"><input class='easyui-textbox'
							style="width: 200px" name="filenamefield_textFileInput"
							id="filenamefield_textFileInput" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">扩展名字段</td>
						<td colspan="2"><input class='easyui-textbox'
							style="width: 200px" name="extends_textFileInput"
							id="extends_textFileInput" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">路径字段</td>
						<td colspan="2"><input class='easyui-textbox'
							style="width: 200px" name="pathfield_textFileInput"
							id="pathfield_textFileInput" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">文件大小字段</td>
						<td colspan="2"><input class='easyui-textbox'
							style="width: 200px" name="filesizefield_textFileInput"
							id="filesizefield_textFileInput" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">是否为隐藏文件字段</td>
						<td colspan="2"><input class='easyui-textbox'
							style="width: 200px" name="ishiddenfield_textFileInput"
							id="ishiddenfield_textFileInput" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">最后修改时间字段</td>
						<td colspan="2"><input class='easyui-textbox'
							style="width: 200px" name="endupdatetimefield_textFileInput"
							id="endupdatetimefield_textFileInput" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">Uri字段</td>
						<td colspan="2"><input class='easyui-textbox'
							style="width: 200px" name="uri_textFileInput"
							id="uri_textFileInput" /></td>
						<td></td>
					</tr>
					<tr>
						<td align="right">Root Uri字段</td>
						<td colspan="2"><input class='easyui-textbox'
							style="width: 200px" name="rooturi_textFileInput"
							id="rooturi_textFileInput" /></td>
						<td></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
	<div region="south" style="padding: 10px;">
		<div style="margin: auto; text-align: center">
			<a id='textFileInput_ok' class='easyui-linkbutton'
				style="width: 60px">确定</a> <a id='textFileInput_prv'
				class='easyui-linkbutton' style="width: 60px">预览记录</a> <a
				id='textFileInput_cancel' class='easyui-linkbutton'
				style="width: 60px">取消</a>
		</div>
	</div>
</div>
