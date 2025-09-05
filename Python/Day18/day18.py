class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class LinkedList:
    def __init__(self, doubly=False, circular=False):
        self.head = None
        self.tail = None
        self.doubly = doubly
        self.circular = circular

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            self.tail = new_node
            if self.circular:
                self.head.next = self.head
                if self.doubly:
                    self.head.prev = self.head
            return
        if self.circular:
            new_node.next = self.head
            self.tail.next = new_node
            if self.doubly:
                new_node.prev = self.tail
                self.head.prev = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            if self.doubly:
                new_node.prev = self.tail
            self.tail = new_node

    def delete(self, data):
        if not self.head:
            return
        curr = self.head
        prev = None
        while True:
            if curr.data == data:
                if prev:
                    prev.next = curr.next
                    if self.doubly and curr.next:
                        curr.next.prev = prev
                else:
                    self.head = curr.next
                    if self.circular and self.head:
                        self.tail.next = self.head
                    if self.doubly and self.head:
                        self.head.prev = self.tail if self.circular else None
                if curr == self.tail:
                    if prev:
                        self.tail = prev
                        if self.circular:
                            self.tail.next = self.head
                            if self.doubly:
                                self.head.prev = self.tail
                    else:
                        self.tail = None
                break
            prev = curr
            curr = curr.next
            if self.circular and curr == self.head:
                break

    def traverse(self):
        result = []
        curr = self.head
        if not curr:
            return result
        while True:
            result.append(curr.data)
            curr = curr.next
            if not curr or (self.circular and curr == self.head):
                break
        return result

# singly = LinkedList()
# doubly = LinkedList(doubly=True)
# circular = LinkedList(circular=True)
# doubly_circular = LinkedList(doubly=True, circular=True)
