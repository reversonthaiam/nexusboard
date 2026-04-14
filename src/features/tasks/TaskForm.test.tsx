import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import settingsReducer from "../settings/settingsSlice";
import { TaskForm } from "./TaskForm";

jest.mock("../../repositories/taskRepository", () => ({
  taskRepository: {
    getAll: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue({
      id: "999",
      title: "Nova task",
      description: "Descrição teste",
      status: "todo",
      priority: "medium",
      createdAt: "2026-01-01T00:00:00.000Z",
    }),
    update: jest.fn().mockResolvedValue({
      id: "1",
      title: "Titulo atualizado",
      description: "Descrição teste",
      status: "todo",
      priority: "medium",
      createdAt: "2026-01-01T00:00:00.000Z",
    }),
    remove: jest.fn(),
  },
}));

function makeStore() {
  return configureStore({
    reducer: {
      tasks: tasksReducer,
      settings: settingsReducer,
    },
  });
}

it("Validar formulario", async () => {
  const store = makeStore()

  render(
    <Provider store={store}>
      <TaskForm isOpen onClose={() => {}} task={null} />
    </Provider>,
  );

  fireEvent.change(screen.getByLabelText("Title"), {
    target: { value: "Nova task" },
  });

  fireEvent.change(screen.getByLabelText("Description"), {
    target: { value: "Descrição teste" },
  });

  fireEvent.click(screen.getByText("Create task"));

  await waitFor(() => {
    expect(store.getState().tasks.items).toHaveLength(1);
  });
});

it("Validar edição", async () => {
  const tasks = {
    id: "1",
    title: "Task original", 
    description: "Descrição teste",
    status: "todo" as const,
    priority: "medium" as const,
    createdAt: "2026-01-01T00:00:00.000Z",
  }

  const store = configureStore({
    reducer: { tasks: tasksReducer, settings: settingsReducer },
    preloadedState: {
      tasks: {
        items: [tasks],
        filter: 'all' as const,
        loading: false,
        error: null,
      }
    }
  })
  
  render(
    <Provider store={store}>
      <TaskForm isOpen task={tasks} onClose={() => {}} />
    </Provider>,
  );

  fireEvent.change(screen.getByLabelText("Title"), {
    target: { value: "Titulo atualizado" },
  });

  fireEvent.click(screen.getByText("Save changes"));

  await waitFor(() => {
    const task = store.getState().tasks.items.find((t) => t.id === "1");
    expect(task?.title).toBe("Titulo atualizado");
  });
});
