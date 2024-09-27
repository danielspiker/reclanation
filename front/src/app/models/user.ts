import { Reclamacao } from './reclamacao';

export interface User {
  id: number;
  nome: string;
  reclamacoes: Reclamacao[];
}
