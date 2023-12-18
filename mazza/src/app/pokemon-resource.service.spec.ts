import { TestBed } from '@angular/core/testing';

import { PokemonResourceService } from './pokemon-resource.service';

describe('PokemonResourceService', () => {
  let service: PokemonResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
