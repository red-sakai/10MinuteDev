def find_duplicates(nums):
    seen = set()
    duplicates = set()
    for num in nums:
        if num in seen:
            duplicates.add(num)
        else:
            seen.add(num)
    return list(duplicates)

def are_anagrams(s1, s2):
    from collections import Counter
    return Counter(s1) == Counter(s2)

def first_unique(nums):
    from collections import Counter
    count = Counter(nums)
    for num in nums:
        if count[num] == 1:
            return num
    return None

if __name__ == "__main__":
    print(find_duplicates([1,2,3,2,4,5,1]))  # [1, 2]
    print(are_anagrams("listen", "silent"))  # True
    print(first_unique([1,2,2,3,3,4]))       # 1