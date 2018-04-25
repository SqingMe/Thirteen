<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="UserDefinedJavaClass" class="easyui-window" title="Java代码"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north" border="true" style="padding: 20px;">
			<table style="margin-left: 200px;">
				<tr>
					<td>步骤名称</td>
					<td><input class="easyui-textbox"
						name="step_name_UserDefinedJavaClass"
						id="step_name_UserDefinedJavaClass" style="width: 300px" /></td>
				</tr>
			</table>
		</div>
		<div region="center">
			<div class="easyui-layout" fit="true">

				<div region='west' style="margin: 3px; width: 15%; height: 60%;">
					<label>代码片段:</label>
					<div style='width: 99%; height: 93%'>
						<ul id='UserDefinedJavaClass_java_tree'
							style='width: 100%; height: 93%'></ul>
					</div>
				</div>
				<div region="center" style="margin: 3px; width: 85%; height: 60%;">
					<label>代码</label>
					<div id='UserDefinedJavaClass_java_tab'
						style='width: 100%; height: 93%'></div>
				</div>
				<div region='south' style="margin: 3px; width: 100%; height: 40%;">
					<div class="easyui-tabs" data-options="fit:true">
						<div title="字段" style="display: none;">
							<label style="float: left;">字段:</label><label
								style="float: right;"><input type="checkbox"
								id="Execute_UserDefinedJavaClass"
								name="Execute_UserDefinedJavaClass" />清空结果字段</label>
							<table id='UserDefinedJavaClass_field_table'></table>
						</div>
						<div title="参数" style="display: none;">
							<label>命名参数:</label>
							<table id='UserDefinedJavaClass_parameter_table'></table>
						</div>

						<div title="消息步骤" style="display: none;">
							<label>消息步骤:</label>
							<table id='UserDefinedJavaClass_information_table'></table>
						</div>
						<div title="目标步骤" style="display: none;">
							<label>目标步骤:</label>
							<table id='UserDefinedJavaClass_goal_table'></table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div region="south" border="true" style="padding: 20px;">
			<div style="margin: auto; text-align: center">
				<a id='UserDefinedJavaClass_ok' class='easyui-linkbutton'
					style="width: 60px">确定</a> <a id='UserDefinedJavaClass_cancel'
					class='easyui-linkbutton' style="width: 60px">取消</a>
			</div>
		</div>
	</div>
</div>