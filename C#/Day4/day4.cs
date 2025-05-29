using System;

namespace Day4
{
    class Program
    {
        static void Main(string[] args)
        {
            /*
            Typecasting methods:
            - Convert.ToInt32()
            - Convert.ToDouble()
            - Convert.ToSingle()
            - Convert.ToDecimal()
            - Convert.ToBoolean()
            - Convert.ToString()
            - Convert.ToChar()
            - Convert.ToInt64()
            - Convert.ToInt16()
            - Convert.ToByte()
            */

            
            // Addition
            System.Console.WriteLine("Input an integer 1: ");
            int number1 = Convert.ToInt32(Console.ReadLine());
            System.Console.WriteLine("Input an integer 2: ");
            int number2 = Convert.ToInt32(Console.ReadLine());
            System.Console.WriteLine("The answer is: " + (number1 + number2));
            

            
            // Subtraction
            System.Console.WriteLine("Input an integer 1: ");
            int number3 = Convert.ToInt32(Console.ReadLine());
            System.Console.WriteLine("Input an integer 2: ");
            int number4 = Convert.ToInt32(Console.ReadLine());
            System.Console.WriteLine("The answer is: " + (number3 - number4));
            

            
            // Multiplication
            System.Console.WriteLine("Input an integer 1: ");
            int number5 = Convert.ToInt32(Console.ReadLine());
            System.Console.WriteLine("Input an integer 2: ");
            int number6 = Convert.ToInt32(Console.ReadLine());
            System.Console.WriteLine("The answer is: " + (number5 * number6));
            

            
            // Division
            System.Console.WriteLine("Input an integer 1: ");
            int number7 = Convert.ToInt32(Console.ReadLine());
            System.Console.WriteLine("Input an integer 2: ");
            int number8 = Convert.ToInt32(Console.ReadLine());
            System.Console.WriteLine("The answer is: " + (number7 / number8));
            

            
            // Exponent
            System.Console.WriteLine("Input an integer 1: ");
            int number9 = Convert.ToInt32(Console.ReadLine());
            System.Console.WriteLine("Input an integer 2: ");
            int number10 = Convert.ToInt32(Console.ReadLine());
            System.Console.WriteLine("The answer is: " + Math.Pow(number9, number10));
            
        }
    }
}