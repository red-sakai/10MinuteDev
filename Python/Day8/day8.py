"""
Recursion is a programming technique where a function calls itself to solve a problem. 
Each recursive call works on a smaller or simpler version of the original problem, and 
the process continues until it reaches a base case (a condition where the function stops 
calling itself).
"""

def Fibonacci(idx):
    if idx <= 1:
        return idx # base case
    else:
        return Fibonacci(idx-1) + Fibonacci(idx-2) # recursive call

print(Fibonacci(3))