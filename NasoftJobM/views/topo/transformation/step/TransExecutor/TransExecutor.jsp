<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="TransExecutor" class="easyui-window" title="执行转换"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 740px; height: 550px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north" style="height: 40px">
			<table align="center">
				<tr>
					<td align="right">步骤名称</td>
					<td colspan="2"><input class="easyui-textbox"
						id="step_name_TransExecutor" style="width: 220px"></td>
				</tr>
				<!-- 输入框 -->
			</table>
		</div>
		<div region="center" border="true" style="padding: 0px;">
			<div class="easyui-layout" data-options='fit:true'>
				<div region="north" style="height: 100px">
					<table style="margin: auto; margin-top: 20px;">
						<tr>
							<td align="right">文件名：</td>
							<td><input class="easyui-textbox"
								name="filename_TransExecutor" id="filename_TransExecutor"
								style="width: 400px;" /> <a id='TransExecutor_job'
								class='easyui-linkbutton' style="width: 60px">浏览</a> <a
								id='TransExecutor_job_open' class='easyui-linkbutton'
								style="width: 60px">编辑</a> <input type="hidden"
								id="filename_TransExecutor_h"></td>
						</tr>
						<tr>
							<td align="right">继承转换的所有变量:</td>
							<td><input type="checkbox" id="TransExecutor_check" /></td>
						</tr>
					</table>
				</div>
				<div region="center" border="true" style="padding: 10px;">
					<div id="tt" class="easyui-tabs" data-options="fit:true" style="">
						<!-- 命名参数-->
						<div title="命名参数" style="display: none;">
							<table id="TransExecutor_table"></table>
						</div>
						<!-- 命名参数-->
						<!-- 结果行-->
						<div title="结果行" style="display: none;">
							<table style="width:100%;height:100%" >
								<tr>
									<td align="right">接收结果行的目标步骤:</td>
									<td><input class="easyui-combobox"
										id="TransExecutor_result_check" style="width: 220px" /></td>
								</tr>
								<tr>
									<td colspan="2" width="100%" height="100%">
										<table id="TransExecutor_result_table"></table>
									</td>
								</tr>
							</table>
						</div>
						<!-- 结果行-->
						<div title="执行结果" style="display: none;">
							<table align="center">
								<tr>
									<td align="right">接收执行结果的步骤:</td>
									<td><input class="easyui-combobox"
										id="TransExecutor_step_comname"
										name="TransExecutor_step_comname" style="width: 200px;" /></td>
								</tr>
								<tr>
									<td align="right">保存执行时间(毫秒)的字段名:</td>
									<td><input class="easyui-textbox"
										id="TransExecutor_step_ExecutionTime" style="width: 200px;" /></td>
								</tr>
								<tr>
									<td align="right">保存执行结果的字段名:</td>
									<td><input class="easyui-textbox"
										id="TransExecutor_step_ExecutionResult" style="width: 200px;" /></td>
								</tr>
								<tr>
									<td align="right">保存错误数的字段名:</td>
									<td><input class="easyui-textbox"
										id="TransExecutor_step_ExecutionNrErrors" style="width: 200px;" /></td>
								</tr>
								<tr>
									<td align="right">保存读取行数的字段名:</td>
									<td><input class="easyui-textbox"
										id="TransExecutor_step_ExecutionLinesRead" style="width: 200px;" /></td>
								</tr>
								<tr>
									<td align="right">保存写的行数的字段名:</td>
									<td><input class="easyui-textbox"
										id="TransExecutor_step_ExecutionLinesWritten"
										style="width: 200px;" /></td>
								</tr>
								<tr>
									<td align="right">保存输入行数的字段名:</td>
									<td><input class="easyui-textbox"
										id="TransExecutor_step_ExecutionLinesInput"
										style="width: 200px;" /></td>
								</tr>
								<tr>
									<td align="right">保存输出行数的字段名:</td>
									<td><input class="easyui-textbox"
										id="TransExecutor_step_ExecutionLinesOutput"
										style="width: 200px;" /></td>
								</tr>
								<tr>
									<td align="right">保存舍弃行数的字段名:</td>
									<td><input class="easyui-textbox"
										id="TransExecutor_step_ExecutionLinesRejected"
										style="width: 200px;" /></td>
								</tr>
								<tr>
									<td align="right">保存更新行数的字段名:</td>
									<td><input class="easyui-textbox"
										id="TransExecutor_step_ExecutionLinesUpdated"
										style="width: 200px;" /></td>
								</tr>
								<tr>
									<td align="right">保存删除行数的字段名:</td>
									<td><input class="easyui-textbox"
										id="TransExecutor_step_ExecutionLinesDeleted"
										style="width: 200px;" /></td>
								</tr>
							</table>
						</div>
						<!-- 命名参数-->
						<!-- 结果文件-->
						<div title="结果文件" style="display: none;">
							<table style="margin: auto; margin-top: 20px;">
								<tr>
									<td align="right">接收结果文件信息的步骤:</td>
									<td><input class="easyui-combobox"
										id="TransExecutor_result_file_check" style="width: 220px" /></td>
								</tr>
								<tr>
									<td align="right">结果文件名字段:</td>
									<td><input class="easyui-textbox"
										id="TransExecutor_result_filename_check" style="width: 220px" /></td>
								</tr>
							</table>
						</div>
						<!-- 结果文件-->
					</div>
				</div>
			</div>
		</div>
		<div region="south" style="padding: 10px;">
			<!-- 按钮-->
			<div style="margin: auto; text-align: center">
				<a id='TransExecutor_ok' class='easyui-linkbutton'
					style="width: 60px">确定</a> <a id='TransExecutor_cancel'
					class='easyui-linkbutton' style="width: 60px">取消</a>
			</div>

		</div>
	</div>
</div>
