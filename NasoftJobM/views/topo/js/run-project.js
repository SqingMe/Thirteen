Nasoft.Project.run_project = function(){
	return {
		// 执行错误标记
		error : false,
		// 数据处理相关信息
		transInfo : null,
		// 作业处理相关数据
		jobInfo : null,
	/**
	 * 执行作业处理
	 * 
	 * @author rsq0113
	 */
	exeJob : function(path, level,rows) {
		var tab = Nasoft.Topo.getSelectedTab();
		if(!tab.project().isSave){
			if(!confirm("文件已改变,是否保存?")){
				return;
			}
			saveProject();
		}
		var that = this;
		this.error = false;
			var path = tab.project().file_path;
			$.ajax({
				url:$.getRootPath()+"/ExecutionTestCtrl/exeJob.do",
				data:{path:path,level:level,vars:JSON.stringify(rows)},
				type:"POST",
				dataType:"json",
				success:function(data){
					that.jobInfo = data;
					that.showJobLog(tab);
					that.jobInfo = null;
				}
			});
	},
	/**
	 * 执行数据处理
	 * 
	 * @author rsq0113
	 */
	exeTran : function(path, level,rows) {
		var tab = Nasoft.Topo.getSelectedTab();
		if(!tab.project().isSave){
			if(!confirm("文件已改变,是否保存?")){
				return;
			}
			saveProject();
		}
		this.error = false;
		var path = Nasoft.Topo.getSelectedTab().project().file_path;
		$.ajax({
			url:$.getRootPath()+"/ExecutionTestCtrl/exeTran.do",
			data:{path:path,level:level,vars:JSON.stringify(rows)},
			type:"POST",
			dataType:"json",
			success:function(data){
				var tab = Nasoft.Topo.getSelectedTab();
				var run_project = tab.run_project;
				run_project.transInfo = data;
				run_project.showTransLog(tab);
				run_project.showTransStat(tab);
				run_project.showTransStatus(tab);
				run_project.transInfo = null;
			}
		});
	},
	/**
	 * 停止运行
	 * 
	 * @author rsq0113
	 */
	transStopAll : function() {
		console.log(remote);
		remote.transStopAll();
	},
	/**
	 * 展示执行日志
	 * 
	 * @author rsq0113
	 */
	showTransLog : function(tab) {	
		var html = $.parseHTML(this.transInfo.log?this.transInfo.log:"")[0].textContent.replace(/[\r\t]/gm, '<br>');
		tab.find("._log").html(html); // 显示日志
	},
	/**
	 * 展示执行日志
	 * 
	 * @author rsq0113
	 */
	showJobLog : function(tab) {	
		var html = $.parseHTML(this.jobInfo.log?this.jobInfo.log:"")[0].textContent.replace(/[\r\t]/gm, '<br>');
		tab.find("._log").html(html); // 显示日志
	},
	/**
	 * 展示步骤状态表
	 * @author rsq0113
	 */
	showTransStatus : function(tab) {
		var options = {},// datagrid的属性列表\
		rows = [], // 表格数据的行数据
		transInfo = this.transInfo;// 获取当前的转换信息
		for (var key in transInfo) {// 枚举出转换信息的所有属性
			if (key !== "log") {
				var i = 0;// 初始化行索引
				for (var j in transInfo[key]) {
					rows[i] = rows[i] || {};// 构建一个行对象
					rows[i]["stepname"] = j;// 获取步骤名称
					rows[i][key] = transInfo[key][j];// 将对应字段加入行
					if(key === 'errors'){
						this.getIcon(j,transInfo['errors'][j]);	
					}
					i++;// 行索引自增
				}
			}
		}
		console.log(rows);
		options.data = rows;// 初始化属性data
		options.rownumbers = true;// 显示行号
		options.fit = true;// 平铺
		options.singleSelect = true;// 只允许选中一行
		options.columns = [[    
		                  {field:'stepname',title:'步骤名称',width:100,align:'center'},
		                  {field:'linesread',title:'读',width:100,align:'center'},
		                  {field:'lineswritten',title:'写',width:100,align:'center'},
		                  {field:'linesupdated',title:'更新',width:100,align:'center'},
		                  {field:'linesrejected',title:'拒绝',width:100,align:'center'},
		                 // {field:'stepname',title:'激活',width:100,align:'center'},
		                  {field:'errors',title:'错误',width:100,align:'center'},
		                  {field:'status',title:'状态',width:100,align:'center'},
		                  {field:'runTime',title:'时间ms',width:100,align:'center'}
		              ]];   

		options.rowStyler = function(index,row){
			if (parseInt(row.errors) > 0){//  有错误
				return 'background-color:red;color:#fff;';
			}
		};
		options.onClickRow= function (rowIndex, rowData) {
            $(this).datagrid('unselectRow', rowIndex);
        }, 
        
		tab.find("._statusTable").datagrid(options);// 加载表格	
	},
	/**
	 * 展示步骤状态表
	 * @author rsq0113
	 */
	showJobStatus : function(tab) {
		var options = {},// datagrid的属性列表
		rows = [], // 表格数据的行数据
		jobInfo = this.jobInfo;// 获取当前的转换信息
		for (var key in jobInfo) {// 枚举出转换信息的所有属性
			if (key !== "log") {
				var i = 0;// 初始化行索引
				for (var j in jobInfo[key]) {
					rows[i] = rows[i] || {};// 构建一个行对象
					rows[i]["stepname"] = j;// 获取步骤名称
					rows[i][key] = jobInfo[key][j];// 将对应字段加入行
					if(key === 'errors'){
						this.getIcon(j,jobInfo['error'][j]);	
					}	
					i++;// 行索引自增
				}
			}
		}
		console.log(rows);
		options.data = rows;// 初始化属性data
		options.rownumbers = true;// 显示行号
		options.fit = true;// 平铺
		options.singleSelect = true;// 只允许选中一行
		options.columns = [[    
		                  {field:'stepname',title:'步骤名称',width:100,align:'center'},
		                  {field:'linesread',title:'读',width:100,align:'center'},
		                  {field:'lineswritten',title:'写',width:100,align:'center'},
		                  {field:'linesupdated',title:'更新',width:100,align:'center'},
		                  {field:'linesrejected',title:'拒绝',width:100,align:'center'},
		                 // {field:'stepname',title:'激活',width:100,align:'center'},
		                  {field:'errors',title:'错误',width:100,align:'center'},
		                  {field:'status',title:'状态',width:100,align:'center'},
		                  {field:'runTime',title:'时间ms',width:100,align:'center'},
		              ]];   

		options.rowStyler = function(index,row){
			if (parseInt(row.errors) > 0){//  有错误
				return 'background-color:red;color:#fff;';
			}
		};
		options.onClickRow= function (rowIndex, rowData) {
            $(this).datagrid('unselectRow', rowIndex);
        }, 

        tab.find("._statusTable").datagrid(options);// 加载表格	
	},

	/**
	 * 在面板中显示图表
	 * @author rsq0113
	 */
	showTransStat : function(tab) {
		Nasoft.Echarts.setData(this.transInfo.runTime);
		Nasoft.Echarts.showTime(tab);
	},
	/**
	 * 在面板中显示图表
	 * @author rsq0113
	 */
	showJobStat : function(tab) {
		Nasoft.Echarts.setData(this.jobInfo.runTime);
		Nasoft.Echarts.showTime(tab);
	},
	/**
	 * 执行工程
	 */
	run : function() {
	     this.getLevel();
	},
	/**
	 * @author rsq0113
	 * 再次运行工程
	 */
	replay : function() {
		if(this.isRun){
		var level = $('#log_level_input').combobox('getValue');
		var tab = Nasoft.Topo.getSelectedTab();
		var path = tab.project().file_path;
		Nasoft.TopButton.View.fns._exe_result(true);
		tab.find('._result').tabs('select', '日志');
		tab.find("._log").html('');// 清空日志显示
		if (tab.project().project_type === '1') {
			tab.run_project.exeTran(path ,level,rows);
		} else if (tab.project().project_type === '2') {
			tab.run_project.exeJob(path ,level,rows);
		}
	  }else{
		  alert('没有初始运行工程!');
	  }
	},
	getLevel : function () {
		var omboboxOption = {
				data : [{id:'NOTHING',text:'没有日志'},{id:'ERROR',text:'错误日志'},
				        {id:'MINIMAL',text:'最小日志'},{id:'BASIC',text:'基本日志'},
				        {id:'DETAILED',text:'详细日志'},{id:'DEBUG',text:'调试日志'},
				        {id:'ROWLEVEL',text:'行级日志'}],
				valueField:'id',    
			    textField:'text',
			    onLoadSuccess : function(data) {
					$(this).combobox('select','BASIC');
				}
		}
		$('#log_level_input').combobox(omboboxOption);
		$('#logLevel_win').window('open');
	},
	/**
	 * @author rsq0113
	 * 获取警告的图标
	 */
	getIcon : function(stepName,flag) {/*
		var tab = $('#stepTabs').tabs('getSelected'),
		    scene = tab.scene,
		    childs = scene.childs,
		    that = this;
		$.each(childs,function(i,o){
			if(o.elementType === 'node' && o.text === stepName){
				if(flag !=='0'){
					that.createIcon('error',o);
				}else{
					that.createIcon('correct',o);
				}
			}
		});
	*/},
	/**
	 * @author rsq0113
	 * 创建一个警告的图标
	 */
	createIcon : function(type,obj) {
		var icon = $('<span></span>'),// 构造一个图标对象
		    container = $('#stepTabs').tabs('getSelected');// 获取存放图标的容器
		if (type === 'error') {
			icon.addClass('stepError');// 添加样式	
			this.error = true;
		}else if (type === 'correct') {
			icon.addClass('stepCorrect');// 添加样式
		}
		icon.css({left : obj.x+28,
            top : obj.y+25});
		icon.appendTo(container);// 将图标放入容器中
		this.iconArray.push(icon);
	},
	/**
	 * @author rsq0113
	 * 移除所有的警告图标
	 */
	removeIcon : function() {
		var error = arguments[0];
		$.each(this.iconArray,function(i,o){
			if(error === 'error'){ 
				o.remove(".stepCorrect");
			}else{ 
				o.remove();
			}
		});
	},
	// 一个放置css图标的数组
	iconArray : []
}
}
Nasoft.Project.run_project.init = function(){
	Nasoft.Ajax.loadDoc($.getRootPath()+"/views/topo/dialogHtml/startProject.html","body",function(){
		var winOPtions = {
				title:'选择日志等级',
				collapsible:false,
				minimizable:false,
				modal:true,
				width:400,
				height:300,	
				closed:true
		};
		$('#logLevel_win').window(winOPtions);
		$("#logLevel_win").find('.start_param_table').datagrid({
			fit:true,
			columns:[[    
		        {field:'key',title:'变量',width:100,editor:{type:"text"}},    
		        {field:'value',title:'值',width:100,editor:{type:"text"}} 
		    ]],
		    toolbar : [
				{
					iconCls : 'icon-add',
					text : "增加",
					fitColumns : true,
					handler : function() {// 添加一行
						var grid = $("#logLevel_win").find('.start_param_table');
						var columns = grid.datagrid("getColumnFields");
						var row = {};
						$.each(columns,function(i,o){
							row[o] || (row[o]="");
						});
						grid.datagrid('appendRow',row);
					}
				},
				{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {}
				} ],
				onDblClickRow : function(index, row){
					$(this).datagrid("beginEdit",index);
				}
		});
		$('#log_level_ok').click(function(){
			var rows = $("#logLevel_win").find('.start_param_table').datagrid("endEditAll");
			var level = $('#log_level_input').combobox('getValue');
			var tab = Nasoft.Topo.getSelectedTab();
			var path = tab.project().file_path;
			Nasoft.TopButton.View.fns._exe_result(true);
			tab.find("._result").tabs('select', '日志');
			tab.find("._log").html('');// 清空日志显示
			if (tab.project().project_type === '1') {
				tab.run_project.exeTran(path ,level,rows);
			} else if (tab.project().project_type !== '1') {
				tab.run_project.exeJob(path ,level,rows);
			}
			$('#logLevel_win').window('close'); 
			tab.run_project.isRun = true;// 标记运行状态
		});
	});
}

Nasoft.WorkButton={
		/**
		 * 按钮绑定事件
		 * @author rsq0113
		 */
		bind : function () {
			$('#start_project').unbind('click').click(function(e) {// 运行任务
				try {
					var tab = Nasoft.Topo.getSelectedTab();
					tab.run_project.run();
				} catch (e) {
					// TODO: handle exception
					console.log(e);
				}
			});
			$('#pause_project').unbind('click').click(function() {
			});
			$('#stop_project').unbind('click').click(function(e) {// 停止
				alert(123);
				Nasoft.Topo.getSelectedTab().run_project.transStopAll();
			});
			$('#replay_project').unbind('click').click(function() {// 再次执行		
				Nasoft.Topo.getSelectedTab().run_project.replay();
			});
			$('#check_project').unbind('click').click(function(e) {
			});
			$('#impact_project').unbind('click').click(function(e) {
			});
			$('#SQLbutton_project').unbind('click').click(function(e) {
			});
			$('#explore_project').unbind('click').click(function(e) {
				Nasoft.TopButton.Tool.fns._browse();
			});
			$('#showResult_project').unbind('click').click(function(e) {
				Nasoft.TopButton.View.fns._exe_result();
			});
		},
		/**
		 * 按钮id集合
		 * @author rsq0113
		 */
		items : ['start_project','pause_project','stop_project','replay_project','check_project',
			      'impact_project','SQLbutton_project','explore_project','showResult_project',
			      'save_file_pictrue','save_as_file_pictrue'],
		/**
		 * 禁用按钮
		 * @author rsq0113
		 */
		disable : function () {
			$.buttonDisable(this.items);
		},
		/**
		 * 释放按钮
		 * @author rsq0113
		 */
		enable : function () {
			$.buttonEnable(this.items);
		}
}
