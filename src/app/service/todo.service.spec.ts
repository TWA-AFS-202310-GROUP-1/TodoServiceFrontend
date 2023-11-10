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
        title: 'food',
        description: 'buy milk',
        isDone: false,
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all items when call getAll', () => {
    const items = service.getAll();
    expect(items).toEqual([
      {
        id: 1,
        title: 'food',
        description: 'buy milk',
        isDone: false,
      },
    ]);
  });

  it('should create a new item when call create given title and description', () => {
    const title = 'food';
    const description = 'buy eggs';
    service.create(title, description);

    expect(service.items).toEqual([
      {
        id: 1,
        title: 'food',
        description: 'buy milk',
        isDone: false,
      },
      {
        id: 2,
        title: 'food',
        description: 'buy eggs',
        isDone: false,
      },
    ]);
  });

  it('should mark item done when call markDone given index', () => {
    const id = 1;
    service.markDone(1);

    expect(service.items[id-1].isDone).toBe(true);
  });
});
