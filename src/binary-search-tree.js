//const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(){
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const node = this.rootNode;
    if (node === null){
      this.rootNode = new Node(data);
      return;
    } else {
      const searchTree = function(node){
        if(data < node.data){
          if(node.left === null){
            node.left = new Node(data);
            return;
          } else if(node.left !== null){
            searchTree(node.left)
          }
        } else if(data > node.data){
          if(node.right === null){
            node.right = new Node(data);
            return;
          } else if(node.right !== null){
            searchTree(node.right)
          }
        } else{
          return null;
        }
      }

      return searchTree(node);
    }


  }

  has(data) {
    let current = this.rootNode;
    while(current !== null){
      if (current.data === data){
        return true;
      }else if(data < current.data){
        current = current.left
      }else if(data > current.data){
        current = current.right;
      }
    }
    return false;

  }

  find(data) {
    let current = this.rootNode;
    while(current !== null){
      if (current.data === data){
        return current;
      }else if(data < current.data){
        current = current.left
      }else if(data > current.data){
        current = current.right;
      }
    }
    return null;
  }

  remove(data) {
    const minRight = (node) => {
      let current = node;
      while(current.left !== null){
        current = current.left;
      }
      return current;
    }

    function removeNode(node, value){
      if (node === null){
        return null
      }

      if (value === node.data){
        if(node.left === null && node.right === null){
          return null;
        }

        if(node.left === null){
          return node.right;
        }

        if(node.right === null){
          return node.left;
        }

        const minValue = minRight(node.right);
        node.data = minValue.data;
        node.right = removeNode(node.right, minValue.data);
        return node;
      } else if (value < node.data){
        node.left = removeNode(node.left, value);
        return node;
      } else{
        node.right = removeNode(node.right, value);
        return node;
      }
    };

    this.rootNode = removeNode(this.rootNode, data);
  }


  min() {
    let current = this.rootNode;
    while (current.left !== null){
      current = current.left;
    }

    return current.data;
  }

  max() {
    let current = this.rootNode;
    while (current.right !== null){
      current = current.right;
    }

    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};