import { configureStore } from "@reduxjs/toolkit";
import { taskRepository } from "../../repositories/taskRepository";
import tasksReducer from "./tasksSlice";
import settingsReducer from "../settings/settingsSlice";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TasksList";

jest.mock("../../repositories/taskRepository", () => ({
  taskRepository: {
    remove: jest.fn().mockResolvedValue(undefined),
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

it("Validar exclusão de task", async () => {
  const tasks = {
    id: "1",
    title: "Task original",
    description: "Descrição teste",
    status: "todo" as const,
    priority: "medium" as const,
    createdAt: "2026-01-01T00:00:00.000Z",
  };

  const store = configureStore({
    reducer: { tasks: tasksReducer, settings: settingsReducer },
    preloadedState: {
      tasks: {
        items: [tasks],
        filter: "all" as const,
        loading: false,
        error: null,
      },
    },
  });

  render(
    <Provider store={store}>
      <TaskList onEdit={() => {}} />
    </Provider>,
  );

  fireEvent.click(screen.getByText("Delete"));

  await waitFor(() => {
    expect(store.getState().tasks.items).toHaveLength(0);
  });
});
