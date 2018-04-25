<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id='RuleExecutor' class='easyui-window' title="执行脚本"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 900px; height: 600px; padding: 5px;">
	<div class='easyui-layout' fit='true'>
		<div region='north' border="true" style="padding: 30px;">
			<table style='margin: auto;'>
				<tr>
					<td><label>步骤名称:</label></td>
					<td><input class='easyui-textbox' id='RuleExecutor_step_name'
						style='width: 700px'></td>
				</tr>
			</table>
		</div>
		<div region='center' border="true" style="padding: 20px;">
			<div class='easyui-tabs' data-options="fit:true">
				<div title="规则">
					<div class='easyui-layout' fit='true'>
						<div retion='center'>
							<input id='Rule_file_radio' name='Rule_radio' type="radio"><label>规则文件</label><br>
							<input id='RuleExecutor_rule_file' class='easyui-textbox'
								style="width: 700px">
						</div>
						<div retion='south'>
							<input id='Rule_definition_radio' name='Rule_radio' type="radio"><label>规则定义</label>
							<textarea id='RuleExecutor_rule_definition'
								style='resize: none; width: 100%; height: 237px;; border: 1px solid #D3D3D3;'></textarea>
						</div>
					</div>
				</div>
				<div title='结果'>
					<table id='Rule_result_table' class="easyui-datagrid"
						style="width: 400px; height: 250px"
						data-options="fitColumns:true,singleSelect:true,fit:true">
						<thead>
							<tr>
								<th data-options="field:'column-name',width:100">列名</th>
								<th data-options="field:'column-type',width:100">列类型</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
		<div region='south' border="true" style="padding: 30px;">
			<div style="margin: auto; text-align: center">
				<a id='RuleExecutor_ok' class='easyui-linkbutton'
					style="width: 60px">确定</a> <a id='RuleExecutor_cancel'
					class='easyui-linkbutton' style="width: 60px">取消</a>
			</div>
		</div>
	</div>
</div>