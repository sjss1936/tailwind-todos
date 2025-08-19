import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState("");
  const prefersReduced = useReducedMotion();

  const submit = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <motion.input layout
        className="flex-1 rounded-xl border border-app bg-card px-4 py-3 outline-none text-app placeholder:text-muted
                   focus:border-transparent focus:outline-none focus:ring-4 ring-accent transition"
        placeholder="할 일을 입력하고 Enter ⏎"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        aria-label="할 일 입력"
        whileFocus={prefersReduced ? {} : { boxShadow: "0 0 0 6px var(--accent-weak)" }}
      />
      <motion.button onClick={submit}
        whileHover={prefersReduced ? {} : { scale: 1.02 }}
        whileTap={prefersReduced ? {} : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="rounded-xl bg-accent px-4 py-3 text-white font-medium hover:opacity-90 active:translate-y-px transition"
      >
        추가
      </motion.button>
    </div>
  );
}