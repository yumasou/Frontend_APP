import { createContext, useState, useEffect, useContext } from "react";
const ThemeContent = createContext();
export function useTheme(){
  return useContext(ThemeContent)
}
function ThemeProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    if (mode == "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark")
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [mode]);
  return (
    <ThemeContent.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContent.Provider>
  );
}
export default ThemeProvider;
