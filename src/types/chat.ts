export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  folded: boolean;
  timestamp: number;
}

export interface ChatSession {
  sid: string;
  title: string;
  createAt: number;
  updateAt: number;
  list: ChatMessage[];
}

export type ThemeMode = 'system' | 'light' | 'dark';
