# dictionaries are used to store data values in key:value pairs
# a dictionary is a collection which is ordered, changeable, and do not allow duplicates

dict1 = {"Jhered": "Shaikah",
         "year" : 2023}

print(dict1)
print(dict1["Jhered"])
# dictionaries cannot have two items with the same key

# you can change a value inside a dictionary
dict1["year"] = 2025
print(dict1)

# you can also add a new key:value pair
dict1["color"] = "red"
print(dict1)

# you can also remove items
dict1.pop("color")
print(dict1)