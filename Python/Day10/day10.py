# Sorting is the process of arranging items in a specific order, usually ascending to descending

# Bubble Sort - it works by repeatedly stepping through the list, comparing each pair of adjacent items,
# and swapping them if they are in the wrong order. This process is repeated until the list is sorted

"""
How it works:

Compare the first two elements. If the first is greater than the second, swap them.
Move to the next pair and repeat.
Continue until the end of the list. The largest element "bubbles up" to the end.
Repeat the process for the rest of the list (excluding the last sorted elements).
Example:

List: [5, 3, 8, 4, 2]
After 1st pass: [3, 5, 4, 2, 8]
After 2nd pass: [3, 4, 2, 5, 8]
After 3rd pass: [3, 2, 4, 5, 8]
After 4th pass: [2, 3, 4, 5, 8]
"""

# Selection Sort - works by repeatedly finding the minimum element from the unsorted part and putting
# it at the beginning

"""
How it works:

Find the smallest element in the list.
Swap it with the first element.
Find the next smallest element and swap it with the second element.
Repeat until the list is sorted.
Example:

List: [5, 3, 8, 4, 2]
Find min (2), swap with 5: [2, 3, 8, 4, 5]
Find next min (3), already in place: [2, 3, 8, 4, 5]
Find next min (4), swap with 8: [2, 3, 4, 8, 5]
Find next min (5), swap with 8: [2, 3, 4, 5, 8]
"""

def bubble_sort(numbers):
    length = len(numbers)
    for pass_num in range(length):
        for index in range(length - pass_num - 1):
            if numbers[index] > numbers[index + 1]:
                # swap if the current number is bigger than the next one
                numbers[index], numbers[index + 1] = numbers[index + 1], numbers[index]

def selection_sort(numbers):
    length = len(numbers)
    for start_index in range(length):
        min_index = start_index
        for current_index in range(start_index + 1, length):
            if numbers[current_index] < numbers[min_index]:
                min_index = current_index
        # swap the smallest found with the first unsorted position
        numbers[start_index], numbers[min_index] = numbers[min_index], numbers[start_index]

if __name__ == "__main__":
    example_list1 = [3, 1, 2]
    example_list2 = [3, 1, 2]

    print("Original for Bubble Sort:", example_list1)
    bubble_sort(example_list1)
    print("Sorted with Bubble Sort:", example_list1)

    print("Original for Selection Sort:", example_list2)
    selection_sort(example_list2)
    print("Sorted with Selection Sort:", example_list2)

# Selection Sort is usually preferred over bubble sort for smaller lists