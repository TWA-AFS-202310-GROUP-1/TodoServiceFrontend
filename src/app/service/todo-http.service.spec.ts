import { TestBed } from '@angular/core/testing';

import { TodoHTTPService } from './todo-http.service';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';

function asyncData<T>(data:T) {
  return defer(() => Promise.resolve(data))
}

describe('TodoHTTPService', () => {
  let service: TodoHTTPService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    service = TestBed.inject(TodoHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all todoitem when call getall', () => {
    httpClientSpy.get.and.returnValue(asyncData([
      {
        "id": 1,
      "title": 'xianke',
      "description": 'xianke2',
      "isDone": false
      }
    ]))

    service.getAll().subscribe(data => {
      expect(data.length).toEqual(1)
    }
    )
    expect(httpClientSpy.get.calls.count()).toEqual(1)
  });


});
