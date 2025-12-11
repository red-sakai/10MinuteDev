package main

import "fmt"

func main() {
	// Declare arrays with fixed sizes.
	numbers := [4]int{10, 20, 30, 40}
	var weekdays [7]string
	weekdays[0], weekdays[1] = "Sun", "Mon"
	weekdays[2], weekdays[3] = "Tue", "Wed"

	// Access and print specific elements.
	fmt.Printf("First number: %d\n", numbers[0])
	fmt.Printf("Second weekday: %s\n", weekdays[1])

	// Mutate an element.
	numbers[2] = 35
	fmt.Printf("Updated numbers[2]: %d\n", numbers[2])

	// Iterate over arrays to display contents.
	fmt.Println("All numbers:")
	for idx, val := range numbers {
		fmt.Printf("[%d] = %d\n", idx, val)
	}

	fmt.Println("Known weekdays:")
	for idx, day := range weekdays {
		if day == "" {
			continue
		}
		fmt.Printf("[%d] = %s\n", idx, day)
	}
}
