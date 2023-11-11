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
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'delete',
      'put',
      'post',
    ]);
    service = new TodohttpService(httpClientSpy);
  });

  it('should get items when call getAll', () => {
    httpClientSpy.get.and.returnValue(
      asyncData([
        {
          id: 0,
          title: 'food',
          description: 'buy eggs',
          isDone: false,
        },
      ])
    );

    service.getAll().subscribe((data) => {
      expect(data.length).toEqual(1);
    });

    expect(httpClientSpy.get.calls.count()).toEqual(1);
  });

  it('should create a new item when call create given title and description', () => {
    httpClientSpy.post.and.returnValue(
      asyncData({
        id: 0,
        title: 'food',
        description: 'buy eggs',
        isDone: false,
      })
    );

    service.create('food', 'buy eggs').subscribe((data) => {
      expect(data).toEqual({
        id: 0,
        title: 'food',
        description: 'buy eggs',
        isDone: false,
      });
    });

    expect(httpClientSpy.post.calls.count()).toEqual(1);
  });

  it('should mark an item done when call markDone given an item', () => {
    httpClientSpy.put.and.returnValue(
      asyncData({
        id: 0,
        title: 'food',
        description: 'buy eggs',
        isDone: true,
      })
    );

    service
      .markDone({
        id: 0,
        title: 'food',
        description: 'buy eggs',
        isDone: false,
      })
      .subscribe((data) => {
        expect(data).toEqual({
          id: 0,
          title: 'food',
          description: 'buy eggs',
          isDone: true,
        });
      });

    expect(httpClientSpy.put.calls.count()).toEqual(1);
  });

  it('should get correct item when call getItemById given id', () => {
    httpClientSpy.get.and.returnValue(
      asyncData({
        id: 0,
        title: 'food',
        description: 'buy eggs',
        isDone: false,
      })
    );

    service.getItemById(0).subscribe((data) => {
      expect(data).toEqual({
        id: 0,
        title: 'food',
        description: 'buy eggs',
        isDone: false,
      });
    });

    expect(httpClientSpy.get.calls.count()).toEqual(1);
  });

  it('should delete correct item when call deleteItemById given id', () => {
    httpClientSpy.delete.and.returnValue(
      asyncData({
        id: 0,
        title: 'food',
        description: 'buy eggs',
        isDone: false,
      })
    );

    service.deleteItemById(0).subscribe((data) => {
      expect(data).toEqual({
        id: 0,
        title: 'food',
        description: 'buy eggs',
        isDone: false,
      });
    });

    expect(httpClientSpy.delete.calls.count()).toEqual(1);
  });

  it('should update correct item when call update given id', () => {
    httpClientSpy.put.and.returnValue(
      asyncData({
        id: 0,
        title: 'food',
        description: 'buy an apple',
        isDone: false,
      })
    );

    service
      .update({
        id: 0,
        title: 'food',
        description: 'buy eggs',
        isDone: false,
      })
      .subscribe((data) => {
        expect(data).toEqual({
          id: 0,
          title: 'food',
          description: 'buy an apple',
          isDone: false,
        });
      });

    expect(httpClientSpy.put.calls.count()).toEqual(1);
  });
});
