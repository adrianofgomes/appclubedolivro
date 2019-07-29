import { TestBed } from '@angular/core/testing';

import { LivrosAPIService } from './livros-api.service';

describe('LivrosAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LivrosAPIService = TestBed.get(LivrosAPIService);
    expect(service).toBeTruthy();
  });
});
