import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, getSession, getUserProfile } from './supabase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: any;
  profile: any;
  isLoading: boolean;
  needsPasswordChange: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await getSession();
        if (session) {
          setUser(session.user);
          const profile = await getUserProfile(session.user.id);
          setProfile(profile);
          setNeedsPasswordChange(profile.needs_password_change || false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        toast({
          title: "Erro de autenticação",
          description: "Por favor, faça login novamente",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
        const profile = await getUserProfile(session.user.id);
        setProfile(profile);
        setNeedsPasswordChange(profile.needs_password_change || false);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setNeedsPasswordChange(false);
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Erro ao sair",
        description: "Tente novamente",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isLoading,
      needsPasswordChange,
      signOut: handleSignOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}