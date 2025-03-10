// src/types/index.ts
export interface Certification {
    id: string;
    name: string;
    issuer: string;
    file: File | null;
    fileUrl: string;
  }
  
  export interface ValidationErrors {
    name?: string;
    issuer?: string;
    file?: string;
  }