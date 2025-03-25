import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, Shield, Cloud, Bell, Palette } from "lucide-react";

interface SettingsCategoriesProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const SettingsCategories = ({
  activeCategory = "profile",
  onCategoryChange = () => {},
}: SettingsCategoriesProps) => {
  const categories = [
    { id: "profile", label: "User Profile", icon: <User size={18} /> },
    { id: "privacy", label: "Privacy Settings", icon: <Shield size={18} /> },
    { id: "cloud", label: "Cloud Integration", icon: <Cloud size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "theme", label: "Theme Settings", icon: <Palette size={18} /> },
  ];

  return (
    <div className="w-full bg-background p-4 border-b">
      {/* For larger screens - use tabs */}
      <div className="hidden md:block">
        <Tabs
          value={activeCategory}
          onValueChange={onCategoryChange}
          className="w-full"
        >
          <TabsList className="w-full justify-start overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2"
              >
                {category.icon}
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* For mobile screens - use buttons in a scrollable container */}
      <div className="md:hidden overflow-x-auto whitespace-nowrap pb-2">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className="flex items-center gap-2"
            >
              {category.icon}
              <span>{category.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsCategories;
