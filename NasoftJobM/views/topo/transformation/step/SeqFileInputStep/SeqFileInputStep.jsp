<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="SeqFileInputStep" class="easyui-window" title="顺序文件数据输入"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1000px; height: 600px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region='north' style="padding: 20px;">
			<table style="margin-left: 150px">
				<tr colspan="2">
					<td>步骤名称</td>
					<td><input class="easyui-textbox"
						name="SeqFileInputStep_step_name" id="SeqFileInputStep_step_name"
						style="width: 600px;" /></td>
				</tr>
				<tr colspan="2">
					<td>浏览:</td>
					<td><input id="SeqFileInputStep_file_find"
						class="easyui-textbox" style="width: 600px;" /> <input
						id="SeqFileInputStep_file_hide" type="hidden" /> <a
						class="easyui-linkbutton" id="SeqFileInputStep_choose" href='#'>选择</a>
					</td>
				</tr>
			</table>
		</div>

		<div region="center" border="true">
			<div id="" class="easyui-tabs">
				<div title="段值输出配置">
					<fieldset>
						<legend>选择交易:</legend>
						<ul class="field-config">
							<li><span>ChoseTC000</span><input name="ChoseTC"
								id="wchosetc000chombox" type="radio"></li>
							<li><span>ChoseTC001</span><input name="ChoseTC"
								id="wchosetc001chombox" type="radio"></li>
							<li><span>ChoseTC002</span><input name="ChoseTC"
								id="wchosetc002chombox" type="radio"></li>
							<li><span>ChoseTC003</span><input name="ChoseTC"
								id="wchosetc003chombox" type="radio"></li>
							<li><span>ChoseTC010</span><input name="ChoseTC"
								id="wchosetc010chombox" type="radio"></li>
							<li><span>ChoseTC100</span><input name="ChoseTC"
								id="wchosetc100chombox" type="radio"></li>
							<li><span>ChoseTC101</span><input name="ChoseTC"
								id="wchosetc101chombox" type="radio"></li>
							<li><span>ChoseTC102</span><input name="ChoseTC"
								id="wchosetc102chombox" type="radio"></li>
							<li><span>ChoseTC105</span><input name="ChoseTC"
								id="wchosetc105chombox" type="radio"></li>
							<li><span>ChoseTC130</span><input name="ChoseTC"
								id="wchosetc130chombox" type="radio"></li>
							<li><span>ChoseTC132</span><input name="ChoseTC"
								id="wchosetc132chombox" type="radio"></li>
							<li><span>ChoseTC360</span><input name="ChoseTC"
								id="wchosetc360chombox" type="radio"></li>
							<li><span>ChoseTC363</span><input name="ChoseTC"
								id="wchosetc363chombox" type="radio"></li>
							<li><span>ChoseTC364</span><input name="ChoseTC"
								id="wchosetc364chombox" type="radio"></li>
							<li><span>ChoseTC300</span><input name="ChoseTC"
								id="wchosetc300chombox" type="radio"></li>
							<li><span>ChoseTC301</span><input name="ChoseTC"
								id="wchosetc301chombox" type="radio"></li>
							<li><span>ChoseTC362</span><input name="ChoseTC"
								id="wchosetc362chombox" type="radio"></li>
							<li><span>ChoseTC900</span><input name="ChoseTC"
								id="wchosetc900chombox" type="radio"></li>
							<li><span>ChoseTC901</span><input name="ChoseTC"
								id="wchosetc901chombox" type="radio"></li>
							<li><span>ChoseTC902</span><input name="ChoseTC"
								id="wchosetc902chombox" type="radio"></li>
						</ul>
					</fieldset>
					<fieldset>
						<legend>选择段:</legend>
						<ul class="field-config">
							<li><span>段0:</span><input id="wchosetcD0chombox"
								type="checkbox"></li>
							<li><span>段1:</span><input id="wchosetcD1chombox"
								type="checkbox"></li>
							<li><span>段2:</span><input id="wchosetcD2chombox"
								type="checkbox"></li>
						</ul>
					</fieldset>
				</div>
				<div title="顺序文件交易配置">
					<ul class="file-config">
						<li><span>TC000:</span><input id="wText000tv"></li>
						<li><span>TC001</span><input id="wText001tv"></li>
						<li><span>TC002:</span><input id="wText002tv"></li>
						<li><span>TC003</span><input id="wText003tv"></li>
						<li><span>TC010:</span><input id="wText010tv"></li>
						<li><span>TC100</span><input id="wText100tv"></li>
						<li><span>TC101:</span><input id="wText101tv"></li>
						<li><span>TC102</span><input id="wText102tv"></li>
						<li><span>TC105:</span><input id="wText105tv"></li>
						<li><span>TC130</span><input id="wText130tv"></li>
						<li><span>TC132:</span><input id="wText132tv"></li>
						<li><span>TC360</span><input id="wText360tv"></li>
						<li><span>TC363:</span><input id="wText363tv"></li>
						<li><span>TC364</span><input id="wText364tv"></li>
						<li><span>TC300:</span><input id="wText300tv"></li>
						<li><span>TC301</span><input id=wText301tv></li>
						<li><span>TC362:</span><input id="wText362tv"></li>
						<li><span>TC900</span><input id="wText900tv"></li>
						<li><span>TC901:</span><input id="wText901tv"></li>
						<li><span>TC902</span><input id="wText902tv"></li>
					</ul>
				</div>
			</div>
		</div>
		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center;">
				<a class="easyui-linkbutton ok" style="width: 80px;">确定</a> <a
					class="easyui-linkbutton cancel" style="width: 80px;">取消</a>
			</div>
		</div>
	</div>
</div>
