import { motion, useReducedMotion } from "framer-motion";

export default function FilterBar({
  filter,
  setFilter,
  remaining,
  hasCompleted,
  onClearCompleted,
}) {
  const prefersReduced = useReducedMotion();

  const tab = (key, label) => (
    <motion.button key={key}
      onClick={() => setFilter(key)}
      whileHover={prefersReduced ? {} : { y: -1 }}
      whileTap={prefersReduced ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative px-3 py-2 text-sm rounded-lg border border-app bg-card hover:bg-accent-weak transition ${
        filter === key ? "ring-accent" : ""
      }`}
      aria-selected={filter === key}
      role="tab"
      layout
    >
      {label}
    </motion.button>
  );

  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-sm text-muted">
        남은 일: <span className="font-medium">{remaining}</span>개
      </span>
      <div className="ml-auto inline-flex items-center gap-2" role="tablist" aria-label="필터">
        {tab("all", "전체")}
        {tab("active", "미완료")}
        {tab("completed", "완료")}
        <motion.button onClick={onClearCompleted}
          disabled={!hasCompleted}
          whileTap={prefersReduced ? {} : { scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="px-3 py-2 text-sm rounded-lg border border-app bg-card hover:bg-accent-weak disabled:opacity-50 disabled:cursor-not-allowed transition"
          title="완료 항목 비우기"
        >
          완료 비우기
        </motion.button>
      </div>
    </div>
  );
}