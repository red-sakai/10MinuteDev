def quick_sort(arr):
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

    return quick_sort(less) + [pivot] + quick_sort(greater)

if __name__ == "__main__":
    leaderboard = [97, 67, 93, 100, 73, 86, 17, 39, 58, 69]
    print(quick_sort(leaderboard))