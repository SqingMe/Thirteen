<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="Constant" class="easyui-window" title="增加常量"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 800px; height: 300px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north">
			<table align="right">
				<tr>
					<td align="right">步骤名称</td>
					<td><input class="easyui-textbox" name="step_constant"
						id="step_name_constant" style="width: 400px"></td>
				</tr>
				<!-- 输入框 -->
			</table>
		</div>

		<div region="center" style="padding: 10px;">
			<!--表格-->
			<label>字段</label>
			<table id='constant_table' class='easyui-datagrid'>
				<thead>
					<tr>
						<th data-options="field:'name',width:100">名称</th>
						<th data-options="field:'type',width:120">类型</th>
						<th data-options="field:'format',width:60">格式</th>
						<th data-options="field:'length',width:60">长度</th>
						<th data-options="field:'precision',width:60">精度</th>
						<th data-options="field:'currency',width:60">当前的</th>
						<th data-options="field:'decimal',width:60">十进制</th>
						<th data-options="field:'group',width:60">组</th>
						<th data-options="field:'nullif',width:100">值</th>
						<th data-options="field:'set_empty_string',width:100">设为空串?</th>
					</tr>
				</thead>
			</table>
		</div>
		<div region="south" style="padding: 10px;">
			<!-- 按钮-->
			<div style="margin: auto; text-align: center">
				<a id='constant_ok' class='easyui-linkbutton' style="width: 60px">确定</a>
				<a id='constant_cancel' class='easyui-linkbutton'
					style="width: 60px">取消</a>
			</div>

		</div>
	</div>
</div>
<%-- <script type="text/javascript" src="<%=path%>/views/topo/transformation/step/constant/constant.js"></script> --%>