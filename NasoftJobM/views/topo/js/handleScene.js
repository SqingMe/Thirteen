/**
 * @author rsq0113
 * @param tab(当前的被选中的选项卡);
 * @returns 一个操作缓存的对象
 */
Nasoft.Topo.handleScene = function(tab) {
	return {
		// 执行操作的tab
		tab : tab,
		// 目前可操作场景是否处在站内的标记
		inTheStack : false,
		// 克隆一个当前场景放入栈中
		handleStack : function() {
			console.log(this.inTheStack);
			/*if (this.inTheStack) {// 当前显示的场景在栈内
				var out = this.outstack();// 使当显示的场景出栈
				var inq = this.inqueue();// 使当前显示的场景入栈,重新在栈内复制一个映射的非引用场景
			} else {
				var inq = this.inqueue();// 使当前显示的场景入栈,重新在栈内复制一个映射的非引用场景
			}*/
		},
		inqueue : function() {
			var tab = this.tab;
			if (!tab.cache) {
				tab.cache = [];// 命名一个缓存空间,关联到对应的选项卡上
			}
			;
			var stage = tab.stage;
			var sceneCache = Nasoft.Topo.createScene();// 新建一个场景,作为缓存
			var newnode = this.createAgine(tab, sceneCache);// 筛选出节点和连线的集合
			if (newnode) {// 没有节点
				this.linkNode(newnode, sceneCache);// 创建连线连接节点
			}
			tab.cache.push(sceneCache);// 将缓存场景放入缓存空间中
			this.inTheStack = false;// 入栈的场景为当前可操作场景的一个非引用的副本,此时显示的场景在栈外
			return tab.cache;
		},
		linkNode : function(newnode, sceneCache) {
			try {
				var nodes = newnode.nodes, links = newnode.links;// 取出对象中的节点和连线的结合
				var nodeA, nodeZ, link;
				for (var i = 0; i < links.length; i++) {
					for (var j = 0; j < nodes.length; j++) {
						if (nodes[j].cloned === links[i].cloned.nodeA) {
							nodeA = nodes[j];// 找出连线的初始节点
						} else if (nodes[j].cloned === links[i].cloned.nodeZ) {
							nodeZ = nodes[j];// 找出连线的末端节点
						}
					}
					link = nodeA && nodeZ ? Nasoft.Topo.newLink(nodeA, nodeZ,links[i])
							: null;
					if (link) {
						sceneCache.add(link);// 将连线加入缓存场景
					}
				}
			} catch (e) {
				console.log(e);
			}	
		},
		createAgine : function(tab, sceneCache) {// 入栈
			try {
				var scene = tab.stage.childs[0], nodeObj = {
						nodes : [],
						links : []
					};
					if (scene.childs.length === 0) {
						return null;
					}
					for (var i = 0; i < scene.childs.length; i++) {// 遍历当前场景中的节点属性并逐个添加到新的场景中
						var node = scene.childs[i], newnode,newlink;
						if (node.elementType === 'node') {
							newnode = node.clone();// 克隆一个节点
							sceneCache.add(newnode);
							nodeObj.nodes.push(newnode);// 将新创建的node放入集合中
						} else {
							newlink = node.clone();// 克隆一条线
							nodeObj.links.push(newlink);// 将原有的线放入集合中
						}
					}
					return nodeObj;
			} catch (e) {
				console.log(e);
			}	
		},
		repealStep : function() {// 撤销
			try {
				this.inTheStack = true;// 当前显示的场景需要被替换成栈内的缓存场景
				var tab = this.tab;
				var stage = tab.stage;// 获取当前的舞台对象
				if (!tab.cache) {
					this.inTheStack = false;
					return 0;// 没有缓存步骤
				}
				var index = tab.cache.indexOf(stage.childs[0]);// 获取到当前场景在缓存中的索引
				if (index > 0) {// 如果当前场景在缓存中还有上一步
					var lastscene = tab.cache[index - 1];// 获取缓存中当前场景的上一个场景
					stage.clear();// 清空舞台
					tab.stage = stage; // 将原有的关联舞台对象替换
					tab.scene = lastscene;// 将原有的关联场景替换
					tab.scene.tab = tab;
					Nasoft.Topo.topo(tab);// 渲染舞台以及添加相关的事件,返回被加工的舞台
					return index;
				} else if (index === 0) {
					return index;
				} else if (index === -1 && tab.cache.length >= 1) {
					this.inqueue();// 将此时的场景备份入栈
					this.inTheStack = true;// 前进操作是在栈内对显示的场景进行切换
					lastscene = tab.cache[tab.cache.length - 2];// 获取缓存中当前场景的上一个场景
					stage.clear();// 清空舞台
					tab.stage = stage; // 将原有的关联舞台对象替换
					tab.scene = lastscene;// 将原有的关联场景替换
					tab.scene.tab = tab;
					Nasoft.Topo.topo(tab);// 渲染舞台以及添加相关的事件,返回被加工的舞台
					return index;
				}
			} catch (e) {
				console.log(e);
			}	
		},
		forwardStep : function() {
			try {
				this.inTheStack = true;// 前进操作是在栈内对显示的场景进行切换
				var tab = this.tab;
				var stage = tab.stage;// 获取当前的舞台对象
				if (!tab.cache) {
					this.inTheStack = false;
					return 0;// 没有缓存步骤
				}
				var index = tab.cache.indexOf(stage.childs[0]);// 获取到当前场景在缓存中的索引
				if (-1 < index && index < (tab.cache.length - 1)) {// 如果当前场景在缓存中不是最后一步
					var lastscene = tab.cache[index + 1];// 获取缓存中当前场景的上一个场景
					stage.clear();// 清空舞台
					tab.stage = stage; // 将原有的关联舞台对象替换
					tab.scene = lastscene;// 将原有的关联场景替换
					tab.scene.tab = tab;
					Nasoft.Topo.topo(tab);// 渲染舞台以及添加相关的事件,返回被加工的舞台
					return (tab.cache.length - 1) - index;// 返回当前索引到栈尾的位置
				} else if (index === (tab.cache.length - 2)) {// 还能前进一步
					lastscene = tab.cache[index + 1];// 获取缓存中当前场景的上一个场景
					stage.clear();// 清空舞台
					tab.stage = stage; // 将原有的关联舞台对象替换
					tab.scene = lastscene;// 将原有的关联场景替换
					tab.scene.tab = tab;
					Nasoft.Topo.topo(tab);// 渲染舞台以及添加相关的事件,返回被加工的舞台
					return index - (tab.cache.length - 1);// 返回当前索引到栈尾的位置
				} else if (index === (tab.cache.length - 1)) {// 最后一个缓存
					return index - (tab.cache.length - 1);// 返回当前所有,通知快捷键无效
				} else if (index === -1) {
					console.log('当前场景已经出栈!!!')
					return 0;// 当前场景不在栈中
				}	
			} catch (e) {
				console.log(e);
			}	
		},
		outstack : function() {
			try {
				var tab = this.tab;
				var stage = tab.stage;// 获取当前的舞台对象
				var index = tab.cache.indexOf(stage.childs[0]);// 获取到当前场景在缓存中的索引
				if (index === -1) {
					console.log('当前场景已经出栈!!!');
					return index;
				} else if (-1 < index < tab.cache.length) {// 有前进的缓存
					var start = index;// 将当前场景在栈中的索引作为删除栈缓存的开始下标
					var count = tab.cache.length - start;// 计算出从当前所有到最后一个缓存的索引的总条数
					tab.cache.splice(start, count);// 删除当前索引之后包括当前索引的缓存
					return index;
				}
			} catch (e) {
			console.log(e);
			}
		}
	}
}
