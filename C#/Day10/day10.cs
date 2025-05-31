using System;

namespace Day10
{
    class Program
    {
        static void Main(string[] args)
        {
            // outputs "Jhered"
            string[] names = { "Jhered", "Trisha", "Rainier", "Jian" };
            System.Console.WriteLine(names[0]);

            // outputs numbers 1-5 using foreach loop
            int[] numbers = { 1, 2, 3, 4, 5 };
            foreach (int number in numbers)
            {
                System.Console.WriteLine(number);
            }

            // outputs the 4 elements inside the array but using a different method "new"
            string[] cars = new string[4] { "BMW", "Volvo", "Ferrari", "Lambo"};
            System.Console.WriteLine(string.Join(", ", cars));
            // string.Join method is a static method that works with any array that can be
            // converted into strings

            int[] numbers = new int[4] { 1, 2, 3, 4 };
            System.Console.WriteLine(string.Join(", ", numbers));
        }
    }
}