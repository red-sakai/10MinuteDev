package main

import "fmt"

func main() {
	// Iterate over an array of integers.
	numbers := [3]int{10, 20, 30}
	for index, value := range numbers {
		fmt.Printf("Array index %d has value %d\n", index, value)
	}

	// Iterate over a slice of strings.
	fruits := []string{"apple", "banana", "cherry"}
	for index, fruit := range fruits {
		fmt.Printf("Slice index %d has value %s\n", index, fruit)
	}

	// Iterate over a string to access Unicode code points.
	text := "Go语言"
	for index, runeValue := range text {
		fmt.Printf("String byte index %d has rune %q\n", index, runeValue)
	}
}
