package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"os"
)

func main() {
	if len(os.Args) < 3 {
		usage()
		os.Exit(2)
	}

	cmd := os.Args[1]
	path := os.Args[2]
	text := ""
	if len(os.Args) >= 4 {
		text = os.Args[3]
	}

	var err error
	switch cmd {
	case "write":
		err = writeWithOS(path, text)
	case "append":
		err = appendWithOS(path, text)
	case "read":
		err = readWithOS(path)
	case "writeioutil":
		err = writeWithIoutil(path, text)
	case "readioutil":
		err = readWithIoutil(path)
	default:
		usage()
		os.Exit(2)
	}

	if err != nil {
		fmt.Fprintln(os.Stderr, "error:", err)
		os.Exit(1)
	}
}

func usage() {
	fmt.Fprintln(os.Stderr, "usage:")
	fmt.Fprintln(os.Stderr, "  day24 write <path> <text>")
	fmt.Fprintln(os.Stderr, "  day24 append <path> <text>")
	fmt.Fprintln(os.Stderr, "  day24 read <path>")
	fmt.Fprintln(os.Stderr, "  day24 writeioutil <path> <text>")
	fmt.Fprintln(os.Stderr, "  day24 readioutil <path>")
}

// --- os package examples ---

func writeWithOS(path, text string) error {
	f, err := os.Create(path) // truncates/creates
	if err != nil {
		return err
	}
	defer f.Close()

	_, err = f.WriteString(text)
	return err
}

func appendWithOS(path, text string) error {
	f, err := os.OpenFile(path, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
	if err != nil {
		return err
	}
	defer f.Close()

	_, err = f.WriteString(text)
	return err
}

func readWithOS(path string) error {
	f, err := os.Open(path)
	if err != nil {
		return err
	}
	defer f.Close()

	b, err := io.ReadAll(f)
	if err != nil {
		return err
	}

	fmt.Print(string(b))
	return nil
}

// --- ioutil package examples ---

func writeWithIoutil(path, text string) error {
	// note: ioutil is deprecated since Go 1.16, but included here per exercise.
	return ioutil.WriteFile(path, []byte(text), 0644)
}

func readWithIoutil(path string) error {
	// note: ioutil is deprecated since Go 1.16, but included here per exercise.
	b, err := ioutil.ReadFile(path)
	if err != nil {
		return err
	}
	fmt.Print(string(b))
	return nil
}
