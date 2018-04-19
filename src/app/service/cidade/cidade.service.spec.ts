import { TestBed, inject } from '@angular/core/testing';

import { CidadeService } from './cidade.service';

describe('CidadeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CidadeService]
    });
  });

  it('should be created', inject([CidadeService], (service: CidadeService) => {
    expect(service).toBeTruthy();
  }));
});
