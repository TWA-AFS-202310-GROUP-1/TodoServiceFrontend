import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
    service.items = [
      {
        id:1,
        title:'buy milk',
        description: 'buy some milk',
        isDone: false
      }
    ]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all items when call getAll',()=>{
    const item = service.getAll()

    expect(service.items).toEqual([
      {
        id:1,
        title:'buy milk',
        description: 'buy some milk',
        isDone: false
      }
    ])
  })

  it('should create a new item when call create',()=>{
    const item = service.create('buy apple','buy some apple')

    expect(service.items).toEqual([
      {
        id:1,
        title:'buy milk',
        description: 'buy some milk',
        isDone: false
      },
      {
        id:2,
        title:'buy apple',
        description: 'buy some apple',
        isDone: false
      }
    ])
  })

  it('should markdone a item when call markdone',()=>{
    const item = service.markDone(1)
    expect(service.items[0].isDone).toEqual(true)
  })
});
