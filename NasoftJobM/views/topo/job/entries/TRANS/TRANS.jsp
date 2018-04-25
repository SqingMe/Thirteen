<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
%>
<div id="TRANS" class="easyui-window" title="转换"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px;">
	<div class="easyui-layout" fit="true">
		<div region="north" border="true" style="padding: 20px">
			<table style="margin-left: 180px">
				<tr colspan="2">
					<td>作业项名称</td>
					<td><input class="easyui-textbox" name="step_name_TRANS"
						id="step_name_TRANS" style="width: 600px;" /></td>
				</tr>
			</table>
		</div>
		<!-- 头部-->

		<div region="center">
			<div id="TableDiffPlugin_tabs" class="easyui-tabs"
				data-options="fit:true" style="">
				<div title="转换设置" style='display: none'>
					<div class='easyui-layout' fit='true'>
						<div region='center'>
							<table style="margin: auto; margin-top: 20px;">
								<tr>
									<td style="width: 158px;"><input name="filename_TRANS_R"
										id="filename_TRANS_R" type="radio" checked="checked">
										<label> 转换文件名:</label></td>
									<td><input class="easyui-textbox" name="filename_TRANS"
										id="filename_TRANS" style="width: 600px;" /> <a
										id='TRANS_transition' class='easyui-linkbutton'
										style="width: 60px">转换</a> <a id='TRANS_transition_open'
										class='easyui-linkbutton' style="width: 60px">编辑</a> <input
										type="hidden" id="TRANS_transition_h"></td>
								</tr>
							</table>

							<!-- 							<table style="margin: auto; margin-top: 40px;"> -->
							<!-- 								<tr> -->
							<!-- 									<td><input name="appoint_transition" -->
							<!-- 										id="appoint_transition" type="radio" disabled> <label> -->
							<!-- 											通过目录与名称指定转换:</label></td> -->
							<!-- 									<td><input class="easyui-textbox" -->
							<!-- 										name="appoint_transition" id="appoint_transition" -->
							<!-- 										style="width: 600px;" disabled /> <a id='transition' -->
							<!-- 										class='easyui-linkbutton' style="width: 60px" -->
							<!-- 										data-options="disabled:true">转换</a></td> -->
							<!-- 								</tr> -->
							<!-- 								<tr> -->
							<!-- 									<td></td> -->
							<!-- 									<td><input class="easyui-textbox" -->
							<!-- 										name="appoint_transition" id="appoint_transition" -->
							<!-- 										style="width: 600px;" disabled /></td> -->
							<!-- 								</tr> -->
							<!-- 							</table> -->

							<!-- 							<table style="margin: auto; margin-top: 40px"> -->
							<!-- 								<tr> -->
							<!-- 									<td style="width: 160px;"><input name="appoint_file" -->
							<!-- 										id="appoint_file" type="radio" disabled> <label>通过引用指定转换文件:</label> -->
							<!-- 									</td> -->
							<!-- 									<td><input class="easyui-textbox" name="appoint_file" -->
							<!-- 										id="appoint_file" style="width: 600px;" disabled /> <a -->
							<!-- 										id='appoint_file' class='easyui-linkbutton' -->
							<!-- 										style="width: 60px" data-options="disabled:true">转换</a></td> -->
							<!-- 								</tr> -->
							<!-- 							</table> -->
						</div>
						<!-- 						<div region='south'> -->
						<!-- 							<a id='TRANS_transformation' class='easyui-linkbutton' -->
						<!-- 								style="width: 150px">New transformation</a> -->
						<!-- 						</div> -->
					</div>
				</div>

				<div title="高级" style="display: none;">
					<table style="margin-left: 150px;">
						<tr colspan="2">
							<td>复制上一步结果到位置参数</td>
							<td><input name="TRANS_copy_location"
								id="TRANS_copy_location" type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>复制上一步结果到命名参数</td>
							<td><input name="TRANS_copy_name" id="TRANS_copy_name"
								type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>执行每一个输入行?</td>
							<td><input name="TRANS_input_line" id="TRANS_input_line"
								type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>在执行前清除结果行列表?</td>
							<td><input name="TRANS_result_listing"
								id="TRANS_result_listing" type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>在执行前清除结果文件列表?</td>
							<td><input name="TRANS_result_file" id="TRANS_result_file"
								type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>在集群模式下运行这个转换?</td>
							<td><input name="TRANS_colony_transform"
								id="TRANS_colony_transform" type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>Log remote execution locally</td>
							<td><input name="TRANS_locally" id="TRANS_locally"
								type="checkbox" disabled></td>
						</tr>

						<tr colspan="2">
							<td>远程从服务器</td>
							<td><input class="easyui-combobox"
								name="long_distance_server" id="long_distance_server"
								style="width: 600px" /></td>
						</tr>


						<tr colspan="2">
							<td>等待远程转换执行结束</td>
							<td><input name="TRANS_finish" id="TRANS_finish"
								type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>本地转换终止时远程转换也通知终止</td>
							<td><input name="TRANS_stop" id="TRANS_stop" type="checkbox"></td>
						</tr>
					</table>
				</div>

				<div title="设置日志" style='display: none'>
					<table style="margin-left: 150px;">

						<tr colspan="2">
							<td>指定日志文件?</td>
							<td><input name="TRANS_appoint_file" id="TRANS_appoint_file"
								type="checkbox" /></td>
						</tr>

						<tr colspan="2">
							<td>添加到日志文件尾</td>
							<td><input name="TRANS_add_file_trail"
								id="TRANS_add_file_trail" type="checkbox" /></td>
						</tr>

						<tr colspan="2">
							<td>日志文件名:</td>
							<td><input class="easyui-textbox" name="TRANS_log_file_name"
								id="TRANS_log_file_name" style="width: 600px;" /> <a
								id='TRANS_browse' class='easyui-linkbutton' style="width: 60px">浏览</a>
								<input type="hidden" id="TRANS_browse_h"></td>
						</tr>

						<tr colspan="2">
							<td>创建父文件夹</td>
							<td><input name="TRANS_father_folder"
								id="TRANS_father_folder" type="checkbox" /></td>
						</tr>

						<tr colspan="2">
							<td>日志文件后缀名:</td>
							<td><input class="easyui-textbox" name="TRANS_file_postfix"
								id="TRANS_file_postfix" style="width: 600px;" /></td>
						</tr>

						<tr colspan="2">
							<td>日志文件包含日期?</td>
							<td><input name="TRANS_log_date" id="TRANS_log_date"
								type="checkbox" /></td>
						</tr>

						<tr colspan="2">
							<td>日志文件包含时间?</td>
							<td><input name="TRANS_log_time" id="TRANS_log_time"
								type="checkbox" /></td>
						</tr>

						<tr colspan="2">
							<td>日志级别:</td>
							<td><input class="easyui-combobox" name="TRANS_log_rank"
								id="TRANS_log_rank" style="width: 600px" /></td>
						</tr>

					</table>
				</div>

				<div title="位置参数" style='display: none'>

					<table id='positional_arguments_table'>
					</table>

				</div>

				<div title="命名参数" style='display: none'>
					<div class='easyui-layout' data-options='fit:true'>
						<div region="north">
							<table style="margin-left: 150px;">
								<tr colspan="2">
									<td>将所有参数值都传递到子转换</td>
									<td><input name="TRANS_conversion" id="TRANS_conversion"
										type="checkbox" /></td>
								</tr>
							</table>

						</div>

						<div region="center">

							<table id='TRANS_parameter_table'>
							</table>

						</div>

						<!-- 						<div region='east' style="padding: 15px; width: 100px;" -->
						<!-- 							align="right"> -->
						<!-- 							<a class="easyui-linkbutton" id='obtain_parameter'>获取参数</a> -->

						<!-- 						</div> -->
					</div>
				</div>
			</div>

		</div>
		<!--中间-->

		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center;">
				<a class="easyui-linkbutton" id="TRANS_tableInput_ok"
					style="width: 100px;">确定</a> <a class="easyui-linkbutton"
					id="TRANS_tableInput_cancel" style="width: 100px;">取消</a>
			</div>
		</div>
		<!--底部-->

	</div>
	<!--大布局-->
</div>



