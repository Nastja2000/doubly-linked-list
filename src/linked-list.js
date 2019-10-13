const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let newNode = new Node(data);

        if (this._head === null) {
            this._head = newNode;
            this._tail = newNode;
        } else {
            newNode.prev = this._tail;
            this._tail.next = newNode;
            this._tail = newNode;
        }
        this.length++;
        return this;
    }

    head() {
        return (this._head === null) ? null : this._head.data;
    }

    tail() {
        return (this._tail === null) ? null : this._tail.data;
    }

    at(index) {
        let currentNode = this._head;
        let counterOfPos = 0;
        while (currentNode !== null) {
            if (counterOfPos === index) {
                return currentNode.data;
            } else {
                currentNode = currentNode.next;
                counterOfPos++;
            }
        }
    }

    insertAt(index, data) {
        let counterOfPos = 0;
        let currentElement = this._head;

        let newNode = new Node(data);
        if (index !== 0) {
            while (counterOfPos !== index - 1) {
                currentElement = currentElement.next;
                counterOfPos++;
            }

            newNode.prev = currentElement;
            newNode.next = currentElement.next;
            currentElement.next = newNode;
            currentElement.next.prev = newNode;
        } else {
            if (this.length > 1) {
                this._head.prev = newNode;
                newNode.next = this._head;
                this._head = newNode;
            } else {
                this._tail.next = newNode;
                this._tail = newNode;
            }
        }
        this.length++;
        return this;
    }

    isEmpty() {
        return (this.length === 0) ? true : false;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let currentElement = this._head;
        let tempElement;
        let counterOfPos = 0;
        if (index === 0) {
            this._head = this._head.next;
            this._head.prev = null;
        }
        while (counterOfPos !== index - 1) {
            currentElement = currentElement.next;
            counterOfPos++;
        }

        tempElement = currentElement.next;
        currentElement.next = tempElement.next;
        tempElement.next.prev = currentElement;
        tempElement = null;

        this.length--;
        return this;
    }

    reverse() {
        if (!this._head) return undefined;

        let currentElement = this._head;
        this._head = this._tail;
        this._tail = currentElement;

        let counterOfPos = 0;

        while (counterOfPos < this.length) {
            let prevEl = currentElement.prev;
            let nextEl = currentElement.next;
            currentElement.prev = nextEl;
            currentElement.next = prevEl;
            // prevEl = currentElement;
            currentElement = nextEl;
            counterOfPos++;
        }


        return this;
    }

    indexOf(data) {
        let currentElement = this._head;
        let counterOfPos = 0;
        while (currentElement) {
            if (currentElement.data == data) {
                return counterOfPos;
            }
            currentElement = currentElement.next;
            counterOfPos++;
        }
        return -1;
    }
}

module.exports = LinkedList;