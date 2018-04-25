<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="TableInput" class="easyui-window" title="表输入"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 700px; height: 600px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north" border="true" style="padding: 10px;">
			<table>
				<tr>
					<td>步骤名称:</td>
					<td><input class="easyui-textbox" name='step_name_tableInput'
						id='step_name_tableInput' style='width: 450px'></td>
				</tr>
				<tr>
					<td>数据库连接:</td>
					<td><input name='tbin_connection' id='tbin_connection'
						style='width: 450px'></td>
				</tr>
			</table>
		</div>
		<div region="center" border="true" style="padding: 1px;">
			获取sql查询语句:
			<div id="sql" style='width: 100%; height: 93%'></div>
		</div>
		<div region="south" border="true" style="padding: 10px;">
			<table align="center">
				<tr>
					<td align="right">允许简易转换</td>
					<td>
						<input name="lazy_conversion_active" type="checkbox"  value="" id="lazy_conversion_active" />
					</td>
				</tr>
				<tr>
					<td align="right">替换SQL语句里的变量</td>
					<td>
						<input name="variables_active" type="checkbox"  value="" id="variables_active" />
					</td>
				</tr>
				<tr>
					<td align="right">从步骤插入数据</td>
					<td><input class="easyui-textbox" id="lookup" data-options="disabled:false"
						style="width: 400px;" /></td>
				</tr>
				<tr>
					<td align="right">执行每一行？</td>
					<td>
						<input name="execute_each_row" type="checkbox" value="" id="execute_each_row" />
					</td>
				</tr>
				<tr>
					<td align="right">记录数量限制</td>
					<td><input class="easyui-textbox" id="limit" 
						style="width: 400px;" /></td>
				</tr>
			</table>
			<div style="margin: auto; text-align: center;">
				<a id='tableInput_ok' class='easyui-linkbutton'>确定</a> <a
					id='tableInput_cancel' class='easyui-linkbutton'>取消</a>
			</div>
		</div>
	</div>
</div>
<%--   <script type="text/javascript" src="<%=path%>/views/topo/transformation/step/tableInput/tableInput.js"></script> --%>
