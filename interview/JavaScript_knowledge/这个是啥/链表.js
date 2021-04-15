function Node(element) {
    this.element = element
    this.next = null
}

function LinkedList() {
    this.head = null
    this.length = 0
}

LinkedList.prototype = {
    constructor: LinkedList,
    append: function (element) {
        const node = new Node(element)
        let current = null
        if (this.head === null) {
            this.head = node
        } else {
            current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = node
        }
        this.length++
    },
    insert: function (position, element) {
        if (position >= 0 && position <= this.length) {
            const node = new Node(element)
            let current = this.head
            let previous = null
            let index = 0
            if (position === 0) {
                this.head = node
                node.next = current
            } else {
                while (index < position) {
                    previous = current
                    current = current.next
                    index++
                }
                node.next = current
                previous.next = node
            }
            this.length++
            return true
        }
        return false
    },
    removeAt: function (position) {
        if (position >= 0 && position < this.length) {
            let current = this.head
            let previous = null
            let index = 0
            if (position === 0) {
                this.head.next = current.next
            } else {
                while (index < position) {
                    previous = current
                    current = current.next
                    index++
                }
                previous.next = current.next
            }
            this.length--
            return current.element
        }
        return null
    },
    findIndex: function (element) {
        let current = this.head
        let index = -1
        while (current) {
            if (element === current.element) {
                return index + 1
            }
            index++
            current = current.next
        }
        return index
    },
    remove: function (element) {
        const index = this.findIndex(element)
        return this.removeAt(index)
    },
    isEmpty: function () {
        return !this.length
    },
    size: function () {
        return this.length
    },
    toString: function () {
        let current = this.head
        let string = ''
        while (current) {
            string += ` ${current.element}`
            current = current.next
        }
        return string
    }
}

const linkedList = new LinkedList();

console.log(linkedList);
linkedList.append(2);
linkedList.append(6);
linkedList.append(24);
linkedList.append(152);

linkedList.insert(3, 18);
console.log(linkedList);
console.log(linkedList.removeAt(1))
console.log(linkedList.findIndex(24));
