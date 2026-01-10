package main

import (
	"fmt"
	"strings"
)

func main() {
	// 1) Create + set + update
	counts := make(map[string]int)
	counts["apples"] = 2
	counts["apples"]++ // update
	counts["bananas"] += 5

	// 2) Read + existence check (the "comma ok" idiom)
	if v, ok := counts["apples"]; ok {
		fmt.Println("apples:", v)
	}
	if _, ok := counts["pears"]; !ok {
		fmt.Println("pears: not found")
	}

	// 3) Delete
	delete(counts, "bananas")

	// 4) Iterate
	for k, v := range counts {
		fmt.Printf("%s => %d\n", k, v)
	}

	// 5) Practical: word frequency
	text := "go go gophers build go tools"
	freq := wordFreq(text)
	fmt.Println("freq:", freq)

	// 6) Merge maps (add counts)
	mergeAdd(freq, map[string]int{"go": 2, "tools": 1, "new": 3})
	fmt.Println("merged freq:", freq)

	// 7) Find max key by value
	word, n := maxByValue(freq)
	fmt.Println("top:", word, n)
}

func wordFreq(s string) map[string]int {
	m := make(map[string]int)
	for _, w := range strings.Fields(strings.ToLower(s)) {
		m[w]++
	}
	return m
}

func mergeAdd(dst, src map[string]int) {
	for k, v := range src {
		dst[k] += v
	}
}

func maxByValue(m map[string]int) (key string, val int) {
	first := true
	for k, v := range m {
		if first || v > val {
			key, val = k, v
			first = false
		}
	}
	return
}
