
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, Clock, User, CheckCircle } from "lucide-react";

const Atendimentos = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [atendimentos, setAtendimentos] = useState({
    novo: [
      {
        id: 1,
        cliente: "Pedro Lima",
        canal: "WhatsApp",
        tipo: "Dúvida sobre serviços",
        hora: "14:30",
        conversa: "Olá! Gostaria de saber mais sobre consultoria em marketing digital...",
        data: "2024-01-15"
      },
      {
        id: 2,
        cliente: "Carla Mendes",
        canal: "Instagram",
        tipo: "Solicitação de orçamento",
        hora: "15:15",
        conversa: "Vi seus posts e gostaria de um orçamento para gerenciamento de redes sociais...",
        data: "2024-01-15"
      }
    ],
    emAndamento: [
      {
        id: 3,
        cliente: "Roberto Silva",
        canal: "Site",
        tipo: "Agendamento",
        hora: "13:45",
        conversa: "Preciso agendar uma reunião para discutir o desenvolvimento do meu site...",
        data: "2024-01-15"
      }
    ],
    concluido: [
      {
        id: 4,
        cliente: "Ana Santos",
        canal: "WhatsApp",
        tipo: "Suporte",
        hora: "12:20",
        conversa: "Problema resolvido! Obrigada pelo atendimento rápido e eficiente.",
        data: "2024-01-14"
      },
      {
        id: 5,
        cliente: "Lucas Costa",
        canal: "Instagram",
        tipo: "Venda finalizada",
        hora: "11:30",
        conversa: "Pacote de consultoria contratado. Aguardando início dos trabalhos.",
        data: "2024-01-14"
      }
    ]
  });

  useEffect(() => {
    const token = localStorage.getItem("comandai_token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const marcarConcluido = (id: number) => {
    setAtendimentos(prev => {
      // Procurar o item em novo ou emAndamento
      let itemParaMover = null;
      let novoEstado = { ...prev };

      // Procurar em novo
      const indexNovo = prev.novo.findIndex(item => item.id === id);
      if (indexNovo !== -1) {
        itemParaMover = prev.novo[indexNovo];
        novoEstado.novo = prev.novo.filter(item => item.id !== id);
      }

      // Procurar em emAndamento se não encontrou em novo
      if (!itemParaMover) {
        const indexEmAndamento = prev.emAndamento.findIndex(item => item.id === id);
        if (indexEmAndamento !== -1) {
          itemParaMover = prev.emAndamento[indexEmAndamento];
          novoEstado.emAndamento = prev.emAndamento.filter(item => item.id !== id);
        }
      }

      // Adicionar à lista de concluídos se encontrou o item
      if (itemParaMover) {
        novoEstado.concluido = [...prev.concluido, {
          ...itemParaMover,
          data: new Date().toISOString().split('T')[0] // Atualizar data para hoje
        }];
      }

      return novoEstado;
    });
  };

  const getChannelBadge = (canal: string) => {
    switch (canal) {
      case 'WhatsApp':
        return <Badge className="bg-green-600">WhatsApp</Badge>;
      case 'Instagram':
        return <Badge className="bg-pink-600">Instagram</Badge>;
      case 'Site':
        return <Badge className="bg-blue-600">Site</Badge>;
      default:
        return <Badge>{canal}</Badge>;
    }
  };

  const KanbanColumn = ({ title, items, bgColor, showConcluirButton = false }: { 
    title: string; 
    items: any[]; 
    bgColor: string; 
    showConcluirButton?: boolean;
  }) => (
    <div className="flex-1">
      <div className={`${bgColor} rounded-lg p-4 mb-4`}>
        <h3 className="text-white font-semibold text-center">{title}</h3>
        <p className="text-center text-white/80 text-sm">{items.length} atendimento(s)</p>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <Card className="bg-gray-900 border-gray-800 hover:border-[#70a5ff] transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-[#70a5ff] rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.cliente}</p>
                      <p className="text-gray-400 text-sm">{item.tipo}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    {getChannelBadge(item.canal)}
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Clock className="h-3 w-3" />
                      {item.hora}
                    </div>
                  </div>
                  {showConcluirButton && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          marcarConcluido(item.id);
                        }}
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Marcar como Concluído
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Conversa com {item.cliente}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {getChannelBadge(item.canal)}
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{item.hora}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{new Date(item.data).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-300">{item.conversa}</p>
                </div>
                <div className="bg-[#70a5ff]/10 border border-[#70a5ff]/20 p-4 rounded-lg">
                  <p className="text-sm text-[#70a5ff] mb-2">✨ Resposta da IA:</p>
                  <p className="text-gray-300">
                    Olá! Agradecemos seu contato. Nossa equipe analisará sua solicitação e retornará em breve com todas as informações necessárias.
                  </p>
                </div>
                {showConcluirButton && (
                  <Button
                    onClick={() => marcarConcluido(item.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Marcar como Concluído
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">Atendimentos</h1>
              <p className="text-gray-400">Acompanhe todos os atendimentos em tempo real</p>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <KanbanColumn 
                title="Novo" 
                items={atendimentos.novo} 
                bgColor="bg-yellow-600" 
                showConcluirButton={true}
              />
              <KanbanColumn 
                title="Em Atendimento" 
                items={atendimentos.emAndamento} 
                bgColor="bg-blue-600" 
                showConcluirButton={true}
              />
              <KanbanColumn 
                title="Concluído" 
                items={atendimentos.concluido} 
                bgColor="bg-green-600" 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Atendimentos;
