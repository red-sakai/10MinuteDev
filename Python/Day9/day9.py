# Linear Search - checks each element in a list one by one until it finds the target or reaches the end
# use only when the list is unsorted or small

def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # found, return index
    return -1  # not found

# Binary Search - works on sorted lists. It repeatedly divides the list in half to find the target
# use when the list is sorted

# iterative example
def binary_search_iterative(arr, target):
    left = 0
    right = len(arr) - 1
    while left <= right:
        mid = (left + right) // 2  # Find the middle index
        if arr[mid] == target:
            return mid  # Found the target, return its index
        elif arr[mid] < target:
            left = mid + 1  # Search the right half
        else:
            right = mid - 1  # Search the left half
    return -1  # Target not found

# recursive example
def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1  # Target not found
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid  # Found the target
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)  # Search right half
    else:
        return binary_search_recursive(arr, target, left, mid - 1)  # Search left half
    
numbers = [2, 4, 6, 8, 10]
target = 8

print("Iterative:", binary_search_iterative(numbers, target))
print("Recursive:", binary_search_recursive(numbers, target, 0, len(numbers) - 1))