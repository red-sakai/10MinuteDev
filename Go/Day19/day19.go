package main

import (
	"errors"
	"fmt"
	"os"
	"strconv"
)

type ValidationError struct {
	Field  string
	Value  string
	Reason string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation failed: field=%s value=%q reason=%s", e.Field, e.Value, e.Reason)
}

func parsePositiveInt(field, s string) (int, error) {
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, &ValidationError{Field: field, Value: s, Reason: "not an integer"}
	}
	if n <= 0 {
		return 0, &ValidationError{Field: field, Value: s, Reason: "must be > 0"}
	}
	return n, nil
}

func readFile(path string) ([]byte, error) {
	b, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read %s: %w", path, err)
	}
	return b, nil
}

func main() {
	n, err := parsePositiveInt("count", "0")
	if err != nil {
		var vErr *ValidationError
		if errors.As(err, &vErr) {
			fmt.Println("bad input:", vErr)
		} else {
			fmt.Println("unexpected error:", err)
		}
	}

	_, err = readFile("missing.txt")
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			fmt.Println("file does not exist:", err)
		} else {
			fmt.Println("failed to read file:", err)
		}
	}
}
