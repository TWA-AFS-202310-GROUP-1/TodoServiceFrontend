import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
    service.items=[
      {
        id: 1,
      title: 'xianke',
      description: 'xianke2',
      isDone: false
      },
      {
        id: 12,
      title: 'xianke33',
      description: 'xianke332',
      isDone: false
      }
    ]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all items when call getAll', () => {
    const items = service.getAll()
    expect(items).toEqual([
      {
        id: 1,
      title: 'xianke',
      description: 'xianke2',
      isDone: false
      },
      {
        id: 12,
      title: 'xianke33',
      description: 'xianke332',
      isDone: false
      }
    ]);
  });

  it('should create new item when call create', () => {
    service.create('xianke', 'xianke')
    expect(service.items).toEqual([
      {
        id: 1,
      title: 'xianke',
      description: 'xianke2',
      isDone: false
      },
      {
        id: 12,
      title: 'xianke33',
      description: 'xianke332',
      isDone: false
      },
      {
        id: 3,
      title: 'xianke',
      description: 'xianke',
      isDone: false
      }
    ]);
  });

  it('should mark item as done when call markDone', () => {
    service.markDone(1)
    expect(service.items[0].isDone).toEqual(true)
  });



});
