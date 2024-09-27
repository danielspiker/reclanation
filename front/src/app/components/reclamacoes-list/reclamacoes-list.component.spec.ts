import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamacoesListComponent } from './reclamacoes-list.component';

describe('ReclamacoesListComponent', () => {
  let component: ReclamacoesListComponent;
  let fixture: ComponentFixture<ReclamacoesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamacoesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamacoesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
