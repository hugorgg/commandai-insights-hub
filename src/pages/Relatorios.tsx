
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, Calendar, DollarSign, MessageSquare } from "lucide-react";

const Relatorios = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("comandai_token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // Dados para o relatório
  const dadosRelatorio = {
    mesAtual: {
      atendimentos: 245,
      agendamentos: 89,
      receita: 15750.00,
      mensagensAutomaticas: 1567
    },
    mesAnterior: {
      atendimentos: 198,
      agendamentos: 67,
      receita: 12300.00,
      mensagensAutomaticas: 1234
    },
    servicosMaisSolicitados: [
      { nome: "Consultoria Marketing", quantidade: 45, receita: 15750.00 },
      { nome: "Social Media", quantidade: 28, receita: 22400.00 },
      { nome: "Desenvolvimento Site", quantidade: 16, receita: 19200.00 }
    ]
  };

  const calcularVariacao = (atual: number, anterior: number) => {
    const variacao = ((atual - anterior) / anterior) * 100;
    return {
      valor: Math.abs(variacao).toFixed(1),
      positiva: variacao > 0
    };
  };

  const handleGerarPDF = () => {
    // Simular geração de PDF
    const blob = new Blob(['Relatório ComandAI - Dados simulados'], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-comandai-${new Date().toISOString().slice(0, 7)}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

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
                <h1 className="text-3xl font-bold text-white mb-2">Relatórios</h1>
                <p className="text-gray-400">Análise completa do desempenho mensal</p>
              </div>
              <Button onClick={handleGerarPDF} className="bg-[#70a5ff] hover:bg-[#5a8aff] flex items-center gap-2">
                <Download className="h-4 w-4" />
                Gerar PDF
              </Button>
            </div>

            {/* Resumo Mensal */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Atendimentos</p>
                      <p className="text-2xl font-bold text-white">{dadosRelatorio.mesAtual.atendimentos}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className={`h-4 w-4 ${calcularVariacao(dadosRelatorio.mesAtual.atendimentos, dadosRelatorio.mesAnterior.atendimentos).positiva ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-sm ${calcularVariacao(dadosRelatorio.mesAtual.atendimentos, dadosRelatorio.mesAnterior.atendimentos).positiva ? 'text-green-400' : 'text-red-400'}`}>
                          {calcularVariacao(dadosRelatorio.mesAtual.atendimentos, dadosRelatorio.mesAnterior.atendimentos).valor}%
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Agendamentos</p>
                      <p className="text-2xl font-bold text-white">{dadosRelatorio.mesAtual.agendamentos}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className={`h-4 w-4 ${calcularVariacao(dadosRelatorio.mesAtual.agendamentos, dadosRelatorio.mesAnterior.agendamentos).positiva ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-sm ${calcularVariacao(dadosRelatorio.mesAtual.agendamentos, dadosRelatorio.mesAnterior.agendamentos).positiva ? 'text-green-400' : 'text-red-400'}`}>
                          {calcularVariacao(dadosRelatorio.mesAtual.agendamentos, dadosRelatorio.mesAnterior.agendamentos).valor}%
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Receita</p>
                      <p className="text-2xl font-bold text-white">R$ {dadosRelatorio.mesAtual.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className={`h-4 w-4 ${calcularVariacao(dadosRelatorio.mesAtual.receita, dadosRelatorio.mesAnterior.receita).positiva ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-sm ${calcularVariacao(dadosRelatorio.mesAtual.receita, dadosRelatorio.mesAnterior.receita).positiva ? 'text-green-400' : 'text-red-400'}`}>
                          {calcularVariacao(dadosRelatorio.mesAtual.receita, dadosRelatorio.mesAnterior.receita).valor}%
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-[#70a5ff] rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Msgs Automáticas</p>
                      <p className="text-2xl font-bold text-white">{dadosRelatorio.mesAtual.mensagensAutomaticas}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className={`h-4 w-4 ${calcularVariacao(dadosRelatorio.mesAtual.mensagensAutomaticas, dadosRelatorio.mesAnterior.mensagensAutomaticas).positiva ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-sm ${calcularVariacao(dadosRelatorio.mesAtual.mensagensAutomaticas, dadosRelatorio.mesAnterior.mensagensAutomaticas).positiva ? 'text-green-400' : 'text-red-400'}`}>
                          {calcularVariacao(dadosRelatorio.mesAtual.mensagensAutomaticas, dadosRelatorio.mesAnterior.mensagensAutomaticas).valor}%
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Comparação com Mês Anterior */}
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Comparação com Mês Anterior</CardTitle>
                <CardDescription className="text-gray-400">
                  Análise comparativa de desempenho
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <p className="text-gray-400 text-sm">Atendimentos</p>
                    <p className="text-white font-bold">{dadosRelatorio.mesAnterior.atendimentos} → {dadosRelatorio.mesAtual.atendimentos}</p>
                    <p className={`text-sm ${calcularVariacao(dadosRelatorio.mesAtual.atendimentos, dadosRelatorio.mesAnterior.atendimentos).positiva ? 'text-green-400' : 'text-red-400'}`}>
                      {calcularVariacao(dadosRelatorio.mesAtual.atendimentos, dadosRelatorio.mesAnterior.atendimentos).positiva ? '+' : '-'}{calcularVariacao(dadosRelatorio.mesAtual.atendimentos, dadosRelatorio.mesAnterior.atendimentos).valor}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <p className="text-gray-400 text-sm">Agendamentos</p>
                    <p className="text-white font-bold">{dadosRelatorio.mesAnterior.agendamentos} → {dadosRelatorio.mesAtual.agendamentos}</p>
                    <p className={`text-sm ${calcularVariacao(dadosRelatorio.mesAtual.agendamentos, dadosRelatorio.mesAnterior.agendamentos).positiva ? 'text-green-400' : 'text-red-400'}`}>
                      {calcularVariacao(dadosRelatorio.mesAtual.agendamentos, dadosRelatorio.mesAnterior.agendamentos).positiva ? '+' : '-'}{calcularVariacao(dadosRelatorio.mesAtual.agendamentos, dadosRelatorio.mesAnterior.agendamentos).valor}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <p className="text-gray-400 text-sm">Receita</p>
                    <p className="text-white font-bold">R$ {dadosRelatorio.mesAnterior.receita.toLocaleString('pt-BR')} → R$ {dadosRelatorio.mesAtual.receita.toLocaleString('pt-BR')}</p>
                    <p className={`text-sm ${calcularVariacao(dadosRelatorio.mesAtual.receita, dadosRelatorio.mesAnterior.receita).positiva ? 'text-green-400' : 'text-red-400'}`}>
                      {calcularVariacao(dadosRelatorio.mesAtual.receita, dadosRelatorio.mesAnterior.receita).positiva ? '+' : '-'}{calcularVariacao(dadosRelatorio.mesAtual.receita, dadosRelatorio.mesAnterior.receita).valor}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <p className="text-gray-400 text-sm">Msgs Automáticas</p>
                    <p className="text-white font-bold">{dadosRelatorio.mesAnterior.mensagensAutomaticas} → {dadosRelatorio.mesAtual.mensagensAutomaticas}</p>
                    <p className={`text-sm ${calcularVariacao(dadosRelatorio.mesAtual.mensagensAutomaticas, dadosRelatorio.mesAnterior.mensagensAutomaticas).positiva ? 'text-green-400' : 'text-red-400'}`}>
                      {calcularVariacao(dadosRelatorio.mesAtual.mensagensAutomaticas, dadosRelatorio.mesAnterior.mensagensAutomaticas).positiva ? '+' : '-'}{calcularVariacao(dadosRelatorio.mesAtual.mensagensAutomaticas, dadosRelatorio.mesAnterior.mensagensAutomaticas).valor}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Serviços Mais Solicitados */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Serviços Mais Solicitados</CardTitle>
                <CardDescription className="text-gray-400">
                  Ranking dos serviços com maior demanda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dadosRelatorio.servicosMaisSolicitados.map((servico, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-[#70a5ff] rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-white font-medium">{servico.nome}</p>
                          <p className="text-gray-400 text-sm">{servico.quantidade} solicitações</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">R$ {servico.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        <p className="text-gray-400 text-sm">receita total</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Relatorios;
