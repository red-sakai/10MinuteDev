class TreeNode:
    def __init__(self, name, is_file=False):
        self.name = name
        self.is_file = is_file
        self.children = []

    def add_child(self, child):
        self.children.append(child)

    def display(self, indent=0):
        prefix = '    ' * indent + ('- ' if self.is_file else '+ ')
        print(f"{prefix}{self.name}")
        for child in self.children:
            child.display(indent + 1)

if __name__ == "__main__":
    root = TreeNode("root")
    folder1 = TreeNode("folder1")
    folder2 = TreeNode("folder2")
    file1 = TreeNode("file1.txt", is_file=True)
    file2 = TreeNode("file2.txt", is_file=True)
    file3 = TreeNode("file3.txt", is_file=True)
    folder1.add_child(file1)
    folder1.add_child(file2)
    folder2.add_child(file3)
    root.add_child(folder1)
    root.add_child(folder2)
    print("Directory structure:")
    root.display()