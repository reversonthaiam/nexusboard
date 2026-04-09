import tasksReducer, {
  setFilter,
  selectStats,
  selectFilteredTasks,
} from "./tasksSlice";
import type { TasksState } from "../../store/types";

const initialState: TasksState = {
  items: [],
  filter: "all",
  loading: false,
  error: null,
};

const stateWithTasks: TasksState = {
  filter: "all",
  loading: false,
  error: null,
  items: [
    {
      id: "1",
      title: "Task one",
      description: "Description one",
      status: "todo",
      priority: "high",
      createdAt: "2026-01-01",
    },
    {
      id: "2",
      title: "Task two",
      description: "Description two",
      status: "done",
      priority: "low",
      createdAt: "2026-01-02",
    },
  ],
};

describe("Task", () => {
  it("should set filter", () => {
    const newState = tasksReducer(initialState, setFilter("done"));
    expect(newState.filter).toBe("done");
  });

  it("should return correct stats", () => {
    const mockState = { tasks: stateWithTasks };
    const stats = selectStats(mockState as any);
    expect(stats.total).toBe(2);
    expect(stats.todo).toBe(1);
    expect(stats.done).toBe(1);
    expect(stats.progress).toBe(50);
  });

  it("should return filtered tasks", () => {
    const mockState = { tasks: stateWithTasks };
    const filtered = selectFilteredTasks({
      ...mockState,
      tasks: { ...stateWithTasks, filter: "todo" },
    } as any);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].status).toBe("todo");
  });
});
