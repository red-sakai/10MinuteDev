from collections import deque

def bfs(adj, start):
    visited = set()
    queue = deque([start])
    order = []
    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.add(node)
            order.append(node)
            queue.extend(n for n in adj.get(node, []) if n not in visited)
    return order

def dfs(adj, start, visited=None, order=None):
    if visited is None:
        visited = set()
    if order is None:
        order = []
    visited.add(start)
    order.append(start)
    for neighbor in adj.get(start, []):
        if neighbor not in visited:
            dfs(adj, neighbor, visited, order)
    return order

if __name__ == "__main__":
    adj = {
        1: [2, 3],
        2: [4],
        3: [4],
        4: []
    }
    print("BFS:", bfs(adj, 1))  # [1, 2, 3, 4]
    print("DFS:", dfs(adj, 1))  # [1, 2, 4, 3]