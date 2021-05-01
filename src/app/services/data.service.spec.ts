import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let http: HttpClient
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('Api url should be a string', () => {
    const service: DataService = new DataService(http);
    let type = typeof service.apiUrl;
    expect(type).toBe('string')
  })
});
