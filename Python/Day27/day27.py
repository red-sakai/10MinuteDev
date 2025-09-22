def max_sum_subarray(nums):
    # Kadane's algorithm: Returns the maximum sum of a contiguous subarray.
    max_sum = float('-inf')
    curr_sum = 0
    for num in nums:
        curr_sum = max(num, curr_sum + num)
        max_sum = max(max_sum, curr_sum)
    return max_sum

def longest_substring_no_repeat(s):
    # Returns the length of the longest substring without repeating characters.
    seen = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in seen and seen[char] >= left:
            left = seen[char] + 1
        seen[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len

if __name__ == "__main__":
    print("Max sum subarray:", max_sum_subarray([-2,1,-3,4,-1,2,1,-5,4]))  # 6
    print("Longest substring w/o repeat:", longest_substring_no_repeat("abcabcbb"))  # 3