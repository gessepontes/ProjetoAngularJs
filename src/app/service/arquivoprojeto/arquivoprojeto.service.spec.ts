import { TestBed, inject } from '@angular/core/testing';

import { ArquivoProjetoService } from './arquivoprojeto.service';

describe('ArquivoprojetoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArquivoProjetoService]
    });
  });

  it('should be created', inject([ArquivoProjetoService], (service: ArquivoProjetoService) => {
    expect(service).toBeTruthy();
  }));
});
