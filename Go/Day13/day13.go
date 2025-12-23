package main

import (
	"errors"
	"fmt"
)

// sumAndDiff returns two values: sum and difference.
func sumAndDiff(a, b int) (int, int) {
	return a + b, a - b
}

// minMax uses named return values.
func minMax(a, b int) (min int, max int) {
	if a < b {
		min, max = a, b
		return
	}
	min, max = b, a
	return
}

// divide returns a value and an error (common Go style).
func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}

func main() {
	sum, diff := sumAndDiff(10, 3)
	fmt.Println("sum:", sum, "diff:", diff)

	lo, hi := minMax(8, 2)
	fmt.Println("min:", lo, "max:", hi)

	q, err := divide(10, 0)
	if err != nil {
		fmt.Println("divide error:", err)
	} else {
		fmt.Println("quotient:", q)
	}

	// Ignore a return value with "_"
	onlySum, _ := sumAndDiff(5, 1)
	fmt.Println("onlySum:", onlySum)
}
