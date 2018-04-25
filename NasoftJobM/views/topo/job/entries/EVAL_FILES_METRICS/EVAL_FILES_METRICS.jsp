<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="EVAL_FILES_METRICS" class="easyui-window" title="计算文件大小或个数"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px;">

	<div class="easyui-layout" fit="true">

		<div region="north">
			<table style="margin-left: 200px;">
				<tr>
					<td>作业项名称</td>
					<td><input class="easyui-textbox" name="school_name_EVAL_FILES_METRICS"
						id="school_name_EVAL_FILES_METRICS" style="width: 600px;" /></td>
				</tr>
			</table>
		</div>
		<!-- 头部-->

		<div region="center" border="true">
			<div id="ftp" class="easyui-tabs" data-options="fit:true" style="">

				<div title="一般" style="display: none;">
					<form>
						<fieldset>
							<legend>设置</legend>
							<table style="margin-left: 120px;">
							   <tr>
									<td>源文件:</td>
									<td><select class="easyui-combobox"
										name="ORIFILE_ECAL_FALES" id="ORIFILE_ECAL_FALES"
										data-options='editable:false' style="width: 600px">
											<option>文件/文件夹</option>
											<option>文件名结果集</option>
											<option>上一步结果行</option>
									</select></td>
								</tr>
								<tr>
									<td>通配符:</td>
									<td><input class="easyui-textbox" name="expression_unzip"
										id="expression_unzip" style="width: 600px;" /></td>
								</tr>
								<tr>
									<td>文件结果字段:</td>
									<td><input class="easyui-textbox" name="filejg_eval_files"
										id="filejg_eval_files" style="width: 600px;" /></td>
								</tr>
								<tr>
									<td>通配符结果字段:</td>
									<td><input class="easyui-textbox" name="expression_JIEGUOFILED_EVAL_FILES"
										id="expression_JIEGUOFILED_EVAL_FILES" style="width: 600px;" /></td>
								</tr>
								<tr>
									<td>包含子文件结果字段:</td>
									<td><input class="easyui-textbox" name="BHZWJJGFILED_EVAL_METRICS"
										id="BHZWJJGFILED_EVAL_METRICS" style="width: 600px;" /></td>
								</tr>
								 <tr>
									<td>评估:</td>
									<td><select class="easyui-combobox"
										name="PINGGU_ECAL_FALES" id="PINGGU_ECAL_FALES"
										data-options='editable:false' style="width: 600px">
											<option>文件总大小</option>
											<option>全部文件数</option>
									</select></td>
								</tr>
							</table>
						</fieldset>
					</form>


					<form>
						<fieldset>
							<table style="margin-left: 120px;"  >
							<tr>
									<td>文件或目录</td>
									<td><input class="easyui-textbox" name="file_catalogue_EVAL_FILES_METRICS"
										id="file_catalogue_EVAL_FILES_METRICS" style="width: 400px;" /> <a
										class="easyui-linkbutton" name="EVAL_FILES_METRICS_increase"
										id="EVAL_FILES_METRICS_increase" style="width: 50px;">增加</a> <a
										class="easyui-linkbutton" name="EVAL_FILES_METRICS_browse"
										id="EVAL_FILES_METRICS_browse" style="width: 50px;">浏览</a> <input
										type="hidden" id="file_catalogue_h_EVAL_FILES_METRICS"></td>
								</tr>

								<tr>
									<td>正则表达式</td>
									<td><input class="easyui-textbox"
										name="regular_expression_EVAL_FILES_METRICS" id="regular_expression_EVAL_FILES_METRICS"
										style="width: 500px;" /></td>
								</tr>
							
								
							</table>
							<label>文件/文件夹:</label>
							<table id='EVAL_FILES_METRICS_table' class='easyui-datagrid'
								data-options="singleSelect:true,fit:true">
							</table>
						</fieldset>
					</form>
				</div>

				<div title="高级" style="display: none;">
					<form>
						<fieldset>
							<legend>成功条件</legend>
							<table style="margin-left: 120px;" >
								<tr id='EVAL_FILES_table'>
									<td>单位:</td>
									<td><select class="easyui-combobox"
										name="danwei_EVAL_FILES_METRICS" id="danwei_EVAL_FILES_METRICS"
										data-options='editable:false' style="width: 600px">
											<option>字节</option>
											<option>KB</option>
											<option>MB</option>
											<option>GB</option>
									</select></td>
								</tr>
								<tr>
									<td>成功条件:</td>
									<td><select class="easyui-combobox"
										name="control_coding_EVAL_FILES_METRICS" id="control_coding_EVAL_FILES_METRICS"
										data-options='editable:false' style="width: 600px">
											<option>如果值等于</option>
											<option>如果值小于</option>
											<option>如果值大于</option>
											<option>If value is smaller or equal</option>
											<option>If value is greater or equal</option>
											<option>If value is between</option>
											<option>如果值在列表中</option>
											<option>如果值不在列表中</option>
									</select></td>
								</tr>
								
								<tr id="number_EVAL_tr">
									<td>值:</td>
									<td><input class="easyui-textbox" 
										id="number_EVAL_FILES_METRICS" data-options="width:150"  />
										</td>
								</tr>
								<tr id="number_EVAL_tr_max">
						<td >最大值:</td>
						<td><input id="SIMPLE_EVAL_max" class="easyui-textbox"
							data-options="width:150" /></td>
					    </tr>
					    
					    <tr id="number_EVAL_tr_min">
						<td>最小值:</td>
						<td><input id="SIMPLE_EVAL_min" class="easyui-textbox"
							data-options="width:150" /></td>
					   </tr>
							</table>
						</fieldset>
					</form>
				</div>

			</div>
		</div>
		<!-- 中间-->

		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center;">
				<a class="easyui-linkbutton" id="EVAL_FILES_METRICS_ok" style="width: 50px;">确定</a>
				<a class="easyui-linkbutton" id="EVAL_FILES_METRICS_cancel" style="width: 50px;">取消</a>
			</div>
		</div>
		<!-- 尾部-->
	</div>
</div>