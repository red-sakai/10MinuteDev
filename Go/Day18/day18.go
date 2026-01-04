package main

import (
	"fmt"
	"math"
)

type Shape interface {
	Area() float64
	Perimeter() float64
}

type Rectangle struct {
	W, H float64
}

func (r Rectangle) Area() float64      { return r.W * r.H }
func (r Rectangle) Perimeter() float64 { return 2 * (r.W + r.H) }

type Circle struct {
	R float64
}

func (c Circle) Area() float64      { return math.Pi * c.R * c.R }
func (c Circle) Perimeter() float64 { return 2 * math.Pi * c.R }

func printShape(name string, s Shape) {
	fmt.Printf("%s: area=%.2f perimeter=%.2f\n", name, s.Area(), s.Perimeter())
}

func main() {
	printShape("rect", Rectangle{W: 3, H: 4})
	printShape("circle", Circle{R: 2.5})
}
