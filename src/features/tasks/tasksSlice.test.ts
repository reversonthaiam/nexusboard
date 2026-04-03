import tasksReducer, {
  addTask,
  deleteTask,
  changeStatus,
  setFilter,
  updateTask,
  selectStats,
  selectFilteredTasks,
} from "./tasksSlice";
import type { TasksState } from "../../store/types";

const initialState: TasksState = {
  items: [],
  filter: "all",
};

const stateWithTasks: TasksState = {
  filter: "all",
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
  it("Adicionando uma nova task", () => {
    const newState = tasksReducer(
      initialState,
      addTask({
        title: "Nova task",
        description: "Descrição",
        status: "todo",
        priority: "high",
      }),
    );

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].title).toBe("Nova task");
  });

  it("Deve excluir uma atividade", () => {
    const newState = tasksReducer(stateWithTasks, deleteTask("1"));
    expect(newState.items).toHaveLength(1);
    expect(newState.items.find((e) => e.id === "1")).toBeUndefined();
  });

  it("Deve alterar o status", () => {
    const newState = tasksReducer(
      stateWithTasks,
      changeStatus({
        id: "1",
        status: "in_progress",
      }),
    );

    expect(newState.items.find((t) => t.id === "1")?.status).toBe(
      "in_progress",
    );
  });

  it('should set filter', () => {
  const newState = tasksReducer(initialState, setFilter('done'))
    expect(newState.filter).toBe('done')
  })

  it('should return correct stats', () => {

    const mockState = { tasks: stateWithTasks }

    const stats = selectStats(mockState as any)

    expect(stats.total).toBe(2)
    expect(stats.todo).toBe(1)
    expect(stats.done).toBe(1)
    expect(stats.progress).toBe(50) 
  })
});
