/***************************************************注释**********************************************************************
 * 作用:用于基于JTopo的节点以及连线拖拽的实现
 * 是否需要扩充:已在需要扩充的函数上注明
 * 编码:任少晴
 * *************************************************************************************************************************/
!function (window) {
    var Nasoft = {};//Topo的命名空间
    window.Nasoft = Nasoft;
}(window);
Nasoft.Topo = {

    /**
     * 构造一个画布
     * @param tab
     * @returns {___anonymous2363_2368}
     */
    createCanvas: function (id) {
        console.log("createCancas");
        var canvas = document.getElementById(id);
        return canvas;
    },
    /**
     * 根据画布构造一个舞台
     * @param canvas
     * @returns {JTopo.Stage}
     */
    createStage: function (canvas) {
        console.log("createStage");
        var stage = new JTopo.Stage(canvas);
        return stage;
    },
    /**
     * 在舞台上创建一个场景
     */
    createScene: function (stage) {
        console.log("createScene...开始创建场景");
        var scene = null;
        scene = new JTopo.Scene(stage);
        scene.mode = 'select';
        scene.backgroundColor = "255,255,255";
        scene.alpha = 0.5;
        console.log("创建场景成功");
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
    newNode: function (node) {
        console.log('newNode...开始创建一个节点');
        var NODE_SIZE = 30;
        var nodeText = node.key || '';
        var node = new JTopo.Node(nodeText);
        node.setSize(NODE_SIZE, NODE_SIZE);
        node.alpha = 1;
        node.zIndex = 30;
        node.fontColor = "32,32,32";//字体颜色(RGB)
        node.textPosition = "Bottom_Center";
        node.textOffsetY = 5;//文本偏移量
        node.font = '12px iphonetopo';
        console.log('创建节点成功');
        return node;
    },
    /**
     * 简单连线
     */
    newLink: function (nodeA, nodeZ, text) {
        console.log('newLink...开始创建连线');
        var link = new JTopo.Link(nodeA, nodeZ);
        link.arrowsRadius = 10;
        link.lineWidth = 0.5; // 线宽
        link.bundleGap = 2; // 线条之间的间隔
        link.strokeColor = '0,0,0';
        link.fontColor = "0,0,0";
        link.zIndex = 0;
        link.text = text;
        return link;
    }
};