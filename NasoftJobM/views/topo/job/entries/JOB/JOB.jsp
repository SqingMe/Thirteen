<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
%>
<div id="JOB" class="easyui-window" title="转换"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px;">
	<div class="easyui-layout" fit="true">
		<div region="north" border="true" style="padding: 20px">
			<table style="margin-left: 180px">
				<tr colspan="2">
					<td>作业项名称</td>
					<td><input class="easyui-textbox" name="step_name_JOB"
						id="step_name_JOB" style="width: 600px;" /></td>
				</tr>
			</table>
		</div>
		<!-- 头部-->

		<div region="center">
			<div id="JOB_tabs" class="easyui-tabs" data-options="fit:true"
				style="">
				<div title="作业设置" style='display: none'>
					<div class='easyui-layout' fit='true'>
						<div region='center'>
							<table style="margin: auto; margin-top: 20px;">
								<tr>
									<td style="width: 158px;"><input name="filename_JOB_R"
										id="filename_JOB_R" type="radio" checked="checked"> <label>
											作业文件名:</label></td>
									<td><input class="easyui-textbox" name="filename_JOB"
										id="filename_JOB" style="width: 600px;" /> <a
										id='JOB_transition' class='easyui-linkbutton'
										style="width: 60px">浏览</a> <a id='JOB_transition_open'
										class='easyui-linkbutton' style="width: 60px">编辑</a> <input
										type="hidden" id="JOB_transition_h"></td>
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
							<td><input id="JOB_copy_location" type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>复制上一步结果到命名参数</td>
							<td><input id="JOB_copy_name" type="checkbox"></td>
						</tr>

						<tr colspan="2">
							<td>对每一个输入行执行一次?</td>
							<td><input name="JOB_input_line" id="JOB_input_line"
								type="checkbox"></td>
						</tr>
						<tr colspan="2">
							<td>远程从服务器</td>
							<td><input class="easyui-textbox"
								id="long_distance_server_job" style="width: 600px" /></td>
						</tr>
						<tr colspan="2">
							<td>将作业结果发送到从服务器上</td>
							<td><input name="JOB_finish" id="JOB_finish" type="checkbox"></td>
						</tr>
						<tr colspan="2">
							<td>等待远程作业结束</td>
							<td><input name="JOB_finish_end" id="JOB_finish_end"
								type="checkbox"></td>
						</tr>
						<tr colspan="2">
							<td>本地作业终止则远程作业也同时终止</td>
							<td><input name="JOB_finish_termination"
								id="JOB_finish_termination" type="checkbox"></td>
						</tr>
						<tr colspan="2">
							<td>Expand child jobs and transformations on the server</td>
							<td><input id="JOB_finish_child" type="checkbox"></td>
						</tr>

					</table>
				</div>

				<div title="日志设定" style='display: none'>
					<table style="margin-left: 150px;">
						<tr colspan="2">
							<td>独立的日志</td>
							<td><input name="JOB_force_file" id="JOB_force_file"
								type="checkbox" /></td>
						</tr>
						<tr colspan="2">
							<td>指定日志文件?</td>
							<td><input name="JOB_appoint_file" id="JOB_appoint_file"
								type="checkbox" /></td>
						</tr>
						<tr colspan="2">
							<td>追加日志文件?</td>
							<td><input name="JOB_additional_file"
								id="JOB_additional_file" type="checkbox" /></td>
						</tr>
						<tr colspan="2">
							<td>日志文件名:</td>
							<td><input class="easyui-textbox" name="JOB_log_file_name"
								id="JOB_log_file_name" style="width: 600px;" /> <a
								id='JOB_browse' class='easyui-linkbutton' style="width: 60px">浏览</a>
								<input type="hidden" id="JOB_browse_h"></td>
						</tr>

						<tr colspan="2">
							<td>创建父文件夹</td>
							<td><input name="JOB_father_folder" id="JOB_father_folder"
								type="checkbox" /></td>
						</tr>

						<tr colspan="2">
							<td>日志文件扩展名:</td>
							<td><input class="easyui-textbox" name="JOB_file_postfix"
								id="JOB_file_postfix" style="width: 600px;" /></td>
						</tr>

						<tr colspan="2">
							<td>日志文件包含日期?</td>
							<td><input name="JOB_log_date" id="JOB_log_date"
								type="checkbox" /></td>
						</tr>

						<tr colspan="2">
							<td>日志文件包含时间?</td>
							<td><input name="JOB_log_time" id="JOB_log_time"
								type="checkbox" /></td>
						</tr>

						<tr colspan="2">
							<td>日志级别:</td>
							<td><input class="easyui-combobox" name="JOB_log_rank"
								id="JOB_log_rank" style="width: 600px" /></td>
						</tr>

					</table>
				</div>

				<div title="位置参数" style='display: none'>

					<table id='JOB_positional_arguments_table'>
					</table>

				</div>

				<div title="命名参数" style='display: none'>
					<div class='easyui-layout' data-options='fit:true'>
						<div region="north">
							<table style="margin-left: 150px;">
								<tr colspan="2">
									<td>将所有参数值下发到子作业</td>
									<td><input name="JOB_conversion" id="JOB_conversion"
										type="checkbox" /></td>
								</tr>
							</table>

						</div>

						<div region="center">

							<table id='JOB_parameter_table'>
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
				<a class="easyui-linkbutton" id="JOB_tableInput_ok"
					style="width: 100px;">确定</a> <a class="easyui-linkbutton"
					id="JOB_tableInput_cancel" style="width: 100px;">取消</a>
			</div>
		</div>
		<!--底部-->

	</div>
	<!--大布局-->
</div>



