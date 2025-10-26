package main

import "fmt"

func main() {
	// ===========================================
	// ARITHMETIC OPERATORS
	// ===========================================
	fmt.Println("=== ARITHMETIC OPERATORS ===")

	a := 10
	b := 3

	// Addition
	fmt.Println("Addition (10 + 3):", a+b) // 13

	// Subtraction
	fmt.Println("Subtraction (10 - 3):", a-b) // 7

	// Multiplication
	fmt.Println("Multiplication (10 * 3):", a*b) // 30

	// Division (integer division)
	fmt.Println("Division (10 / 3):", a/b) // 3 (truncated)

	// Modulus (remainder)
	fmt.Println("Modulus (10 % 3):", a%b) // 1

	// Float division for decimal result
	fmt.Println("Float Division (10.0 / 3.0):", 10.0/3.0) // 3.333...

	// ===========================================
	// COMPARISON OPERATORS (returns bool)
	// ===========================================
	fmt.Println("\n=== COMPARISON OPERATORS ===")

	x := 15
	y := 20

	// Equal to
	fmt.Println("Equal (15 == 20):", x == y) // false

	// Not equal to
	fmt.Println("Not Equal (15 != 20):", x != y) // true

	// Greater than
	fmt.Println("Greater Than (15 > 20):", x > y) // false

	// Less than
	fmt.Println("Less Than (15 < 20):", x < y) // true

	// Greater than or equal to
	fmt.Println("Greater or Equal (15 >= 20):", x >= y) // false

	// Less than or equal to
	fmt.Println("Less or Equal (15 <= 20):", x <= y) // true

	// ===========================================
	// LOGICAL OPERATORS (for boolean operations)
	// ===========================================
	fmt.Println("\n=== LOGICAL OPERATORS ===")

	p := true
	q := false

	// AND (&&) - true if both are true
	fmt.Println("AND (true && false):", p && q) // false
	fmt.Println("AND (true && true):", p && p)  // true

	// OR (||) - true if at least one is true
	fmt.Println("OR (true || false):", p || q)  // true
	fmt.Println("OR (false || false):", q || q) // false

	// NOT (!) - inverts the boolean value
	fmt.Println("NOT (!true):", !p)  // false
	fmt.Println("NOT (!false):", !q) // true

	// Complex logical expression
	age := 25
	hasLicense := true
	fmt.Println("Can drive (age >= 18 && hasLicense):", age >= 18 && hasLicense) // true

	// ===========================================
	// ASSIGNMENT OPERATORS
	// ===========================================
	fmt.Println("\n=== ASSIGNMENT OPERATORS ===")

	// Simple assignment
	num := 10
	fmt.Println("Initial value:", num)

	// Add and assign (+=)
	num += 5                        // Same as: num = num + 5
	fmt.Println("After += 5:", num) // 15

	// Subtract and assign (-=)
	num -= 3                        // Same as: num = num - 3
	fmt.Println("After -= 3:", num) // 12

	// Multiply and assign (*=)
	num *= 2                        // Same as: num = num * 2
	fmt.Println("After *= 2:", num) // 24

	// Divide and assign (/=)
	num /= 4                        // Same as: num = num / 4
	fmt.Println("After /= 4:", num) // 6

	// Modulus and assign (%=)
	num %= 4                        // Same as: num = num % 4
	fmt.Println("After %= 4:", num) // 2

	// Increment and Decrement (special cases)
	counter := 5
	counter++                                // Increment by 1 (same as counter += 1)
	fmt.Println("After counter++:", counter) // 6

	counter--                                // Decrement by 1 (same as counter -= 1)
	fmt.Println("After counter--:", counter) // 5

	// NOTE: In Go, ++ and -- are statements, not expressions
	// You cannot use them in assignments like: x = counter++
}
