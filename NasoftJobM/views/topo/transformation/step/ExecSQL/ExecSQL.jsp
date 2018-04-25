<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="ExecSQL" class="easyui-window" title="执行sql语句"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 980px; height: 640px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north" style="height: 65px">
			<table align="center">
				<tr>
					<td align="right">步骤名称</td>
					<td colspan="2"><input class="easyui-textbox"
						name="step_name_ExecSQL" id="step_name_ExecSQL"
						style="width: 220px"></td>
				</tr>
				<tr>
					<td align="right">数据库连接</td>
					<td><input name="step_connect_ExecSQL"
						id="step_connect_ExecSQL" style="width: 220px" /></td>
					<!-- 		   <td align="left"><a id='execSql_new' class='easyui-linkbutton' style="width: 60px" >新建...</a></td> -->
				</tr>
				<!-- 输入框 -->
			</table>
		</div>
		<div region="center" border="true" style="padding: 10px;" >
			<span>SQL script to execute.(statements separated by;)
				Question marks will be replaced by arguments.</span>
<div region="center" border="true" style="padding: 10px;width: 98%; height: 240px;" >
				<div id="execSql_textarea" style='width: 100%; height: 93%'></div>
</div>
			<div>
				<span style="margin-left: 10px; margin-top: 15px;">参数:</span>
			</div>
			<div style="padding: 10px;">
				<div style="float: left; width: 260px; height: 120px;">
					<table id="execSql_table">
					</table>
				</div>
				<div
					style="float: left; width: 260px; height: 120px; padding-left: 10px; padding-right: 10px;">
					<table>
						<tr>
							<td align="right">执行每一行?</td>
							<td><input type="checkbox" id="Execute_one_line_execSql"
								name="Execute_one_line_execSql" /></td>
						</tr>
						<tr>
							<td align="right">Execute as a single statement</td>
							<td><input type="checkbox"
								id="Execute_single_statement_execSql"
								name="Execute_single_statement_execSql" /></td>
						</tr>
						<tr>
							<td align="right">变量替换</td>
							<td><input type="checkbox"
								id="Variable_substitution_execSql"
								name="Variable_substitution_execSql" /></td>
						</tr>
						<tr>
							<td align="right">Bind parameters?</td>
							<td><input type="checkbox" id="Bind_parameters_execSql"
								name="Bind_parameters_execSql" /></td>
						</tr>
						<tr>
							<td align="right">Quote Strings?</td>
							<td><input type="checkbox" id="Quote_Strings_execSql"
								name="Quote_Strings_execSql" /></td>
						</tr>
					</table>
				</div>
				<div style="float: right; width: 320px; height: 120px;">
					<table>
						<tr>
							<td align="right">包含插入状态的字段</td>
							<td><input class='easyui-textbox' id='Insert_state_execSql'
								name='Insert_state_execSql' style="width: 200px" /></td>
						</tr>
						<tr>
							<td align="right">包含更新状态的字段</td>
							<td><input class='easyui-textbox' id='update_state_execSql'
								name='update_state_execSql' style="width: 200px" /></td>
						</tr>
						<tr>
							<td align="right">包含删除状态的字段</td>
							<td><input class='easyui-textbox' id='delete_state_execSql'
								name='delete_state_execSql' style="width: 200px" /></td>
						</tr>
						<tr>
							<td align="right">包含读状态的字段</td>
							<td><input class='easyui-textbox' id='read_state_execSql'
								name='read_state_execSql' style="width: 200px" /></td>
						</tr>
					</table>
				</div>
			</div>

		</div>
		<div region="south" style="padding: 10px;">
			<!-- 按钮-->
			<div style="margin: auto; text-align: center">
				<a id='execSql_ok' class='easyui-linkbutton' style="width: 60px">确定</a>
				<a id='execSql_cancel' class='easyui-linkbutton' style="width: 60px">取消</a>
				<a id='execSql_for_field' class='easyui-linkbutton'
					style="width: 60px">获取字段</a>
			</div>

		</div>
	</div>
</div>