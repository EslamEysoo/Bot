import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MessageSquare, Shield, Code, Clock, Settings } from "lucide-react";

interface NavigationItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
}

const NavigationItem = ({
  icon,
  label,
  path,
  isActive = false,
}: NavigationItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "flex flex-col items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
        isActive ? "text-primary" : "text-muted-foreground hover:text-primary",
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          isActive ? "bg-primary/10" : "bg-transparent",
        )}
      >
        {icon}
      </div>
      <span className="mt-1">{label}</span>
    </Link>
  );
};

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className = "" }: NavigationProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    {
      icon: <MessageSquare size={20} />,
      label: "Chat",
      path: "/chat",
    },
    {
      icon: <Shield size={20} />,
      label: "Security",
      path: "/security",
    },
    {
      icon: <Code size={20} />,
      label: "Code",
      path: "/code",
    },
    {
      icon: <Clock size={20} />,
      label: "Tasks",
      path: "/tasks",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 flex h-16 items-center justify-around border-t border-border bg-background px-4 md:h-20",
        className,
      )}
    >
      {navigationItems.map((item) => (
        <NavigationItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          path={item.path}
          isActive={
            currentPath === item.path ||
            (currentPath === "/" && item.path === "/chat")
          }
        />
      ))}
    </nav>
  );
};

export default Navigation;
