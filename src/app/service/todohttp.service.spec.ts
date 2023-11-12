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
    
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post','put','delete']);
    service = new TodohttpService(httpClientSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all todo items when call getAll', () => {
    httpClientSpy.get.and.returnValue(asyncData([
      {
        id: 0,
        title: 'Home work',
        description: 'Have to complete home work',
        isDone: false,
      }
    ]))

    service.getAll().subscribe(data =>{
      expect(data.length).toEqual(1)
    })


    expect(httpClientSpy.get.calls.count()).toEqual(1)

  });

  it('should send post request to create a new todo item', () => {
    const newTodo = { id: 42,title: 'New Task', description: 'New task description', isDone: false };
    httpClientSpy.post.and.returnValue(asyncData(newTodo));
  
    service.create(newTodo.title, newTodo.description).subscribe(data => {
      expect(data).toEqual(newTodo);
    });
  
    expect(httpClientSpy.post.calls.count()).toEqual(1);
  });

  it('should send delete request to remove a todo item', () => {
    const id = 1;
    httpClientSpy.delete.and.returnValue(asyncData({ id: 1,title: 'New Task', description: 'New task description', isDone: false }));
  
    service.delete(id).subscribe(response => {
      expect(response).toEqual({id: 1, title: 'New Task', description: 'New task description', isDone: false });
    });
  
    expect(httpClientSpy.delete.calls.count()).toEqual(1);
  });

  it('should send put request to update a todo item', () => {
    const updatedTodo = { id: 1, title: 'Updated Task', description: 'Updated task description', isDone: true };
    httpClientSpy.put.and.returnValue(asyncData(updatedTodo));
  
    service.update(updatedTodo).subscribe(data => {
      expect(data).toEqual(updatedTodo);
    });
  
    expect(httpClientSpy.put.calls.count()).toEqual(1);
  });
  
  
  
});
