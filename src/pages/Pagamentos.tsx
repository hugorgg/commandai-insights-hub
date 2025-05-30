import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Calendar, CreditCard, Filter, Clock } from "lucide-react";

const Pagamentos = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [statusFilter, setStatusFilter] = useState("todos");

  useEffect(() => {
    const token = localStorage.getItem("comandai_token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // Dados mockados dos pagamentos
  const pagamentos = [
    {
      id: 1,
      cliente: "Maria Silva",
      valor: 350.00,
      status: "pago",
      data: "2024-01-15",
      metodo: "Pix",
      servico: "Consultoria Marketing"
    },
    {
      id: 2,
      cliente: "João Santos",
      valor: 1200.00,
      status: "pendente",
      data: "2024-01-16",
      metodo: "Cartão",
      servico: "Desenvolvimento Site"
    },
    {
      id: 3,
      cliente: "Ana Costa",
      valor: 800.00,
      status: "pago",
      data: "2024-01-17",
      metodo: "Boleto",
      servico: "Social Media"
    },
    {
      id: 4,
      cliente: "Pedro Lima",
      valor: 450.00,
      status: "pendente",
      data: "2024-01-18",
      metodo: "Pix",
      servico: "Consultoria SEO"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pago':
        return <Badge className="bg-green-600">Pago</Badge>;
      case 'pendente':
        return <Badge className="bg-yellow-600">Pendente</Badge>;
      case 'cancelado':
        return <Badge className="bg-red-600">Cancelado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getMethodIcon = (metodo: string) => {
    switch (metodo) {
      case 'Pix':
        return <DollarSign className="h-4 w-4" />;
      case 'Cartão':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const filteredPagamentos = pagamentos.filter(pagamento => {
    if (statusFilter !== "todos" && pagamento.status !== statusFilter) return false;
    return true;
  });

  const totalPago = pagamentos.filter(p => p.status === 'pago').reduce((sum, p) => sum + p.valor, 0);
  const totalPendente = pagamentos.filter(p => p.status === 'pendente').reduce((sum, p) => sum + p.valor, 0);

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
              <h1 className="text-3xl font-bold text-white mb-2">Pagamentos</h1>
              <p className="text-gray-400">Controle financeiro dos seus serviços</p>
            </div>

            {/* Cards de Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Recebido</p>
                      <p className="text-2xl font-bold text-green-400">R$ {totalPago.toFixed(2)}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Pendente</p>
                      <p className="text-2xl font-bold text-yellow-400">R$ {totalPendente.toFixed(2)}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Geral</p>
                      <p className="text-2xl font-bold text-[#70a5ff]">R$ {(totalPago + totalPendente).toFixed(2)}</p>
                    </div>
                    <div className="w-12 h-12 bg-[#70a5ff] rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                        <SelectItem value="pago">Pago</SelectItem>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Pagamentos */}
            <div className="grid gap-4">
              {filteredPagamentos.map((pagamento) => (
                <Card key={pagamento.id} className="bg-gray-900 border-gray-800 hover:border-[#70a5ff] transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#70a5ff] rounded-lg flex items-center justify-center">
                          {getMethodIcon(pagamento.metodo)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{pagamento.cliente}</h3>
                          <p className="text-gray-400">{pagamento.servico}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Valor</p>
                          <p className="text-white font-medium text-lg">R$ {pagamento.valor.toFixed(2)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Método</p>
                          <p className="text-white font-medium">{pagamento.metodo}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Data</p>
                          <p className="text-white font-medium flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(pagamento.data).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="text-center">
                          {getStatusBadge(pagamento.status)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pagamentos;
