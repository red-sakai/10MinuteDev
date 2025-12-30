package main

import "fmt"

type Counter struct {
	value int
}

// Value receiver: doesn't mutate; operates on a copy.
func (c Counter) Value() int { return c.value }

// Pointer receiver: mutates the original.
func (c *Counter) Inc() { c.value++ }

// Pointer receiver: mutates the original.
func (c *Counter) Add(n int) { c.value += n }

type User struct {
	First string
	Last  string
}

// Value receiver: read-only computed result.
func (u User) FullName() string { return u.First + " " + u.Last }

// Pointer receiver: mutates the original.
func (u *User) Rename(first, last string) {
	u.First = first
	u.Last = last
}

func main() {
	c := Counter{value: 10}
	fmt.Println("initial:", c.Value())

	c.Inc()
	c.Add(5)
	fmt.Println("after:", c.Value())

	u := User{First: "Ada", Last: "Lovelace"}
	fmt.Println("name:", u.FullName())

	u.Rename("Grace", "Hopper")
	fmt.Println("renamed:", u.FullName())
}
