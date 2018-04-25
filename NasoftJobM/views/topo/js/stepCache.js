/*******************************************************************************
 *
 * 
 ******************************************************************************/
function stepCache(stepSign,motionflag)
{
	this.motionflag = motionflag; // 记录操作标志（0：新建步、1：前切、2：粘贴、n:新创场景）
	//this.sequence=sequence;   //操作顺序号
	this.stepSign=stepSign;   //当前场景标记
	//this.winArrays=[];
	this.scenes = [];
	
}
var sequenceNum=1;  //操作顺序号

var stepCacheList = [];

/**
 * 记录步 
 * @param PARMLIST
 */
function stepsListening(tab,motionflag){
	
	if(stepCacheList.length != 0){
		clearStepSign(tab);
	}
	var scene = Nasoft.Tree.selectScene(tab);
	var stepCache1 = new stepCache(1,motionflag);

	$.each(scene.childs,function(i,o){
		stepCache1.scenes.push({"childs":o});
	});

	var stepCaches=[];
	stepCaches[0]=stepCache1;
	var x = 0;  //标记步伐中是否存在（1：存在，0不存在）
	var signnum = 0;
	
	$.each(stepCacheList,function(i,sc){
		 if(sc.key === tab){
			sc.value.push(stepCache1); 
			x=1;
		 }else{
			x=0;
		 }
	});
	
	if(x==0 || stepCacheList.length == 0){
		stepCacheList.push({'key':tab,'value':stepCaches});
	}

}
/**
 * 获取步点的位置
 * @param tab
 * @returns
 */
function getStepSign(tab){
	var stepSignnum = 0;
	$.each(stepCacheList,function(i,sc){
		 if(sc.key === tab){
			 var stepCa = sc.value;
			 
			 $.each(stepCa,function(j,s){
				if(s.stepSign == 1){
					stepSignnum = j;
				} 
				 
			 });
		 }
	});
	return stepSignnum;
}

/**
 * 清除场景步标记
 */
function clearStepSign(tab){
	if( stepCacheList.length != 0){
		$.each(stepCacheList,function(i,sc){
			 if(sc.key === tab){
				 $.each(sc.value,function(j,sv){
					 sv.stepSign = 0;
				 });
			  }
		 });
	}
}

/**
 * 设置场景步标记
 */
function setStepSign(stepc){
	stepc.stepSign = 1;
}

/**
 * 获取当前部
 */
function getCurrentStep(tab){
	var steps = [];
	$.each(stepCacheList,function(i,sc){
		if(sc.key === tab){
			 $.each(sc.value,function(j,sv){
				 if(sv.stepSign == 1){
					steps = sc.value[j];
				 }
			 });
		}
	});
	return steps;
}
/**
 * 获取上一步、撤销操作（后退）
 */
function getUpStep(tab){
	var steps = [];
	$.each(stepCacheList,function(i,sc){
		if(sc.key === tab){
			 $.each(sc.value,function(j,sv){
				 if(sv.stepSign == 1){
					 sc.value[j].stepSign = 0;
						steps = sc.value[j-1];
				 }
			 });
		}
	});
	steps.stepSign = 1;
	return steps;
}
/**
 * 获取下一步、取消撤销（前进）
 */
function getNextStep(tab){
	var nextSteps = [];
	var steps = [];
	$.each(stepCacheList,function(i,sc){
		if(sc.key === tab){
			 $.each(sc.value,function(j,sv){
				 if(sv.stepSign == 1){
					 steps = sc.value[j];
					sc.value[j].stepSign = 0;
					nextSteps = sc.value[j+1];
				 }
			 });
		}
	});
	nextSteps.stepSign = 1;
	return nextSteps;
}
/**
 * 取得操作前一步
 */
function getOneStep(tab){
	var OneStep = [];
	var steps = [];
	$.each(stepCacheList,function(i,sc){
		if(sc.key === tab){
			 $.each(sc.value,function(j,sv){
				 if(sv.stepSign == 1){
					 steps = sc.value[j];
					if(j==(sc.value.length-1)){
						OneStep = [];
					}else{
						OneStep = sc.value[j+1];
					}
				 }
			 });
		}
	});
	return OneStep;
}

/**
 * 重新加载
 * @param winArrays_bak
 */
function reloadscene(Steps){
	
	console.log(stepCacheList);
	var tab = $('#stepTabs').tabs('getSelected');
	var scene = Nasoft.Tree.selectScene(tab);
	//清除原有场景的所有node节点
	 $.each(scene.childs,function(i,o){
		 
		scene.remove(o);
	 });
     $.each(Steps.scenes,function(i,o){
    	 scene.add(o.childs);
     });
     //剪切回退的情况
     
     var getOneStep = getCurrentStep(tab);
     if(getOneStep.length != 0 ){
	     if(getOneStep.motionflag == 1 ){
			$.each(pasteBoard.node,function(i,n){
				$.each(pasteBoard.winArray,function(j,w){
					if(n === w.node){
						PARMLIST.winArray.push({"text":w.text,"winId":w.winId,"node":w.node});
					}
				});
			 });
			if( pasteBoard.cutflag == 0){
				pasteBoard.node=[];
				pasteBoard.winArray=[];
				pasteBoard.cutflag = 1;
			}
	     }
	}
}



