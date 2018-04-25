<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="IfNull" class="easyui-window" title="替换NULL值"
	data-options="modal:true,collapsible:false,minimizable:false,maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 400px; padding: 5px; background: #fafafa;">

	<div class="easyui-layout" fit="true">
		<div region="north" border="true" style="padding: 20px">
			<table style="margin-left: 280px;">
				<tr>
					<td>步骤名称</td>
					<td><input class="easyui-textbox" nama="step_name_IfNull"
						id="step_name_IfNull" style="width: 600px;" /></td>
				</tr>
			</table>
		</div>
		<!-- 头部-->

		<div region="center">
			<div id="IfNull_tabs" class="easyui-tabs" data-options="fit:true"
				style="">
				<div title="替换所有字段的null值" style="display: none;">
					<div region="center">
						<form>
							<fieldset>
								<table style="margin-left: 400px;">
									<tr>
										<td>值替换为:</td>
										<td><input class="easyui-textbox"
											id="goal_model_IfNull" style="width: 400px;" /></td>
									</tr>
									<tr>
										<td>设置空字符串:</td>
										<td><input type="checkbox" id="cache_IfNull" /></td>
									</tr>
									<tr>
										<td>掩码(日期):</td>
										<td><input id="IFNULL_mask" class="easyui-combobox" 
							data-options="width:400,editable : false,
       			data:[{text:'yyyy/MM/dd HH:mm:ss.SSS',value:'yyyy/MM/dd HH:mm:ss.SSS'},{text:'yyyy/MM/dd HH:mm:ss',value:'yyyy/MM/dd HH:mm:ss'},{text:'yyyyMMddHHmmss',value:'yyyyMMddHHmmss'},{text:'yyyy/MM/dd',value:'yyyy/MM/dd'}
       			,{text:'yyyy-MM-dd',value:'yyyy-MM-dd'},{text:'yyyy-MM-dd HH:mm:ss',value:'yyyy-MM-dd HH:mm:ss'},{text:'yyyyMMdd',value:'yyyyMMdd'},{text:'MM/dd/yyyy',value:'MM/dd/yyyy'}
       			,{text:'MM/dd/yyyy HH:mm:ss',value:'MM/dd/yyyy HH:mm:ss'},{text:'MM-dd-yyyy',value:'MM-dd-yyyy'},{text:'MM-dd-yyyy HH:mm:ss',value:'MM-dd-yyyy HH:mm:ss'},{text:'MM/dd/yy',value:'MM/dd/yy'}
       			,{text:'MM-dd-yy',value:'MM-dd-yy'},{text:'dd/MM/yyyy',value:'dd/MM/yyyy'},{text:'dd-MM-yyyy',value:'dd-MM-yyyy'}]
       			" /></td>
									</tr>
									<tr>
										<td>选择字段:</td>
										<td><input type="checkbox" id="cache_IfNull_XZ" /></td>
									</tr>
									<tr>
										<td>选择值类型:</td>
										<td><input type="checkbox" id="cache_IfNull_ZLX" /></td>
									</tr>
								</table>
							</fieldset>
						</form>
					</div>
				</div>
				<div title="值类型" style="display: none;" id='IfNull_condition_ZLXDIV'>
					<table id='IfNull_condition_table' class='easyui-datagrid'
						data-options="singleSelect:true,fit:true">
					</table>
				</div>

				<div title="字段" style="display: none;" id='IfNull_condition_ZDDIV'>
					<table id='IfNull_output_table' class='easyui-datagrid'
						data-options="singleSelect:true,fit:true">
					</table>
				</div>
			</div>

		</div>
		<!--中间-->

		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center;">
				<a class="easyui-linkbutton" id="IfNull_ok" style="width: 100px;">确定</a>
				<a class="easyui-linkbutton" id="IfNull_cancel"
					style="width: 100px;">取消</a>
			</div>
		</div>
		<!--底部-->

	</div>
	<!--大布局-->
</div>

