// 前序遍历：访问根–>遍历左子树–>遍历右子树;
// 中序遍历：遍历左子树–>访问根–>遍历右子树;
// 后序遍历：遍历左子树–>遍历右子树–>访问根;
// 广度遍历：按照层次一层层遍历;
function NodeTree(data, right, left) {
    this.data = data
    this.right = right
    this.left = left
}

function BinarySearchTree() {
    this.root = null
}

BinarySearchTree.prototype = {
    constructor: BinarySearchTree,
    insert: function (data) {
        const newNode = new NodeTree(data, null, null)
        if (this.root === null) {
            this.root = newNode
        } else {
            let current = this.root
            while (true) {
                if (current.data > data) {
                    if (current.left === null) {
                        current.left = newNode
                        break
                    }
                    current = current.left
                } else {
                    if (current.right === null) {
                        current.right = newNode
                        break
                    }
                    current = current.right
                }
            }
        }
    },
    find: function (data) {
        let current = this.root
        while (true) {
            if (current === null || data === current.data) {
                return current
            }
            current = data > current.data ? current.left : current.right
        }
    },
    preOrderRec: function () {
        let preListRec = []
        preOrderRec(this.root)
        function preOrderRec(node) {
            if (node) {
                preListRec.push(node.data)
                preOrderRec(node.left)
                preOrderRec(node.right)
            }
        }
        return preListRec
    },
    inOrderRec: function () {
        let inListRec = []
        inOrderRec(this.root)
        function inOrderRec(node) {
            if (node) {
                inOrderRec(node.left)
                inListRec.push(node.data)
                inOrderRec(node.right)
            }
        }
        return inListRec
    },
    postOrderRec: function () {
        let postListRec = []
        postOrderRec(this.root)
        function postOrderRec(node) {
            if (node) {
                postOrderRec(node.left)
                postOrderRec(node.right)
                postListRec.push(node.data)
            }
        }
        return postListRec
    }
}

let nodes = [8, 3, 6, 4, 9, 11, 2, 5, 7]
let bts = new BinarySearchTree()
nodes.forEach(item => bts.insert(item))
console.log(JSON.stringify(bts.root))
console.log(bts.find(8))
console.log(bts.preOrderRec())
console.log(bts.inOrderRec())
console.log(bts.postOrderRec())
