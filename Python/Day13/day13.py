# Sorting Practice Questions

# 1. Given a list of integers, sort them in ascending order.
# 2. Given a list of strings, sort them in alphabetical order.
# 3. Given a list of tuples (name, age), sort the list by age.
# 4. Given a list of numbers, find the k largest elements.
# 5. Given a string, return its characters sorted alphabetically.
# 6. Given a list of dictionaries with a 'score' key, sort the list by score descending.
# 7. Given a list of words, sort them by their length.
# 8. Given a list of numbers, sort them in descending order without using the built-in sort().
# 9. Given two sorted lists, merge them into a single sorted list.
# 10. Given a list of numbers, find the k smallest elements.

def number_one(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[-1]

    less = []
    greater = []

    for x in arr[:-1]:
        if x < pivot:
            less.append(x)
        else:
            greater.append(x)

    return number_one(less) + [pivot] + number_one(greater)

def number_two(strings):
    return sorted(strings)

def number_three(people):
    return sorted(people, key=lambda x: x[1])

import heapq

def number_four(arr, k):
    return heapq.nlargest(k, arr)

def number_five(s):
    return ''.join(sorted(s))

def number_six(dicts):
    return sorted(dicts, key=lambda d: d['score'], reverse=True)

def number_seven(words):
    return sorted(words, key=len)

def number_eight(arr):
    length = len(arr)
    result = arr[:]
    for current_index in range(length):
        max_index = current_index
        for compare_index in range(current_index + 1, length):
            if result[compare_index] > result[max_index]:
                max_index = compare_index
        result[current_index], result[max_index] = result[max_index], result[current_index]
    return result

def number_nine(sorted_list1, sorted_list2):
    index1, index2 = 0, 0
    merged = []
    while index1 < len(sorted_list1) and index2 < len(sorted_list2):
        if sorted_list1[index1] < sorted_list2[index2]:
            merged.append(sorted_list1[index1])
            index1 += 1
        else:
            merged.append(sorted_list2[index2])
            index2 += 1
    merged.extend(sorted_list1[index1:])
    merged.extend(sorted_list2[index2:])
    return merged

def number_ten(arr, k):
    return heapq.nsmallest(k, arr)

if __name__ == "__main__":
    example = [5, 6, 1, 2, 7, 9, 10, 23, 3, 4]
    sorted_list = number_one(example)
    print(sorted_list)

    names = ["banana", "apple", "cherry"]
    print(number_two(names))

    people = [("Jhered", 19), ("Shaikah", 18)]
    print(number_three(people))

    arr = [5, 1, 9, 3, 7]
    print(number_four(arr, 2))

    s = "sorting"
    print(number_five(s))

    dicts = [{'name': 'Alice', 'score': 90}, {'name': 'Bob', 'score': 95}]
    print(number_six(dicts))

    words = ["banana", "apple", "kiwi", "fig"]
    print(number_seven(words))

    arr2 = [5, 1, 9, 3, 7]
    print(number_eight(arr2))

    sorted1 = [1, 3, 5, 7]
    sorted2 = [2, 4, 6, 8]
    print(number_nine(sorted1, sorted2))

    arr3 = [5, 1, 9, 3, 7]
    print(number_ten(arr3, 2))