export interface UploadResponse {
  success: boolean;
  message: string;
  document_id: string;
  chunks_count: number;
}

export interface FileUploadResult {
  filename: string;
  success: boolean;
  error?: string;
  document_id?: string;
  chunks_count: number;
}

export interface BatchUploadResponse {
  success: boolean;
  message: string;
  total_files: number;
  successful_uploads: number;
  failed_uploads: number;
  total_chunks: number;
  results: FileUploadResult[];
}

export interface QueryRequest {
  question: string;
}

export interface Source {
  content: string;
  score: number;
  document_id?: string;
  chunk_index?: number;
}

export interface QueryResponse {
  success: boolean;
  question: string;
  answer: string;
  sources: Source[];
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  timestamp: Date;
}