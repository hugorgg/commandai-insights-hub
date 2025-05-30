
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  FileText,
  LogOut,
  ChevronLeft
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Calendar, label: "Agendamentos", path: "/agendamentos" },
  { icon: MessageSquare, label: "Atendimentos", path: "/atendimentos" },
  { icon: CreditCard, label: "Pagamentos", path: "/pagamentos" },
  { icon: FileText, label: "Relatórios", path: "/relatorios" },
  { icon: Settings, label: "Configurações", path: "/configuracoes" },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("comandai_token");
    localStorage.removeItem("comandai_user");
    navigate("/login");
  };

  return (
    <div className={cn(
      "bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#70a5ff] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CA</span>
            </div>
            <span className="font-bold text-white">ComandAI</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800",
                isActive && "bg-[#70a5ff] text-white hover:bg-[#70a5ff]",
                isCollapsed && "justify-center"
              )}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800",
            isCollapsed && "justify-center"
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Sair</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
