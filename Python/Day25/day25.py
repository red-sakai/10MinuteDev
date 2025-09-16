def has_cycle_directed(adj):
    visited = set()
    rec_stack = set()

    def dfs(node):
        visited.add(node)
        rec_stack.add(node)
        for neighbor in adj.get(node, []):
            if neighbor not in visited:
                if dfs(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True
        rec_stack.remove(node)
        return False

    for node in adj:
        if node not in visited:
            if dfs(node):
                return True
    return False

def has_cycle_undirected(adj):
    visited = set()

    def dfs(node, parent):
        visited.add(node)
        for neighbor in adj.get(node, []):
            if neighbor not in visited:
                if dfs(neighbor, node):
                    return True
            elif neighbor != parent:
                return True
        return False

    for node in adj:
        if node not in visited:
            if dfs(node, None):
                return True
    return False

if __name__ == "__main__":
    # directed graph with cycle
    adj_directed = {1: [2], 2: [3], 3: [1]}
    print("Directed cycle:", has_cycle_directed(adj_directed))  # True

    # undirected graph with cycle
    adj_undirected = {1: [2], 2: [1, 3], 3: [2, 1]}
    print("Undirected cycle:", has_cycle_undirected(adj_undirected))  # True

    # directed graph without cycle
    adj_directed2 = {1: [2], 2: [3], 3: []}
    print("Directed cycle:", has_cycle_directed(adj_directed2))  # False

    # undirected graph without cycle
    adj_undirected2 = {1: [2], 2: [1, 3], 3: [2]}
    print("Undirected cycle:", has_cycle_undirected(adj_undirected2))  # False