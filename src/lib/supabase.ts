import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const updatePassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) throw error;
  return data;
};

// Session management
export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*, empresas(*)')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

// Agendamentos
export const getAgendamentos = async (filters?: { status?: string; data?: string }) => {
  let query = supabase
    .from('agendamentos')
    .select('*')
    .order('data', { ascending: false });

  if (filters?.status && filters.status !== 'todos') {
    query = query.eq('status', filters.status);
  }

  if (filters?.data) {
    query = query.eq('data', filters.data);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const createAgendamento = async (agendamento: {
  cliente: string;
  servico: string;
  valor: number;
  data: string;
  hora: string;
  status: string;
  empresa_id: string;
}) => {
  const { data, error } = await supabase
    .from('agendamentos')
    .insert([agendamento])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Atendimentos
export const getAtendimentos = async () => {
  const { data, error } = await supabase
    .from('atendimentos')
    .select('*')
    .order('criado_em', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateAtendimentoStatus = async (id: number, status: string) => {
  const { data, error } = await supabase
    .from('atendimentos')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Pagamentos
export const getPagamentos = async (status?: string) => {
  let query = supabase
    .from('pagamentos')
    .select('*')
    .order('data', { ascending: false });

  if (status && status !== 'todos') {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Configurações
export const getConfiguracoes = async (empresaId: string) => {
  const { data, error } = await supabase
    .from('configuracoes')
    .select('*')
    .eq('empresa_id', empresaId)
    .single();

  if (error) throw error;
  return data;
};

export const updateConfiguracoes = async (empresaId: string, configuracoes: any) => {
  const { data, error } = await supabase
    .from('configuracoes')
    .update(configuracoes)
    .eq('empresa_id', empresaId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Dashboard Stats
export const getDashboardStats = async (empresaId: string) => {
  const { data: stats, error: statsError } = await supabase.rpc('get_dashboard_stats', {
    p_empresa_id: empresaId
  });

  if (statsError) throw statsError;
  return stats;
};