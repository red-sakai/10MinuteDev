using System;

namespace Day18
{
    class Vehicle
    {
        public new string brand;

        public void run()
        {
            System.Console.WriteLine($"The {brand} vehicle is running.");
        }
    }

    class Car : Vehicle
    {
        // constructor
        public Car()
        {
            brand = "Lamborghini";
        }
    }

    class Bike : Vehicle
    {
        // constructor
        public Bike()
        {
            brand = "BMX";
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Car my_car = new Car();
            Bike my_bike = new Bike();

            my_bike.run();
            my_car.run();
        }
    }
}