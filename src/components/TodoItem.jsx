import { motion } from "framer-motion";

export default function TodoItem({ todo, onToggle, onDelete, prefersReduced }) {
  const itemVariants = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 8, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -8, scale: 0.98 },
      };

  return (
    <motion.li layout
      {...itemVariants}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
      className="flex items-center justify-between rounded-xl border border-app bg-card px-4 py-3"
    >
      <label className="flex items-center gap-3">
        <motion.input type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="h-5 w-5 accent-[var(--accent)]"
          aria-label="완료 전환"
          whileTap={prefersReduced ? {} : { scale: 0.85 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        />
        <motion.span layout
          className={`text-base ${todo.completed ? "line-through text-muted" : ""}`}
          animate={prefersReduced ? {} : { opacity: todo.completed ? 0.75 : 1 }}
          transition={{ duration: 0.15 }}
        >
          {todo.text}
        </motion.span>
      </label>

      <motion.button onClick={onDelete}
        whileHover={prefersReduced ? {} : { scale: 1.05 }}
        whileTap={prefersReduced ? {} : { scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className="h-8 w-8 rounded-lg bg-[var(--danger-bg)] text-[var(--danger)] text-lg leading-none hover:opacity-90 active:translate-y-px transition"
        aria-label="삭제"
      >
        ×
      </motion.button>
    </motion.li>
  );
}