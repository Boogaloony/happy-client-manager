import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Building2,
  Users,
  Calendar,
  FileText,
  Settings,
  Menu,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_ROLES } from "@/data/mockData";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedRole, setSelectedRole] = useState("user");
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: <Menu className="h-4 w-4" /> },
    {
      path: "/organizations",
      label: "Organizations",
      icon: <Building2 className="h-4 w-4" />,
    },
    { path: "/users", label: "Team", icon: <Users className="h-4 w-4" /> },
    {
      path: "/schedule",
      label: "Schedule",
      icon: <Calendar className="h-4 w-4" />,
    },
    { path: "/quotes", label: "Quotes", icon: <FileText className="h-4 w-4" /> },
    {
      path: "/settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-secondary h-screen transition-all duration-300 ease-in-out flex flex-col",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="p-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="mb-4"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-2 rounded-lg transition-colors",
                  isSidebarOpen ? "space-x-2" : "justify-center",
                  "hover:bg-accent hover:text-accent-foreground",
                  location.pathname === item.path
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Role Selector */}
        {isSidebarOpen && (
          <div className="p-4 border-t border-secondary-foreground/10">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_ROLES.map((role) => (
                  <SelectItem key={role.id} value={role.name.toLowerCase()}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;