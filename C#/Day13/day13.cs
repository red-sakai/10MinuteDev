using System;

namespace Day13
{
    class Program
    {
        // static means that the method belongs to the program class just like def in python
        // void means that this method does not have a return value
        static void MyMethod()
        {
            System.Console.WriteLine("Hello Jhered!");
        }

        static void Names(string fname)
        {
            System.Console.WriteLine(fname + " Republica");
        }

        static void NameWithAge(string fname, int age)
        {
            System.Console.WriteLine(fname + " is " + age + " years old.");
        }

        // this method uses default parameters by using the = sign
        // if the called method doesn't have any arguments it will then display the default parameter
        static void Country(string country = "Philippines")
        {
            System.Console.WriteLine(country);
        }

        // in this method dwe don't use the word void since that means it will not return a value
        // if you want it to return a value you can use int or double
        static int Values(int x, int y)
        {
            return x + y;
        }

        // you can send arguments via key:value syntax
        static void Test(string child1, string child2, string child3)
        {
            System.Console.WriteLine("The youngest child is: " + child3);
        }

        // Method Overloading: multiple methods can have the same name with different parameters
        static int numbers(int x, int y)
        {
            return x + y;
        }

        static double numbers(double x, double y)
        {
            return x + y;
        }

        static void Main(string[] args)
        {
            //System.Console.WriteLine(Values(3, 5));
            //System.Console.WriteLine(Values(10, 6));
            //Test(child1: "Liam", child2: "Blackthornprod", child3: "Jesse");

            int myNum1 = numbers(2, 5);
            double myNum2 = numbers(3.1, 6.6);

            System.Console.WriteLine(myNum1);
            System.Console.WriteLine(myNum2);
        }
    }
}