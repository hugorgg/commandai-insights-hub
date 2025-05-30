
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de login - em produção seria integrado com backend
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem("comandai_token", "demo_token");
        localStorage.setItem("comandai_user", JSON.stringify({
          email,
          company: "Empresa Demo",
          needsPasswordChange: password === "123456"
        }));
        
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao ComandAI",
        });
        
        navigate("/");
      } else {
        toast({
          title: "Erro no login",
          description: "Verifique suas credenciais",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <div className="w-16 h-16 bg-[#70a5ff] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CA</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">ComandAI</CardTitle>
          <CardDescription className="text-gray-400">
            Acesse sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#70a5ff] hover:bg-[#5a8aff] text-white"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <p className="text-xs text-gray-500 text-center mt-4">
            Acesso restrito. Entre em contato com o administrador para criar sua conta.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
