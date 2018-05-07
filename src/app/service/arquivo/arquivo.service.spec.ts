import { TestBed, inject } from '@angular/core/testing';

import { ArquivoService } from './arquivo.service';

describe('ArquivoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArquivoService]
    });
  });

  it('should be created', inject([ArquivoService], (service: ArquivoService) => {
    expect(service).toBeTruthy();
  }));
});
