function BinaryTree() {
    // 根节点
    this.root = null;
    var that = this;
    this.insert = function (key) {
        var node = new Node(key);
        if (that.root === null) {
            that.root = node;
            that.scene.add(that.root.nodeC);
            /*将root节点加入页面dom，并用class定位*/
           /* that.root.target.appendTo($("body")).addClass("root");*/
        } else {
            insertNode(that.root, node);
        }
    }

    // 构造节点
    function Node(key) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.nodeC = Nasoft.Topo.newNode(this);
        this.target = getTarget.bind(this)();
    }

    function getTarget() {
        var t = $("<div></div>");
        t.text(this.key);
        return t;
    }

    function insertNode(p, n) {
        if (n.key < p.key) {
            if (p.left === null) {
                /*构建左节点*/
                p.left = n;
                that.scene.add(n.nodeC);
                let newLink = Nasoft.Topo.newLink(p.nodeC,n.nodeC,"left");
                that.scene.add(newLink);
            } else {
                insertNode(p.left, n);
            }
        } else {
            if (p.right === null) {
                p.right = n;
                that.scene.add(n.nodeC);
                let newLink = Nasoft.Topo.newLink(p.nodeC,n.nodeC,"right");
                that.scene.add(newLink);
            } else {
                insertNode(p.right, n);
            }
        }
    }

    function preOrder(node, callback) {
        if (node !== null) {
            callback(node);
            preOrder(node.left, callback);
            preOrder(node.right, callback);
        }
    }

    function inOrder(node, callback) {
        if (node !== null) {
            inOrder(node.left, callback);
            callback(node);
            inOrder(node.right, callback);
        }
    }

    function postOrder(node, callback) {
        if (node !== null) {
            postOrder(node.left, callback);
            postOrder(node.right, callback);
            callback(node);
        }
    }

    this.preOrder = function (callback) {
        preOrder(that.root, callback);
    }
    this.inOrder = function (callback) {
        inOrder(that.root, callback);
    }
    this.postOrder = function (callback) {
        postOrder(that.root, callback);
    }
}

$(function () {
    var callback = function (node) {
        let newNode = Nasoft.Topo.newNode(node);
    }
    var onBack = function (data) {
        console.log(data);
    }
    var data = [
       10,6, 1, 4, 7, 5, 2, 8, 11, 45, 3, 9
    ]
    var canvas = Nasoft.Topo.createCanvas("canvas");
    canvas.width = $("body").width();
    canvas.height = $("body").height();
    var scene = Nasoft.Topo.createScene(Nasoft.Topo.createStage(canvas));

    if (data) {
        var bt = new BinaryTree();
        bt.scene = scene;
        $.each(data, function (i, o) {
            bt.insert(o);
        });
        console.log(bt);
    }
  /*  bt.inOrder(callback);
*/
});