using System;

namespace Day12
{
    class Program
    {
        static void Main(string[] args)
        {
            string txt = "Hello World";
            System.Console.WriteLine(txt.ToUpper());
            System.Console.WriteLine(txt.ToLower());

            // .IndexOf() returns the index of the specified element and .Substring()
            // extracts the characters starting from the specified index, it's like
            // txt[6::]
            int index = txt.IndexOf("W");
            string result = txt.Substring(index);
            System.Console.WriteLine(result);
        }
    }
}