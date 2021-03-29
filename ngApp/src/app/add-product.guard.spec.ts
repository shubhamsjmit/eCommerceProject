import { TestBed } from '@angular/core/testing';

import { AddProductGuard } from './add-product.guard';

describe('AddProductGuard', () => {
  let guard: AddProductGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddProductGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
