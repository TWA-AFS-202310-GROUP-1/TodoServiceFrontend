import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
    service.items = [{
      id: 1,
      title: 'buy milk',
      description: 'buy some milk',
      isDone: false,
    }]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all items when call getAll', ()=>{
    const items = service.getAll()
    expect(items).toEqual([{
      id: 1,
      title: 'buy milk',
      description: 'buy some milk',
      isDone: false,
    }])
  })

  it('should create a item when call create', ()=>{
    service.create("buy egg", "buy some eggs")
    expect(service.items).toEqual([{
      id: 1,
      title: 'buy milk',
      description: 'buy some milk',
      isDone: false,
    }, 
    {
      id: 2,
      title: 'buy egg',
      description: 'buy some eggs',
      isDone: false,
    }])
  })
});
