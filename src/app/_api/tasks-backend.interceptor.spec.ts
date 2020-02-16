import { TestBed } from '@angular/core/testing';

import { TasksBackendInterceptor } from './tasks-backend.interceptor';

describe('TasksBackendInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TasksBackendInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TasksBackendInterceptor = TestBed.inject(TasksBackendInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
