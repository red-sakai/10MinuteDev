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
        }
    }
}