using System;

namespace Day2
{
    class Variable
    {
        static void Main(string[] args)
        {
            // int variables - integer values
            int x; //declaration
            x = 123; //initialization

            int y = 321; //both declaration and initialization

            int z = x + y;

            int age = 19;

            Console.WriteLine("\nIntegers");
            Console.WriteLine(x);
            Console.WriteLine(y);
            Console.WriteLine(z);

            Console.WriteLine("Your age is: " + age);


            // double variables - float values
            double a; // declaration
            a = 3.5;

            double b = 6.5;

            double c = a + b;

            Console.WriteLine("\nDoubles");
            Console.WriteLine(a);
            Console.WriteLine(b);
            Console.WriteLine(a + b);
            // can use even without using System; at the top of the code, shortcut is "cw + tab"
            System.Console.WriteLine(a + " + " + b + " = " + c);


            // boolean variables - true or false
            bool luck;
            luck = true;

            bool unlucky = false;

            System.Console.WriteLine("\nBooleans");
            System.Console.WriteLine("Are you lucky? " + luck);
            System.Console.WriteLine("Are you unlucky? " + unlucky);

            // string variables - block of text
            string name;
            name = "Jhered";

            string love = "Shaikah";

            System.Console.WriteLine("\nStrings");
            System.Console.WriteLine("My name is " + name);
            System.Console.WriteLine(name + " loves " + love);


            // char variables - stores a single character and ONLY ACCEPTS SINGLE QUOTES
            char grade;
            grade = 'A';

            char number = '5';

            System.Console.WriteLine("\nChars");
            System.Console.WriteLine("Congratulations you got a grade of: " + grade);
            System.Console.WriteLine("Your favorite number is: " + number);
        }
    }
}