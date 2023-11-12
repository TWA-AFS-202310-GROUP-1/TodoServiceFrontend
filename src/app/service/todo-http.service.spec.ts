import { TestBed } from '@angular/core/testing';

import { TodoHTTPService } from './todo-http.service';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';
import { ToDoItem } from 'src/model/ToDoItem';

function asyncData<T>(data:T) {
  return defer(() => Promise.resolve(data))
}

describe('TodoHTTPService', () => {
  let service: TodoHTTPService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new TodoHTTPService(httpClientSpy)
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

  it('should create an item when call create', ()=>{
    httpClientSpy.post.and.returnValue(asyncData(
      {
        id: 0,
        title: 'xianke',
        description: 'xianke2',
        isDone: false,
      }
    ))
    service.create('xianke', 'xianke2').subscribe(data=>{
      expect(data.title).toEqual('xianke')
      expect(data.description).toEqual('xianke2')
      expect(data.isDone).toEqual(false)
    })
    expect(httpClientSpy.post.calls.count()).toEqual(1)
    })
    


});

