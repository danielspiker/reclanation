import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { appRouterProviders } from '../../app.routes';
import { Reclamacao } from '../../models/reclamacao';
import { User } from '../../models/user';
import { ReclamacoesService } from '../../services/reclamacoes-api.service';
import { UsuariosService } from '../../services/usuarios-api.service';
import { ReclamacoesFormComponent } from '../reclamacoes-form/reclamacoes-form.component';

@Component({
  selector: 'app-reclamacoes-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReclamacoesFormComponent],
  templateUrl: './reclamacoes-list.component.html',
  styleUrl: './reclamacoes-list.component.scss'
})
export class ReclamacoesListComponent implements OnInit {

  reclamacoes: Reclamacao[] = [];
  usuarios: User[] = [];

  editReclamacao(reclamacao: Reclamacao): void {
    this.router.navigate(['/edit/',reclamacao.id]);
  }

  deleteReclamacao(id: number) {
    if (confirm('Você tem certeza que deseja excluir esta reclamação?')) {
      this.reclamacoesService.deleteReclamacao(id).subscribe(() => {
        this.reclamacoes = this.reclamacoes.filter(reclamacao => reclamacao.id !== id);
      }, error => {
        console.error('Erro ao excluir reclamação:', error);
      });
      window.location.reload();
    }
  }

  constructor(
    private reclamacoesService: ReclamacoesService,
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reclamacoesService.getReclamacoes().subscribe(
      reclamacoes => this.reclamacoes = reclamacoes
    );

    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });

  }
}
