<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="TextFileOutput" class="easyui-window" title="文本文件输出"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north" border="true" style="padding: 20px;">
			<table style="margin-left: 150px;">
				<tr>
					<td>步骤名称</td>
					<td><input class="easyui-textbox"
						name="step_name_textFileOutput" id="step_name_textFileOutput"
						style="width: 600px"></td>
				</tr>
			</table>
		</div>

		<div region="center" border='true'>
			<div id="tt" class="easyui-tabs" data-options="fit:true" style="">

				<!-- 文件-->
				<div title="文件" style="display: none;">

					<table style="margin-left: 50px;">
						<tr>
							<td>文件名称</td>
							<td><input class="easyui-textbox"
								name="file_name_textFileOutput" id="file_name_textFileOutput"
								style="width: 400px"> <input type="hidden"
								id="file_name_textFileOutput_h"> <a
								id="fileLook_textFileOutput" name="fileLook_textFileOutput"
								class="easyui-linkbutton" style="width: 50px;"> 浏览</a></td>
						</tr>

						<tr colspan="2">
							<td>结果输送至命令行或脚本</td>
							<td><input name="deliver_script_textFileOutput"
								id="deliver_script_textFileOutput" type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>输出传递到servlet</td>
							<td><input name="output_servlet_textFileOutput"
								id="output_servlet_textFileOutput" type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>创建父目录</td>
							<td><input name="father_catalogue_textFileOutput"
								id="father_catalogue_textFileOutput" type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>启动时不创建文件</td>
							<td><input name="no_found_file_textFileOutput"
								id="no_found_file_textFileOutput" type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>从字段中获取文件名?</td>
							<td><input name="obtain_file_textFileOutput"
								id="obtain_file_textFileOutput" type="checkbox"></td>
						</tr>

						<tr>
							<td>文件名字段</td>
							<td><input class="easyui-combobox"
								name="file_name_field_textFileOutput"
								id="file_name_field_textFileOutput" style="width: 600px" />
						</tr>

						<tr>
							<td>扩展名</td>
							<td><input class="easyui-textbox"
								name="expand_name_textFileOutput"
								id="expand_name_textFileOutput" style="width: 600px"></td>
						</tr>

						<tr colspan="2">
							<td>文件名里包含步骤数?</td>
							<td><input name="step_count_textFileOutput"
								id="step_count_textFileOutput" type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>文件名里包含数据分区号?</td>
							<td><input name="partition_mark_textFileOutput"
								id="partition_mark_textFileOutput" type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>文件名里包含日期?</td>
							<td><input name="file_name_date_textFileOutput"
								id="file_name_date_textFileOutput" type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>文件名里包含时间?</td>
							<td><input name="file_name_time_textFileOutput"
								id="file_name_time_textFileOutput" type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>指定日期时间格式</td>
							<td><input name="appoint_date_date_textFileOutput"
								id="appoint_date_date_textFileOutput" type="checkbox"></td>
						</tr>

						<tr>
							<td>日期时间格式</td>
							<td>
								<!-- <input class="easyui-combobox" name="dateTime_format_textFileOutput" id="dateTime_format_textFileOutput"  style="width: 600px"/> -->
								<select id="dateTime_format_textFileOutput"
								name="dateTime_format_textFileOutput" class="easyui-combobox"
								style="width: 600px;" data-options="editable:false">
									<option>yyyy/MM/dd HH:mm:ss.SSS</option>
									<option>yyyy/MM/dd HH:mm:ss.SSS XXX</option>
									<option>yyyy/MM/dd HH:mm:ss</option>
									<option>yyyy/MM/dd HH:mm:ss XXX</option>
									<option>yyyyMMddHHmmss</option>
									<option>yyyy/MM/dd</option>
									<option>yyyy-MM-dd</option>
									<option>yyyy-MM-dd HH:mm:ss</option>
									<option>yyyy-MM-dd HH:mm:ss XXX</option>
									<option>yyyyMMdd</option>
									<option>MM/dd/yyyy</option>
									<option>MM/dd/yyyy HH:mm:ss</option>
									<option>MM-dd-yyyy</option>
									<option>MM-dd-yyyy HH:mm:ss</option>
									<option>MM/dd/yy</option>
									<option>MM-dd-yy</option>
									<option>dd/MM/yyyy</option>
									<option>dd-MM-yyyy</option>
									<option>yyyy-MM-dd'T'HH:mm:ss.SSSXXX</option>
							</select>
							</td>
						</tr>

						<tr>
							<td></td>
							<td>
								<!--  <a id="fixedInput_show" class ="easyui-linkbutton" style="width:70px;">显示文件名</a>	 -->
							</td>
						</tr>

						<tr colspan="2">
							<td>结果中添加文件名</td>
							<td><input name="add_file_name_textFileOutput"
								id="add_file_name_textFileOutput" type="checkbox"></td>
						</tr>
					</table>
				</div>
				<!-- 文件-->

				<!-- 内容-->
				<div title="内容" style="display: none;">
					<table style="margin-left: 50px;">
						<tr>
							<td>追加方式</td>
							<td><input name="add_to_way_textFileOutput"
								id="add_to_way_textFileOutput" type="checkbox"></td>
						</tr>

						<tr>
							<td>分隔符</td>
							<td><input class="easyui-textbox"
								name="separate_symbol_textFileOutput"
								id="separate_symbol_textFileOutput" style="width: 550px">
								<a id="insert_textFileOutput" class="easyui-linkbutton"
								style="width: 50px;"> 插入</a></td>
						</tr>

						<tr>
							<td>封闭符</td>
							<td><input class="easyui-textbox"
								name="close_symbol_textFileOutput"
								id="close_symbol_textFileOutput" style="width: 600px">
							</td>
						</tr>

						<tr>
							<td>强制在字段周围加封闭符?</td>
							<td><input name="force_textFileOutput"
								id="force_textFileOutput" type="checkbox"></td>
						</tr>


						<tr>
							<td>禁用封闭符修复</td>
							<td><input name="repair_textFileOutput"
								id="repair_textFileOutput" type="checkbox"></td>
						</tr>


						<tr>
							<td>头部</td>
							<td><input name="head_textFileOutput"
								id="head_textFileOutput" type="checkbox"></td>
						</tr>

						<tr>
							<td>尾部</td>
							<td><input name="trail_textFileOutput"
								id="trail_textFileOutput" type="checkbox"></td>
						</tr>


						<tr>
							<td>格式</td>
							<td><select id="format_textFileOutput"
								name="format_textFileOutput" class="easyui-combobox"
								style="width: 600px;" data-options="editable:false">
									<option>CR+LF terminated (Windows, DOS)</option>
									<option>LF terminated (Unix)</option>
									<option>CR terminated</option>
									<option>No new-line terminator</option>
							</select></td>
						</tr>


						<tr>
							<td>压缩</td>
							<td><select id="compress_textFileOutput"
								name="compress_textFileOutput" class="easyui-combobox"
								style="width: 600px;" data-options="editable:false">
									<option>GZip</option>
									<option>Snappy</option>
									<option>None</option>
									<option>Zip</option>
									<option>Hadoop-snappy</option>
							</select></td>
						</tr>

						<tr>
							<td>编码</td>
							<td><select id="encoding_textFileOutput"
								name="encoding_textFileOutput" class="easyui-combobox"
								style="width: 600px;" data-options="editable:false">
									<option>GBK</option>
									<option>UTF-8</option>
									<option>GB2312</option>
							</select></td>
						</tr>

						<tr>
							<td>字段右填充或裁减</td>
							<td><input name="field_rightFill_textFileOutput"
								id="field_rightFill_textFileOutput" type="checkbox"></td>
						</tr>

						<tr>
							<td>快速数据存储(无格式)</td>
							<td><input name="speediness_storage_textFileOutput"
								id="speediness_storage_textFileOutput" type="checkbox"></td>
						</tr>

						<tr>
							<td>分拆...每一行</td>
							<td><input class="easyui-textbox"
								name="resolution_textFileOutput" id="resolution_textFileOutput"
								style="width: 600px"></td>
						</tr>

						<tr>
							<td>添加文件结束行</td>
							<td><input class="easyui-textbox"
								name="finish_line_textFileOutput"
								id="finish_line_textFileOutput" style="width: 600px"></td>
						</tr>
					</table>
				</div>
				<!--内容-->


				<!-- 字段-->
				<div title="字段" style="display: none;">
					<div class='easyui-layout' fit=true>
						<div region='center'>
							<table id='textFileOutput_table' class='easyui-datagrid'
								data-options="singleSelect:true,fit:true">

							</table>
						</div>
						<div region='south' align="center">
							<a class="easyui-linkbutton" style="width: 80px"
								id="obtain_filed">获取字段</a> <a id="bestSmall" name="bestSmall"
								class="easyui-linkbutton" style="width: 80px" id="minimum_width">最小宽度</a>
						</div>
					</div>
				</div>
			</div>
			<!--表格-->

		</div>
		<!--底部按钮 -->
		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center">
				<a id='textFileOutput_ok' class='easyui-linkbutton'
					style="width: 60px">确定</a> <a id='textFileOutput_cancel'
					class='easyui-linkbutton' style="width: 60px">取消</a>
			</div>
		</div>
	</div>
</div>
