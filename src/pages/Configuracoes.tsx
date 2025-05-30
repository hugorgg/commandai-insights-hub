
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Settings, Building, Clock, DollarSign, MessageSquare, Link } from "lucide-react";

const Configuracoes = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Estados dos formulários
  const [nomeEmpresa, setNomeEmpresa] = useState("Empresa Demo");
  const [servicos, setServicos] = useState([
    { nome: "Consultoria Marketing", valor: 350.00 },
    { nome: "Desenvolvimento Site", valor: 1200.00 },
    { nome: "Social Media", valor: 800.00 }
  ]);
  const [horarios, setHorarios] = useState({
    segunda: { inicio: "08:00", fim: "18:00", ativo: true },
    terca: { inicio: "08:00", fim: "18:00", ativo: true },
    quarta: { inicio: "08:00", fim: "18:00", ativo: true },
    quinta: { inicio: "08:00", fim: "18:00", ativo: true },
    sexta: { inicio: "08:00", fim: "18:00", ativo: true },
    sabado: { inicio: "08:00", fim: "12:00", ativo: false },
    domingo: { inicio: "08:00", fim: "12:00", ativo: false }
  });
  const [linkPagamento, setLinkPagamento] = useState("https://exemplo.com/pagamento");
  const [tomVoz, setTomVoz] = useState("Atendimento profissional, cordial e prestativo. Sempre demonstre interesse em ajudar o cliente e ofereça soluções personalizadas.");

  useEffect(() => {
    const token = localStorage.getItem("comandai_token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleSaveEmpresa = () => {
    // Simular salvamento
    toast({
      title: "Configurações salvas!",
      description: "As informações da empresa foram atualizadas.",
    });
  };

  const handleAddServico = () => {
    setServicos([...servicos, { nome: "", valor: 0 }]);
  };

  const handleRemoveServico = (index: number) => {
    setServicos(servicos.filter((_, i) => i !== index));
  };

  const handleServicoChange = (index: number, field: string, value: any) => {
    const newServicos = [...servicos];
    newServicos[index] = { ...newServicos[index], [field]: value };
    setServicos(newServicos);
  };

  const handleSaveServicos = () => {
    toast({
      title: "Serviços salvos!",
      description: "A lista de serviços foi atualizada.",
    });
  };

  const handleSaveHorarios = () => {
    toast({
      title: "Horários salvos!",
      description: "Os horários de atendimento foram atualizados.",
    });
  };

  const handleSavePagamento = () => {
    toast({
      title: "Link de pagamento salvo!",
      description: "O link de pagamento foi atualizado.",
    });
  };

  const handleSaveTomVoz = () => {
    toast({
      title: "Tom de voz salvo!",
      description: "As configurações do agente IA foram atualizadas.",
    });
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
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">Configurações</h1>
              <p className="text-gray-400">Gerencie as configurações do seu sistema</p>
            </div>

            <div className="space-y-6">
              {/* Informações da Empresa */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Informações da Empresa
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure as informações básicas da sua empresa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="nome-empresa" className="text-white">Nome da Empresa</Label>
                    <Input
                      id="nome-empresa"
                      value={nomeEmpresa}
                      onChange={(e) => setNomeEmpresa(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white mt-2"
                    />
                  </div>
                  <Button onClick={handleSaveEmpresa} className="bg-[#70a5ff] hover:bg-[#5a8aff]">
                    Salvar Informações
                  </Button>
                </CardContent>
              </Card>

              {/* Serviços e Valores */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Serviços e Valores
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Gerencie os serviços oferecidos e seus valores
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {servicos.map((servico, index) => (
                    <div key={index} className="flex gap-4 items-end">
                      <div className="flex-1">
                        <Label className="text-white">Serviço</Label>
                        <Input
                          value={servico.nome}
                          onChange={(e) => handleServicoChange(index, 'nome', e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white mt-2"
                          placeholder="Nome do serviço"
                        />
                      </div>
                      <div className="w-32">
                        <Label className="text-white">Valor (R$)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={servico.valor}
                          onChange={(e) => handleServicoChange(index, 'valor', parseFloat(e.target.value) || 0)}
                          className="bg-gray-800 border-gray-700 text-white mt-2"
                          placeholder="0,00"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        onClick={() => handleRemoveServico(index)}
                        className="mb-0"
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Button onClick={handleAddServico} variant="outline" className="text-white border-gray-700">
                      Adicionar Serviço
                    </Button>
                    <Button onClick={handleSaveServicos} className="bg-[#70a5ff] hover:bg-[#5a8aff]">
                      Salvar Serviços
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Horários de Atendimento */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Horários de Atendimento
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure os horários de funcionamento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(horarios).map(([dia, config]) => (
                    <div key={dia} className="flex items-center gap-4">
                      <div className="w-20">
                        <Label className="text-white capitalize">{dia}</Label>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Input
                          type="time"
                          value={config.inicio}
                          className="bg-gray-800 border-gray-700 text-white w-24"
                          disabled={!config.ativo}
                        />
                        <span className="text-gray-400">às</span>
                        <Input
                          type="time"
                          value={config.fim}
                          className="bg-gray-800 border-gray-700 text-white w-24"
                          disabled={!config.ativo}
                        />
                        <label className="flex items-center gap-2 text-white">
                          <input
                            type="checkbox"
                            checked={config.ativo}
                            className="w-4 h-4"
                          />
                          Ativo
                        </label>
                      </div>
                    </div>
                  ))}
                  <Button onClick={handleSaveHorarios} className="bg-[#70a5ff] hover:bg-[#5a8aff]">
                    Salvar Horários
                  </Button>
                </CardContent>
              </Card>

              {/* Link de Pagamento */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Link className="h-5 w-5" />
                    Link de Pagamento
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure o link para pagamentos (Pix, Cartão, etc.)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="link-pagamento" className="text-white">URL de Pagamento</Label>
                    <Input
                      id="link-pagamento"
                      value={linkPagamento}
                      onChange={(e) => setLinkPagamento(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white mt-2"
                      placeholder="https://exemplo.com/pagamento"
                    />
                  </div>
                  <Button onClick={handleSavePagamento} className="bg-[#70a5ff] hover:bg-[#5a8aff]">
                    Salvar Link
                  </Button>
                </CardContent>
              </Card>

              {/* Tom de Voz do Agente IA */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Tom de Voz do Agente IA
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Personalize como o agente IA deve se comunicar com os clientes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="tom-voz" className="text-white">Instruções para o Agente</Label>
                    <Textarea
                      id="tom-voz"
                      value={tomVoz}
                      onChange={(e) => setTomVoz(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white mt-2 min-h-[100px]"
                      placeholder="Descreva como o agente deve se comportar..."
                    />
                  </div>
                  <Button onClick={handleSaveTomVoz} className="bg-[#70a5ff] hover:bg-[#5a8aff]">
                    Salvar Configurações
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Configuracoes;
