
import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [notifications] = useState([
    { id: 1, text: "Novo agendamento confirmado", time: "2 min atrás", read: false },
    { id: 2, text: "Atendimento iniciado via WhatsApp", time: "5 min atrás", read: false },
    { id: 3, text: "Pagamento aprovado", time: "10 min atrás", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const user = JSON.parse(localStorage.getItem("comandai_user") || "{}");

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Dashboard</h1>
          <p className="text-sm text-gray-400">Bem-vindo de volta, {user.company || "Empresa"}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notificações */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative text-gray-400 hover:text-white">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#70a5ff] text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-gray-900 border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <h3 className="font-semibold text-white">Notificações</h3>
              </div>
              {notifications.slice(0, 5).map((notification) => (
                <DropdownMenuItem 
                  key={notification.id}
                  className={`p-4 text-white hover:bg-gray-800 ${!notification.read ? 'bg-gray-800/50' : ''}`}
                >
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm">{notification.text}</p>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <div className="p-2 border-t border-gray-800 flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1 border-gray-700 text-gray-300">
                  Ver agendamentos
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-gray-700 text-gray-300">
                  Ver atendimentos
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Avatar do usuário */}
          <div className="w-8 h-8 bg-[#70a5ff] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.company ? user.company.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
