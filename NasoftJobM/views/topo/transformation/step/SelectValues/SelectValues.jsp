<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>

<div id="SelectValues" class="easyui-window" title="选择/改名值"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:true,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north" border="true" style="padding: 30px;">
			<table align="right">
				<tr>
					<td>步骤名称</td>
					<td><input class="easyui-textbox"
						name="step_name_tableInput_selectValues"
						id="step_name_tableInput_selectValues" style="width: 600px"></td>
				</tr>
			</table>
		</div>
		<div region="center">
			<!--表格-->
			<div id="tt" class="easyui-tabs" data-options="fit:true">
				<div title="选择和修改" style="display: none;">
					<div class='easyui-layout' data-options='fit:true'>
						<div region="center" data-options="title:'字段'">
							<!-- <label>字段:</label> -->
							<table id='fixed_table_selectValues' 
								data-options='singleSelect:true'></table>
						</div>

						<div region="south">
							<table align="center">
								<tr colspan="2">
									<td>包含未指令的列,按名称排序</td>
									<td><input name="line_feed_selectValues"
										id="line_feed_selectValues" type="checkbox"></td>
								</tr>
							</table>
						</div>


						<div region='east'
							style="padding: 15px; text-align: center; width: 130px;"
							align="right">
							<a class="easyui-linkbutton" id="selectValues_select_field">获取选择的字段</a>
							<!--              <a class="easyui-linkbutton">列映射</a> -->
						</div>

					</div>
				</div>

				<div title="移除" style="display: none;">
					<div class='easyui-layout' data-options='fit:true'>
						<div region="center" data-options="title:'移除的字段'"  style="display: none;">
							<!-- <label>移除的字段：</label> -->
							<table id='fixed_table_selectValues_remove' style="overflow: auto; padding: 20px; display: none;"
								data-options='singleSelect:true'></table>
						</div>
						<div region='east'
							style="padding: 15px; text-align: center; width: 130px;"
							align="right">
							<a class="easyui-linkbutton" id="selectValues_remove_field">获取移除的字段</a>
						</div>
					</div>
				</div>
				<div title="元数据" style="display: none;">
					<div class='easyui-layout' data-options='fit:true'>
						<div region="center" data-options="title:'需要改变元数据的字段'" style="display: none;">
							<!-- <label>需要改变元数据的字段：</label> -->
							<table id='fixed_table_selectValues_update'></table>
						</div>
						<div region='east'
							style="padding: 15px; text-align: center; width: 130px;"
							align="right">
							<a id='selectVales_table_get' class='easyui-linkbutton'>获取改变的字段</a>
						</div>
					</div>
				</div>
				<!--      <div title="元数据" style="display:none;">    -->
				<!--      <div> -->
				<!--       <label>需要改变元数据的字段</label> -->
				<!--      </div>   -->
				<!-- 		<div style="width:auto;height:380px;float:left;"> -->
				<!-- 			 <div region='center'> -->
				<!-- 		             <table id='fixed_table_selectValues_update' data-options='singleSelect:true'></table> -->
				<!-- 		     </div> -->
				<!-- 		     <div region='east' style="padding:15px;text-align:center; width:130px;" align="right"> -->
				<!-- 		     	<a id='selectVales_table_get' class='easyui-linkbutton' style="width: 120px">获取改变的字段</a> -->
				<!-- 		     </div> -->
				<!-- 		</div> -->
				<!-- 		</div> -->
			</div>
		</div>
		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center;">
				<a id='tableInput_ok_selectValues' class='easyui-linkbutton'
					style="width: 60px">确定</a> <a id='tableInput_cancel_selectValues'
					class='easyui-linkbutton' style="width: 60px">取消</a>
			</div>
		</div>


	</div>
</div>

<%-- <script type="text/javascript" src="<%=path%>/views/topo/transformation/step/selectValues/selectValues.js"></script> --%>

