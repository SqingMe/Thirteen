function BinaryTree() {
    // 根节点
    this.root = null;
    var that = this;
    this.insert = function (node, callback) {
        if (that.root === null) {
            that.root = node;
        } else {
            insertNode(that.root, node, callback);
        }
    }


    function insertNode(p, n, callback) {
        n.elders.push(p);
        // 需插入的key小于父节点的key
        if (n.key < p.key) {
            // 父节点没有左节点
            if (p.left === null) {
                /*构建左节点*/
                p.left = n;
                callback(p, n, 'left')
            } else {
                // 父节点有左节点，将左节点作为父节点继续与插入的节点比较key
                insertNode(p.left, n, callback);
            }
        } else {
            /*构建右节点*/
            if (p.right === null) {
                p.right = n;
                callback(p, n, 'right')
            } else {
                insertNode(p.right, n, callback);
            }
        }
    }


    /*前序遍历*/
    var preOrder = function (node, callback) {
        if (node !== null) {
            callback(node, this);
            preOrder(node.left, callback);
            preOrder(node.right, callback);
        }
    }.bind(this)
    /*中序遍历*/
    var inOrder = function (node, callback) {
        if (node !== null) {
            inOrder(node.left, callback);
            callback(node, this);
            inOrder(node.right, callback);
        }
    }.bind(this)
    /*后序遍历*/
    var postOrder = function (node, callback) {
        if (node !== null) {
            postOrder(node.left, callback);
            postOrder(node.right, callback);
            callback(node, this);
        }
    }.bind(this)


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

function Node(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.elders = [];
    this.nodeC = Nasoft.Topo.newNode(this);
}

var QY = {}

$(function () {
    /*初始化界面*/
    var canvas = Nasoft.Topo.createCanvas("canvas");
    canvas.width = $("body").width();
    canvas.height = $("body").height();
    var scene = Nasoft.Topo.createScene(Nasoft.Topo.createStage(canvas));


    QY.main = function (str) {

        /*初始数据*/
        var data = [
            10, 6, 1, 4, 7, 5, 2, 8, 11, 45, 3, 9
        ]
        if (arguments.length !== 0) {
            data = arguments
        }

        var angle = Math.PI / 4;
        var vertical = 120;
        if (data) {
            var bt = new BinaryTree(), x = 50, y = 40;
            for (var i = 0; i < data.length; i++) {
                data[i] = new Node(data[i])
                Nasoft.Topo.locations(data[i], (i + 1) * x, y)
                scene.add(data[i].nodeC);
            }
            for (var i = 0; i < data.length; i++) {
                var o = data[i];
                if (i === 0) {
                    Nasoft.Topo.locations(o, $("body").width() / 2, 100);
                }

                bt.insert(o, function (p, n, text) {
                    var timer = setTimeout(function () {
                        let newLink = Nasoft.Topo.newLink(p.nodeC, n.nodeC, text);
                        /*根据连线的走向，安排节点的对应坐标*/
                        if (text === "left") {
                            Nasoft.Topo.arrangeL(p, n, vertical, angle)
                        }
                        if (text === "right") {
                            Nasoft.Topo.arrangeR(p, n, vertical, angle)
                        }
                        var timer1 = setTimeout(function () {
                            scene.add(newLink);
                            clearTimeout(timer1)
                        }, 400)
                        clearTimeout(timer);
                    }, i*1000)
                })
            }
        }
    }
});