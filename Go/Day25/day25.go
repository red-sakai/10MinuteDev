package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func main() {
	u := User{ID: 1, Name: "Ada", Email: "ada@example.com"}

	data, err := json.Marshal(u)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(data))

	var u2 User
	if err := json.Unmarshal(data, &u2); err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", u2)
}
