using System;

namespace Day14
{
    class Program
    {
        static void WordCounter(string word)
        {
            int ctr = 0;
            System.Console.WriteLine("Input a word:");

            while (true)
            {
                string[] splitword = word.Split(" ");

                foreach (string singleword in splitword)
                {
                    ctr++;
                    System.Console.WriteLine($"Total words: {ctr}");
                }
                break;
            }
        }

        static void Main(string[] args)
        {
            WordCounter("Jhered Miguel Republica Hello World");
        }
    }
}