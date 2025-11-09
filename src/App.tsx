import React, { useCallback } from "react";
import type  { Todo, FilterType } from "./types/todo";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoFilter } from "./components/TodoFilter/TodoFilter";
import "./index.scss";

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = React.useState<FilterType>("all");

  const addTodo = useCallback(
    (text: string) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date(),
      };
      setTodos((prev: Todo[]) => [...prev, newTodo]);
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prev: Todo[]) =>
        prev.map((todo: Todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id));
    },
    [setTodos]
  );

  const editTodo = useCallback(
    (id: string, newText: string) => {
      setTodos((prev: Todo[]) =>
        prev.map((todo: Todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
    },
    [setTodos]
  );

  const activeCount = todos.filter((todo: Todo) => !todo.completed).length;

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center">📝 Список задач</h1>

        <TodoForm onAdd={addTodo} />

        <TodoFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
        />

        <TodoList
          todos={todos}
          filter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </div>
  );
}

export default App;
