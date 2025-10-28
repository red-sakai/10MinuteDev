package main

import (
	"fmt"
)

func main() {
	// Example 1: switch with an expression
	day := 3
	fmt.Println("Day number:", day)
	switch day {
	case 1:
		fmt.Println("Monday")
	case 2:
		fmt.Println("Tuesday")
	case 3:
		fmt.Println("Wednesday")
	case 4:
		fmt.Println("Thursday")
	case 5:
		fmt.Println("Friday")
	case 6:
		fmt.Println("Saturday")
	case 7:
		fmt.Println("Sunday")
	default:
		fmt.Println("Invalid day")
	}

	// Example 2: switch without an expression
	age := 20
	fmt.Println("Age:", age)
	switch {
	case age < 13:
		fmt.Println("You are a child.")
	case age < 20:
		fmt.Println("You are a teenager.")
	case age < 65:
		fmt.Println("You are an adult.")
	default:
		fmt.Println("You are a senior.")
	}
}
