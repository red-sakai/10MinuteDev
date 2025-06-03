using System;

namespace Day16
{
    class Car
    {
        // Private fields
        private string _color;
        private int _maxSpeed;

        // Public properties
        public int maxSpeed
        {
            get { return _maxSpeed; }
            set { _maxSpeed = value; }
        }
        public string Color
        {
            get { return _color; }
            set { _color = value; }
        }

    }
    class Program
    {
        static void Main(string[] args)
        {
            Car car_object = new Car();
            car_object.Color = "red";
            car_object.maxSpeed = 300;
            System.Console.WriteLine($"The {car_object.Color} colored car is going {car_object.maxSpeed}mph!!!");
        }
    }
}