import { TestBed, tick } from '@angular/core/testing';

import { TodoHttpService } from './todo-http.service';
import { HttpClient } from '@angular/common/http';
import { defer, of } from 'rxjs';
import { ToDoItem } from 'src/model/ToDoItem';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
describe('TodoHttpService', () => {
  let service: TodoHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    service = new TodoHttpService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all todo items when call getAll', () => {
    httpClientSpy.get.and.returnValue(
      asyncData([
        {
          id: 0,
          title: 'Home work',
          description: 'Have to complete home work',
          isDone: false,
        },
      ])
    );
    service.getAll().subscribe((data) => {
      expect(data.length).toEqual(1);
    });
    expect(httpClientSpy.get.calls.count()).toEqual(1);
  });

  it('should create new todo item when call create', () => {
    const newItem = {
      title: 'milk',
      description: 'Buy milk',
      isDone: false,
    };

    httpClientSpy.post.and.returnValue(asyncData(newItem));

    service.create('milk', 'buy milk').subscribe((data) => {
      expect(data).toEqual(newItem);
    });
    expect(httpClientSpy.post.calls.count()).toEqual(1);
  });

  it('should update old todo item when call update', () => {
    const oldItem = {
      id: 1,
      title: 'milk',
      description: 'Buy milk',
      isDone: false,
    };
    httpClientSpy.get.and.returnValue(of(oldItem));
    const newItem = {
      id: 1,
      title: 'apple',
      description: 'Buy apple',
      isDone: true,
    };
    httpClientSpy.put.and.returnValue(of(newItem));
    service
      .update(1, { title: 'apple', description: 'Buy apple', isDone: true })
      .subscribe((data) => {
        expect(data).toEqual(newItem);
      });
    expect(httpClientSpy.put.calls.count()).toEqual(1);
  });

  it('should get todo item by id when call getById', () => {
    const Item = {
      id: 1,
      title: 'milk',
      description: 'Buy milk',
      isDone: false,
    };
    httpClientSpy.get.and.returnValue(of(Item));
    service.getById(1).subscribe((data) => {
      expect(data.title).toEqual('milk');
    });
    expect(httpClientSpy.get.calls.count()).toEqual(1);
  });

  it('should delete todo item by id when call delete', () => {
    httpClientSpy.delete.and.returnValue(asyncData({
      id: 1,
      title: 'milk',
      description: 'Buy milk',
      isDone: false,
    }));
    service.delete(1).subscribe((data) => {
      expect(data.id).toEqual(1)
    });
    expect(httpClientSpy.delete.calls.count()).toEqual(1);
  });
});
