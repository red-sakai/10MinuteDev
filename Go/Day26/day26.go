package main

import (
	"fmt"
	"sync"
	"time"
)

func worker(name string, wg *sync.WaitGroup) {
	defer wg.Done()
	for i := 1; i <= 3; i++ {
		fmt.Printf("%s: %d\n", name, i)
		time.Sleep(100 * time.Millisecond)
	}
}

func main() {
	var wg sync.WaitGroup
	wg.Add(2)

	go worker("A", &wg)
	go worker("B", &wg)

	wg.Wait()
}
