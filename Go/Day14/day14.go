package main

import (
	"bufio"
	"bytes"
	"flag"
	"fmt"
	"io"
	"math"
	"os"
	"regexp"
	"sort"
	"strings"
	"unicode/utf8"
)

func main() {
	mode := flag.String("mode", "word", "Mode: word | number")
	file := flag.String("file", "", "Input file (optional). If empty, reads from stdin.")
	topN := flag.Int("top", 10, "Top N most frequent words (word mode)")
	flag.Parse()

	data, err := readInput(*file, os.Stdin)
	if err != nil {
		fmt.Fprintln(os.Stderr, "error:", err)
		os.Exit(1)
	}

	switch strings.ToLower(strings.TrimSpace(*mode)) {
	case "word", "words":
		reportWordStats(data, *topN)
	case "number", "numbers", "num":
		if err := reportNumberStats(data); err != nil {
			fmt.Fprintln(os.Stderr, "error:", err)
			os.Exit(1)
		}
	default:
		fmt.Fprintln(os.Stderr, "error: invalid -mode (use: word | number)")
		os.Exit(2)
	}
}

func readInput(path string, stdin io.Reader) ([]byte, error) {
	if strings.TrimSpace(path) == "" {
		return io.ReadAll(stdin)
	}
	b, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read file %q: %w", path, err)
	}
	return b, nil
}

func reportWordStats(data []byte, topN int) {
	byteCount := len(data)
	lineCount := 0
	for _, b := range data {
		if b == '\n' {
			lineCount++
		}
	}
	// Common convention: if non-empty and doesn't end with '\n', still count last line.
	if byteCount > 0 && (len(data) == 0 || data[len(data)-1] != '\n') {
		lineCount++
	}

	runeCount := utf8.RuneCount(data)

	words, freq := wordFrequencies(data)
	wordCount := len(words)

	fmt.Printf("Mode: word\n")
	fmt.Printf("Bytes: %d\n", byteCount)
	fmt.Printf("Lines: %d\n", lineCount)
	fmt.Printf("Words: %d\n", wordCount)
	fmt.Printf("Characters (runes): %d\n", runeCount)

	if topN > 0 {
		fmt.Printf("\nTop %d words:\n", topN)
		type kv struct {
			k string
			v int
		}
		pairs := make([]kv, 0, len(freq))
		for k, v := range freq {
			pairs = append(pairs, kv{k: k, v: v})
		}
		sort.Slice(pairs, func(i, j int) bool {
			if pairs[i].v == pairs[j].v {
				return pairs[i].k < pairs[j].k
			}
			return pairs[i].v > pairs[j].v
		})
		if topN > len(pairs) {
			topN = len(pairs)
		}
		for i := 0; i < topN; i++ {
			fmt.Printf("%2d) %-20s %d\n", i+1, pairs[i].k, pairs[i].v)
		}
	}
}

func wordFrequencies(data []byte) ([]string, map[string]int) {
	sc := bufio.NewScanner(bytes.NewReader(data))
	sc.Split(bufio.ScanWords)
	// Allow longer tokens than the default 64K.
	sc.Buffer(make([]byte, 0, 64*1024), 1024*1024)

	words := make([]string, 0, 1024)
	freq := make(map[string]int, 1024)

	for sc.Scan() {
		w := normalizeWord(sc.Text())
		if w == "" {
			continue
		}
		words = append(words, w)
		freq[w]++
	}
	// Ignore scanner error for now; most inputs will be fine.
	return words, freq
}

func normalizeWord(s string) string {
	// Lowercase and trim common punctuation around words.
	s = strings.ToLower(s)
	s = strings.Trim(s, `"'“”‘’.,;:!?()[]{}<>/\\|@#$%^&*-_+=~`)
	return s
}

func reportNumberStats(data []byte) error {
	nums := extractNumbers(string(data))
	if len(nums) == 0 {
		return fmt.Errorf("no numbers found in input")
	}

	sort.Float64s(nums)

	n := float64(len(nums))
	sum := 0.0
	for _, x := range nums {
		sum += x
	}
	mean := sum / n
	median := calcMedianSorted(nums)
	minV := nums[0]
	maxV := nums[len(nums)-1]
	stddev := calcStdDev(nums, mean)

	fmt.Printf("Mode: number\n")
	fmt.Printf("Count: %d\n", len(nums))
	fmt.Printf("Sum: %g\n", sum)
	fmt.Printf("Mean: %g\n", mean)
	fmt.Printf("Median: %g\n", median)
	fmt.Printf("Min: %g\n", minV)
	fmt.Printf("Max: %g\n", maxV)
	fmt.Printf("StdDev (population): %g\n", stddev)

	return nil
}

var numberRE = regexp.MustCompile(`[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?`)

func extractNumbers(s string) []float64 {
	matches := numberRE.FindAllString(s, -1)
	out := make([]float64, 0, len(matches))
	for _, m := range matches {
		// Parse as float64; skip if it somehow fails.
		var v float64
		_, err := fmt.Sscanf(m, "%f", &v)
		if err == nil && !math.IsNaN(v) && !math.IsInf(v, 0) {
			out = append(out, v)
		}
	}
	return out
}

func calcMedianSorted(sorted []float64) float64 {
	n := len(sorted)
	if n == 0 {
		return math.NaN()
	}
	mid := n / 2
	if n%2 == 1 {
		return sorted[mid]
	}
	return (sorted[mid-1] + sorted[mid]) / 2
}

func calcStdDev(vals []float64, mean float64) float64 {
	if len(vals) == 0 {
		return math.NaN()
	}
	var ss float64
	for _, x := range vals {
		d := x - mean
		ss += d * d
	}
	return math.Sqrt(ss / float64(len(vals)))
}
