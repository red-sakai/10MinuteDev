class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, value):
        def _insert(node, value):
            if not node:
                return Node(value)
            if value < node.value:
                node.left = _insert(node.left, value)
            elif value > node.value:
                node.right = _insert(node.right, value)
            return node
        self.root = _insert(self.root, value)

    def search(self, value):
        def _search(node, value):
            if not node:
                return False
            if value == node.value:
                return True
            elif value < node.value:
                return _search(node.left, value)
            else:
                return _search(node.right, value)
        return _search(self.root, value)

    def delete(self, value):
        def _delete(node, value):
            if not node:
                return None
            if value < node.value:
                node.left = _delete(node.left, value)
            elif value > node.value:
                node.right = _delete(node.right, value)
            else:
                if not node.left:
                    return node.right
                if not node.right:
                    return node.left
                temp = node.right
                while temp.left:
                    temp = temp.left
                node.value = temp.value
                node.right = _delete(node.right, temp.value)
            return node
        self.root = _delete(self.root, value)

    def inorder(self):
        def _inorder(node):
            if node:
                _inorder(node.left)
                print(node.value, end=' ')
                _inorder(node.right)
        _inorder(self.root)

if __name__ == "__main__":
    bst = BST()
    for v in [50, 30, 70, 20, 40, 60, 80]:
        bst.insert(v)
    print("Inorder traversal:")
    bst.inorder()
    print("\nSearch 40:", bst.search(40))
    print("Search 100:", bst.search(100))
    bst.delete(20)
    print("After deleting 20:")
    bst.inorder()
    print()