import React, { useState } from "react";
import type  { Todo } from "../../types/todo";
import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    const trimmedText = editText.trim();
    if (trimmedText) {
      onEdit(todo.id, trimmedText);
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div className={`${styles.item} ${todo.completed ? styles.completed : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className={styles.checkbox}
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyPress}
          className={styles.editInput}
          autoFocus
        />
      ) : (
        <span className={styles.text} onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </span>
      )}

      <div className={styles.actions}>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={styles.editButton}
          title={isEditing ? "Сохранить" : "Редактировать"}
        >
          {isEditing ? "✓" : "✎"}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className={styles.deleteButton}
          title="Удалить"
        >
          ×
        </button>
      </div>
    </div>
  );
};
