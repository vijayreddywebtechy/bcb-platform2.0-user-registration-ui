"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CustomizationSettings {
  darkMode: boolean;
  cashFlows: boolean;
  myLinks: {
    enabled: boolean;
    items: {
      documents: boolean;
      queryTracker: boolean;
      helpCenter: boolean;
      accounts: boolean;
    };
  };
  businessAccounts: boolean;
  digitalHubLinks: boolean;
  formalStatements: boolean;
}

interface DashboardCustomizationContextType {
  settings: CustomizationSettings;
  updateSettings: (newSettings: CustomizationSettings) => void;
  resetSettings: () => void;
}

const defaultSettings: CustomizationSettings = {
  darkMode: false,
  cashFlows: true,
  myLinks: {
    enabled: true,
    items: {
      documents: true,
      queryTracker: true,
      helpCenter: true,
      accounts: true,
    },
  },
  businessAccounts: true,
  digitalHubLinks: true,
  formalStatements: true,
};

const DashboardCustomizationContext = createContext<DashboardCustomizationContextType | undefined>(
  undefined
);

export function DashboardCustomizationProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<CustomizationSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("dashboardCustomization");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
      } catch (error) {
        console.error("Failed to parse saved settings:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("dashboardCustomization", JSON.stringify(settings));
      console.log("Dashboard settings saved:", settings);
    }
  }, [settings, isLoaded]);

  // Apply dark mode class to body
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  const updateSettings = (newSettings: CustomizationSettings) => {
    setSettings(newSettings);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("dashboardCustomization");
  };

  return (
    <DashboardCustomizationContext.Provider
      value={{ settings, updateSettings, resetSettings }}
    >
      {children}
    </DashboardCustomizationContext.Provider>
  );
}

export function useDashboardCustomization() {
  const context = useContext(DashboardCustomizationContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardCustomization must be used within a DashboardCustomizationProvider"
    );
  }
  return context;
}
