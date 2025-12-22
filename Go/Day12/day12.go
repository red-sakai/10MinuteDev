package main

import (
	"fmt"
	"strings"
	"unicode"
	"unicode/utf8"
)

func main() {
	// strings package practice
	raw := "   Go makes Unicode easy: café ☕   "
	fmt.Println("raw:", raw)

	s := strings.TrimSpace(raw)
	fmt.Println("TrimSpace:", s)

	fmt.Println("ToUpper:", strings.ToUpper(s))
	fmt.Println("HasPrefix(\"Go\"):", strings.HasPrefix(s, "Go"))
	fmt.Println("Contains(\"Unicode\"):", strings.Contains(s, "Unicode"))
	fmt.Println("Index(\"café\"):", strings.Index(s, "café"))

	parts := strings.Split(s, ":")
	fmt.Println("Split(':'):", parts)
	fmt.Println("Join('|'):", strings.Join(parts, "|"))

	repl := strings.ReplaceAll(s, "easy", "fun")
	fmt.Println("ReplaceAll:", repl)

	words := strings.Fields(s) // splits on any whitespace
	fmt.Println("Fields:", words)

	// bytes vs runes
	fmt.Println("\n--- bytes vs runes ---")
	fmt.Println("len(s) bytes:", len(s))
	fmt.Println("RuneCountInString:", utf8.RuneCountInString(s))

	fmt.Println("\nIterate runes (range over string):")
	for i, r := range s {
		fmt.Printf("byteIndex=%d rune=%q codePoint=U+%04X\n", i, r, r)
	}

	// rune classification + simple normalization via strings.Map
	fmt.Println("\n--- rune classification + strings.Map ---")
	mapped := strings.Map(func(r rune) rune {
		// remove punctuation, keep letters/digits/space
		if unicode.IsPunct(r) {
			return -1
		}
		return r
	}, s)
	fmt.Println("Remove punctuation:", mapped)

	// building a string from runes
	fmt.Println("\n--- build from runes ---")
	runes := []rune{'G', 'o', ' ', '☕'}
	fmt.Println("string([]rune{...}):", string(runes))
}
