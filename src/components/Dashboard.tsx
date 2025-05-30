
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  Bot, 
  TrendingUp,
  FileText
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  // Dados simulados
  const stats = [
    {
      title: "Atendimentos IA",
      value: "1,234",
      change: "+12%",
      icon: MessageSquare,
      color: "text-blue-400"
    },
    {
      title: "Agendamentos",
      value: "89",
      change: "+8%",
      icon: Calendar,
      color: "text-green-400"
    },
    {
      title: "Receita Estimada",
      value: "R$ 45.780",
      change: "+23%",
      icon: DollarSign,
      color: "text-yellow-400"
    },
    {
      title: "Msgs Automatizadas",
      value: "2,456",
      change: "+15%",
      icon: Bot,
      color: "text-purple-400"
    }
  ];

  const chartData = [
    { name: 'Seg', atendimentos: 45, agendamentos: 12 },
    { name: 'Ter', atendimentos: 52, agendamentos: 15 },
    { name: 'Qua', atendimentos: 48, agendamentos: 10 },
    { name: 'Qui', atendimentos: 61, agendamentos: 18 },
    { name: 'Sex', atendimentos: 55, agendamentos: 14 },
    { name: 'Sáb', atendimentos: 40, agendamentos: 8 },
    { name: 'Dom', atendimentos: 35, agendamentos: 6 },
  ];

  const recentActivity = [
    { type: "agendamento", text: "Novo agendamento - João Silva", time: "2 min", status: "novo" },
    { type: "atendimento", text: "Atendimento iniciado via WhatsApp", time: "5 min", status: "andamento" },
    { type: "venda", text: "Venda confirmada - R$ 450", time: "10 min", status: "concluido" },
    { type: "agendamento", text: "Agendamento reagendado", time: "15 min", status: "alterado" },
  ];

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-gray-400">Visão geral do seu atendimento com IA</p>
        </div>
        <Button className="bg-[#70a5ff] hover:bg-[#5a8aff] text-white">
          <FileText className="w-4 h-4 mr-2" />
          Gerar Relatório PDF
        </Button>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-sm text-green-400">{stat.change}</span>
                    </div>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Atendimentos dos Últimos 7 Dias</CardTitle>
            <CardDescription className="text-gray-400">
              Evolução dos atendimentos e agendamentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="atendimentos" stroke="#70a5ff" strokeWidth={2} />
                <Line type="monotone" dataKey="agendamentos" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Atividade Recente</CardTitle>
            <CardDescription className="text-gray-400">
              Últimas atividades do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-sm text-white">{activity.text}</p>
                    <p className="text-xs text-gray-400">há {activity.time}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${activity.status === 'novo' ? 'border-blue-500 text-blue-400' : ''}
                      ${activity.status === 'andamento' ? 'border-yellow-500 text-yellow-400' : ''}
                      ${activity.status === 'concluido' ? 'border-green-500 text-green-400' : ''}
                      ${activity.status === 'alterado' ? 'border-orange-500 text-orange-400' : ''}
                    `}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
