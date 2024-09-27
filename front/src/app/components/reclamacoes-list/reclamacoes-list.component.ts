import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Reclamacao } from '../../models/reclamacao';
import { User } from '../../models/user';
import { ReclamacoesService } from '../../services/reclamacoes-api.service';
import { UsuariosService } from '../../services/usuarios-api.service';
import { ReclamacoesFormComponent } from '../reclamacoes-form/reclamacoes-form.component';

@Component({
  selector: 'app-reclamacoes-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReclamacoesFormComponent, RouterModule, RouterOutlet],
  templateUrl: './reclamacoes-list.component.html',
  styleUrl: './reclamacoes-list.component.scss'
})
export class ReclamacoesListComponent implements OnInit {

  reclamacoes: Reclamacao[] = [];
  usuarios: User[] = [];



  constructor(
    private reclamacoesService: ReclamacoesService,
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  editReclamacao(reclamacao: Reclamacao): void {
    this.router.navigate(['/edit',reclamacao.id]);
  }

  addReclamacao(): void {
    this.router.navigate(['/add']);
  }

  deleteReclamacao(id: number) {
    if (confirm('Você tem certeza que deseja excluir esta reclamação?')) {
      this.reclamacoesService.deleteReclamacao(id).subscribe(() => {
        this.reclamacoes = this.reclamacoes.filter(reclamacao => reclamacao.id !== id);
        this.router.navigate(['/']);
      }, error => {
        console.error('Erro ao excluir reclamação:', error);
      });

    }
  }

  ngOnInit(): void {
    this.reclamacoesService.getReclamacoes().subscribe(
      reclamacoes => this.reclamacoes = reclamacoes
    );

    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });

  }
}
