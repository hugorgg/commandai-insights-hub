
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, DollarSign, Filter } from "lucide-react";

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

  // Dados mockados dos agendamentos
  const agendamentos = [
    {
      id: 1,
      cliente: "Maria Silva",
      servico: "Consultoria Marketing",
      valor: 350.00,
      data: "2024-01-15",
      hora: "14:00",
      status: "agendado",
      telefone: "(11) 99999-9999"
    },
    {
      id: 2,
      cliente: "João Santos",
      servico: "Desenvolvimento Site",
      valor: 1200.00,
      data: "2024-01-16",
      hora: "09:30",
      status: "concluido",
      telefone: "(11) 88888-8888"
    },
    {
      id: 3,
      cliente: "Ana Costa",
      servico: "Social Media",
      valor: 800.00,
      data: "2024-01-17",
      hora: "16:00",
      status: "agendado",
      telefone: "(11) 77777-7777"
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
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredAgendamentos = agendamentos.filter(agendamento => {
    if (statusFilter !== "todos" && agendamento.status !== statusFilter) return false;
    if (dateFilter && agendamento.data !== dateFilter) return false;
    return true;
  });

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
                        <div className="w-12 h-12 bg-[#70a5ff] rounded-lg flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{agendamento.cliente}</h3>
                          <p className="text-gray-400">{agendamento.telefone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Serviço</p>
                          <p className="text-white font-medium">{agendamento.servico}</p>
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
