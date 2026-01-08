package main

import (
	"fmt"

	"day20/internal/greetings"
	"day20/internal/mathutil"
)

func main() {
	name := "Developer"
	fmt.Println(greetings.Hello(name))

	values := []int{10, 20, 30}
	fmt.Printf("sum(%v) = %d\n", values, mathutil.Sum(values))
}
