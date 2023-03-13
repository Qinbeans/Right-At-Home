export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      calendar: {
        Row: {
          color: string | null
          created_at: string
          description: string
          end: string
          id: string
          start: string
          title: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description: string
          end?: string
          id?: string
          start?: string
          title: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string
          end?: string
          id?: string
          start?: string
          title?: string
        }
      }
      contact: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          subject: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          subject?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
