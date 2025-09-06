class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def inorder(root):
    if root:
        inorder(root.left)
        print(root.value, end=' ')
        inorder(root.right)

def preorder(root):
    if root:
        print(root.value, end=' ')
        preorder(root.left)
        preorder(root.right)

def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.value, end=' ')

def build_sample_tree():
    #      1
    #     / \
    #    2   3
    #   / \   \
    #  4   5   6
    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.right = Node(6)
    return root

if __name__ == "__main__":
    root = build_sample_tree()
    print("Inorder traversal:")
    inorder(root)
    print("\nPreorder traversal:")
    preorder(root)
    print("\nPostorder traversal:")
    postorder(root)
    print()
