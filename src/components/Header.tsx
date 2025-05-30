
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, User, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [notificacoes] = useState([
    {
      id: 1,
      tipo: "agendamento",
      titulo: "Novo agendamento",
      descricao: "Maria Silva agendou Consultoria Marketing",
      tempo: "2 min atrás",
      lida: false
    },
    {
      id: 2,
      tipo: "atendimento",
      titulo: "Atendimento iniciado",
      descricao: "João Santos iniciou conversa no WhatsApp",
      tempo: "5 min atrás",
      lida: false
    },
    {
      id: 3,
      tipo: "pagamento",
      titulo: "Pagamento aprovado",
      descricao: "Ana Costa - R$ 800,00 via Pix",
      tempo: "10 min atrás",
      lida: true
    }
  ]);

  const notificacaoesNaoLidas = notificacoes.filter(n => !n.lida).length;
  const usuario = JSON.parse(localStorage.getItem("comandai_user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("comandai_token");
    localStorage.removeItem("comandai_user");
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Bem-vindo ao ComandAI</h2>
          <p className="text-gray-400 text-sm">Gerencie seus atendimentos com inteligência artificial</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Notificações */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative text-gray-400 hover:text-white">
                <Bell className="h-5 w-5" />
                {notificacaoesNaoLidas > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-600 text-xs flex items-center justify-center">
                    {notificacaoesNaoLidas}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-gray-900 border-gray-800 p-0" align="end">
              <div className="p-4 border-b border-gray-800">
                <h3 className="text-white font-semibold">Notificações</h3>
                <p className="text-gray-400 text-sm">{notificacaoesNaoLidas} não lidas</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notificacoes.slice(0, 5).map((notificacao) => (
                  <div key={notificacao.id} className={`p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors ${!notificacao.lida ? 'bg-gray-800/50' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${!notificacao.lida ? 'bg-[#70a5ff]' : 'bg-gray-600'}`}></div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{notificacao.titulo}</p>
                        <p className="text-gray-400 text-xs">{notificacao.descricao}</p>
                        <p className="text-gray-500 text-xs mt-1">{notificacao.tempo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-800 space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-white border-gray-700 hover:bg-gray-800"
                  onClick={() => navigate("/agendamentos")}
                >
                  Ver Agendamentos
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-white border-gray-700 hover:bg-gray-800"
                  onClick={() => navigate("/atendimentos")}
                >
                  Ver Atendimentos
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Menu do Usuário */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-gray-800">
                <div className="w-8 h-8 bg-[#70a5ff] rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">{usuario.email}</p>
                  <p className="text-xs text-gray-400">{usuario.company}</p>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-gray-800 text-white" align="end">
              <DropdownMenuItem 
                onClick={() => navigate("/configuracoes")}
                className="hover:bg-gray-800 cursor-pointer"
              >
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleLogout}
                className="hover:bg-gray-800 cursor-pointer text-red-400"
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
