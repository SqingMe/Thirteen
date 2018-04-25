
/**
 * 粘贴板
*/
var pasteBoard={
	cutflag:1,  //剪切复制标志（1：复制、0剪切）
	node:[],    //step集合
	nodeAZ:[],
	scene:[],
	nodes:[]
}
/**
 * 剪切
 */

function cutStep(){
	/*
	 *清理粘贴板  start
	 */
	pasteBoard.node=[];
	pasteBoard.winArray=[];
	pasteBoard.scene=[];
	/*
	 *清理  end
	 */
	var tab = $('#stepTabs').tabs('getSelected'); //获取当前tab
	//var scene = Nasoft.Tree.selectScene(tab);	  //根据tab创建场景
	var scene = tab.scene;
	pasteBoard.scene = scene;
	 if(scene.selectedElements != null){//判断在当前场景中选中的目标
		 $.each(scene.childs,function(i,c){
			 if(c.elementType == 'link'){
				//获取nodeA获取nodez
				 pasteBoard.nodeAZ.push({'nodeA':c.nodeA,'nodeZ':c.nodeZ}); 
			 }	 
		 });
		 $.each(scene.selectedElements,function(j,se){
			 pasteBoard.node.push(se);//将目标保存到粘贴板中
			 $.each(scene.childs,function(k,w){
				 if(se === w){
					 scene.remove(w); //删除选中节点
				 }
			 });
		 });
	 }	
	 //向粘贴板中记录当前为剪切
	 pasteBoard.cutflag = 0;
	 
}

/**
 * 复制
 */
function copyStep(){
	/*
	 *清理粘贴板  start
	 */
	pasteBoard.node=[];
	pasteBoard.nodeAZ = [];
	pasteBoard.scene = [];
	/*
	 *清理  end
	 */
	var tab = $('#stepTabs').tabs('getSelected'); //获取当前tab
	var scene = tab.scene;	  //根据tab创建场景
	 if(scene.selectedElements != null){//判断在当前场景中选中的目标
		 $.each(scene.selectedElements,function(j,se){
			 pasteBoard.node.push(se);//将目标保存到粘贴板中
		 });
	 }
	 /*
	  *  连线
	  */
    $.each(scene.childs,function(i,c){
		 if(c.elementType == 'link'){
			//获取nodeA获取nodez
			 pasteBoard.nodeAZ.push({'nodeA':c.nodeA,'nodeZ':c.nodeZ}); 
		 }	 
	 });
	 
	 pasteBoard.cutflag = 1;
}
/**
 * 粘贴
 */
function pasteStep(){
	
	var tab = $('#stepTabs').tabs('getSelected'); //获取当前tab
	var scene = tab.scene;	  //根据tab创建场景
	//剪切的粘贴
	if(pasteBoard.cutflag == 0){
		
		 $.each(pasteBoard.node,function(k,w){
			 pasteBoard.scene.remove(w); //删除选中节点
		 });
		
		$.each(pasteBoard.node,function(i,n){
			scene.add(n);
		 });
		$.each(pasteBoard.nodeAZ,function(i,az){
			if(getNodeAZ(az.nodeA,pasteBoard.node) && getNodeAZ(az.nodeZ,pasteBoard.node)){
				newLink(az.nodeA,az.nodeZ,scene);
			}
		});
		pasteBoard.node=[];
		pasteBoard.nodeAZ = [];
		pasteBoard.scene = [];
		pasteBoard.cutflag = 1;
		return;
	}
	//剪切粘贴  end
	//复制粘贴创建结点
	pasteBoard.nodes=[];
	$.each(pasteBoard.node,function(i,n){
		  createNode(n,scene,pasteBoard.cutflag);  

	 });
	//复制粘贴创建连线
	$.each(pasteBoard.nodeAZ,function(i,az){
		if(getNodeAZ(az.nodeA, pasteBoard.nodes) && getNodeAZ(az.nodeZ, pasteBoard.nodes)){
			newLink(az.nodeA,az.nodeZ,scene); 
		}
	});
}
/**
 * 判断nodeA 和  nodeZ是否在选中节点之内
 * @param node
 * @param nodes
 */
function getNodeAZ(node,nodes){
	var flag = false;
	
	for(var i=0 ; i<nodes.length;i++){
		if(node === nodes[i]){
			flag = true;
			break;
		}else{
			flag = false;
		}
	}
	
	return flag;
}

/**
 * 创建step
 * @param node
 * @param win
 */

function createNode(node,scene,cutflag){
	
	var nodeText = node.text;
	var nodeh = 40;
	var nodew = 40;
	var stepNode = new JTopo.Node(nodeText);
	stepNode.image =  node.image;
	stepNode.x = node.x+5;
	stepNode.y = node.y+5;
	stepNode.setSize(nodew, nodeh);
	stepNode.fontColor=node.fontColor;
	stepNode.font = "15px iphonetopo";
	stepNode.setType(node.getType());
	$.each(pasteBoard.nodeAZ,function(i,az){
		if(az.nodeA === node){
			az.nodeA = stepNode;
		}
		if(az.nodeZ === node){
			az.nodeZ = stepNode;
		}
	});
	pasteBoard.nodes.push(stepNode);
	scene.add(stepNode);
}


// 简单连线
function newLink(nodeA, nodeZ,scene){
   var link = new JTopo.Link(nodeA, nodeZ, null); 
   link.arrowsRadius = 15;
   link.lineWidth = 1; // 线宽
   link.bundleOffset = 60; // 折线拐角处的长度
   link.bundleGap = 20; // 线条之间的间隔
   link.textOffsetY = 3; // 文本偏移量（向下3个像素）
   link.strokeColor = '0,200,255';
   scene.add(link);
}

/**
 * 全选
 */
function selectAllStep(){
	 var tab = $('#stepTabs').tabs('getSelected');//获取当前tab
	 var scene = tab.scene;	  //根据tab创建场景
	 scene.selectedElements=[];
     $.each(scene.childs,function(i,o){
    	 o.selectedAllStepNode(scene);
    	 scene.selectedElements.push(o);
     });
}

/**
 * 清除选择
 */
function clearSelectStep(){
	 var tab = $('#stepTabs').tabs('getSelected'); //获取当前tab
	 var scene = tab.scene;	  //根据tab创建场景
	if(scene.selectedElements != null){
		 $.each(scene.selectedElements,function(j,se){
			 scene.cancleAllSelected(se);
		 });
	}
}
/**
 * 后退
 */
function editMenuBack(){
	 var tab = $('#stepTabs').tabs('getSelected'); //获取当前tab
	//获取上一步
	var steps = getUpStep(tab);
	//重载画布信息
	reloadscene(steps);
}
/**
 * 前进
 */
function editMenuMarch(){
	 var tab = $('#stepTabs').tabs('getSelected'); //获取当前tab
	//获取下一步
	var nextsteps = getNextStep(tab);
	//重载画布信息
	reloadscene(nextsteps);
}




