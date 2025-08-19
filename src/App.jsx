import { useMemo, useState } from "react";
import { useTheme } from "./ThemeContext";
import PalettePicker from "@components/PalettePicker";
import ThemeToggle from "@components/ThemeToggle";
import TodoInput from "@components/TodoInput";
import FilterBar from "@components/FilterBar";
import TodoList from "@components/TodoList";

export default function App() {
  const { mode } = useTheme();
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos") || "[]"));
  const [filter, setFilter] = useState("all"); // all | active | completed
  const persist = (next) => localStorage.setItem("todos", JSON.stringify(next));

  const addTodo = (text) => {
    if (!text.trim()) return;
    const next = [...todos, { id: Date.now(), text: text.trim(), completed: false }];
    setTodos(next); persist(next);
  };
  const toggleTodo = (id) => {
    const next = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setTodos(next); persist(next);
  };
  const deleteTodo = (id) => {
    const next = todos.filter((t) => t.id !== id);
    setTodos(next); persist(next);
  };
  const clearCompleted = () => {
    const next = todos.filter((t) => !t.completed);
    setTodos(next); persist(next);
  };

  const remaining = todos.filter((t) => !t.completed).length;
  const filtered = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  return (
    <div className="min-h-screen bg-app text-app">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <header className="mb-6 flex items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">📝 Todo List</h1>
          <div className="flex items-center gap-2">
            <PalettePicker />
            <ThemeToggle />
          </div>
        </header>

        <div className="rounded-2xl bg-card p-5 shadow-xl border border-app">
          <TodoInput onAdd={addTodo} />
          <FilterBar
            filter={filter}
            setFilter={setFilter}
            remaining={remaining}
            hasCompleted={todos.some((t) => t.completed)}
            onClearCompleted={clearCompleted}
          />
          <TodoList todos={filtered} onToggle={toggleTodo} onDelete={deleteTodo} />
          <p className="mt-2 text-sm text-muted">
            모드: <span className="font-medium">{mode}</span> · 총 {todos.length}개
          </p>
        </div>
      </div>
    </div>
  );
}