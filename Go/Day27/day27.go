package main

import "fmt"

func worker(msgs chan<- string) {
	msgs <- "hello from worker"
	msgs <- "channel communication"
	close(msgs)
}

func main() {
	msgs := make(chan string)

	go worker(msgs)

	for msg := range msgs {
		fmt.Println(msg)
	}
}
