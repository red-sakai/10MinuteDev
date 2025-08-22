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

if __name__ == "__main__":
    example = [5, 6, 1, 2, 7, 9, 10, 23, 3, 4]
    sorted_list = number_one(example)
    print(sorted_list)

    names = ["banana", "apple", "cherry"]
    print(number_two(names))

    people = [("Jhered", 19), ("Shaikah", 18)]
    print(number_three(people))