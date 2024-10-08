import { ReclamacoesService } from './../../services/reclamacoes-api.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { Reclamacao } from '../../models/reclamacao';
import { ReclamacoesListComponent } from '../reclamacoes-list/reclamacoes-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reclamacoes-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReclamacoesListComponent, HttpClientModule, RouterModule, RouterOutlet],
  templateUrl: './reclamacoes-form.component.html',
  styleUrl: './reclamacoes-form.component.scss'
})

export class ReclamacoesFormComponent implements OnInit {
  reclamacao: Reclamacao = { id: 0, descricao: '' };
  isEditing = false;

  constructor(
    private reclamacoesService: ReclamacoesService, private router: Router, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditing = true;
      const relamacaoId = parseInt(id, 10);

      this.reclamacoesService.getReclamacoes().subscribe(relamacoes => {
        const encontrouReclamacao = relamacoes.find(p => p.id === relamacaoId);
        if (encontrouReclamacao) {
          this.reclamacao = encontrouReclamacao;
        }
      });
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditing = true;
        this.loadReclamacao(params['id']);
      }
    });
  }

  loadReclamacao(id: number) {
    this.reclamacoesService.getReclamacaoById(id).subscribe(
      reclamacao => this.reclamacao = reclamacao,
      error => console.error('OLHA O ERRO:', error)
    );
  }

  onSubmit() {
    if (this.isEditing) {
      this.updateReclamacao();
    } else {
      this.createReclamacao();
    }
  }

  createReclamacao() {
    this.reclamacoesService.createReclamacao(this.reclamacao).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => console.error('Error creating reclamacao:', error)
    );
  }

  updateReclamacao() {
    this.reclamacoesService.updateReclamacao(this.reclamacao).subscribe(
      () => {
        this.router.navigate(['/']); // Navigate back to the list
      },
      error => console.error('Error updating reclamacao:', error)
    );
  }
}
