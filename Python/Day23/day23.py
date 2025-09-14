def adjacency_list(edges):
    adj = {}
    for u, v in edges:
        adj.setdefault(u, []).append(v)
        adj.setdefault(v, [])  # Ensure all nodes appear
    return adj

def adjacency_matrix(nodes, edges):
    idx = {node: i for i, node in enumerate(nodes)}
    n = len(nodes)
    matrix = [[0]*n for _ in range(n)]
    for u, v in edges:
        matrix[idx[u]][idx[v]] = 1
        matrix[idx[v]][idx[u]] = 1  # For undirected graphs
    return matrix

if __name__ == "__main__":
    edges = [(1, 2), (2, 3), (3, 4), (4, 1)]
    nodes = [1, 2, 3, 4]
    print("Adjacency List:", adjacency_list(edges))
    print("Adjacency Matrix:", adjacency_matrix(nodes, edges))