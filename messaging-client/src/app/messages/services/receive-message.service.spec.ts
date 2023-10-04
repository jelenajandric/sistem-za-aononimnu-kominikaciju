import { TestBed } from '@angular/core/testing';

import { ReceiveMessageService } from './receive-message.service';

describe('ReceiveMessageService', () => {
  let service: ReceiveMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiveMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
