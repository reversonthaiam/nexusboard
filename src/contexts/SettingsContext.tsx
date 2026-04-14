import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface SettingsContextData {
  userName: string;
  theme: "light" | "dark";
  notifications: boolean;
  updateUserName: (name: string) => void;
  toggleTheme: () => void;
  toggleNotifications: () => void;
}

const SettingsContext = createContext<SettingsContextData | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState("Reverson");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notifications, setNotifications] = useState(true);

  function updateUserName(name: string) {
    setUserName(name);
  }

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  function toggleNotifications() {
    setNotifications((prev) => !prev);
  }

  return (
    <SettingsContext.Provider
      value={{
        userName,
        theme,
        notifications,
        updateUserName,
        toggleTheme,
        toggleNotifications,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
}
