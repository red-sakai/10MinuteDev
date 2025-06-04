using System;

namespace Day17
{
    class Car
    {
        public string model;
        public int year;
        public string color;

        public Car(string model_name, int year_made, string car_color)
        {
            model = model_name;
            year = year_made;
            color = car_color;
        }

        static void Main(string[] args)
        {
            Car Lamborghini = new Car("Urus", 2020, "Red");

            System.Console.WriteLine($"I have a {Lamborghini.model} that was made in {Lamborghini.year} and has the color {Lamborghini.color}.");
        }
    }
}