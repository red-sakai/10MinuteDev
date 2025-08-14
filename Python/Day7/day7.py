student_list = []
age_list = []
department_list = []

selection = int(input("==========WELCOME TO THE STUDENT RECORD SYSTEM==========\n" \
"1. Add\n" \
"2. Search\n" \
"3. Remove\n"))

if selection == 1:
    name = input("What is the student name? ")
    student_list.append(name)

    age = int(input("What is the student age? "))
    age_list.append(age)

    department = input("What is the student department? ")
    department_list.append(department)

elif selection == 2:
    find_name = input("What is student name? ")
    if find_name in student_list:
        i = student_list.index(find_name)
        print(f"Found {find_name}. Age: {age_list[i]}, Department: {department_list[i]}")
    else:
        print(f"{find_name} not found.")

elif selection == 3:
    remove_name = input("What is the student name to remove? ")
    if remove_name in student_list:
        i = student_list.index(remove_name)
        student_list.pop(i)
        age_list.pop(i)
        department_list.pop(i)
        print(f"Removed {remove_name}.")
    else:
        print(f"{remove_name} not found.")