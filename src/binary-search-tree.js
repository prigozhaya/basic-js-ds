const { NotImplementedError } = require("../extensions/index.js");
const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
  constructor() {
    this.base = null;
  }

  root() {
    if (!this.base) {
      return null;
    }
    return this.base;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.base) {
      this.base = newNode;
      return;
    } else {
      let currNode = this.base;

      while (currNode) {
        if (newNode.data < currNode.data) {
          if (currNode.left === null) {
            currNode.left = newNode;
            return;
          }
          currNode = currNode.left;
        } else {
          if (currNode.right === null) {
            currNode.right = newNode;
            return;
          }
          currNode = currNode.right;
        }
      }
    }
  }

  has(data) {
    return !!this.find(data)
  }

  find(data) {
    if(!this.base){
      return null
  }
  let currNode = this.base;
  while (currNode) {
      if (data < currNode.data) {
        if (currNode.left === null) {
          return null;
        }
        currNode = currNode.left;
      } else if(data > currNode.data){
        if (currNode.right === null) {
          return null;
        }
        currNode = currNode.right;
      }else if(data===currNode.data){
          return currNode
      }
    }
  }

  findPerent(data) {
    if (!this.base) {
      return null;
    }

    let currNode = this.base;
    let prevNode = null;
    while (currNode) {
      if (data < currNode.data) {
        if (currNode.left === null) {
          return null;
        }
        prevNode = currNode;
        currNode = currNode.left;
      } else if (data > currNode.data) {
        if (currNode.right === null) {
          return null;
        }
        prevNode = currNode;
        currNode = currNode.right;
      } else if (data === currNode.data) {
        return prevNode;
      }
    }
  }

  remove(data) {
    if (!this.base) {
      return null;
    }
    if (!this.find(data).data) {
      return null;
    }

    let perent = this.findPerent(data);
    let delNode = this.find(data);
    
    if (delNode.right && delNode.left) {
      let prev = perent;
      let currNode = delNode.right;
      while (currNode.left) {
        prev = currNode;
        currNode = currNode.left;
      }
      if(prev !== perent){
        prev.left = currNode.right;
      }else{
        if (prev.right.data === delNode.data) {
          prev.right = currNode;
        }else if(prev.left.data === delNode.data){
          prev.left = currNode;
        }
      }
      currNode.left = delNode.left;
      currNode.right = delNode.right;

      if(!perent){
        this.base=currNode
      }else if (perent.right.data === delNode.data) {
        perent.right = currNode;
      } else if(perent.left.data === delNode.data){
        perent.left = currNode;
      }
    }

    if (delNode.right && !delNode.left){
      if (perent.right.data === delNode.data) {
        perent.right = delNode.right;
      } 
    }else if (!delNode.right && delNode.left) {
        perent.left = delNode.left;
      
    }

    if (!delNode.right && !delNode.left) {
      if (perent.right.data === delNode.data) {
        perent.right = null;
      } else {
        perent.left = null;
      }
    }
  }

  min() {
    if(!this.base){
      return null
  }
  let currNode = this.base;
  while (currNode.left) {
        currNode = currNode.left;
  }   
  return currNode.data
  }

  max() {
    if(!this.base){
      return null
  }
  let currNode = this.base;
  while (currNode.right) {
        currNode = currNode.right;
  }   
  return currNode.data
  }
}

module.exports = {
  BinarySearchTree,
};
