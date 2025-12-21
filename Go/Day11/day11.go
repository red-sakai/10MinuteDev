package main

import "fmt"

func main() {
	// make([]T, len, cap)
	nums := make([]int, 0, 3)
	fmt.Printf("start: len=%d cap=%d nums=%v\n", len(nums), cap(nums), nums)

	// append single values
	for i := 1; i <= 5; i++ {
		nums = append(nums, i)
		fmt.Printf("after append %d: len=%d cap=%d nums=%v\n", i, len(nums), cap(nums), nums)
	}

	// append another slice
	more := make([]int, 2) // len=2, cap=2 (zero-initialized)
	more[0], more[1] = 10, 20
	nums = append(nums, more...)
	fmt.Printf("after append slice: len=%d cap=%d nums=%v\n", len(nums), cap(nums), nums)
}
