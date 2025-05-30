
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, DollarSign, Filter, Plus } from "lucide-react";

const Agendamentos = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("comandai_token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // Dados mockados dos agendamentos - Adaptável para diferentes tipos de negócio
  const agendamentos = [
    {
      id: 1,
      cliente: "Maria Silva",
      servico: "Consultoria de Marketing Digital",
      categoria: "Consultoria",
      valor: 350.00,
      data: "2024-01-15",
      hora: "14:00",
      status: "agendado",
      telefone: "(11) 99999-9999",
      observacoes: "Cliente interessado em campanhas para Instagram"
    },
    {
      id: 2,
      cliente: "João Santos",
      servico: "Desenvolvimento de Site Institucional",
      categoria: "Desenvolvimento",
      valor: 1200.00,
      data: "2024-01-16",
      hora: "09:30",
      status: "concluido",
      telefone: "(11) 88888-8888",
      observacoes: "Site com blog e área de membros"
    },
    {
      id: 3,
      cliente: "Ana Costa",
      servico: "Gerenciamento de Redes Sociais",
      categoria: "Social Media",
      valor: 800.00,
      data: "2024-01-17",
      hora: "16:00",
      status: "agendado",
      telefone: "(11) 77777-7777",
      observacoes: "Foco em LinkedIn e Instagram corporativo"
    },
    {
      id: 4,
      cliente: "Pedro Lima",
      servico: "Automação de Processos",
      categoria: "Automação",
      valor: 950.00,
      data: "2024-01-18",
      hora: "10:00",
      status: "agendado",
      telefone: "(11) 66666-6666",
      observacoes: "Integração com CRM e WhatsApp Business"
    },
    {
      id: 5,
      cliente: "Carla Mendes",
      servico: "Consultoria em IA para Atendimento",
      categoria: "Inteligência Artificial",
      valor: 650.00,
      data: "2024-01-19",
      hora: "15:30",
      status: "pendente",
      telefone: "(11) 55555-5555",
      observacoes: "Implementação de chatbot personalizado"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'agendado':
        return <Badge className="bg-blue-600">Agendado</Badge>;
      case 'concluido':
        return <Badge className="bg-green-600">Concluído</Badge>;
      case 'cancelado':
        return <Badge className="bg-red-600">Cancelado</Badge>;
      case 'pendente':
        return <Badge className="bg-yellow-600">Pendente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCategoryColor = (categoria: string) => {
    switch (categoria) {
      case 'Consultoria':
        return 'bg-purple-600';
      case 'Desenvolvimento':
        return 'bg-blue-600';
      case 'Social Media':
        return 'bg-pink-600';
      case 'Automação':
        return 'bg-orange-600';
      case 'Inteligência Artificial':
        return 'bg-green-600';
      default:
        return 'bg-[#70a5ff]';
    }
  };

  const filteredAgendamentos = agendamentos.filter(agendamento => {
    if (statusFilter !== "todos" && agendamento.status !== statusFilter) return false;
    if (dateFilter && agendamento.data !== dateFilter) return false;
    return true;
  });

  // Estatísticas por categoria
  const estatisticasPorCategoria = agendamentos.reduce((acc, agendamento) => {
    if (!acc[agendamento.categoria]) {
      acc[agendamento.categoria] = { count: 0, valor: 0 };
    }
    acc[agendamento.categoria].count++;
    acc[agendamento.categoria].valor += agendamento.valor;
    return acc;
  }, {} as Record<string, { count: number; valor: number }>);

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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Agendamentos</h1>
                <p className="text-gray-400">Gerencie todos os agendamentos dos seus clientes</p>
              </div>
              <Button className="bg-[#70a5ff] hover:bg-[#5a8ae6] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Novo Agendamento
              </Button>
            </div>

            {/* Cards de Resumo por Categoria */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {Object.entries(estatisticasPorCategoria).map(([categoria, stats]) => (
                <Card key={categoria} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">{categoria}</p>
                        <p className="text-white font-semibold">{stats.count} agendamentos</p>
                        <p className="text-gray-300 text-sm">R$ {stats.valor.toFixed(2)}</p>
                      </div>
                      <div className={`w-8 h-8 ${getCategoryColor(categoria)} rounded-lg flex items-center justify-center`}>
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filtros */}
            <Card className="bg-gray-900 border-gray-800 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="agendado">Agendado</SelectItem>
                        <SelectItem value="concluido">Concluído</SelectItem>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Data</label>
                    <Input
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Agendamentos */}
            <div className="grid gap-4">
              {filteredAgendamentos.map((agendamento) => (
                <Card key={agendamento.id} className="bg-gray-900 border-gray-800 hover:border-[#70a5ff] transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${getCategoryColor(agendamento.categoria)} rounded-lg flex items-center justify-center`}>
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{agendamento.cliente}</h3>
                          <p className="text-gray-400">{agendamento.telefone}</p>
                          <p className="text-xs text-gray-500">{agendamento.categoria}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center max-w-48">
                          <p className="text-sm text-gray-400">Serviço</p>
                          <p className="text-white font-medium text-sm">{agendamento.servico}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Valor</p>
                          <p className="text-white font-medium flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            R$ {agendamento.valor.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Data</p>
                          <p className="text-white font-medium flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(agendamento.data).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Hora</p>
                          <p className="text-white font-medium flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {agendamento.hora}
                          </p>
                        </div>
                        <div className="text-center">
                          {getStatusBadge(agendamento.status)}
                        </div>
                      </div>
                    </div>
                    {agendamento.observacoes && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-sm text-gray-400">Observações:</p>
                        <p className="text-gray-300 text-sm">{agendamento.observacoes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAgendamentos.length === 0 && (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400">Nenhum agendamento encontrado com os filtros aplicados.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Agendamentos;
