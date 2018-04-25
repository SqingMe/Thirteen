/**
 * 用来整合以及拆解项目数据的脚本
 */

// 处理打开文件的函数集
Nasoft.Project = {
   /**
    * 解析工程文件
    * @author rsq0113
    * @param node
    * @returns (工程名)
    */
	openProject : function(path) {
		return this._parser(path);
	},
	// 设置画布大小
	setCanvas:function(o){
		var canvas = Nasoft.Topo.getSelectedTab().stage.canvas;
		var center = Nasoft.Topo.getSelectedTab().find("._my_panel").layout("panel","center");
		canvas.width = o.width?o.width:center.width();
		canvas.height = o.height?o.height:center.height();
	},
	tranFns : {
		/**
		 * 解析步骤
		 * @author rsq0113
		 * @param step (步骤数据) ,tab (当前工程操作台)
		 * @returns {Array} (返回当前操作台)
		 */
		setStepTrn : function(tab) {
			var that = this, 
			scene = tab.scene,
			step = scene.coreData.transformation.step// 获取步骤对象
			console.log(step)
			if(!step){
				return;
			}
			if (!$.isArray(step)) {// 如果只有一个步骤
				var node = null;
				nodes = Nasoft.Topo.newNode(40, 40,"1", {
					id : step.type,
					text : step.name
				}, step);// 创建一个节点
				nodes.setCenterLocation(step.GUI.xloc + 20, step.GUI.yloc + 20);
				// nodes.setStep(step);
				tab.scene.add(nodes);// 生成的节点添加入场景中
			} else {
				$.each(step, function(i, o) {
					var nodes = null;
					nodes = Nasoft.Topo.newNode(40, 40,'1', {
								id : o.type,
								text : o.name
							}, o);// 创建节点
					nodes.setCenterLocation(o.GUI.xloc + 20, o.GUI.yloc + 20);// 定位
					// nodes.setStep(o);// 配置信息载入
					tab.scene.add(nodes);// 生成的节点添加入场景中
				});
			}
			
			console.log(tab.project().isSave)
			return tab;
		},
		/**
		 * 解析步骤连线
		 * @author rsq0113
		 * @param order (步骤连线) ,tab (当前工程操作台)
		 * @returns {Array} (返回当前操作台)
		 */
		setHopTrn : function(tab) {
			var scene = tab.scene,
			nodes = scene.getNodes(),
			order = scene.coreData.transformation.order// 获取连线对象;
			if(!order){return;}
			if (nodes.length === 0)
				return tab;
				var nodeA, nodeZ, link;
				if (!$.isArray(order.hop)) {// 一条连线
					$.each(
									nodes,
									function(i, o) {
										nodeA
												|| (nodeA = o.text === order.hop.from ? o
														: null);// 找出连线起始的节点
										nodeZ
												|| (nodeZ = o.text === order.hop.to ? o
														: null);// 找出连线终止的节点
									});
					link = nodeA && nodeZ ? Nasoft.Topo.newLink(nodeA, nodeZ,order.hop)
							: null;
					link && tab.scene.add(link);
					link = null;
					nodeA = null;
					nodeZ = null;
				} else {// 多条连线
					$.each(order.hop, function(i, o) {
						$.each(nodes, function(j, n) {
							nodeA || (nodeA = n.text === o.from ? n : null);// 找出连线起始的节点
							nodeZ || (nodeZ = n.text === o.to ? n : null);// 找出连线终止的节点
						});
						link = nodeA && nodeZ ? Nasoft.Topo.newLink(nodeA,
								nodeZ,o) : null;
						link && tab.scene.add(link);
						link = null;
						nodeA = null;
						nodeZ = null;
					});
				}
				
				return tab;
		}
	},
	jobFns : {
		/**
		 * 解析步骤
		 * @author rsq0113
		 * @param entries (步骤数据) ,tab (当前工程操作台)
		 * @returns {Array} (返回当前操作台)
		 */
		setStepJob : function(tab) {
			var that = this,
			scene = tab.scene,
			entries = scene.coreData.job.entries,// 从job中提取出入口的对象
			projectType = tab.project().project_type
			if(!entries){
				return;
			}
			if (!$.isArray(entries.entry)) {// 如果只有一个步骤
				var node = null;
				node = Nasoft.Topo.newNode(40, 40,projectType, {
					id : entries.entry.type,
					text : entries.entry.name
				},entries.entry);// 创建一个节点
				node.setCenterLocation(entries.entry.xloc + 20,
						entries.entry.xloc + 20);
				scene.add(node);
			} else {
				$.each(entries.entry, function(i, o) {
					var node = null;
					node = Nasoft.Topo.newNode(40, 40,projectType, {
								id : o.type,
								text : o.name
							},o);// 创建节点
					node.setCenterLocation(o.xloc + 20, o.yloc + 20);// 定位
					scene.add(node);
				});
			}
			return tab;
		},
		/**
		 * 解析步骤连线
		 * @author rsq0113
		 * @param hops (步骤连线数据), tab (当前操作台)
		 * @returns {Array} (返回当前操作台)
		 */
		setHopJob : function(tab) {
			var scene = tab.scene,
			nodes = scene.getNodes(),
			job = scene.coreData.job,
			hops = job.hops// 从job中提取出hops连线的对象
			if(!hops){return;}
			if (nodes.length === 0)
				return tab;
				var nodeA, nodeZ, link;
				if (!$.isArray(hops.hop)) {// 一条连线
					$.each(nodes, function(i, o) {
						nodeA || (nodeA = o.text === hops.hop.from ? o : null);// 找出连线起始的节点
						nodeZ || (nodeZ = o.text === hops.hop.to ? o : null);// 找出连线终止的节点
					});
					link = nodeA && nodeZ ? Nasoft.Topo.newLink(nodeA, nodeZ,hops.hop)
							: null;
					link && tab.scene.add(link);
					$.extend(true,link,hops.hop);
					link = null;
					nodeA = null;
					nodeZ = null;
				} else {// 多条连线
					$.each(hops.hop, function(i, o) {
						$.each(nodes, function(j, n) {
							nodeA || (nodeA = n.text === o.from ? n : null);// 找出连线起始的节点
							nodeZ || (nodeZ = n.text === o.to ? n : null);//找出连线终止的节点
						});
						link = nodeA && nodeZ ? Nasoft.Topo.newLink(nodeA,
								nodeZ,o) : null;
						link && tab.scene.add(link);
						$.extend(true,link,o);
						link = null;
						nodeA = null;
						nodeZ = null;
					});
				}
				
				return tab;
		},
	},

	/**
	 * 解析数据连接
	 * @author rsq0113
	 * @param connection (工程用到的数据连接信息)
	 * @returns {Array} (返回当前操作台)
	 */
	setConnection : function(tab) {
		console.log(tab);
		var project = tab.project();
		var project_childs = $('#project').tree('getChildren',project.target);// 需要更新的project
		var connection;
		if(project.project_type === '1'){
			connection = tab.scene.coreData.transformation.connection;
		}else{
			connection = tab.scene.coreData.job.connection;
		}
		if(!connection){return;}
		$.each(project_childs, function(i, o) {
			if (o.clickSign == 11) {// 如果子节点为DB连接文件夹
				var childs = [];
				$.each($('#project').tree('getChildren', o.target),
						function(j, c) {
							$('#project').tree('remove', c.target);
						});
				if ($.isArray(connection)) {
					$.each(connection, function(k, con) {
						$.ajax({
							url : $.getRootPath() + '/TopoCtrl/conDecrypt.do',
							async : false,
							data : {
								password : con.password
							},
							type : 'POST',
							success : function(data) {
								con.password = data;
							}
						});
						console.log($.param(con));
						var child = {// 定义子节点数据
							id : $.createId(),
							clickSign : "connection",
							text : con.name,
							"iconCls" : "icon-connection",
							dbinfo : con
						};
						childs.push(child);// 将子connection放入子节点数据中
					});
				} else {
					$.ajax({
						url : $.getRootPath() + '/TopoCtrl/conDecrypt.do',
						async : false,
						data : {
							password : connection.password
						},
						type : 'POST',
						success : function(data) {
							connection.password = data;
						}
					});
					childs.push({
						id : $.createId(),
						clickSign : "connection",
						text : connection.name,
						"iconCls" : "icon-connection",
						dbinfo : connection
					})
				}
				Nasoft.Window.fns.connection.appendDblink(o, childs);
			}
		});
	},
	_parser : function(path) {
			var projectKey, projectType, projectData, transformation, job, tab, elementData;
			if(path.endsWith(fianlEle.TRANSTION)){
				projectType = '1';
			}else if(path.endsWith(fianlEle.JOB)){
				projectType = '2';
			}else if(path.endsWith(fianlEle.MAIN)){
				projectType = '3';
			}
			$.ajax({
						url : $.getRootPath() + '/SetingPropertyCtrl/getProjectElement.do',
						data : {
							path : path
						},
						async : false,
						type : 'post',
						beforeSend : function(XRq) {
							$('#open_ok').linkbutton('disable');
						},
						success : function(data) {
							$('#open_ok').linkbutton('enable');
							elementData = $.codingFilter("de",data);
						}
					});
			// 解析数据处理的方法
			function transformationP(transformation) {
				var projectData, order, step, connection;
				projectData = Nasoft.Tree.createTransformation({
					project_name : transformation.info.name,
					filePath : path,
					project_type : projectType
				});// 创建一个工程
				// 添加一个选项卡操作面板
				if(!Nasoft.Topo.addProjectTab(projectData[0])){// 没有相同的面板
					tab = $('#stepTabs').tabs('getSelected');// 获取当前选中的tab
					Nasoft.Project.setCanvas(transformation.canvas);
					tab.scene.setCore(transformation);// 将info数据加入全局背景对象中
					Nasoft.Project.tranFns.setStepTrn(tab);// step对象不为空,构造出转换
					Nasoft.Project.tranFns.setHopTrn(tab);// order存在时构造出转换之间的连线
					Nasoft.Project.setConnection(tab);// 加载数据库连接配置
					tab.scene.updateProject(tab.project());// 更新project树
					tab.onSave.call(tab);
				}
			}
			// 解析作业处理的方法
			function jobP(job) {
				var projectData;
				projectData = Nasoft.Tree.createJob({
					project_name : job.name,
					filePath : path,
					project_type : projectType
				});// 创建一个工程
				// 获取加载完成的工程树节点
				// 添加一个选项卡操作面板
				if(!Nasoft.Topo.addProjectTab(projectData[0])){// 没有相同的面板
				tab = $('#stepTabs').tabs('getSelected');// 获取当前选中的tab
				tab.scene.setCore(null,job);
				Nasoft.Project.setCanvas(job.canvas);
				Nasoft.Project.jobFns.setStepJob(tab);
				Nasoft.Project.jobFns.setHopJob(tab);
				Nasoft.Project.setConnection(tab);// 加载数据库连接配置
				tab.scene.updateProject(tab.project());// 更新project树
				tab.onSave.call(tab);
			}
			}
			
			var parsers = [
			         function (){
			        	transformation = elementData.transformation;
			 			transformation || alert('文件数据有误!!');
			 			transformationP(transformation);// 执行解析数据处理的函数
			 			return 	transformation.info.name; 
			         },  
	                 function (){
			        	job = elementData.job;
			 			job || alert('文件数据有误!!');
			 			jobP(job);// 执行解析作业处理的函数
			 			return 	job.name;
			         }, 
	                 function (){
			        	 job = elementData.job;
				 		 job || alert('文件数据有误!!');
				 		 jobP(job);// 执行解析作业处理的函数
				 		 return job.name;
			         }];
			
			
			// 返回一个方法集合,和解析的数据
			return  parsers[parseInt(projectType)-1]();
			
	}
}