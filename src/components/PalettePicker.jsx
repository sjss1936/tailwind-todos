import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/ThemeContext";

const palettes = [
  { key: "blue",   label: "Blue",   dot: "bg-blue-500" },
  { key: "green",  label: "Green",  dot: "bg-emerald-500" },
  { key: "purple", label: "Purple", dot: "bg-violet-500" },
  { key: "pink",   label: "Pink",   dot: "bg-pink-500" },
  { key: "orange", label: "Orange", dot: "bg-amber-500" },
];

export default function PalettePicker() {
  const { palette, setPalette } = useTheme();
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative inline-flex items-center gap-2">
      {palettes.map((p) => {
        const active = palette === p.key;
        return (
          <motion.button key={p.key}
            onClick={() => setPalette(p.key)}
            whileHover={prefersReduced ? {} : { y: -1 }}
            whileTap={prefersReduced ? {} : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`relative flex items-center gap-2 rounded-full border border-app bg-card px-3 py-2 text-sm hover:bg-accent-weak transition ${
              active ? "ring-accent" : ""
            }`}
            title={`${p.label} 팔레트`}
            layout
          >
            <span className={`h-3 w-3 rounded-full ${p.dot}`} />
            {p.label}
            {active && (
              <motion.span layoutId="paletteIndicator"
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: "0 0 0 4px var(--accent-weak)" }}
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}