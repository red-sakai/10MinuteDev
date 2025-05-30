using System;

namespace Day5
{
    class Program
    {
        static void Main(string[] args)
        {
            System.Console.WriteLine("How old are you? ");
            int age = Convert.ToInt32(Console.ReadLine());

            if (age >= 100)
            {
                System.Console.WriteLine("Congratulations, you have lived 10 decades!");
            }
            else if (age >= 18)
            {
                System.Console.WriteLine("You are an adult with an age of: " + age);
            }
            else if (age < 18 && age >= 1)
            {
                System.Console.WriteLine("You are a minor with an age of: " + age);
            }
            else
            {
                System.Console.WriteLine("You aren't even born yet!");
            }
        }
    }
}