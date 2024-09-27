import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReclamacoesListComponent } from "./components/reclamacoes-list/reclamacoes-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReclamacoesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'entrega-2';
}
