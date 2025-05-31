using System;
using System.Collections.Generic;
// this is a namespace in C# that provides generic collection types such as Lists, Dictionaries,
// Queues, and Stacks

namespace Day11
{
    class Program
    {
        static void Main(string[] args)
        {
            /*
            List methods: (frequently used when dealing with lists, but there's more) - past jhered
            .Add()
            .AddRange()
            .Contains()
            .Remove() or .RemoveAt()
            .Clear()
            .ToArray()
            .Find() or .FindAll()
            .ForEach()
            .Sort()
            .IndexOf() or .Insert()
            */


            // creates new list and add elements to it later using .Add() in list
            List<int> ages = new List<int>();
            ages.Add(19);
            ages.Add(20);
            ages.Add(21);
            System.Console.WriteLine(string.Join(", ", ages));

            // .AddRange() adds all items from names2 to names1
            List<string> names1 = new List<string> { "Jhered", "Shaikah" };
            List<string> names2 = new List<string> { "Jian", "Trisha", "Rainier" };
            names1.AddRange(names2);
            System.Console.WriteLine(string.Join(", ", names1));

            // .Contains() returns True or False depending if the array contains the value inside the ()
            // in this case it returns false because the list does not contain the number 10
            List<int> number3 = new List<int> { 1, 2, 3, 4, 5 };
            bool hasNumber = number3.Contains(10);
            System.Console.WriteLine(hasNumber);

            // .Remove() removes the inputted element inside the array
            List<string> names3 = new List<string> { "Jhered", "Shaikah", "DeadFall" };
            names3.Remove("DeadFall");
            System.Console.WriteLine(string.Join(", ", names3));

            // .RemoveAt() removes the element inside the array based on the index
            names3.RemoveAt(0);
            System.Console.WriteLine(string.Join(", ", names3));

            // .Clear() clears all the elements inside the array
            List<int> numbers4 = new List<int> { 5, 10, 15, 20, 25 };
            numbers4.Clear();
            System.Console.WriteLine(string.Join(", ", numbers4));

            // .ToArray() add soon when you get how DSA works in C# - past jhered

            // refer to line 42-44
            // the => means that it is a lambda operation, it is a short way to write anonymous functions
            // (functions without a name)
            // the .Find() searches for an element that matches the condition and finds the first occurence of it
            int result = number3.Find(n => n > 10);
            System.Console.WriteLine(result);

            /*
            n => n > 10 means

            bool isGreaterThan10(int n)
            {
                return n > 10;
            }
            */

            // the .FindAll() is similar to .Find() it also searches for an element that matches the
            // condition but instead of the first occurence, it retrieves ALL the elements that fulfills
            // the condition
            List<int> result2 = number3.FindAll(n => n > 2);
            System.Console.WriteLine(string.Join(", ", result2));

            // .ForEach() functions just like a normal foreach loop
            names1.ForEach(name => System.Console.WriteLine($"Hello {name}"));

            // .Sort() allows to arrange the array alphabetically or numerically order them
            int[] numbers6 = { 10, 2, 9, 6, 4 };
            Array.Sort(numbers6);
            foreach (int number in numbers6)
            {
                System.Console.WriteLine(number);
            }

            // .IndexOf() returns the index value of the input element
            string name = "Jhered Miguel";
            int index1 = name.IndexOf("M");
            System.Console.WriteLine($"The index of M is: {index1}");

            
        }
    }
}