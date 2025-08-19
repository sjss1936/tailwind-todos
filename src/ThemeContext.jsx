import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  mode: "light",             // "light" | "dark"
  palette: "blue",           // "blue" | "green" | "purple" | "pink" | "orange"
  toggleMode: () => {},
  setPalette: () => {},
});

export const useTheme = () => useContext(ThemeContext);