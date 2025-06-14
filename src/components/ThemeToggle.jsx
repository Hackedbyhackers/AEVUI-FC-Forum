import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Sparkles, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const themes = [
  { name: "neon", icon: Sparkles },
  { name: "vivid", icon: Sun },
  { name: "life", icon: Leaf },
  { name: "dark", icon: Moon },
];

export default function ThemeTogglePanel() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-20 left-2 bg-white dark:bg-gray-800 shadow-lg p-2 rounded-2xl z-50"
    >
      <div className="flex flex-col space-y-2">
        {themes.map(({ name, icon: Icon }) => (
          <motion.button
            key={name}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(name)}
            className={`p-2 rounded-full border-2 transition-colors duration-300 ${
              theme === name
                ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                : "border-transparent hover:border-gray-400"
            }`}
          >
            <Icon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
