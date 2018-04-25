<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id='ScriptValueMod' class='easyui-window' title="javaScript脚本"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 900px; height: 600px; padding: 5px;">
	<div class="easyui-layout" fit="true">
		<div region="north" border="true" style="padding: 10px">
			<table style="margin-left: 10%;">
				<tr>
					<td>步骤名称</td>
					<td><input class="easyui-textbox"
						nama="ScriptValueMod_name_selectValues"
						id="ScriptValueMod_name_selectValues" style="width: 600px;" /></td>
				</tr>
			</table>
		</div>
		<!--上-->

		<div region="center" border="true">
			<div class="easyui-layout" fit="true">

				<div region="center">
					<div class="easyui-layout" fit="true">
						<div region='center' style="margin: 3px;">
							<div id='ScriptValueMod_script_tab'
								style='width: 100%; height: 100%'></div>

						</div>
						<div region='south' style="margin: 3px;">
							<table>
								<tr>
									<td>位置:</td>
									<td></td>
								</tr>
								<tr>
									<td>兼容模式?</td>
									<td style="width: 730px; text-align: right;"><input
										type="checkbox" />优化级别 <input class='easyui-textbox'
										style="width: 600px;" /></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!--中-->
				<div region='south'>
					<table id='ScriptValueMod_table' class='easyui-datagrid'
						data-options="singleSelect:true,fit:true" style='height: 200px;'>
						<thead>
							<tr>
								<th data-options="field:'name',width:80">字段名称</th>
								<th data-options="field:'rename',width:50">改名为</th>
								<th data-options="field:'type',width:100">类型</th>
								<th data-options="field:'length',width:50">长度</th>
								<th data-options="field:'precision',width:50">精度</th>
								<th data-options="field:'replace',width:200">替换'字段名'</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
			<!--中间大布局-->
		</div>
		<!--中-->

		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center;">
				<a class="easyui-linkbutton" id="ScriptValueMod_ok"
					style="width: 50px;">确定</a> <a class="easyui-linkbutton"
					id="ScriptValueMod_cancel" style="width: 50px;">取消</a> <a
					class="easyui-linkbutton" id="ScriptValueMod_obtain"
					style="width: 60px;">获取变量</a> <a class="easyui-linkbutton"
					id="ScriptValueMod_test" style="width: 60px;">测试脚本</a>
			</div>
		</div>



	</div>
	<!--大布局-->
</div>
<div id='ScriptValueMod_script_menu' class="easyui-menu"
	style="width: 120px;">
	<div id='add_script_tab'>添加</div>
</div>