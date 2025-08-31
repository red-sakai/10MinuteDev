# Stack - is a linear data structure that follows LIFO principle (Last In First Out)

# basic operations in a stack:
# 1. Push: adds new element on the stack
# 2. Pop: removes and returns the top element from the stack
# 3. Peek: returns the top (last) element on the stack
# 4. isEmpty: checks if the stack is empty
# 5. Size: finds the number of elements in the stack

# stacks can be implemented by using arrays or linked lists

stack = []

# Push
stack.append('A')
stack.append('B')
stack.append('C')
print("Stack: ", stack)

# Peek
topElement = stack[-1]
print("Peek: ", topElement)

# Pop
poppedElement = stack.pop()
print("Pop: ", poppedElement)

# Stack after Pop
print("Stack after Pop: ", stack)

# isEmpty
isEmpty = not bool(stack)
print("isEmpty: ", isEmpty)

# Size
print("Size: ",len(stack))