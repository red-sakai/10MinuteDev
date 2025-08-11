# a tuple is a collection which is ordered and unchangeable
# tuple items are ordered, unchangeable, and allow duplicate values
# when we say ordered it means that the items have a defined order (based on what you put) and that order will not change
# unchangeable meaning that you can't change, add or remove items after the tuple has been initialized
# allow duplicate values, since tuples are indexed, they can have items with the same value
tuple1 = ("cherry", "banana", "apple")
print(tuple1)

# there is a workaround where you can change an element to tuples but you must convert it first to a list, then add the desired element, then convert it back to a tuple
x = ("apple", "banana", "cherry")
y = list(x)
y[1] = "kiwi"
x = tuple(y)

print(x)

# unpacking a tuple
# this way you're assigning the element depending on what order you put, in this case i put green as the first variable, it will automatically assign apple to it
fruits = ("apple", "banana", "cherry")

(green, yellow, red) = fruits

print(green)
print(yellow)
print(red)

# a tuple only has 2 built in methods
# count() - returns the number of times a specified value occurs in a tuple
# index() - searches the tuple for a specified value and returns the position of where it was found




# a set is a collection which is unordered, unchangeable, unindexed and do not allow duplicate values
set1 = {"apple", "banana", "cherry"}
print(set1)

# unordered means that the items in a set do not have a defined order

# once a set is created you cannot change its items, but you can add new items
set1.add("orange")
print(set1)

# you can add items from another set to the current set using update()
# the object in the update() method does not have to be a set, it can be any iterable object (tuples, lists, dictionaries, etc.)
set2 = {"kiwi", "lemon", "avocado"}
set1.update(set2)
print(set1)

# join sets
# there are several ways to join two or more sets
# union() and update() - joins all items from both sets
# intersection() - keeps ONLY the duplicates
# difference() - method keeps the items from the first set that are not in the other set(s)
# symmetric_difference() - method keeps all items except the duplicates