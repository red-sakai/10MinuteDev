def pair_sum(nums, target):
    lookup = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in lookup:
            return [lookup[complement], i]
        lookup[num] = i
    return []

def reverse_string_in_place(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1

# Example usage:
if __name__ == "__main__":
    nums = [2, 7, 11, 15]
    target = 9
    print("Pair sum indices:", pair_sum(nums, target))  # [0, 1]

    # Reverse string in-place example
    chars = ['h', 'e', 'l', 'l', 'o']
    reverse_string_in_place(chars)
    print("Reversed string:", chars)  # ['o', 'l', 'l', 'e', 'h']
