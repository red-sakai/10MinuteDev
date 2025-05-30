using System;

namespace Day8
{
    class Program
    {
        static void Main(string[] args)
        {
            
            // normal while loop
            int i = 0;
            while (i < 10)
            {
                System.Console.WriteLine($"The current number is: {i}");
                i++;
            }
            
            // do/while loop, this will run the program at least once then verify if the condition is true using the while statement
            int start = 0;
            do
            {
                System.Console.WriteLine("Enter a number to start from:");
                try
                {
                    start = Convert.ToInt32(Console.ReadLine());
                }
                catch (FormatException)
                {
                    System.Console.WriteLine("Please input a valid integer.");
                    continue;
                }
            }
            while (start > 100);
            // this basically means, inside the do block, it will do it while the condition inside the while statement is true

            while (start < 100)
            {
                System.Console.WriteLine($"The current number is: {start}");
                start++;
            }
            
            // for loop
            for (int j = 0; j < 20; j = j + 2)
            {
                System.Console.WriteLine($"The number is: {j}");
            }
            
        }
    }
}