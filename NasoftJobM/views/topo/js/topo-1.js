
var ConsoleLog = true;// 是否输出日志
if(!window.console){
	window.console = {log : function(){}};
	}
	window.console = window.console || {};
	console.log || (console.log = opera.postError);
if(!ConsoleLog){
	window.console.log = function(){};
}
 var fianlEle =$.fianlEle($.ajax({
        	url : $.getRootPath()+"/views/topo/jsonData/finalData.json",
        	type : 'get',
        	dataType : 'json',
        	async:false
        }).responseJSON);
/**
 * JTopo 插件的应用
 */
document.onreadystatechange =function(){//页面加载状态改变时执行
if(document.readyState == 'complete'){
	setTimeout(function(){// 延时一秒钟关闭遮罩
		   $("#container_demo").addClass("animated scaleOut");
			  setTimeout(function(){				  
				  $("#layout").addClass("animated bounceIn");
				  $("#topo-mask").hide();
			  },800);
		 
	},1500); 	
} //当页面加载状态
};
$(document).ready(function(){
	try{
		Nasoft.Topo.initMenus();
	}catch (e) {
		console.log(e);
		// TODO: handle exception
	}
	$.ajax({//获取后续加载的js文件的路径列表,并同时加载这些文件
		url:$.getRootPath()+'/views/topo/jsonData/javaScriptList.json',
		type:'GET',
		async:false,
		datatype:'json',
		success:function(urls){
			LazyLoad(document).js(urls,function(){
				Nasoft.Window.menuSetProperty.init();
				Nasoft.Window.menuSetTask.init();
				Nasoft.Window.createProject.init();
				Nasoft.Window.fns.connection.init();
				Nasoft.Project.run_project.init();
				Nasoft.TopButton.init();//加载工具栏顶部菜单按钮
				//加载主选项卡
			    Nasoft.Topo.initStepTabs();
			    Nasoft.Topo.initTree_project();
			    Nasoft.Topo.initTree_step();
			    //加载tabs关闭方法
				Nasoft.Topo.steptabClose();	
			    Nasoft.WorkButton.bind();
			    Nasoft.WorkButton.enable();
			    Nasoft.WorkButton.disable();
			    Nasoft.Util._configuration(); 
			    Nasoft.KeyCode = new Nasoft.KeyCode();
			    Nasoft.KeyCode.keycode_load();
			    document.oncontextmenu = false;
				});
		}
	});
});
/***************************************************注释**********************************************************************
 * 作用:用于基于JTopo的节点以及连线拖拽的实现
 * 是否需要扩充:已在需要扩充的函数上注明
 * 编码:任少晴
 * *************************************************************************************************************************/
!function(window){
	var Nasoft={};//Topo的命名空间	
	window.Nasoft=Nasoft;
}(window);
Nasoft.Jsurl=[];
Nasoft.Topo={
		tidy:function(){
			  var tab = Nasoft.Topo.getSelectedTab();
			  var scene = tab.scene;
			  var canvas = tab.stage.canvas;
			  var bound = scene.getElementsBound();
			  var nodes = scene.getElementsByClass(JTopo.Node);
			  var qw = bound.left - 100;
			  var qh = bound.top - 100;
			  for(var i=0;nodes.length>i;i++){
			    nodes[i].x = nodes[i].x - qw;
			    nodes[i].y = nodes[i].y - qh;
			  }
			  canvas.width = (bound.width+200)>tab.width()?(bound.width+200):tab.width();
			  canvas.height = (bound.height+200)>tab.height()?(bound.height+200):tab.height();
			},
	/*	leftWidth : $('#draw_tree').width(),
		topHeight : $('#draw_tool').height(),*/
		initMenus : function() {
			$.ajax({
				url : $.getRootPath()+'/views/topo/menuHtml/mouseRight.html',
				Type : 'get',
				dataType : 'html',
				async : false,
				success : function(html) {
					console.log("加载右键菜单。。。");
					$('body').append($(html));
				}
			
			});
			$.ajax({
				url : $.getRootPath()+'/views/topo/menuHtml/topMenus.html',
				type : 'get',
				dataType : 'html',
				async : false,
				success : function(html){
					console.log("加载顶部菜单。。。");
					$('body').append($(html));
				}
			});
		},
		/**
		 * @author rsq0113
		 * @returns
		 * 获取当前被选中的tab
		 */
		getSelectedTab : function() {return $('#stepTabs').tabs('getSelected')},
		getData_step : function(projectType){
			var treeData,urlSuffix;
			var urlSuffixs = ['/views/topo/jsonData/data-handling.json','/views/topo/jsonData/job-handling.json',
			                  '/views/topo/jsonData/job-handling.json']
			urlSuffix = urlSuffixs[parseInt(projectType)-1];
			!!urlSuffix && $.ajax({
				url:$.getRootPath()+urlSuffix,
				async:false,
				type:'GET',
				success:function(data){	
				 treeData=data;
			  }
			});
			return treeData || null;
		},
		/**
		 * 字段传递相关函数集的命名空间
		 */
		transferFns:{
			/**
			 * 获取参数node之前的节点的transfer的属性
			 */
			getTransfer:function(node){
				var transfer=[];
				function getMyFileds(node) {
				if (node.inLinks && node.inLinks.length > 0) {
					for (var i = 0; i < node.inLinks.length; i++) {
						var nodeA = node.inLinks[i].nodeA
						if (nodeA.blocked && nodeA.transfer.length >= 0) {
							transfer = transfer.concat(nodeA.transfer);
							continue;
						} else if (!nodeA.blocked && nodeA.transfer.length >= 0
								&& nodeA.inLinks.length === 0) {
							transfer = transfer.concat(nodeA.transfer);
							continue;
						} else if (!nodeA.blocked && nodeA.transfer.length >= 0
								&& nodeA.inLinks.length > 0) {
							transfer = transfer.concat(nodeA.transfer);
							getMyFileds(nodeA);
						}
					}
				}
			};
				getMyFileds(node);
				return transfer;
				}
		},
		/**
		 * 构造一个画布
		 * @param tab
		 * @returns {___anonymous2363_2368}
		 */
		createCanvas:function (tab){
			console.log("createCancas");
			var canvas=null;
			//获取选项卡tab中的画布canvas
			canvas=tab.find('canvas').get(0);
			//返回此画布
			return canvas;
		},
		/**
		 * 根据画布构造一个舞台
		 * @param canvas
		 * @returns {JTopo.Stage}
		 */
		createStage:function(canvas){	
			console.log("createStage");	
		 var stage = new JTopo.Stage(canvas);
			return stage;
		},
		/**
		 * 在舞台上创建一个场景
		 */
		createScene:function(){
			console.log("createScene...开始创建场景");		
			var scene=null;	
			scene = new JTopo.Scene();
			scene.mode='select';
			scene.backgroundColor = "255,255,255";
			scene.alpha = 0.5;
			console.log("创建场景成功");
			//$.watchScene(scene);
			return scene;
		},
		/**
		 * 作用:创建节点;
		 * @author rsq0113
		 * @param
		 * w:节点的宽,
		 * h:节点的高,
		 * project_type:创建的节点的工程类型,
		 * $tool:{text:"节点需要显示的文字",id:"节点的类型"}
		 * @returns  node
		 */
		 newNode:function(w, h,project_type,$tool,stepData){
			console.log('newNode...开始创建一个节点:type:'+$tool.id)
			var nodeText=$tool.text||'',nodeh=h||0,nodew=w||0,url;
		    var node = new JTopo.Node(nodeText);
		    var tab = Nasoft.Topo.getSelectedTab(),project = tab.project();
		    node.setSize(nodew,nodew);
		    node.alpha = 1;
		    node.zIndex = 30;
		    node.fontColor="0,0,0";//字体颜色(RGB)
		    node.textPosition = "Bottom_Center";
		    node.textOffsetY=5;//文本偏移量
		    node.font = '15px iphonetopo';
		    node.setType($tool.id);
		    node.project_type=project.project_type;// 设置节点的工程类型
			if(project.project_type==='1') {
				node.setImage("../views/topo/transformation/step/"+$tool.id+"/"+$tool.id+".svg");//插入图片
				url=$.getRootPath()+'/views/topo/transformation/step/'+$tool.id+'/'+$tool.id+'.json';
			} else {
				 node.setImage("../views/topo/job/entries/"+$tool.id+"/"+$tool.id+".svg");//插入图片
				url=$.getRootPath()+'/views/topo/job/entries/'+$tool.id+'/'+$tool.id+'.json';
			}
		 if (!stepData) {
			$.ajax({
				url : url,
				async : false,
				dataType : 'json',
				success : function(data) {
					stepData = data;// 获取模板数据
				}
			});
		    };
       if (node.project_type === '1') {
			node.setStep(stepData);
			node.setTransfer();
		} else {
			node.setEntry(stepData);// 打开文件是有步骤数据
		};
		tab.onChange.call(tab);
		    console.log('创建节点成功')
		    return node;
		},
		 /**
		  * 简单连线
		  */
		 newLink:function(nodeA, nodeZ,options){
			console.log('newLink...开始创建连线')
		    var link = new JTopo.Link(nodeA, nodeZ); 
			var tab = Nasoft.Topo.getSelectedTab(),project = tab.project();
			link.project_type = project.project_type;
			if(options && project.project_type !== '1'){
				for(var key in options){
                    link[key] = options[key];
				}
			}
		    link.arrowsRadius = 10;
		    link.lineWidth = 0.5; // 线宽
		    link.bundleGap = 2; // 线条之间的间隔
		    link.strokeColor = '0,0,0';	
		    link.fontColor = "0,0,0";
		    link.zIndex = 0;
		    link.setAlt();
		    tab.onChange.call(tab);
		    console.log('创建连线成功')
		    return link;
		},
		/**
		 * 对场景进行修饰和定义事件
		 * @param scene
		 * @returns
		 */
		topo : function(tab) {
			var topoEvents = Nasoft.TopoEvents();
			tab.stage.add(tab.scene);// 将场景添加到舞台中
			tab.topoEvents = topoEvents;
		    topoEvents.setStage.call(topoEvents,tab.stage);// 将舞台放入对象中
		    console.log('topo修饰结束...');
		//return stage;// 返回当前的舞台对象
	},
		  //创建一个展示步骤的tabs
		   addProjectTab:function(node){
				if(!$('#stepTabs').tabs('exists',node.text)){//如果页面已经不存在相同的tab则在tabs中添加一个tab				
					$('#stepTabs').tabs('add',{
						id:'tab_'+node.id,
						title:node.text,//标题
						selected:true,
						content:Nasoft.Topo.createcanvas(node),//内容
						closable:true //是否显示关闭图标
					});	
					    var tab=$('#stepTabs').tabs('getSelected');//获取当前选中面板
					    $('#project').tree({data :[node]});
						var project =  function() { return $('#project').tree('getRoots')[0];};// 定义tab的project方法
						var onChange = function (){// 定义工程发生变化时执行的函数
							$(this.panel("options").tab[0]).find(".tabs-inner").find(".tabs-icon").addClass("noSave-icon");
							this.project().isSave = false;
						};
						var onSave = function(){
							$(this.panel("options").tab[0]).find(".tabs-inner").find(".tabs-icon").removeClass("noSave-icon");
							this.project().isSave = true;
						}
						var module_data = this.getData_step(project().project_type);// 获取构件库树的数据
						$('#step_tool').tree({data : module_data});	;// 加载构件库树
						tab._project = node;
						tab.project = project;
						tab.onChange = onChange;
						tab.onSave = onSave;
						tab.projectStack = project();
						tab.module_data = module_data;
					return false;
				}else{
					$('#stepTabs').tabs('select',node.text);//选中添加的tab
					return true;
				}	
			},
			  //创建一个画布
			 createcanvas:function(node){
				 var divmenus='<div class="_my_panel">';
				 divmenus+="<div data-options=\"region:'center',split:true,border:false,height:'60%'\"><canvas></canvas></div>";		 
				 divmenus+="<div data-options=\"region:'south',split:true,title:'结果面板',collapsed:true,border:false,height:'40%'\">"+
				                '<div class="_result">'+
							    '<div title="日志" style="padding:0px;display:none;">  '+ 
							    '   <div style="overflow: auto;height: 100%;width: auto;" class="_log" ></div> '+ 
							    '</div>   '+
							    '<div title="步骤度量">  '+ 
								    '<table class="_statusTable"></table>'+ 
							    '</div>   '+
							    '<div title="度量" style="padding:0px;display:none;">  '+ 
							    '<div class="_metrics"></div>'+
							    '</div>   '+
				            '</div></div></div>';
				return divmenus;//返回画布对象
			},
		 steptabClose:function()
		{    //禁用浏览器自带右键事件
			$(document).on('contextmenu', function(){
				  return false; //设置返回为false，设置为true则返回右键菜单
				});
			/*双击关闭TAB选项卡*/
			$(".tabs-inner").dblclick(function(){
				var subtitle = $(this).children(".tabs-closable").text();
				$('#stepTabs').tabs('close',subtitle);
			})
		},
		getMyPanel:function(){
			// 布局tab面板
			this.layout({
				fit:true
			});
			// 布局日志结果输出面板
	        this.find("._result").tabs({
	        	fit:true
	        });
			return this;
		}
}
/***************************************************分割**********************************************************************
 * 
 * 		
 * 
 * *************************************************************************************************************************/
Nasoft.Tree={
      		 deleteSelf:function(){
      			var selected = $('#project').tree('getSelected');//获取被选中的树节点
      			$('#project').tree('remove', selected.target);//移除当前所选节点
      		 },
    		//获取树被选中的节点id
    		   getClickSign:function($id){
    			  var selected = $($id).tree('getSelected');
    			  return selected.clickSign;
    		  },
    			  deleteSelfByMenuId:function(id){
    					switch(id){
    					case'del_database':
    						 Nasoft.Tree.deleteSelf();//将改变后的数据保存到服务器文件中
    						break;
    					}
    				},
    			// 创建一个数据源
    			createCon:function(id){
    					switch (id) {
    					   case "newlink":
    						try{
    						Nasoft.Window.fns.connection.setInfo();
    						$('#dblink_win').window('open');
    						}catch (e) {
								console.log(e)
							}
    						break;
    					}
    				},
    				//创建一个项目树
    			createJob : function (getInfo) {
    				var id=$.createId(),//创建一个随机的项目id
   						  projectName = getInfo.project_name,//获取要创建的项目的名称
   					      data= [{
     						id: id,
     						clickSign:1,//点击标记
     						isSave:false,//项目保存状态
     						project_type:getInfo.project_type,//项目类型
     						project_name:getInfo.project_name,//项目名
     						file_path:getInfo.filePath,//项目文件路径
     						text:projectName,//显示名
     						state: 'closed',
     						children:[
     									{
     										"id":'tab_'+id+'_database',
     										clickSign:11,
     										text: "DB连接",
     										state: 'closed'
     										
     									},
     									{
     										"id":'tab_'+id+'_step',
     										clickSign:12,
     										text: "作业项",
     										state: 'closed'
     									    
     									}
     								]
     					}]
   					   return data;
    				},
    			 createTransformation:function(getInfo){
    					  var id=$.createId(),
    						  key=getInfo.project_name,
    					      data= [{
      						          	id: id,
			      						clickSign:1,//点击标记
			      						isSave:false,//项目保存状态
			      						project_type:getInfo.project_type,//项目类型
			      						project_name:getInfo.project_name,//项目名
			      						file_path:getInfo.filePath,//项目文件路径
			      						text:key,//显示名
			      						state: 'closed',
			      						children:[
			      									{
			      										"id":'tab_'+id+'_database',
			      										clickSign:11,
			      										text: "DB连接",
			      										state: 'closed'	
			      									},
			      									{
			      										"id":'tab_'+id+'_step',
			      										clickSign:12,
			      										text: "步骤",
			      										state: 'closed'    
			      									},
			      									{
			      										"id":'tab_'+id+'_link',
			      										clickSign:13,
			      										text: "连线",
			      										state: 'closed'
			      									}
			      								]
    					      				}]
    					      			return data;   					 				    	   					
    				  		}
    				
}
Nasoft.Window={
		element : {},
		/**
		 * @author rsq0113
		 * 创建步骤配置窗口
		 */
		createNodeWin : function(node) {
			if($('#'+node.type).length){ return false};
			           var project_type = node.project_type;// 获取当前节点的工程类型
			           var href;
				   		if(project_type === "1"){
				   			// 获取当前节点关联的参数页面的路径
				   		 	href = $.getRootPath()+"/views/topo/transformation/step/"+node.type+"/"+node.type+".jsp";
				   		}else{
				   		 	href = $.getRootPath()+"/views/topo/job/entries/"+node.type+"/"+node.type+".jsp";
				   		}
				   		href && $.ajax({
			   		 		url : href,
			   		 		type : "GET",
			   		 		dataType : 'html',
			   		 		async : false,
			   		 		success : function(html) {
			   		 		Nasoft.Util.uiParse($("body"),html);
							}
			   		 	});	
				   		return true;
		},
       /**
        * 组件配置窗口调用的函数命名空间
        */
		fns:{
			/**
			 * 组件开发的实现接口
			 * 组件开发人员以规范格式编写组件开发js脚本
			 * 组件开发人员,以对象调属性的方式扩展此函数命名空间
			 * 自己创建一个js脚本文件,以组件type 命名脚本文件(驼峰命名法)
			 * 文件中只包含一个函数Nasoft.Window.fns.组件类型=function(node){}
			 * 或Nasoft.Window.fns['组件类型']=function(node){};
			 * 此函数返回两个属性,var onBeforeOpen 和 var onBeforeClose,
			 * 这两个属性需要被赋以easyui-window 对应事件的回调函数,
			 * 具体实现请参考tableOutput与tableInput.
			 * 此函数在被第一次调用时赋值node即对应的组件步骤,在对应步骤配置窗口打开时执行相应的回调函数(onBeforOpen或者onBeforeClose)
			 */
		}
}

/**
 * 双击节点事件
 * @param dom
 */
var clickCount ='1';//记录点击次数
var varWidth =80;//var宽度
var varHeight=0;//var高度
function doubleClickNode(dom){
	$(dom).dblclick(function(){
		console.log('加载的双击');
		
		//创建一个node
		$tool=$('#step_tool').tree('getData',this);//获取当前拖拽节点的数据	  
		$('#step_tool').tree('select',this);//获取当前拖拽节点的数据	 
		tab = $('#stepTabs').tabs('getSelected');//获取当前被选中的tab
		scene=tab.scene;
		project=tab.project();
		stepNode=Nasoft.Topo.newNode(40,40,project.project_type,$tool);
		
		//显示
		width=$('#draw_tree').parent().width();//获取工具栏的宽度,自适应宽度
		
		//判断是否超出屏幕
		height =  $('#main').height()*0.2+varHeight;
		if(clickCount=='1'){
			width2 = $('#main').width()*0.2;
			height = $('#main').height()*0.2;
			clickCount++;
		}else{
			width2 = ($('#main').width()*0.2)+varWidth;
			varWidth =varWidth+80;
		}
		
		//如果超出宽度重新赋值
		if(width2>=$('#main').width()){
			varHeight= varHeight+100;
			varWidth = 0;
		}
		
		//正常的设置
		stepNode.setCenterLocation(width2,height);
		scene.add(stepNode);
		if(project.project_type==='1') stepNode.setStep();
		else stepNode.setEntry();			
	});
}
/*******************************************************************************************************************/

