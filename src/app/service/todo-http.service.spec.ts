import { TestBed } from '@angular/core/testing';

import { TodoHttpService } from './todo-http.service';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';

function asyncData<T>(data: T){
  return defer(() => Promise.resolve(data))
}

describe('TodoHttpService', () => {
  let service: TodoHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient',['get', 'post','put','delete'])
    service = new TodoHttpService(httpClientSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all todo items when call getAll', () => {
    httpClientSpy.get.and.returnValue(asyncData([{id: 0, title: "Home work", description: "Have to complete home work", isDone: false}]))
    service.getAll().subscribe(data => {
      expect(data.length).toEqual(1)
    })
    expect(httpClientSpy.get.calls.count()).toEqual(1)
  });

  it('should get create a new item when call create', () => {
    httpClientSpy.post.and.returnValue(asyncData
      (
        { id: 3, 
          title: "Home work", 
          description: "Have to complete home work", 
          isDone: false}
        ))
    service.create('new item', 'new description').subscribe(data => {
      expect(data).toEqual({
          id: 3, 
          title: "Home work", 
          description: "Have to complete home work", 
          isDone: false
      })
    })
    expect(httpClientSpy.post.calls.count()).toEqual(1)
  });

  it('should update item when call update', () => {
    httpClientSpy.put.and.returnValue(asyncData
      (
        { id: 3, 
          title: "update item", 
          description: "update description", 
          isDone: true
        }))
    service.update({
      id: 3, 
      title: "update item", 
      description: "update description", 
      isDone: false
  }).subscribe(data => {
      expect(data).toEqual({
        id: 3, 
        title: "update item", 
        description: "update description", 
        isDone: true
      })
    })
    expect(httpClientSpy.put.calls.count()).toEqual(1)
  });

  it('should get item by id when call getItemById', () => {
    httpClientSpy.get.and.returnValue(asyncData
      (
        { id: 3, 
          title: "get item", 
          description: "get description", 
          isDone: true
        }))
    service.getItemById(3).subscribe(data => {
      expect(data).toEqual({
        id: 3, 
        title: "get item", 
        description: "get description", 
        isDone: true
      })
    })
    expect(httpClientSpy.get.calls.count()).toEqual(1)
  });

  it('should delete item when call delete', () => {
    httpClientSpy.delete.and.returnValue(asyncData
      (
        { id: 3, 
          title: "delete item", 
          description: "delete description", 
          isDone: true
        }))
    service.delete(3).subscribe(data => {
      expect(data).toEqual(
        { 
          id: 3, 
          title: "delete item", 
          description: "delete description", 
          isDone: true
      })
    })
    expect(httpClientSpy.delete.calls.count()).toEqual(1)
  });
});
