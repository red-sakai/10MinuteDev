package main

import "fmt"

func main() {
	// ===========================================
	// INTEGER (int)
	// ===========================================
	// var keyword for explicit declaration with type
	var age int = 25
	fmt.Println("Age (int):", age)

	// Short declaration with := (type inferred)
	count := 100
	fmt.Println("Count (int):", count)

	// ===========================================
	// FLOAT64 (floating-point numbers)
	// ===========================================
	// var keyword with explicit type
	var price float64 = 19.99
	fmt.Println("Price (float64):", price)

	// Short declaration (Go infers float64 for decimals)
	temperature := 36.6
	fmt.Println("Temperature (float64):", temperature)

	// ===========================================
	// STRING (text)
	// ===========================================
	// var keyword with explicit type
	var name string = "Alice"
	fmt.Println("Name (string):", name)

	// Short declaration
	message := "Hello, Go!"
	fmt.Println("Message (string):", message)

	// ===========================================
	// BOOL (boolean - true/false)
	// ===========================================
	// var keyword with explicit type
	var isActive bool = true
	fmt.Println("Is Active (bool):", isActive)

	// Short declaration
	hasAccess := false
	fmt.Println("Has Access (bool):", hasAccess)

	// ===========================================
	// RUNE (represents a Unicode code point)
	// ===========================================
	// var keyword with explicit type
	// Rune is an alias for int32
	var letter rune = 'A'
	fmt.Println("Letter (rune):", letter)      // Prints numeric value
	fmt.Printf("Letter as char: %c\n", letter) // Prints the character

	// Short declaration
	emoji := '😊'
	fmt.Println("Emoji (rune):", emoji)      // Prints numeric value
	fmt.Printf("Emoji as char: %c\n", emoji) // Prints the emoji

	// ===========================================
	// KEY DIFFERENCES: var vs :=
	// ===========================================
	// var: Can be used at package level and function level
	// var: Can declare without initialization (zero value)
	// :=: Only works inside functions
	// :=: Must initialize at declaration

	var uninitialized int // Gets zero value (0 for int)
	fmt.Println("Uninitialized int:", uninitialized)
}
