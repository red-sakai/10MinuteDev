using System;

namespace Day6
{
    class Program
    {
        static void Main(string[] args)
        {
            System.Console.WriteLine("You are driving in a vehicle and the traffic light displays the color: ");
            string traffic_light = Console.ReadLine();

            switch (traffic_light)
            {
                case "green":
                    System.Console.WriteLine("Go!");
                    break;
                case "red":
                    System.Console.WriteLine("Stop!");
                    break;
                case "yellow":
                    System.Console.WriteLine("Prepare to stop...");
                    break;
                case "blue":
                    System.Console.WriteLine("Are you a smurf?");
                    break;
                // default is like the else statement in switch cases
                default:
                    System.Console.WriteLine("The traffic light is broken!");
                    break;
            }
        }
    }
}