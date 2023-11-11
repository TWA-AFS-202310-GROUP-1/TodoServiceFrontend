import { TestBed } from '@angular/core/testing';

import { TodoHttpService } from './todo-http.service';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';
import { ToDoItem } from 'src/model/ToDoItem';

function asyncData<T>(data: T){
  return defer(()=>Promise.resolve(data))
}
describe('TodoHttpService', () => {
  let service: TodoHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(TodoHttpService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    service = new TodoHttpService(httpClientSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all todo items when call get all', () => {
    httpClientSpy.get.and.returnValue(asyncData([
      {
        id: 0,
        title: 'Home work',
        description: 'Have to complete home work',
        isDone: false,
      }
    ]));

    service.getAll().subscribe(data => {
      expect(data.length).toEqual(1)
    })

    expect(httpClientSpy.get.calls.count()).toEqual(1)
  });

  it('should create an item when call create', ()=>{
    httpClientSpy.post.and.returnValue(asyncData(
      {
        id: 0,
        title: 'Homework',
        description: 'Have to complete home work',
        isDone: false,
      }
    ))
    service.create('Home work', 'Have to complete home work').subscribe(data=>{
      expect(data.title).toEqual('Homework')
      expect(data.description).toEqual('Have to complete home work')
      expect(data.isDone).toEqual(false)
    })
    expect(httpClientSpy.post.calls.count()).toEqual(1)
    })

    it('should update details when call update', ()=>{
      httpClientSpy.put.and.returnValue(asyncData(
        {
          id: 0,
          title: 'Homework',
          description: 'Have to complete home work',
          isDone: true,
        }
      ))
      var item:ToDoItem ={
          id: 0,
          title: 'Homework1',
          description: 'Have to complete home work1',
          isDone: false,
      }
      service.update(0, item).subscribe(data => {
        expect(data.id).toEqual(0),
        expect(data.title).toEqual('Homework'),
        expect(data.description).toEqual('Have to complete home work'),
        expect(data.isDone).toEqual(true)
      })
      expect(httpClientSpy.put.calls.count()).toEqual(1)
    })

    it('should get item by id when call getItemById', ()=>{
      httpClientSpy.get.and.returnValue(asyncData(
        {
          id: 0,
          title: 'Homework',
          description: 'Have to complete home work',
          isDone: false,
        }
      ))
      service.getItemById(0).subscribe(data => {
        expect(data.id).toEqual(0),
        expect(data.title).toEqual('Homework'),
        expect(data.description).toEqual('Have to complete home work'),
        expect(data.isDone).toEqual(false)
      })
    })

});

