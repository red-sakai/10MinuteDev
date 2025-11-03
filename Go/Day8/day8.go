package main

import (
	"fmt"
)

func main() {
	// Example 1: Simple counting from 1 to 10
	fmt.Println("Counting from 1 to 10:")
	for i := 1; i <= 10; i++ {
		fmt.Print(i, " ")
	}
	fmt.Println()

	// Example 2: Summing numbers from 1 to 100
	sum := 0
	for i := 1; i <= 100; i++ {
		sum += i
	}
	fmt.Println("\nSum of numbers 1 to 100:", sum)

	// Example 3: While-style loop (for with only condition)
	fmt.Println("\nCounting down from 5:")
	count := 5
	for count > 0 {
		fmt.Print(count, " ")
		count--
	}
	fmt.Println()

	// Example 4: Pattern printing - right triangle
	fmt.Println("\nRight Triangle Pattern:")
	for i := 1; i <= 5; i++ {
		for j := 1; j <= i; j++ {
			fmt.Print("* ")
		}
		fmt.Println()
	}

	// Example 5: Pattern printing - pyramid
	fmt.Println("\nPyramid Pattern:")
	for i := 1; i <= 5; i++ {
		// Print spaces
		for j := 1; j <= 5-i; j++ {
			fmt.Print(" ")
		}
		// Print stars
		for k := 1; k <= 2*i-1; k++ {
			fmt.Print("*")
		}
		fmt.Println()
	}

	// Example 6: Skip even numbers using continue
	fmt.Println("\nOdd numbers from 1 to 10:")
	for i := 1; i <= 10; i++ {
		if i%2 == 0 {
			continue // Skip even numbers
		}
		fmt.Print(i, " ")
	}
	fmt.Println()

	// Example 7: Break out of loop early
	fmt.Println("\nFind first number divisible by 7:")
	for i := 1; i <= 100; i++ {
		if i%7 == 0 {
			fmt.Println("Found:", i)
			break // Exit loop once found
		}
	}
}
