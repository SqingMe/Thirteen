<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="JobExecutor" class="easyui-window" title="执行作业"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 740px; height: 510px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north" style="height: 40px">
			<table align="center">
				<tr>
					<td align="right">步骤名称</td>
					<td colspan="2"><input class="easyui-textbox"
						id="step_name_JobExecutor" style="width: 220px"></td>
				</tr>
				<!-- 输入框 -->
			</table>
		</div>
		<div region="center" border="true" style="padding: 0px;">
			<div id="cc" class="easyui-layout" data-options='fit:true'>  
				 <div region="north" style="height: 70px">
				 	<table style="margin: auto; margin-top: 20px;">
						<tr>
							<td align="right">文件名：</td>
							<td><input class="easyui-textbox" name="filename_JobExecutor"
								id="filename_JobExecutor" style="width: 450px;" /> <a
								id='JobExecutor_job' class='easyui-linkbutton' style="width: 60px">浏览</a>
								<a id='JobExecutor_job_open' class='easyui-linkbutton'
								style="width: 60px">编辑</a> <input type="hidden"
								id="JobExecutor_job_h"></td>
						</tr>
						<!-- 				<tr> -->
						<!-- 					<td align="right">继承转换的所有变量:</td> -->
						<!-- 				    <td><input type="checkbox"  id="JobExecutor_check" /></td> -->
						<!-- 				</tr> -->
					</table>
				 </div>
				 <div region="center" border="true" style="padding: 0px;">
				 		<div id="tt" class="easyui-tabs" data-options="fit:true" style="">
							<!-- 命名参数-->
							<div title="命名参数" style="display: none;"  data-options="fit:true">
								<table>
									<tr>
										<td align="right">继承转换的所有变量:</td>
										<td><input type="checkbox" id="JobExecutor_check" /></td>
									</tr>
								</table>
								<table id="JobExecutor_table"></table>
							</div>
							<!-- 命名参数-->
							<div title="执行结果" style="display: none;">
								<table align="center">
									<tr>
										<td align="right">接收执行结果的步骤:</td>
										<td><input class="easyui-combobox"
											id="JobExecutor_step_comname" name="JobExecutor_step_comname"
											style="width: 200px;" /></td>
									</tr>
									<tr>
										<td align="right">保存执行时间(毫秒)的字段名:</td>
										<td><input class="easyui-textbox"
											id="JobExecutor_step_ExecutionTime" style="width: 200px;" /></td>
									</tr>
									<tr>
										<td align="right">保存执行结果的字段名:</td>
										<td><input class="easyui-textbox"
											id="JobExecutor_step_ExecutionResult" style="width: 200px;" /></td>
									</tr>
									<tr>
										<td align="right">保存错误数的字段名:</td>
										<td><input class="easyui-textbox"
											id="JobExecutor_step_ExecutionNrErrors" style="width: 200px;" /></td>
									</tr>
									<tr>
										<td align="right">保存读取行数的字段名:</td>
										<td><input class="easyui-textbox"
											id="JobExecutor_step_ExecutionLinesRead" style="width: 200px;" /></td>
									</tr>
									<tr>
										<td align="right">保存写的行数的字段名:</td>
										<td><input class="easyui-textbox"
											id="JobExecutor_step_ExecutionLinesWritten"
											style="width: 200px;" /></td>
									</tr>
									<tr>
										<td align="right">保存输入行数的字段名:</td>
										<td><input class="easyui-textbox"
											id="JobExecutor_step_ExecutionLinesInput" style="width: 200px;" /></td>
									</tr>
									<tr>
										<td align="right">保存输出行数的字段名:</td>
										<td><input class="easyui-textbox"
											id="JobExecutor_step_ExecutionLinesOutput" style="width: 200px;" /></td>
									</tr>
									<tr>
										<td align="right">保存舍弃行数的字段名:</td>
										<td><input class="easyui-textbox"
											id="JobExecutor_step_ExecutionLinesRejected"
											style="width: 200px;" /></td>
									</tr>
									<tr>
										<td align="right">保存更新行数的字段名:</td>
										<td><input class="easyui-textbox"
											id="JobExecutor_step_ExecutionLinesUpdated"
											style="width: 200px;" /></td>
									</tr>
									<tr>
										<td align="right">保存删除行数的字段名:</td>
										<td><input class="easyui-textbox"
											id="JobExecutor_step_ExecutionLinesDeleted"
											style="width: 200px;" /></td>
									</tr>
								</table>
							</div>
							<!-- 命名参数-->
							<!-- 结果行-->
							<div title="结果行" style="display: none;" data-options='fit:true'>
								<table>
									<tr>
										<td align="right">接收结果行的目标步骤:</td>
										<td><input class="easyui-combobox"
											id="JobExecutor_result_check" style="width: 220px" /></td>
									</tr>
									
								</table>
								<table id="JobExecutor_result_table"></table>
							</div>
							<!-- 结果行-->
							<!-- 结果文件-->
							<div title="结果文件" style="display: none;">
								<table style="margin: auto; margin-top: 20px;">
									<tr>
										<td align="right">接收结果文件信息的步骤:</td>
										<td><input class="easyui-combobox"
											id="JobExecutor_result_file_check" style="width: 220px" /></td>
									</tr>
									<tr>
										<td align="right">结果文件名字段:</td>
										<td><input class="easyui-textbox"
											id="JobExecutor_result_filename_check" style="width: 220px" /></td>
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
				<a id='JobExecutor_ok' class='easyui-linkbutton' style="width: 60px">确定</a>
				<a id='JobExecutor_cancel' class='easyui-linkbutton'
					style="width: 60px">取消</a>
			</div>

		</div>
	</div>
</div>