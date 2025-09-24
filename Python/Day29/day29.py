from functools import lru_cache
from typing import List, Tuple

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    """n-th Fibonacci number (0-indexed)."""
    if n < 0:
        raise ValueError("n must be non-negative")
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

def climb_stairs(n: int) -> int:
    """Number of ways to climb n stairs taking 1 or 2 steps."""
    if n < 0:
        raise ValueError("n must be non-negative")

    @lru_cache(maxsize=None)
    def ways(k: int) -> int:
        if k <= 1:
            return 1
        return ways(k - 1) + ways(k - 2)

    return ways(n)

def coin_change(coins: List[int], amount: int) -> int:
    """
    Minimum number of coins to make 'amount'; return -1 if impossible.
    """
    if amount < 0:
        return -1
    norm_coins: Tuple[int, ...] = tuple(sorted({c for c in coins if c > 0}))
    if amount == 0:
        return 0
    if not norm_coins:
        return -1

    @lru_cache(maxsize=None)
    def dp(rem: int) -> int:
        if rem == 0:
            return 0
        if rem < 0:
            return float("inf")
        best = min((1 + dp(rem - c) for c in norm_coins), default=float("inf"))
        return best

    res = dp(amount)
    return -1 if res == float("inf") else int(res)
