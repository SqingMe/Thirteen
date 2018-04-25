
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="StringOperations" class="easyui-window" title="字符串处理"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north" style="padding: 20px;">
			<table style="margin-left: 250px;">

				<tr>
					<td align="right">步骤名:</td>
					<td><input class="easyui-textbox"
						name="step_name_stringOperations" id="step_name_stringOperations"
						style="width: 450px"></td>
				</tr>
				<!-- 输入框 -->
			</table>

		</div>

		<div region="center" style="padding: 20px;">
			<!--表格-->
			<label>The fields to process:</label>
			<table id='stringOperations_table' class='easyui-datagrid'>
				<thead>
					<tr>
						<th data-options="field:'in_stream_name',width:70">输入流字段</th>
						<th data-options="field:'out_stream_name',width:80">输出流字段</th>
						<th data-options="field:'trim_type',width:60">去空格类型</th>
						<th data-options="field:'lower_upper',width:60">上标/下标</th>
						<th data-options="field:'padding_type',width:60">填充方式</th>
						<th data-options="field:'pad_char',width:60">填充字符</th>
						<th data-options="field:'pad_len',width:60">填充长度</th>
						<th data-options="field:'init_cap',width:60">首字母大写</th>
						<th data-options="field:'mask_xml',width:50">转义</th>
						<th data-options="field:'digits',width:50">位数</th>
						<th data-options="field:'remove_special_characters',width:110">移除特殊字符</th>
					</tr>
				</thead>

			</table>
		</div>
		<div region="south" style="padding: 10px;">
			<!-- 按钮-->
			<div style="margin: auto; text-align: center">
				<a id='stringOperations_ok' class='easyui-linkbutton'
					style="width: 60px">确定</a> <a id='stringOperations_getFields'
					class='easyui-linkbutton' style="width: 80px">获取字段</a> <a
					id='stringOperations_cancel' class='easyui-linkbutton'
					style="width: 60px">取消</a>
			</div>

		</div>
	</div>
</div>
<%--   <script type="text/javascript" src="<%=path%>/views/topo/transformation/step/stringOperations/stringOperations.js"></script> --%>