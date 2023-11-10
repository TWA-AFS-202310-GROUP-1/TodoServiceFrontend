import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
    service.items = [
      {
        id: 1,
        title: 'buy milk',
        description: 'shop',
        isDone: false,
      }
    ]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all items when call getAll', () => {
    const item = service.getAll()

    expect(service.items).toEqual([
      {
        id: 1,
        title: 'buy milk',
        description: 'shop',
        isDone: false,
      }
    ])
  });

  it('should add new item when call create', () => {
    service.create('new item', 'new description')

    expect(service.items).toEqual([
      {
        id: 1,
        title: 'buy milk',
        description: 'shop',
        isDone: false,
      },
      {
        id: 2,
        title: 'new item',
        description: 'new description',
        isDone: false,
      }
    ])
  });

  it('should mark item as done when call markDone', () => {
    service.markDone(1)

    expect(service.items[0].isDone).toEqual(true)
  });

});
