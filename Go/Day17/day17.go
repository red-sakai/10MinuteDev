package main

import "fmt"

type Counter struct {
	N int
}

func incrementValue(x int) {
	// x is a copy (pass-by-value)
	x++
}

func incrementRef(x *int) {
	// x points to the caller's variable (pass-by-reference style)
	*x++
}

func setTo42(x *int) {
	if x == nil {
		return
	}
	*x = 42
}

func (c Counter) IncValueReceiver() {
	// c is a copy; caller won't see changes
	c.N++
}

func (c *Counter) IncPointerReceiver() {
	// c points to caller's struct; caller will see changes
	c.N++
}

func mutateSliceFirstElem(s []int) {
	// s is a copy of the slice header, but it still points to the same backing array
	if len(s) > 0 {
		s[0] = 999
	}
}

func appendToSlice(s []int) []int {
	// append may reallocate; return the new slice so caller can observe the new header
	return append(s, 123)
}

func mutateMap(m map[string]int) {
	// map header is copied, but both refer to the same underlying hash table
	m["hits"]++
}

func main() {
	fmt.Println("== Pointers & pass-by-reference basics ==")

	// 1) Basic address-of (&) and dereference (*)
	a := 10
	pa := &a
	fmt.Printf("a=%d, &a=%p, pa=%p, *pa=%d\n", a, &a, pa, *pa)

	*pa = 11
	fmt.Printf("after *pa=11 => a=%d\n", a)

	// 2) Pass-by-value vs pass-by-reference style
	b := 5
	incrementValue(b)
	fmt.Printf("after incrementValue(b) => b=%d (unchanged)\n", b)

	incrementRef(&b)
	fmt.Printf("after incrementRef(&b) => b=%d (changed)\n", b)

	// 3) nil pointer safety
	var pn *int
	setTo42(pn) // safe no-op
	setTo42(&b)
	fmt.Printf("after setTo42(&b) => b=%d\n", b)

	// 4) Struct mutation: value receiver vs pointer receiver
	c := Counter{N: 1}
	c.IncValueReceiver()
	fmt.Printf("after c.IncValueReceiver() => c.N=%d (unchanged)\n", c.N)

	c.IncPointerReceiver()
	fmt.Printf("after c.IncPointerReceiver() => c.N=%d (changed)\n", c.N)

	// 5) Slices: header copied, backing array shared (until reallocated)
	s := []int{1, 2, 3}
	mutateSliceFirstElem(s)
	fmt.Printf("after mutateSliceFirstElem(s) => s=%v\n", s)

	s2 := appendToSlice(s)
	fmt.Printf("after appendToSlice(s) => s=%v, s2=%v\n", s, s2)

	// 6) Maps: mutations are visible to caller without needing a pointer
	m := map[string]int{"hits": 0}
	mutateMap(m)
	fmt.Printf("after mutateMap(m) => m=%v\n", m)
}
