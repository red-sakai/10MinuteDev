package main

import (
	"fmt"
)

func main() {
	// Print welcome message
	fmt.Println("Simple Calculator CLI App")
	fmt.Println("Enter two numbers and an operator (+, -, *, /)")

	var num1, num2 float64
	var op string

	// Read first number
	fmt.Print("Enter first number: ")
	fmt.Scan(&num1)

	// Read operator
	fmt.Print("Enter operator (+, -, *, /): ")
	fmt.Scan(&op)

	// Read second number
	fmt.Print("Enter second number: ")
	fmt.Scan(&num2)

	// Perform calculation using switch
	switch op {
	case "+":
		fmt.Printf("Result: %.2f\n", num1+num2)
	case "-":
		fmt.Printf("Result: %.2f\n", num1-num2)
	case "*":
		fmt.Printf("Result: %.2f\n", num1*num2)
	case "/":
		if num2 == 0 {
			fmt.Println("Error: Division by zero")
		} else {
			fmt.Printf("Result: %.2f\n", num1/num2)
		}
	default:
		fmt.Println("Invalid operator")
	}
}
