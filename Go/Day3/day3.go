package main

import "fmt"

func main() {
	// ===========================================
	// fmt.Println() - PRINTING OUTPUT
	// ===========================================
	// Prints text to console with a newline at the end
	fmt.Println("Welcome to Go Input/Output Demo!")
	fmt.Println("=================================")

	// Can print multiple values separated by spaces
	fmt.Println("Value 1:", 42, "Value 2:", true)

	// ===========================================
	// fmt.Scan() - READING USER INPUT
	// ===========================================

	// Example 1: Reading a single string
	var name string
	fmt.Println("\nEnter your name:")
	fmt.Scan(&name) // & is the address-of operator (pointer)
	fmt.Println("Hello,", name)

	// Example 2: Reading an integer
	var age int
	fmt.Println("\nEnter your age:")
	fmt.Scan(&age)
	fmt.Println("You are", age, "years old")

	// Example 3: Reading a float
	var height float64
	fmt.Println("\nEnter your height in meters:")
	fmt.Scan(&height)
	fmt.Println("Your height is", height, "meters")

	// Example 4: Reading a boolean
	var isStudent bool
	fmt.Println("\nAre you a student? (true/false):")
	fmt.Scan(&isStudent)
	fmt.Println("Student status:", isStudent)

	// Example 5: Reading multiple values at once
	var firstName, lastName string
	var birthYear int
	fmt.Println("\nEnter first name, last name, and birth year (separated by spaces):")
	fmt.Scan(&firstName, &lastName, &birthYear)
	fmt.Println("Full name:", firstName, lastName)
	fmt.Println("Birth year:", birthYear)

	// ===========================================
	// SUMMARY
	// ===========================================
	fmt.Println("\n=================================")
	fmt.Println("Summary of your inputs:")
	fmt.Println("Name:", name)
	fmt.Println("Age:", age)
	fmt.Println("Height:", height)
	fmt.Println("Is Student:", isStudent)
	fmt.Println("Full Name:", firstName, lastName, birthYear)

	// NOTE: fmt.Scan() stops reading at whitespace
	// For reading full lines with spaces, use fmt.Scanln() or bufio.Scanner
}
