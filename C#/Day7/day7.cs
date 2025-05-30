using System;

namespace Day7
{
    class Program
    {
        static void Main(string[] args)
        {
            System.Console.WriteLine("Jhered's Calculator (Select an option)\n1. Addition\n2. Subtraction\n3. Multiplication\n4. Division");
            int choice = Convert.ToInt32(Console.ReadLine());
            switch (choice)
            {
                case 1:
                    System.Console.WriteLine("Input integer 1: ");
                    int add1 = Convert.ToInt32(Console.ReadLine());
                    System.Console.WriteLine("Input integer 2: ");
                    int add2 = Convert.ToInt32(Console.ReadLine());
                    System.Console.WriteLine($"The answer is: {add1 + add2}");
                    break;
                case 2:
                    System.Console.WriteLine("Input integer 1: ");
                    int sub1 = Convert.ToInt32(Console.ReadLine());
                    System.Console.WriteLine("Input integer 2: ");
                    int sub2 = Convert.ToInt32(Console.ReadLine());
                    System.Console.WriteLine($"The answer is: {sub1 - sub2}");
                    break;
                case 3:
                    System.Console.WriteLine("Input integer 1: ");
                    int multiply1 = Convert.ToInt32(Console.ReadLine());
                    System.Console.WriteLine("Input integer 2: ");
                    int multiply2 = Convert.ToInt32(Console.ReadLine());
                    System.Console.WriteLine($"The answer is: {multiply1 * multiply2}");
                    break;
                case 4:
                    System.Console.WriteLine("Input integer 1: ");
                    int divide1 = Convert.ToInt32(Console.ReadLine());
                    System.Console.WriteLine("Input integer 2: ");
                    int divide2 = Convert.ToInt32(Console.ReadLine());
                    System.Console.WriteLine($"The answer is: {divide1 / divide2}");
                    break;
                default:
                    System.Console.WriteLine("Please pick only integers 1-4.");
                    break;
            }
        }
    }
}