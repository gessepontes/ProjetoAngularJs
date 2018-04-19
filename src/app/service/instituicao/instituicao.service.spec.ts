import { TestBed, inject } from '@angular/core/testing';

import { InstituicaoService } from './instituicao.service';

describe('InstituicaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstituicaoService]
    });
  });

  it('should be created', inject([InstituicaoService], (service: InstituicaoService) => {
    expect(service).toBeTruthy();
  }));
});
