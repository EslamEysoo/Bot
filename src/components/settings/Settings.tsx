import React, { useState } from "react";
import SettingsCategories from "./SettingsCategories";
import SettingsPanel from "./SettingsPanel";

interface SettingsProps {
  initialCategory?: string;
}

const Settings = ({ initialCategory = "profile" }: SettingsProps) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="w-full h-full flex flex-col bg-background">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <SettingsCategories
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="flex-1 overflow-auto">
        <SettingsPanel activeCategory={activeCategory} />
      </div>
    </div>
  );
};

export default Settings;
