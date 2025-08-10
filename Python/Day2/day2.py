print("This is a string")
x = 1
print(f"{x} is an integer")
y = 2.3
print(f"{y} is a float")
z = True
print(f"{z} is a boolean")

age = int(input("What is your age: "))
if age >= 18:
    print("You are an adult.")
else:
    print("You are a minor.")

answer = 0
number1 = int(input("What is the first digit? "))
number2 = int(input("What is the second digit? "))
operation = int(input("What is the operation?\n" \
"1. Addition\n" 
"2. Subtraction\n" 
"3. Multiplication\n"
"4. Division"))

if operation == 1:
    answer = number1 + number2
    print(f"The answer is: {answer}")
elif operation == 2:
    answer = number1 - number2
    print(f"The answer is: {answer}")
elif operation == 3:
    answer = number1 * number2
    print(f"The answer is: {answer}")
elif operation == 4:
    try:
        answer = number1 / number2
        print(f"The answer is: {answer}")
    except ZeroDivisionError:
        print("Number must not be 0")