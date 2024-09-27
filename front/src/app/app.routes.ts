import { provideRouter, Routes } from '@angular/router';
import { ReclamacoesListComponent } from './components/reclamacoes-list/reclamacoes-list.component';
import { ReclamacoesFormComponent } from './components/reclamacoes-form/reclamacoes-form.component';

export const routes: Routes = [
  { path: '', component: ReclamacoesListComponent },
  { path: 'edit/:id', component: ReclamacoesFormComponent },
  { path: 'add', component: ReclamacoesFormComponent }
];

export const appRouterProviders = [provideRouter(routes)];
