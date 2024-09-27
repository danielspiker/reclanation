import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamacao } from '../models/reclamacao';

@Injectable({
  providedIn: 'root'
})
export class ReclamacoesService {
  private apiUrl = 'http://127.0.0.1:5000/reclamacoes'; // Adjust if needed

  constructor(private http: HttpClient) { }

  getReclamacoes(): Observable<Reclamacao[]> {
    return this.http.get<Reclamacao[]>(this.apiUrl);
  }

  getReclamacaoById(id: number): Observable<Reclamacao> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Reclamacao>(url);
  }

  createReclamacao(reclamacao: Reclamacao): Observable<Reclamacao> {
    return this.http.post<Reclamacao>(this.apiUrl, reclamacao);
  }

  updateReclamacao(reclamacao: Reclamacao): Observable<Reclamacao> {
    const url = `${this.apiUrl}/${reclamacao.id}`;
    return this.http.put<Reclamacao>(url, reclamacao);
  }

  deleteReclamacao(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
