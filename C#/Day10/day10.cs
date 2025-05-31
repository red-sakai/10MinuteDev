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
        }
    }
}