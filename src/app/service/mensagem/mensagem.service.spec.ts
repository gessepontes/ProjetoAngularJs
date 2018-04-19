import { TestBed, inject } from '@angular/core/testing';

import { MensagemService } from './mensagem.service';

describe('InstituicaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MensagemService]
    });
  });

  it('should be created', inject([MensagemService], (service: MensagemService) => {
    expect(service).toBeTruthy();
  }));
});
