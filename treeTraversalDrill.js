'use strict';

class BinarySearchTree {

  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {

    /**
		 * if tree empty, insert as root
		 */

    if(this.key === null) {
      this.key = key;
      this.value = value;
    }

    /**
		 *	Else if tree isn't empty, starting from root i.e. this.key...
		 *
		 *	If the new key is less than current nodes key, then new node
		 *	will be in the left branch.
		 */
    else if(key < this.key) {
      /**
			 * if the current nodes left child is empty
			 * instantiate and add the value.
			 */
      if(this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      /**
			 * If this node has a left child, then recursively call insert.
			 */
      else {
        this.left.insert(key,value);
      }
    }
    /**
		 * Else the new key must be greater than the current key...
		 */
    else {
      /**
			 * If the current nodes right child is empty
			 * instantiate and add the value.
			 */
      if(this.right === null) {
        this.right =  new BinarySearchTree(key, value, this);
      }
      /**
			 * If the node has a right child, then recursively call insert
			 */
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    /**
		 * base case: if the key is found, return the value
		 */
    if(this.key === key) {
      console.log('Key Found');
      //return { key: this.key, value: this.value };
      return this;
    }
    /**
		 * if the key is less than the root and
		 * if there is an existing left child,
		 * then follow the left child
		 */
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    /**
		 * if the key is greater than the root and
		 * if there is an existing right child,
		 * then follow the right child
		 */
    else if(key > this.key && this.right) {
      return this.right.find(key);
    }
    /**
		 * The item is not in the search tree
		 */
    console.log('Key Not Found');
    return null;
  }

  remove(key) {
    /** Traverse the tree to find the right node with the 'key' */

    /** If we find the node... */
    if(this.key === key) {
      /** Node has two children... */
      if(this.left && this.right) {
        const replacement = this.right._findMin();
        this.key = replacement.key;
        this.value = replacement.value;
        replacement.remove(replacement.key);
      }
      /** Node has only left... */
      else if(this.left) {
        this._replaceWith(this.left);
      }
      /** Node has only right... */
      else if(this.right) {
        this._replaceWith(this.right);
      }
      /** Node has no children */
      else {
        this._replaceWith(null);
      }
    } else {
      if (key < this.key && this.left) {
        this.left.remove(key);
      }
      if(key > this.key && this.right) {
        this.right.remove(key);
      }
    }
    return null;
  }

  _replaceWith(node) {
    if(this.parent) {
      if(this === this.parent.left) {
        this.parent.left = node;
      }
      else if(this === this.parent.right) {
        this.parent.right = node;
      }
      if(node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin(){
    if(!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _BrokenInsert(key, value) { /** Only for testing the isBST */

    /**
		 * if tree empty, insert as root
		 */

    if(this.key === null) {
      this.key = key;
      this.value = value;
    }

    /**
		 *	Else if tree isn't empty, starting from root i.e. this.key...
		 *
		 *	If the new key is less than current nodes key, then new node
		 *	will be in the left branch.
		 */
    else if(key > this.key) {
      /**
			 * if the current nodes left child is empty
			 * instantiate and add the value.
			 */
      if(this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      /**
			 * If this node has a left child, then recursively call insert.
			 */
      else {
        this.left.insert(key,value);
      }
    }
    /**
		 * Else the new key must be greater than the current key...
		 */
    else {
      /**
			 * If the current nodes right child is empty
			 * instantiate and add the value.
			 */
      if(this.right === null) {
        this.right =  new BinarySearchTree(key, value, this);
      }
      /**
			 * If the node has a right child, then recursively call insert
			 */
      else {
        this.right.insert(key, value);
      }
    }
  }
}


let array = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22];
let BST = new BinarySearchTree();
BST.insert(25);
BST.insert(15);
BST.insert(50);
BST.insert(10);
BST.insert(24);
BST.insert(35);
BST.insert(70);
BST.insert(4);
BST.insert(12);
BST.insert(18);
BST.insert(66);
BST.insert(90);
BST.insert(22);
//console.log(BST);


const InOrderTraversal = (root) => {
  if(root === null) {
    return;
  }  
  InOrderTraversal(root.left);
  console.log(root.key);
  InOrderTraversal(root.right);  
};

const preOrderTraversal = (root) => {
  if(root === null) {
    return;
  }
  console.log(root.key);
  preOrderTraversal(root.left);
  preOrderTraversal(root.right);
};
const postOrderTraversal = (root) => {
  if(root === null) {
    return;
  }
  
  if(root.left){ 
    postOrderTraversal(root.left);
  }
  if(root.right){
    postOrderTraversal(root.right);
  }
  console.log(root.key);
};

// preOrderTraversal(BST);
// postOrderTraversal(BST);
// InOrderTraversal(BST);


let profits = [ 89, 303, 425, 32, 255, 70, 511, 42, 25, 24, 53, 655, 658, 50, 13, 440, 48, 
  32, 26, 112 , 14, 633, 445, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 698, 73, 28, 1116, 46,
  187, 28, 65, 638, 67, 316, 85, 63, 23, 69, 64, 91,77 , 49 , 70, 81, 27, 27, 82, 6 , 88, 3 , 7 ,
  46, 113, 11, 464, 76, 31, 26, 638, 28, 13, 17, 69, 90, 1 , 6 , 7 ,
  64, 43, 9 , 473, 80, 198, 46, 427, 22, 87, 49, 83, 106 , 139, 42, 451, 544, 84, 34, 53, 78, 40, 414, 5 ];

function getMax(array){
  let currentMax = 0;

  for(let i = 0; i <array.length; i +=1){
    for(let j = i + 1; j < array.length; j += 1){
      if(array[j] - array[i] > currentMax){
        currentMax = array[j]-array[i];
      }
    }
  }
  console.log(currentMax);
}
getMax(profits);