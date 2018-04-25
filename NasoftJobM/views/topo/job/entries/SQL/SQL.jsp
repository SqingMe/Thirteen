<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
%>
<div id="SQL" class="easyui-window" title="SQL"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 900px; height: 540px; padding: 5px;">
	<div class="easyui-layout" fit="true">
		<!-- 头部-->

		<div region="center">
			<div>
				<table align="center">
					<tr>
						<td align="right">作业项名称</td>
						<td colspan="2"><input class="easyui-textbox"
							name="entry_name_SQL" id="entry_name_SQL" style="width: 200px"></td>
					</tr>
					<tr>
						<td align="right">数据库连接</td>
						<td colspan="2"><input name="entry_connect_SQL"
							id="entry_connect_SQL" style="width: 200px" /></td>
					</tr>
					<tr>
						<td align="right">从文件中得到的 SQL</td>
						<td align="left" colspan="2"><input type="checkbox"
							id="entry_fileGetSql_Sql" name="entry_fileGetSql_Sql" /></td>
					</tr>
					<tr>
						<td align="right">SQL 文件名</td>
						<td><input class='easyui-textbox' id='fileSql_entry_Sql'
							name='fileSql_entry_Sql' style="width: 200px" /> <input
							type="hidden" id="fileSql_entry_Sql_h"></td>
						<td align="left"><a id='Sql_browse_entry'
							class='easyui-linkbutton' style="width: 60px">浏览</a></td>
					</tr>
					<tr>
						<td align="right">将SQL脚本作为一条语句发送</td>
						<td align="left" colspan="2"><input type="checkbox"
							id="entry_send_Sql" name="entry_send_Sql" /></td>
					</tr>
					<tr>
						<td align="right">使用变量替换</td>
						<td colspan="2" align="left"><input type="checkbox"
							id="entry_replace_Sql" name="entry_replace_Sql" /></td>
					</tr>
					<!-- 输入框 -->
				</table>
			</div>
			<span style="margin-left: 20px; margin-bottom: 2px;">SQL 脚本:</span>
			<div style='width: 98%; height: 55%; padding: 5px;' region="center" border="true" >
			  <div id="Sql_entry_textarea" style='width: 100%; height: 93%'></div>
			</div>
		</div>
		<!--中间-->

		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center;">
				<a class="easyui-linkbutton" id="entry_SQL_ok" style="width: 100px;">确定</a>
				<a class="easyui-linkbutton" id="entry_SQL_cancel"
					style="width: 100px;">取消</a>
			</div>
		</div>
		<!--底部-->

	</div>
	<!--大布局-->
</div>


