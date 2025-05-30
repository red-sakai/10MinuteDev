using System;

namespace Day9
{
    class Program
    {
        static void Main(string[] args)
        {
            // foreach loop, this loop is used to loop through arrays only
            string[] names = { "Jhered", "Shaikah", "Yves", "Yve" };
            foreach (string name in names)
            {
                System.Console.WriteLine(name);
            }

            int[] ages = { 18, 19, 20, 18, 18, 18, 19, 23, 24, 20, 26 };
            foreach (int age in ages)
            {
                System.Console.WriteLine(age);
            }
        }
    }
}