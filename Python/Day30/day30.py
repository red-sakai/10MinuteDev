from __future__ import annotations
from dataclasses import dataclass, field
from typing import Dict, List, Set, Tuple, Optional, Iterable
import heapq

@dataclass
class Task:
    id: int
    name: str
    duration: int = 1
    priority: int = 0
    dependencies: Set[int] = field(default_factory=set)

class TaskPlanner:
    def __init__(self) -> None:
        self._tasks: Dict[int, Task] = {}
        self._next_id: int = 1
        self._adj: Dict[int, List[int]] = {}
        self._in_degree: Dict[int, int] = {}
        self._completed: Set[int] = set()

    def add_task(self, name: str, duration: int = 1, priority: int = 0) -> int:
        if duration <= 0:
            raise ValueError("duration must be positive")
        tid = self._next_id
        self._next_id += 1
        task = Task(tid, name, duration, priority)
        self._tasks[tid] = task
        self._adj.setdefault(tid, [])
        self._in_degree.setdefault(tid, 0)
        return tid

    def add_dependency(self, task_id: int, depends_on: int) -> None:
        if task_id == depends_on:
            raise ValueError("Task cannot depend on itself")
        if task_id not in self._tasks or depends_on not in self._tasks:
            raise KeyError("Invalid task id(s)")
        task = self._tasks[task_id]
        if depends_on in task.dependencies:
            return
        task.dependencies.add(depends_on)
        self._adj.setdefault(depends_on, []).append(task_id)
        self._in_degree[task_id] = self._in_degree.get(task_id, 0) + 1
        self._in_degree.setdefault(depends_on, self._in_degree.get(depends_on, 0))

    def tasks(self) -> Iterable[Task]:
        return self._tasks.values()

    def _clone_in_degree(self) -> Dict[int, int]:
        return dict(self._in_degree)

    def topological_order(self) -> List[int]:
        in_deg = self._clone_in_degree()
        heap: List[int] = [tid for tid, d in in_deg.items() if d == 0]
        # Use simple list as queue (stable). Could use priority; keep insertion order.
        order: List[int] = []
        idx = 0
        while idx < len(heap):
            node = heap[idx]
            idx += 1
            order.append(node)
            for nxt in self._adj.get(node, []):
                in_deg[nxt] -= 1
                if in_deg[nxt] == 0:
                    heap.append(nxt)
        if len(order) != len(self._tasks):
            raise ValueError("Cycle detected in task dependencies")
        return order

    def compute_schedule(self) -> Dict[int, Tuple[int, int]]:
        topo = self.topological_order()
        earliest_start: Dict[int, int] = {}
        earliest_finish: Dict[int, int] = {}
        for tid in topo:
            task = self._tasks[tid]
            if not task.dependencies:
                earliest_start[tid] = 0
            else:
                earliest_start[tid] = max(earliest_finish[d] for d in task.dependencies)
            earliest_finish[tid] = earliest_start[tid] + task.duration
        return {tid: (earliest_start[tid], earliest_finish[tid]) for tid in topo}

    def critical_path(self) -> Tuple[List[int], int]:
        schedule = self.compute_schedule()
        # Find task with max finish
        end_task = max(schedule.items(), key=lambda kv: kv[1][1])[0]
        finish_time = schedule[end_task][1]
        # Backtrack
        path = [end_task]
        cur = end_task
        while self._tasks[cur].dependencies:
            deps = list(self._tasks[cur].dependencies)
            # Choose dependency that allows current start time
            cur_start = schedule[cur][0]
            chosen = None
            for d in deps:
                if schedule[d][1] == cur_start:
                    if chosen is None or schedule[d][1] > schedule[chosen][1]:
                        chosen = d
            if chosen is None:
                break
            path.append(chosen)
            cur = chosen
        path.reverse()
        return path, finish_time

    def next_available_tasks(self) -> List[Task]:
        # Return tasks ready to execute (all deps completed), ordered by priority desc
        ready: List[Tuple[int, int]] = []
        for tid, task in self._tasks.items():
            if tid in self._completed:
                continue
            if all(d in self._completed for d in task.dependencies):
                # Use negative priority for max-heap behavior
                heapq.heappush(ready, (-task.priority, tid))
        result = []
        while ready:
            _, tid = heapq.heappop(ready)
            result.append(self._tasks[tid])
        return result

    def complete(self, task_id: int) -> None:
        if task_id not in self._tasks:
            raise KeyError("Task not found")
        if not all(d in self._completed for d in self._tasks[task_id].dependencies):
            raise ValueError("Cannot complete task; dependencies incomplete")
        self._completed.add(task_id)

    def reset_progress(self) -> None:
        self._completed.clear()

    def summary(self) -> str:
        schedule = {}
        try:
            schedule = self.compute_schedule()
        except ValueError:
            pass
        lines = []
        for t in sorted(self._tasks.values(), key=lambda x: x.id):
            est = schedule.get(t.id, ("?", "?"))
            deps = ",".join(map(str, sorted(t.dependencies))) or "-"
            done = "✓" if t.id in self._completed else " "
            lines.append(f"[{done}] #{t.id:<2} {t.name:<15} dur={t.duration:<2} pr={t.priority:<2} deps={deps:<8} EST={est[0]} EFT={est[1]}")
        return "\n".join(lines)

# Demo CLI (basic loop).
def _demo() -> None:
    planner = TaskPlanner()
    # Sample tasks
    a = planner.add_task("Design", duration=3, priority=5)
    b = planner.add_task("API", duration=4, priority=4)
    c = planner.add_task("Frontend", duration=5, priority=3)
    d = planner.add_task("Integrate", duration=2, priority=5)
    e = planner.add_task("Test", duration=3, priority=4)
    f = planner.add_task("Deploy", duration=1, priority=5)

    planner.add_dependency(b, a)
    planner.add_dependency(c, a)
    planner.add_dependency(d, b)
    planner.add_dependency(d, c)
    planner.add_dependency(e, d)
    planner.add_dependency(f, e)

    print("Task Planner Demo. Type 'help' for commands.")
    while True:
        cmd = input("> ").strip().split()
        if not cmd:
            continue
        op = cmd[0].lower()
        try:
            if op == "help":
                print("Commands:")
                print(" list | add <name> <duration> [priority] | dep <task> <depends_on>")
                print(" schedule | critical | next | done <id> | reset | quit")
            elif op == "list":
                print(planner.summary())
            elif op == "add":
                if len(cmd) < 3:
                    print("Usage: add <name> <duration> [priority]")
                    continue
                name = cmd[1]
                duration = int(cmd[2])
                priority = int(cmd[3]) if len(cmd) > 3 else 0
                tid = planner.add_task(name, duration, priority)
                print(f"Added task #{tid}")
            elif op == "dep":
                if len(cmd) != 3:
                    print("Usage: dep <task_id> <depends_on_id>")
                    continue
                planner.add_dependency(int(cmd[1]), int(cmd[2]))
                print("Dependency added.")
            elif op == "schedule":
                sched = planner.compute_schedule()
                for tid, (s, f) in sched.items():
                    print(f"#{tid} {planner._tasks[tid].name}: start {s}, finish {f}")
            elif op == "critical":
                path, total = planner.critical_path()
                names = " -> ".join(f"#{tid}:{planner._tasks[tid].name}" for tid in path)
                print(f"Critical path ({total} total): {names}")
            elif op == "next":
                tasks = planner.next_available_tasks()
                if not tasks:
                    print("No available tasks.")
                else:
                    for t in tasks:
                        print(f"#{t.id} {t.name} (priority {t.priority})")
            elif op == "done":
                if len(cmd) != 2:
                    print("Usage: done <task_id>")
                    continue
                planner.complete(int(cmd[1]))
                print("Marked complete.")
            elif op == "reset":
                planner.reset_progress()
                print("Progress cleared.")
            elif op == "quit" or op == "exit":
                break
            else:
                print("Unknown command.")
        except Exception as ex:
            print(f"Error: {ex}")

if __name__ == "__main__":
    _demo()
