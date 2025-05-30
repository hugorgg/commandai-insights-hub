export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string
          email: string
          empresa_id: string
          needs_password_change: boolean
          created_at: string
        }
        Insert: {
          id: string
          email: string
          empresa_id: string
          needs_password_change?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          empresa_id?: string
          needs_password_change?: boolean
          created_at?: string
        }
      }
      empresas: {
        Row: {
          id: string
          nome: string
          created_at: string
        }
        Insert: {
          id?: string
          nome: string
          created_at?: string
        }
        Update: {
          id?: string
          nome?: string
          created_at?: string
        }
      }
      agendamentos: {
        Row: {
          id: number
          empresa_id: string
          cliente: string
          servico: string
          valor: number
          data: string
          hora: string
          status: string
          observacoes: string | null
          created_at: string
        }
        Insert: {
          empresa_id: string
          cliente: string
          servico: string
          valor: number
          data: string
          hora: string
          status: string
          observacoes?: string | null
          created_at?: string
        }
        Update: {
          empresa_id?: string
          cliente?: string
          servico?: string
          valor?: number
          data?: string
          hora?: string
          status?: string
          observacoes?: string | null
          created_at?: string
        }
      }
      atendimentos: {
        Row: {
          id: number
          empresa_id: string
          cliente: string
          canal: string
          tipo: string
          status: string
          detalhes_conversa: string
          criado_em: string
        }
        Insert: {
          empresa_id: string
          cliente: string
          canal: string
          tipo: string
          status: string
          detalhes_conversa: string
          criado_em?: string
        }
        Update: {
          empresa_id?: string
          cliente?: string
          canal?: string
          tipo?: string
          status?: string
          detalhes_conversa?: string
          criado_em?: string
        }
      }
      pagamentos: {
        Row: {
          id: number
          empresa_id: string
          cliente: string
          valor: number
          status: string
          data: string
          metodo: string
          servico: string
        }
        Insert: {
          empresa_id: string
          cliente: string
          valor: number
          status: string
          data: string
          metodo: string
          servico: string
        }
        Update: {
          empresa_id?: string
          cliente?: string
          valor?: number
          status?: string
          data?: string
          metodo?: string
          servico?: string
        }
      }
      configuracoes: {
        Row: {
          id: number
          empresa_id: string
          nome_empresa: string
          servicos: Json[]
          horarios: Json
          link_pagamento: string
          tom_voz: string
        }
        Insert: {
          empresa_id: string
          nome_empresa: string
          servicos: Json[]
          horarios: Json
          link_pagamento: string
          tom_voz: string
        }
        Update: {
          empresa_id?: string
          nome_empresa?: string
          servicos?: Json[]
          horarios?: Json
          link_pagamento?: string
          tom_voz?: string
        }
      }
      notificacoes: {
        Row: {
          id: number
          empresa_id: string
          tipo: string
          mensagem: string
          lido: boolean
          criado_em: string
        }
        Insert: {
          empresa_id: string
          tipo: string
          mensagem: string
          lido?: boolean
          criado_em?: string
        }
        Update: {
          empresa_id?: string
          tipo?: string
          mensagem?: string
          lido?: boolean
          criado_em?: string
        }
      }
    }
    Functions: {
      get_dashboard_stats: {
        Args: {
          p_empresa_id: string
        }
        Returns: {
          total_atendimentos: number
          total_agendamentos: number
          total_receita: number
          total_mensagens: number
          atendimentos_por_dia: Json[]
        }
      }
    }
  }
}