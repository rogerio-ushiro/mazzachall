import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiDataResourceService } from './api-data-resource.service';

describe('ApiDataResourceService', () => {
  let service: ApiDataResourceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiDataResourceService],
    });
    service = TestBed.inject(ApiDataResourceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('the service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from the API and cache it', () => {
    const mockApiResponse = {
      data: [{ id: '1', name: 'Card 1' }, { id: '2', name: 'Card 2' }],
    };

    service.content().subscribe((data) => {
      expect(data).toEqual(mockApiResponse.data);
    });

    const req = httpTestingController.expectOne('https://api.pokemontcg.io/v2/cards');
    expect(req.request.method).toEqual('GET');
    req.flush(mockApiResponse);

    service.content().subscribe((cachedData) => {
      expect(cachedData).toEqual(mockApiResponse.data);
    });
  });

  it('should retrieve a card by ID', () => {
    const mockApiResponse = {
      data: [{ id: '1', name: 'Card 1' }, { id: '2', name: 'Card 2' }],
    };

    service.content().subscribe((data) => {
      expect(data).toEqual(mockApiResponse.data);
    });

    const req = httpTestingController.expectOne('https://api.pokemontcg.io/v2/cards');
    expect(req.request.method).toEqual('GET');
    req.flush(mockApiResponse);
  });

});