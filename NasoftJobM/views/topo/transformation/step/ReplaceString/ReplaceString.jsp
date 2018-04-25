<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="ReplaceString" class="easyui-window" title="字符串替换"
	data-options="modal:true,collapsible:false,minimizable:false,maximizable:false,closable:true, closed:true"
	style="width: 800px; height: 300px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north" style="padding: 10px">
			<table style="margin-left: 150px;">
				<tr>
					<td align="right">步骤名称</td>
					<td><input class="easyui-textbox" id="step_name_replaceString"
						style="width: 400px;" /></td>
				</tr>
			</table>
		</div>

		<div region="center" style="padding: 10px;">
			<label>字段</label>
			<table id='replaceString_table' class='easyui-datagrid'
				data-options="fitColumns:true,singleSelect:true,fit:true">
				<thead>
					<tr>
						<th data-options="field:'in_stream_name',width:80">输入流字段</th>
						<th data-options="field:'out_stream_name',width:80">输出流字段</th>
						<th data-options="field:'use_regex',width:110">使用正则表达式</th>
						<th data-options="field:'replace_string',width:60">搜索</th>
						<th data-options="field:'replace_by_string',width:100">使用...替换</th>
						<th data-options="field:'set_empty_string',width:100">设置为空符?</th>
						<th data-options="field:'replace_field_by_string',width:110">使用字段值替换</th>
						<th data-options="field:'whole_word',width:100">整个单词匹配</th>
						<th data-options="field:'case_sensitive',width:100">大小写敏感</th>
						<th data-options="field:'replaceNumbers',width:100">替换位</th>
					</tr>
				</thead>
			</table>
		</div>

		<div region="south" border="true">
			<div style="margin: auto; text-align: center">
				<a class="easyui-linkbutton" id="replaceString_ok"
					style="width: 60px;">确定</a> <a class="easyui-linkbutton"
					id="replaceString_obtain" style="width: 60px;">获取字段</a> <a
					class="easyui-linkbutton" id="replaceString_cancel"
					style="width: 60px;">取消</a>
			</div>
		</div>
	</div>
</div>


