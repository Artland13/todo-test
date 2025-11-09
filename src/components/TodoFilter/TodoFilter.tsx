import React from "react";
import type  { FilterType } from "../../types/todo";
import styles from "./TodoFilter.module.scss";

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  currentFilter,
  onFilterChange,
  activeCount,
}) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "Все" },
    { key: "active", label: "Активные" },
    { key: "completed", label: "Выполненные" },
  ];

  return (
    <div className={styles.filter}>
      <div className={styles.count}>
        Осталось задач: <strong>{activeCount}</strong>
      </div>
      <div className={styles.buttons}>
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`${styles.button} ${
              currentFilter === key ? styles.active : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
