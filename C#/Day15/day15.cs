using System;

namespace Day15
{
    class Car
    {
        // use access modifiers (public/private) to control the accesibility of classes, methods, etc.
        // public: means anyone can access this along with other classes
        // private: only accessible within the same class, this is the ddefault if
        // you don't specify an access modifier
        public string color = "red";
    }
    class Fruit
    {
        public string fruit1 = "Mango";
        public string fruit2 = "Apple";
        public string fruit3 = "Pineapple";
    }
    class Program
    {
        static void Main(string[] args)
        {
            Car car_object1 = new Car();
            System.Console.WriteLine(car_object1.color);

            Fruit mango = new Fruit();
            Fruit apple = new Fruit();
            Fruit pineapple = new Fruit();
            System.Console.WriteLine(mango.fruit1);
            System.Console.WriteLine(apple.fruit2);
            System.Console.WriteLine(pineapple.fruit3);
        }
    }
}
