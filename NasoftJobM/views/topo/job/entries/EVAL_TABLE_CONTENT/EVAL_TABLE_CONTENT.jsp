<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="EVAL_TABLE_CONTENT" class="easyui-window" title="计算表中的记录数"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px;">

	<div class="easyui-layout" fit="true">

		<div region="north">
			<table style="margin-left: 400px;margin-margin-bottom:10px;">
				<tr>
					<td>作业项名称</td>
					<td><input class="easyui-textbox" name="school_name_EVAL_FILES_METRICS"
						id="school_name_EVAL_TABLE_CONTENT" style="width: 200px;" /></td>
				</tr>
			</table>
		</div>
		<!-- 头部-->

		<div region="center" border="true">
			<div id="ftp" class="easyui-tabs" data-options="fit:true" >
                     <form>
						<fieldset>
							<legend>数据库连接</legend>
							<table style="margin-left: 400px;margin-margin-bottom:10px;">
							<tr>
						<td align="right">数据库连接:</td>
						<td colspan="2"><input name="entry_connect_SQL"
							id="entry_connect_EVAL_TABLE_CONTENT" style="width: 200px" /></td>
					</tr>
					<tr>
						<td align="right">目标模式:</td>
						<td><input class='easyui-textbox' id='fileSql_entry_EVAL_TABLE_CONTENT'
							name='fileSql_entry_EVAL_TABLE_CONTENT' style="width: 200px" /></td>
					</tr>
					<tr>
						<td align="right">目标表名称:</td>
						<td><input class='easyui-textbox' id='table_entry_EVAL_TABLE_CONTENT'
							name='table_entry_EVAL_TABLE_CONTENT' style="width: 200px" /></td>
					</tr>
							</table>
						</fieldset>
					</form>
					<form>
						<fieldset>
							<legend>成功条件</legend>
							<table style="margin-left: 400px;margin-margin-bottom:10px;">
						<tr>
						<td align="right">满足成功条件的行数:</td>
						<td><select class="easyui-combobox"
										 id="suncess_ECAL_EVAL_TABLE_CONTENT"
										data-options='editable:false' style="width: 200px">
											<option>等于</option>
											<option>不等于</option>
											<option>小于</option>
											<option>不大于</option>
											<option>大于</option>
											<option>不小于</option>
									</select></td>
					</tr>
					<tr>
						<td align="right">数值:</td>
						<td><input class='easyui-textbox' id='shuzhi_entry_EVAL_TABLE_CONTENT'
							 style="width: 200px" /></td>
					</tr>		
							</table>
						</fieldset>
					</form>


					<form>
						<fieldset>
						<legend>自定义SQL</legend>
							<table style="margin-left: 400px;margin-margin-bottom:10px;"  >
							<tr>
						    <td align="right">自定义SQL:</td>
						    <td colspan="2" align="left"><input type="checkbox"
							id="entry_zidingyiSql_EVAL_TABLE_CONTENT"  /></td>
					        </tr>
					        <tr>
						    <td align="right">使用变量替换:</td>
						    <td colspan="2" align="left"><input type="checkbox"
							id="entry_bianliang_EVAL_TABLE_CONTENT"  /></td>
					        </tr>
					        <tr>
						    <td align="right">在执行前清空结果行列表:</td>
						    <td colspan="2" align="left"><input type="checkbox"
							id="entry_return_lEVAL_TABLE_CONTENT" /></td>
					        </tr>
					        <tr>
						    <td align="right">在结果行添加行:</td>
						    <td colspan="2" align="left"><input type="checkbox"
							id="entry_returnh_EVAL_TABLE_CONTENT"  /></td>
					        </tr>
							</table>
							<label>SQL脚本:</label>
							<div style='width: 98%; height: 100px; padding: 5px;' region="center" border="true">
					          <div id="textarea_evalcon" style='width: 100%; height: 93%'></div>
			                </div>
						</fieldset>
					</form>

			</div>
		</div>
		<!-- 中间-->

		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center;">
				<a class="easyui-linkbutton" id="EVAL_TABLE_CONTENT_ok" style="width: 50px;">确定</a>
				<a class="easyui-linkbutton" id="EVAL_TABLE_CONTENT_cancel" style="width: 50px;">取消</a>
			</div>
		</div>
		<!-- 尾部-->
	</div>
</div>