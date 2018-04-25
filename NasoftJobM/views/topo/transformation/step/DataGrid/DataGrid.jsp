<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="DataGrid" class="easyui-window" title="自定义常量数据"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 800px; height: 300px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north">
			<table align="right">
				<tr>
					<td align="right">步骤名称</td>
					<td><input class="easyui-textbox" id="step_name_DataGrid"
						style="width: 400px"></td>
				</tr>
				<!-- 输入框 -->
			</table>
		</div>


		<div region="center" border="true">
			<div id="filedasdas" class="easyui-tabs" data-options="fit:true">
				<div title="元数据" style="display: none;">
					<table id="DataGrid_metadata_table"></table>
				</div>
				<div title="数据" style="display: none;">
					<table id="DataGrid_data_table"></table>
				</div>
			</div>

		</div>

		<div region="south" style="padding: 10px;">
			<!-- 按钮-->
			<div style="margin: auto; text-align: center">
				<a id='DataGrid_ok' class='easyui-linkbutton' style="width: 60px">确定</a>
				<a id='DataGrid_cancel' class='easyui-linkbutton'
					style="width: 60px">取消</a>
			</div>
		</div>
	</div>
</div>
