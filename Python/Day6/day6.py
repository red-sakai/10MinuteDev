# Big O notation is a powerful tool used to describe the time complexity or space complexity of algorithms
# Big O is a way to express the upper bound of an algorithm's time or space complexity

# ===============================
# SIMPLE BIG O EXAMPLES FOR BEGINNERS
# ===============================

# O(1) - Constant time: Always takes same time, no matter how big the input
def get_last_item(my_list):
    return my_list[-1]  # Getting last item is always instant, whether list has 5 or 5000 items

def add_two_numbers(a, b):
    return a + b  # Adding two numbers always takes same time

# O(n) - Linear time: Time increases directly with input size
def count_items(my_list):
    count = 0
    for item in my_list:  # If list has 10 items, loop runs 10 times
        count += 1        # If list has 100 items, loop runs 100 times
    return count

def print_all_items(my_list):
    for item in my_list:  # Must visit every single item once
        print(item)

# O(n²) - Quadratic time: Time increases with square of input size
def print_all_pairs(my_list):
    for item1 in my_list:      # Outer loop runs n times
        for item2 in my_list:  # Inner loop runs n times for each outer loop
            print(item1, item2)  # Total: n × n = n² prints

def find_duplicates_slow(my_list):
    duplicates = []
    for i in range(len(my_list)):           # Loop through each item
        for j in range(i + 1, len(my_list)): # Compare with every other item
            if my_list[i] == my_list[j]:
                duplicates.append(my_list[i])
    return duplicates

# ===============================
# SPACE COMPLEXITY - HOW MUCH MEMORY WE USE
# ===============================

# O(1) space - Uses same memory no matter input size
def find_biggest_number(numbers):
    biggest = numbers[0]  # Only store one extra number
    for num in numbers:
        if num > biggest:
            biggest = num  # Still only storing one number
    return biggest

# O(n) space - Memory grows with input size
def make_copy(my_list):
    new_list = []
    for item in my_list:
        new_list.append(item)  # New list grows same size as original
    return new_list

# ===============================
# SUPER EASY PRACTICE PROBLEMS
# ===============================

# Problem 1: What's the Big O?
def say_hello_once():
    print("Hello!")

# Problem 2: What's the Big O?
def say_hello_to_each_friend(friends):
    for friend in friends:
        print(f"Hello {friend}!")

# Problem 3: What's the Big O?
def say_hello_to_all_pairs(friends):
    for friend1 in friends:
        for friend2 in friends:
            print(f"{friend1} says hello to {friend2}")

# Problem 4: What's the Big O?
def check_first_item_equals_5(numbers):
    if numbers[0] == 5:
        return True
    return False

# Problem 5: What's the Big O?
def find_number_5(numbers):
    for num in numbers:
        if num == 5:
            return True
    return False

# ===============================
# EASY ANSWERS
# ===============================

# Problem 1: O(1) - Always prints once, doesn't matter about input
# Problem 2: O(n) - Prints once for each friend
# Problem 3: O(n²) - For each friend, prints to every friend
# Problem 4: O(1) - Only checks first item, always same time
# Problem 5: O(n) - Might need to check every number to find 5

# ===============================
# SIMPLE RULES TO REMEMBER
# ===============================

# 1. No loops = O(1)
# 2. One loop = O(n)  
# 3. Loop inside a loop = O(n²)
# 4. If you create a new list same size as input = O(n) space
# 5. If you only use a few variables = O(1) space

# ===============================
# TEST YOUR UNDERSTANDING
# ===============================

# Try to figure out the Big O for these simple functions:

def get_middle_item(my_list):
    middle_index = len(my_list) // 2
    return my_list[middle_index]

def double_all_numbers(numbers):
    doubled = []
    for num in numbers:
        doubled.append(num * 2)
    return doubled

# This one is tricky - it's NOT O(n²)!
def are_any_numbers_equal(list1, list2):
    for num1 in list1:        # This loop runs len(list1) times
        for num2 in list2:    # This loop runs len(list2) times
            if num1 == num2:
                return True
    return False

# This one IS O(n²) because both loops use the SAME input
def compare_all_pairs_same_list(my_list):
    for num1 in my_list:      # Loop runs n times
        for num2 in my_list:  # Loop runs n times for each outer loop
            print(f"{num1} vs {num2}")  # Total: n × n = n²

# ===============================
# UNDERSTANDING THE DIFFERENCE
# ===============================

# O(n²) - When SAME input is used for both loops
def example_n_squared(numbers):
    for i in numbers:         # n times
        for j in numbers:     # n times each = n × n = n²
            print(i, j)

# O(n × m) - When DIFFERENT inputs are used
def example_n_times_m(list_a, list_b):
    for item_a in list_a:     # n times (where n = len(list_a))
        for item_b in list_b: # m times each (where m = len(list_b))
            print(item_a, item_b)  # Total: n × m operations

# ===============================
# YOU'RE RIGHT ABOUT COMMON ONES!
# ===============================

# The main Big O notations beginners learn are:
# O(1) - Constant
# O(log n) - Logarithmic  
# O(n) - Linear
# O(n²) - Quadratic

# But sometimes we have special cases like:
# O(n × m) - when we have two different inputs of different sizes
# O(n³) - three nested loops with same input
# O(2^n) - exponential (very rare in basic problems)

# Answers:
# get_middle_item: O(1) time - just accessing one item
# double_all_numbers: O(n) time, O(n) space - one loop, creates new list  
# are_any_numbers_equal: O(n × m) time - two DIFFERENT inputs, not same input twice

# ===============================
# SIMPLE RULE FOR BEGINNERS
# ===============================

# If you see nested loops:
# - Same input used twice = O(n²)
# - Different inputs = O(n × m) 
# - But for learning purposes, you can think of O(n × m) as "quadratic-like"
