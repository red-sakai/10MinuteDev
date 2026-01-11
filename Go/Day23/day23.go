package main

import (
	"fmt"
	"os"
	"strings"
	"time"
)

func main() {
	fmt.Println("== defer for cleanup ==")
	deferTimingExample()

	fmt.Println()
	deferLIFOExample()

	fmt.Println()
	deferCloseExample()

	fmt.Println()
	fmt.Println("== panic/recover ==")
	if q, err := safeQuotient(10, 0); err != nil {
		fmt.Println("safeQuotient error:", err)
	} else {
		fmt.Println("safeQuotient result:", q)
	}

	// Uncomment to see an unrecovered panic terminate the program:
	// fmt.Println(quotientOrPanic(10, 0))
	fmt.Println("Program continues after recovered panic.")
}

func deferTimingExample() {
	start := time.Now()
	defer func() {
		fmt.Println("deferTimingExample took:", time.Since(start))
	}()

	// ...work...
	time.Sleep(50 * time.Millisecond)
	fmt.Println("work done")
}

func deferLIFOExample() {
	fmt.Println("begin")
	defer fmt.Println("defer #1 (runs last)")
	defer fmt.Println("defer #2")
	defer fmt.Println("defer #3 (runs first)")
	fmt.Println("end")
}

type resource struct {
	name string
}

func openResource(name string) *resource {
	fmt.Println("open:", name)
	return &resource{name: name}
}

func (r *resource) Close() {
	fmt.Println("close:", r.name)
}

func deferCloseExample() {
	r := openResource("demo-resource")
	defer r.Close() // cleanup even if later code returns early / panics

	fmt.Println("using:", r.name)
}

func quotientOrPanic(a, b int) int {
	if b == 0 {
		panic("divide by zero")
	}
	return a / b
}

// safeQuotient converts a panic into an error via recover.
// Note: recover only works when called inside a deferred function.
func safeQuotient(a, b int) (result int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("recovered panic: %v", r)
		}
	}()

	result = quotientOrPanic(a, b)
	return result, nil
}

// Optional: show that recover doesn't catch panics from other goroutines unless handled there.
func _goroutineRecoverNote() {
	go func() {
		defer func() {
			_ = recover() // would need handling here, not in the parent goroutine
		}()
		panic(strings.Repeat("x", 1))
	}()
	_, _ = os.Stdout.Write([]byte{}) // keep imports used if you expand examples
}
