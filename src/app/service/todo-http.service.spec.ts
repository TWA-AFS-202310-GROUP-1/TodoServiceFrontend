import { TestBed } from '@angular/core/testing';

import { TodoHTTPService } from './todo-http.service';

describe('TodoHTTPService', () => {
  let service: TodoHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
