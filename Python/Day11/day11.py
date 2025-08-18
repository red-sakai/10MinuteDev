"""
Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. 
It works similarly to how you might sort playing cards in your hands:

Start with the second element (the first is considered sorted).
Compare it to the elements before it and insert it into the correct position.
Repeat for all elements.
"""

# Insertion Sort
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # Move elements greater than key to one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# Example usage:
arr = [5, 2, 9, 1, 5, 6]
print("Insertion Sort:", insertion_sort(arr))

"""
Time Complexity:

Best: O(n) (already sorted)
Average/Worst: O(n²)
"""

"""
Recursive Merge Sort
Merge Sort is a divide-and-conquer algorithm:

Divide the array into halves recursively until each subarray has one element.
Merge the subarrays back together in sorted order.
"""

# Recursive Merge Sort
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    # Merge two sorted lists
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Example usage:
arr = [5, 2, 9, 1, 5, 6]
print("Merge Sort:", merge_sort(arr))

"""
Time Complexity:

Best/Average/Worst: O(n log n)
"""

"""
Summary:

Insertion Sort is simple and efficient for small or nearly sorted arrays.
Merge Sort is more efficient for large datasets and guarantees O(n log n) performance.
Merge Sort uses recursion and extra space for merging, while Insertion Sort sorts in place.
"""