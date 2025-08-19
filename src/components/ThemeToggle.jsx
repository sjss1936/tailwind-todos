import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/ThemeContext";

export default function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  const prefersReduced = useReducedMotion();
  const dark = mode === "dark";

  return (
    <motion.button onClick={toggleMode}
      whileHover={prefersReduced ? {} : { scale: 1.03 }}
      whileTap={prefersReduced ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="inline-flex items-center gap-2 rounded-full border border-app bg-card px-3 py-2 text-sm hover:bg-accent-weak transition"
      title="라이트/다크 전환"
    >
      <motion.span key={dark ? "sun" : "moon"}
        initial={prefersReduced ? false : { rotate: -90, opacity: 0 }}
        animate={prefersReduced ? {} : { rotate: 0, opacity: 1 }}
        exit={prefersReduced ? {} : { rotate: 90, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`inline-block h-3 w-3 rounded-full ${dark ? "bg-yellow-300" : "bg-zinc-800"}`}
      />
      {dark ? "Dark" : "Light"}
    </motion.button>
  );
}