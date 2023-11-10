import { TestBed } from '@angular/core/testing';

import { TodohttpService } from './todohttp.service';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('TodohttpService', () => {
  let service: TodohttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    //TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    //service = TestBed.inject(TodohttpService);
    service = new TodohttpService(httpClientSpy)
  });

  it('should get items when call GetAll', () => {
    httpClientSpy.get.and.returnValue(
      asyncData([
        {
          id: 0,
          title: 'food',
          description: 'buy eggs',
          isDone: false,
        },
      ])
    );

    service.getAll().subscribe(data => {
      expect(data.length).toEqual(1)
    });

    expect(httpClientSpy.get.calls.count()).toEqual(1);

  });
});
