import axios from 'axios';
import type { UploadResponse, BatchUploadResponse, QueryRequest, QueryResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadDocument = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<UploadResponse>('/api/v1/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const uploadMultipleDocuments = async (files: File[]): Promise<BatchUploadResponse> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await api.post<BatchUploadResponse>('/api/v1/upload/batch', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const queryDocuments = async (question: string): Promise<QueryResponse> => {
  const response = await api.post<QueryResponse>('/api/v1/query', {
    question,
  } as QueryRequest);

  return response.data;
};

export const checkHealth = async (): Promise<any> => {
  const response = await api.get('/health');
  return response.data;
};

export default api;