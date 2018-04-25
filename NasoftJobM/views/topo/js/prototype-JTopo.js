/**
 * @author rsq0113
 *
 */
/***************************************************Node************************************************************/
/**
 * 字段传递的属性
 */
JTopo.Node.prototype.transfer = [];
/**
 * 设置transfer属性的数据
 */
JTopo.Node.prototype.setTransfer = function() {
	this.transfer = Nasoft.Topo.transferFns[this.type](this);
};
/**
 * 用来获取window属性
 */
JTopo.Node.prototype.getWindow = function() {// 获取节点绑定的窗口对象
	return this.type || '';
};
/**
 * 设置node的类型
 * 
 * @param type
 */
JTopo.Node.prototype.setType = function(type) {
	this.type = type;
};
/**
 * 获取node的类型
 * 
 * @returns {String}
 */
JTopo.Node.prototype.getType = function() {
	return this.type || '';
};
/**
 * 
 * @param connectionName
 */
JTopo.Node.prototype.setConnectionName = function(connectionName) {
	this.connectionName = connectionName;
};
JTopo.Node.prototype.getConnectionName = function() {
	return this.connectionName || '';
};
/**
 * 设置节点的类型
 */
JTopo.Node.prototype.setType = function(type) {
	this.type = type;
};
/**
 * 获取节点的类型
 */
JTopo.Node.prototype.getType = function() {
	return this.type || '';
};
/**
 * 获取步骤数据
 * @returns {___anonymous958_959}
 */
JTopo.Node.prototype.getStep = function() {
	this.step.GUI.xloc = this.x;
	this.step.GUI.yloc = this.y;
	this.step.name = this.text;
	this.step.type = this.type;
	return this.step;
};
/**
 * 获取步骤数据
 * @returns {___anonymous1128_1129}
 */
JTopo.Node.prototype.getEntry = function() {
	this.entry.name = this.text;
	this.entry.type = this.type;
	this.entry.xloc = this.x;
	this.entry.yloc = this.y;
	this.entry.draw = 'Y';
	return this.entry;
};
/**
 * 设置步骤数据
 * @param step
 */
JTopo.Node.prototype.setEntry = function(entry) {
	entry = entry || {};
	this.entry = $.extend(true, this.entry, entry);// 新添加属性继承原有属性
	this.entry.name = this.text;
	this.entry.type = this.type;
	this.entry.xloc = this.x;
	this.entry.yloc = this.y;
	this.entry.draw = 'Y';
};
/**
 * 设置步骤数据
 * @param step
 */
JTopo.Node.prototype.setStep = function(step) {
	step = step || {};
	this.step = $.extend(this.step, step);// 新添加属性继承原有属性
	this.step.GUI = {};
	this.step.GUI.xloc = this.x;
	this.step.GUI.yloc = this.y;
	this.step.GUI.draw = 'Y';
	this.step.name = this.text;
	this.step.type = this.type;
};
/** *********************************************link********************************************************** */
JTopo.Link.prototype.enabled = "Y";// 线段是否启用
JTopo.Link.prototype.evaluation = "N";// 是否成功
JTopo.Link.prototype.unconditional = "Y";// 是否无条件
/**
 * 对话框显示线段的信息
 */
JTopo.Link.prototype.mydialog = function(e){
	if(this.nodeA.project_type === "1") return;
	if($(".nasoft-dialog").length === 0){
		var html = '<div class="nasoft-dialog"><span class="dialog-bot"></span><span class="dialog-top"></span></div>';
		this.dialog = $(html).appendTo("body");
	}else{
		this.dialog = $(".nasoft-dialog");
	}
	var table = $('<form><table></table></form>');
	var prototypes = {'启用':this.enabled==="Y"?true:false,'成功':this.evaluation==="Y"?true:false,
		'失败':this.evaluation==="Y" || this.unconditional === 'Y'?false:true}
    prototypes['无限制的']= this.unconditional === 'Y'?true:false;
    console.log(prototypes)
    var namelist = {'启用':'enabled','成功':'thisname','失败':'thisname','无限制的':'thisname'};
    var vallist = {'成功':'evaluation','失败':'unevaluation','无限制的':'unconditional'};
    this.dialog.find('form').remove();
    this.dialog.append(table);
    for(var key in prototypes){
    	var checkbox = $("<input class='dialog-checkbox' type='checkbox'/>");
    	var radio = $("<input class='dialog-radio' type='radio'/>");
    	var tr = $("<tr></tr>");
    	table.append(tr);
    	for(var i=0;i<2;i++){
    		var td = $("<td></td>");
    		tr.append(td);
    		i == 0 && td.html(key);
    		i == 1 && key === '启用' && td.html(checkbox.prop("checked",prototypes[key]).attr("name",namelist[key]));
    		i == 1 && key !== '启用' && td.html(radio.prop("checked",prototypes[key])
    				                                 .attr("name",namelist[key])
    				                                 .val(vallist[key]));
    	}
    };
    this.dialog.css({left:e.pageX-50,top:e.pageY-149});
    this.dialog.dblclick(function(){$(this).hide()});
    return this.dialog;
}
/**
 * 设置连线数据
 * @param hop
 */
JTopo.Link.prototype.setHop = function(hop) {
	var Thop = hop || {};
	this.hop = {};// 给连线参数赋值
	this.hop.from = this.nodeA.text;// 连线初始位置名称
	this.hop.to = this.nodeZ.text;// 连线终止位置名称
	this.hop.from_nr = Thop.from_nr || this.hop.from_nr || '0';// 逐级筛选参数,以最后配置的优先
	this.hop.to_nr = Thop.to_nr || this.hop.to_nr || '0';
	this.hop.enabled = Thop.enabled || this.enabled;
	this.hop.evaluation = Thop.evaluation || this.evaluation ;
	this.hop.unconditional = Thop.unconditional || this.unconditional;
};
/**
 * 设置线段额外提示属性
 */
JTopo.Link.prototype.setAlt = function(){
	if(this.project_type === "1") return;
	  if(this.enabled==="Y" && this.unconditional === "Y"){// 不禁用且无限制
		  this.strokeColor = '0,0,0';
		  this.text = "无限制";
	  }else if(this.enabled==="Y" && this.unconditional === "N" && this.evaluation==="Y"){//不禁用成功
		  this.strokeColor = '0,255,0';
		  this.text = "成功支路";
	  }else if(this.enabled==="Y" && this.unconditional === "N" && this.evaluation==="N"){//不禁用失败
		  this.strokeColor = '255,0,0';
		  this.text = "失败支路";
	  }else if(this.enabled==="N"){//禁用
		  this.strokeColor = '222,222,222';
		  this.text = "禁用";
	  }
}
/**
 * 获取连线数据
 * @returns {___anonymous2643_2644}
 */
JTopo.Link.prototype.getHop = function() {
	this.hop || this.setHop();// 如果原型中没有hop属性就创建一个
	return this.hop;
};
/** *********************************************Scene********************************************************* */
/**
 * 获取所有步骤的数据
 * @returns {Array}
 */
JTopo.Scene.prototype.getStep = function() {
	var step = [];
	$.each(this.childs, function(i, o) {
		if (o.elementType === 'node') {
			step.push(o.getStep());
		}
	});
	return step;
};
JTopo.Scene.prototype.getError = function(){
	var error = []
	$.each(this.childs, function(i, o) {
		if (o.elementType === 'link' && o.error) {
			var data = Nasoft.Ajax.getLinkError();
			data.source_step = o.nodeA.text;// 错误步骤起始
			data.target_step = o.nodeZ.text;// 错误步骤目标
			error.push(data);
		}
	});
	return error;
};
/**
 * 获取所有步骤的名称
 * @returns {Array}
 */
JTopo.Scene.prototype.getNames = function() {
	var names = [];
	$.each(this.childs, function(i, o) {
		if (o.elementType === 'node') {
			names.push(o.text);
		}
	});
	return names;
};
/**
 * 获取所有步骤的数据
 * @returns {___anonymous3720_3721}
 */
JTopo.Scene.prototype.getEntries = function() {
	var entries = {};
	entries.entry = []
	$.each(this.childs, function(i, o) {
		if (o.elementType === 'node') {
			entries.entry.push(o.getEntry());
		}
	});
	if (entries.entry.length == 0) {
		entries = '';
	} else if (entries.entry.length == 1) {
		entries.entry = entries.entry[0];
	} else if (entries.entry.length > 1) {
		entries.entry = entries.entry;
	}
	this.entries = entries;
	return this.entries;
};
/**
 * 设置子节点
 * @param childs
 */
JTopo.Scene.prototype.setChilds = function(childs) {
	this.childs = childs;
};

/**
 * 获取所有的子节点
 * @returns
 */
JTopo.Scene.prototype.getNodes = function() {
	var nodes = [];
	for(var i = 0;i<this.childs.length;i++){
		if(this.childs[i].elementType === "node"){
			nodes.push(this.childs[i]);
		}
	}
	return nodes;
};

/**
 * 设置场景的tab属性
 * @param tab
 */
JTopo.Scene.prototype.setTab = function(tab) {
	this.tab = tab;
};
/**
 * 获取场景的tab属性
 * @returns
 */
JTopo.Scene.prototype.getTab = function() {
	return this.tab;
};
/**
 * 获取场景所有的数据连接信息
 * @returns
 */
JTopo.Scene.prototype.getConnection = function() { // 获取场景的所有数据连接
	var connection = [];
	var connections = Nasoft.GetProjectData.getConnectins();// 获取树结构中所有数据连接数据
	var childs = this.childs;
	$.each(connections, function(j, c) {// length为0时不遍历
		childs && $.each(childs, function(i, o) {// length为0时不遍历
			
			if (o.elementType === 'node' && o.project_type === '1' && o.getStep().connection === c.name) {
				connection.push(c);// 将对应名称的connection放入需要保持的connection数组中
			}else if(o.elementType === 'node' && o.project_type !== '1' && o.getEntry().connection === c.name){
				connection.push(c);// 将对应名称的connection放入需要保持的connection数组中
			}
		});
	});
	return $.unique(connection);
};
/**
 * 获取场景中的连线
 * @returns {___anonymous5289_5290}
 */
JTopo.Scene.prototype.getOrder = function() { // 获取场景的所有连线
	var order = {};
	$.each(this.childs, function(i, o) {
		if ('link' === o.elementType) {
			!order.hop && (order.hop = []);
			var hop = {};
			hop.from = o.nodeA.text;// 将起始节点的text赋值给from
			hop.to = o.nodeZ.text;// 将终止节点的text赋值给to
			order.hop.push(hop);
		}
	});

	return order;
};
/**
 * 获取场景中的连线
 * @returns {___anonymous5732_5733}
 */
JTopo.Scene.prototype.getHops = function() { // 获取场景的所有连线
	var hops = {};
	hops.hop = [];
	$.each(this.childs, function(i, o) {
		if ('link' === o.elementType) {
			hops.hop.push(o.getHop());// 获取每条线的配置信息,放入集合
		}
	});
	if (hops.hop.length == 0) {// 没有连线
		hops = '';
	} else if (hops.hop.length == 1) {// 只有一条连线
		hops.hop = hops.hop[0];
	} else if (hops.hop.length > 1) {// 有多个连线
		hops.hop = hops.hop;
	}
	this.hops = hops;
	return this.hops;
};
JTopo.Scene.prototype.setCore = function(t,j) {
	t && (this.coreData = {transformation:t});
	j && (this.coreData = {job:j});
};
/**
 * 获取场景的信息
 * @returns {___anonymous6250_6286}
 */
JTopo.Scene.prototype.getCore = function(type) {
	var canvas = {
					width: this.stage.canvas.width,
					height: this.stage.canvas.height
				};
	if(type === "1"){
		if(!this.coreData){
			this.coreData = Nasoft.Ajax.getProjectRootData(type);
			this.coreData.transformation.info.name = Nasoft.Topo.getSelectedTab().panel('options').title;
			this.coreData.transformation.canvas = canvas;
			return this.coreData;
		}
		var connection = this.getConnection();
		var order = this.getOrder();
		var step = this.getStep();
		var error = this.getError();
		!$.isEmptyObject(connection) && (this.coreData.transformation.connection = connection);
		!$.isEmptyObject(order) && (this.coreData.transformation.order = order);
		!$.isEmptyObject(step) && (this.coreData.transformation.step = step);
		!$.isEmptyObject(error) && (this.coreData.transformation.step_error_handling = error);
		this.coreData.transformation.info.name = Nasoft.Topo.getSelectedTab().panel('options').title;
		this.coreData.transformation.canvas = canvas
		return this.coreData;
	}else{
		if(!this.coreData){
			this.coreData = Nasoft.Ajax.getProjectRootData(type);
			this.coreData.job.name = Nasoft.Topo.getSelectedTab().panel('options').title;
			this.coreData.job.canvas = canvas;
			return this.coreData;
		}
		var connection = this.getConnection();
		var hops = this.getHops();
		var entries = this.getEntries();
		!$.isEmptyObject(connection) && (this.coreData.job.connection = connection);
		!$.isEmptyObject(hops) && (this.coreData.job.hops = hops);// hops不为空
		!$.isEmptyObject(entries) && (this.coreData.job.entries = entries);// entries不为空
		this.coreData.job.name = Nasoft.Topo.getSelectedTab().panel('options').title
		this.coreData.job.canvas = canvas;
		return this.coreData;
	}};

JTopo.Scene.prototype.updateProject = function(project) {
	try {
		var childs = this.childs;
		var steps = [], hops = [];// 定义步骤集,连线集
		$.each(childs, function(i, o) {// 分类步骤与连线
			if ('node' === o.elementType) {// 步骤节点
				var step = {// 需要加入项目树中的数据
					clickSign : o.elementType,
					text : o.text,
					iconCls : 'icon-' + o.type,
					node : o
				};
				steps.push(step);// 没出现一次'node'就添加一条步骤数据
			} else if ('link' === o.elementType) {// 连线的project的数据
				var hop = {// 创建连线在项目树中的数据
					clickSign : o.elementType,
					text : o.nodeA.text + '->' + o.nodeZ.text,
					iconCls : 'icon-link',
					link : o
				};
				hops.push(hop);// 没出现一次'link';
			}
		});
		var project_childs = $('#project').tree('getChildren', project.target);// 需要更新的project
		$.each(project_childs, function(i, o) {
			if (o.clickSign == 12) {// 如果子节点为步骤文件夹
				$.each($('#project').tree('getChildren', o.target), function(i,
						o) {
					$('#project').tree('remove', o.target);
				});
				$('#project').tree('append', {// 将步骤加入树中
					parent : o.target,
					data : steps,
					state : 'closed'
				});
			} else if (o.clickSign == 13) {// 如果数节点为连线文件夹
				$.each($('#project').tree('getChildren', o.target), function(i,
						o) {
					$('#project').tree('remove', o.target);
				});
				$('#project').tree('append', {// 将步骤加入树中
					parent : o.target,
					data : hops,
					state : 'closed'
				});
			}
		});
		var tab = Nasoft.Topo.getSelectedTab();
		tab.onChange.call(tab);
	} catch (e) {
		console.log(e);
	}
};
/**
 * 判断当前节点在场景中是否已经存在
 * 
 * @param node
 * @returns 
 */
JTopo.Scene.prototype.existsNode = function(node) {
	var childs = this.childs;
	for (var i = 0; i < childs.length; i++) {
		if (childs[i].elementType === 'node' && node.text === childs[i].text) {
			return true;
		}
	}
	return false;
};
/**
 * 判断当前连线在场景中是否已经存在
 * 
 * @param node
 * @returns 
 */
JTopo.Scene.prototype.existsLink = function(nodeA,nodeZ) {
	var childs = this.childs;
	for (var i = 0; i < childs.length; i++) {
	  if (childs[i].elementType === 'link' && childs[i].nodeA === nodeA && childs[i].nodeZ === nodeZ) {
			return true;
		}
	}
	return false;
};
/**
 * clone
 * @author rsq0113
 * @param properties
 */
JTopo.Link.prototype.clone = function() {
	// 获取序列化属性
	var properties = this.serializedProperties;
	var link = {};
	for(var i = 0;i < properties.length;i++){
		link[properties[i]] = this[properties[i]];
	}
	link.cloned = this;
	    return link;
};
/**
 * clone
 * @author rsq0113
 * @param properties
 */
JTopo.Node.prototype.clone = function() {
	// 获取序列化属性
	var properties = this.serializedProperties;
	var node = new JTopo.Node;
	node.project_type = this.project_type;
	for(var i = 0;i < properties.length;i++){
		node[properties[i]] = this[properties[i]];
	}
	node.setImage(this.image.src);
	if (this.step){
		node.step = $.extend(true, {}, this.step);// 将step属性深度复制
	}else if (this.entry) {
		node.entry = $.extend(true, {}, this.entry);// 将entry属性深度复制
	}
	    node.transfer = $.extend(true, {}, node.transfer);// 将transfer属性深度复制
	    node.cloned = this;
	    return node;
};
/**
 * 获取连线走向
 * @author rsq0113
 */
JTopo.Link.prototype.getTrend = function () {
	var trend = {};
	if (this.nodeA && this.nodeZ) {
		trend['from'] = this.nodeA.text;
		trend['to'] = this.nodeZ.text;
	}
	return trend;
};
/**
 * 步骤分类
 */
JTopo.Scene.prototype.stepClassify = function(node){
	this.stepclassifyMap = this.stepclassifyMap ? this.stepclassifyMap : {};
	if(this.stepclassifyMap[node.type]){// 步骤分类中已经存在当前节点类型的分类
		this.stepclassifyMap[node.type].push(node);
	}else{// 步骤分类中不存在存在当前节点类型的分类
		this.stepclassifyMap[node.type] = [node];
	}
}