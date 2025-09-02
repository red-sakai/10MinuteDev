class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def insert(self, data):
        """Insert a new node at the end of the list."""
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = new_node

    def delete(self, data):
        """Delete the first node with the given data."""
        curr = self.head
        prev = None
        while curr:
            if curr.data == data:
                if prev:
                    prev.next = curr.next
                else:
                    self.head = curr.next
                return True
            prev = curr
            curr = curr.next
        return False

    def search(self, data):
        """Search for a node with the given data. Returns True if found, else False."""
        curr = self.head
        while curr:
            if curr.data == data:
                return True
            curr = curr.next
        return False

    def __str__(self):
        """Return a string representation of the list."""
        result = []
        curr = self.head
        while curr:
            result.append(str(curr.data))
            curr = curr.next
        return " -> ".join(result)

sll = SinglyLinkedList()
sll.insert(1)
sll.insert(2)
sll.insert(3)
print(sll)  # 1 -> 2 -> 3
sll.delete(2)
print(sll)  # 1 -> 3
print(sll.search(3))  # True
print(sll.search(4))  # False
