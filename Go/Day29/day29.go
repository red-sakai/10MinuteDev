package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

type Student struct {
	ID   int
	Name string
	Age  int
	GPA  float64
}

type Store struct {
	nextID   int
	students map[int]Student
}

func NewStore() *Store {
	return &Store{
		nextID:   1,
		students: make(map[int]Student),
	}
}

func main() {
	in := bufio.NewReader(os.Stdin)
	store := NewStore()

	for {
		printMenu()
		choice := readInt(in, "Choose an option: ")

		switch choice {
		case 1:
			addStudent(in, store)
		case 2:
			listStudents(store)
		case 3:
			viewStudent(in, store)
		case 4:
			updateStudent(in, store)
		case 5:
			deleteStudent(in, store)
		case 0:
			fmt.Println("Goodbye.")
			return
		default:
			fmt.Println("Invalid choice.")
		}

		fmt.Println()
	}
}

func printMenu() {
	fmt.Println("=== Student Management ===")
	fmt.Println("1) Add student")
	fmt.Println("2) List students")
	fmt.Println("3) View student by ID")
	fmt.Println("4) Update student")
	fmt.Println("5) Delete student")
	fmt.Println("0) Exit")
}

func addStudent(in *bufio.Reader, store *Store) {
	name := readLine(in, "Name: ")
	age := readInt(in, "Age: ")
	gpa := readFloat(in, "GPA (0.0 - 4.0): ")

	if strings.TrimSpace(name) == "" {
		fmt.Println("Name cannot be empty.")
		return
	}
	if age <= 0 {
		fmt.Println("Age must be positive.")
		return
	}
	if gpa < 0.0 || gpa > 4.0 {
		fmt.Println("GPA must be between 0.0 and 4.0.")
		return
	}

	id := store.nextID
	store.nextID++

	store.students[id] = Student{
		ID:   id,
		Name: name,
		Age:  age,
		GPA:  gpa,
	}

	fmt.Printf("Added student with ID %d.\n", id)
}

func listStudents(store *Store) {
	if len(store.students) == 0 {
		fmt.Println("No students found.")
		return
	}

	ids := make([]int, 0, len(store.students))
	for id := range store.students {
		ids = append(ids, id)
	}
	sort.Ints(ids)

	fmt.Println("ID\tName\tAge\tGPA")
	for _, id := range ids {
		s := store.students[id]
		fmt.Printf("%d\t%s\t%d\t%.2f\n", s.ID, s.Name, s.Age, s.GPA)
	}
}

func viewStudent(in *bufio.Reader, store *Store) {
	id := readInt(in, "Student ID: ")
	s, ok := store.students[id]
	if !ok {
		fmt.Println("Student not found.")
		return
	}
	fmt.Printf("ID: %d\nName: %s\nAge: %d\nGPA: %.2f\n", s.ID, s.Name, s.Age, s.GPA)
}

func updateStudent(in *bufio.Reader, store *Store) {
	id := readInt(in, "Student ID to update: ")
	s, ok := store.students[id]
	if !ok {
		fmt.Println("Student not found.")
		return
	}

	fmt.Println("Leave blank to keep current value.")
	name := readLine(in, fmt.Sprintf("Name (%s): ", s.Name))
	ageStr := readLine(in, fmt.Sprintf("Age (%d): ", s.Age))
	gpaStr := readLine(in, fmt.Sprintf("GPA (%.2f): ", s.GPA))

	if strings.TrimSpace(name) != "" {
		s.Name = name
	}

	if strings.TrimSpace(ageStr) != "" {
		age, err := strconv.Atoi(strings.TrimSpace(ageStr))
		if err != nil || age <= 0 {
			fmt.Println("Invalid age.")
			return
		}
		s.Age = age
	}

	if strings.TrimSpace(gpaStr) != "" {
		gpa, err := strconv.ParseFloat(strings.TrimSpace(gpaStr), 64)
		if err != nil || gpa < 0.0 || gpa > 4.0 {
			fmt.Println("Invalid GPA.")
			return
		}
		s.GPA = gpa
	}

	store.students[id] = s
	fmt.Println("Student updated.")
}

func deleteStudent(in *bufio.Reader, store *Store) {
	id := readInt(in, "Student ID to delete: ")
	if _, ok := store.students[id]; !ok {
		fmt.Println("Student not found.")
		return
	}
	delete(store.students, id)
	fmt.Println("Student deleted.")
}

func readLine(in *bufio.Reader, prompt string) string {
	fmt.Print(prompt)
	line, _ := in.ReadString('\n')
	return strings.TrimSpace(line)
}

func readInt(in *bufio.Reader, prompt string) int {
	for {
		s := readLine(in, prompt)
		n, err := strconv.Atoi(strings.TrimSpace(s))
		if err == nil {
			return n
		}
		fmt.Println("Please enter a valid integer.")
	}
}

func readFloat(in *bufio.Reader, prompt string) float64 {
	for {
		s := readLine(in, prompt)
		f, err := strconv.ParseFloat(strings.TrimSpace(s), 64)
		if err == nil {
			return f
		}
		fmt.Println("Please enter a valid number.")
	}
}
