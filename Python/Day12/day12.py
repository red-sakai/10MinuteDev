# Quick Sort is a popular sorting algorithm that uses a divide-and-conquer approach.
# The main idea is to pick a 'pivot' element from the list, then partition the other elements
# into two groups: those less than the pivot and those greater than the pivot.
# The process is repeated recursively for each group.

# Steps:
# 1. Choose a pivot element from the list.
# 2. Rearrange the list so that all elements less than the pivot come before it,
#    and all elements greater come after it. This is called 'partitioning'.
# 3. Recursively apply the above steps to the sublists of elements less than and greater than the pivot.

def quick_sort(arr):
    # Base case: arrays with 0 or 1 element are already sorted
    if len(arr) <= 1:
        return arr

    # Step 1: Choose a pivot (here, we pick the last element)
    pivot = arr[-1]

    # Step 2: Partition the array into two lists
    less = []    # Elements less than the pivot
    greater = [] # Elements greater than or equal to the pivot

    for x in arr[:-1]:  # Exclude the pivot itself
        if x < pivot:
            less.append(x)
        else:
            greater.append(x)

    # Step 3: Recursively sort the sublists and combine
    return quick_sort(less) + [pivot] + quick_sort(greater)

# Example usage:
if __name__ == "__main__":
    sample = [7, 2, 1, 6, 8, 5, 3, 4]
    print("Original list:", sample)
    sorted_list = quick_sort(sample)
    print("Sorted list:", sorted_list)

# Try changing the 'sample' list and running the code to see how Quick Sort works!
