import React from "react";
import type  { Todo, FilterType } from "../../types/todo";
import { TodoItem } from "../TodoItem/TodoItem";
import styles from "./TodoList.module.scss";

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

  if (filteredTodos.length === 0) {
    return (
      <div className={styles.emptyState}>
        {filter === "all" && "Пока нет задач. Добавьте первую!"}
        {filter === "active" && "Все задачи выполнены!"}
        {filter === "completed" && "Нет выполненных задач"}
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
