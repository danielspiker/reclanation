import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamacoesFormComponent } from './reclamacoes-form.component';

describe('ReclamacoesFormComponent', () => {
  let component: ReclamacoesFormComponent;
  let fixture: ComponentFixture<ReclamacoesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamacoesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamacoesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
