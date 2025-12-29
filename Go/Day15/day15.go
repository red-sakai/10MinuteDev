package main

import "fmt"

type Person struct {
	FirstName string
	LastName  string
	Age       int
}

func NewPerson(first, last string, age int) Person {
	return Person{
		FirstName: first,
		LastName:  last,
		Age:       age,
	}
}

func (p Person) Greet() string {
	return fmt.Sprintf("Hi, I'm %s %s and I'm %d.", p.FirstName, p.LastName, p.Age)
}

func main() {
	p := NewPerson("Ada", "Lovelace", 36)
	fmt.Println(p.Greet())
}
