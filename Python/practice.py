from abc import abstractmethod, ABC

class Person(ABC):
    def __init__(self, name: str, age: int):
        # _name = private, easier to access between subclasses
        # __name = protected, harder to access between subclasses
        self._name = name
        self._age = age

    @abstractmethod
    def add_grade(self, grade: float):
        pass

    @abstractmethod
    def calculate_average(self):
        pass

    @abstractmethod
    def get_info(self):
        pass

class Student(Person):

    def __init__(self, name: str, age: int):
        super().__init__(name, age)
        self.grades = []

    def add_grade(self, grade: float):
        self.grades.append(grade)

    def calculate_average(self):
        return sum(self.grades) / len(self.grades) if self.grades else 0.0
    
    def get_info(self):
        return f"Name: {self._name}\nAge: {self._age}\n Average Grade: {self.calculate_average()}"
    
class Logger:

    @staticmethod
    def log_error(message: str):
        with open("error_log.txt", "a") as log_file:
            log_file.write(message + "\n")

def main():
    students = []

    try:
        students_append = int(input("Enter number of students: "))
        if students_append <= 0:
            raise ValueError("Number of students must be positive.")
        
        for i in range(students_append):
            print(f"Student #{i + 1}")
            name = input("Enter name: ")
            age = int(input("Enter age: "))
            if age <= 0:
                raise ValueError("Age must be a positive integer.")
            
            student = Student(name, age)

            while True:
                grade_input = input("Enter grade (type 'whatdahalliburton' if you are done): ")
                if grade_input == 'whatdahalliburton':
                    break
                try:
                    grade = float(grade_input)
                    if not 0 <= grade <= 100:
                        raise ValueError("Grade must be 0 to 100.")
                    student.add_grade(grade)
                except ValueError as e:
                    print("Invalid grade", e)
                    Logger.log_error(f"Grade error for student {name}: {e}")

            students.append(student)

    except Exception as e:
        print("An error occured:", e)
        Logger.log_error(f"Error: {e}")

    with open("students.txt", "a") as file:
        for student in students:
            file.write(student.get_info() + "\n")

    print("\nStudent data saved to students.txt.")

if __name__ == "__main__":
    main()