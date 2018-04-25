<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="FieldSplitter" class="easyui-window" title="拆分字段"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north" border="true" style="padding: 20px;">
			<table style="margin-left: 200px;">
				<tr>
					<td>步骤名称</td>
					<td><input class="easyui-textbox"
						name="step_name_fieldSplitter" id="step_name_fieldSplitter"
						style="width: 600px" /></td>
				</tr>
				<tr>
					<td>需要拆分的字段</td>
					<td><input class="easyui-combobox" name="splitfield"
						id="splitfield" style="width: 600px" /></td>
				</tr>

				<tr>
					<td>分隔符</td>
					<td><input class="easyui-textbox" name="delimiter"
						id="delimiter" style="width: 600px"></td>
				</tr>

				<tr>
					<td>Enclosure</td>
					<td><input class="easyui-textbox" name="enclosure"
						id="enclosure" style="width: 600px"></td>
				</tr>

			</table>
		</div>

		<div region="center" border='true'>
			<label>字段</label>

			<table id='fieldSplitter_table' class='easyui-datagrid'>
				<thead>
					<tr>
						<th data-options="field:'name',width:60">新的字段</th>
						<th data-options="field:'id',width:60">ID</th>
						<th data-options="field:'idrem',width:60">移除ID?</th>
						<th data-options="field:'type',width:60">类型</th>
						<th data-options="field:'length',width:60">长度</th>
						<th data-options="field:'precision',width:60">精度</th>
						<th data-options="field:'format',width:60">格式</th>
						<th data-options="field:'group',width:100">分组符号</th>
						<th data-options="field:'decimal',width:100">小数点符号</th>
						<th data-options="field:'currency',width:100">货币符号</th>
						<th data-options="field:'nullif',width:100">Nullif</th>
						<th data-options="field:'ifnull',width:60">缺省</th>
						<th data-options="field:'trimtype',width:100">去除空格类型</th>
					</tr>
				</thead>
			</table>

		</div>

		<div region="south" border="true" style="padding: 20px;">
			<div style="margin: auto; text-align: center">
				<a id='fieldSplitter_ok' class='easyui-linkbutton'
					style="width: 60px">确定</a> <a id='fieldSplitter_cancel'
					class='easyui-linkbutton' style="width: 60px">取消</a>

			</div>
		</div>


	</div>
</div>
<%--  <script type="text/javascript" src="<%=path%>/views/topo/transformation/step/fieldSplitter/fieldSplitter.js"></script> --%>