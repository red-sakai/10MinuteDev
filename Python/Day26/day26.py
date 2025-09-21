import heapq

def top_k_largest(nums, k):
    return heapq.nlargest(k, nums)

def top_k_smallest(nums, k):
    return heapq.nsmallest(k, nums)

def min_heap_example(nums):
    heapq.heapify(nums)
    smallest = heapq.heappop(nums)
    heapq.heappush(nums, 0)
    return nums, smallest

def max_heap_example(nums):
    max_heap = [-n for n in nums]
    heapq.heapify(max_heap)
    largest = -heapq.heappop(max_heap)
    heapq.heappush(max_heap, -100)
    return [-n for n in max_heap], largest

if __name__ == "__main__":
    nums = [5, 1, 8, 3, 7, 2]
    print("Top 3 largest:", top_k_largest(nums, 3))   # [8, 7, 5]
    print("Top 2 smallest:", top_k_smallest(nums, 2)) # [1, 2]
    print("Min heap:", min_heap_example(nums.copy()))
    print("Max heap:", max_heap_example(nums.copy()))