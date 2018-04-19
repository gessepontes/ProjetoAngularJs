import { TestBed, inject } from '@angular/core/testing';

import { ArquivoinstituicaoService } from './arquivoinstituicao.service';

describe('ArquivoinstituicaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArquivoinstituicaoService]
    });
  });

  it('should be created', inject([ArquivoinstituicaoService], (service: ArquivoinstituicaoService) => {
    expect(service).toBeTruthy();
  }));
});
