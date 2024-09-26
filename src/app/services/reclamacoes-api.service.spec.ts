import { TestBed } from '@angular/core/testing';

import { ReclamacoesApiService } from './reclamacoes-api.service';

describe('ReclamacoesApiService', () => {
  let service: ReclamacoesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReclamacoesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
