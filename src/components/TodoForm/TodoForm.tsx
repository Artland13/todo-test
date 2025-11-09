import React, { useState } from "react";
import styles from "./TodoForm.module.scss";

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText) {
      onAdd(trimmedText);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Что нужно сделать?"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Добавить
      </button>
    </form>
  );
};
