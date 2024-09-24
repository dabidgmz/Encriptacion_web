import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatReciveComponent } from './chat-recive.component';

describe('ChatReciveComponent', () => {
  let component: ChatReciveComponent;
  let fixture: ComponentFixture<ChatReciveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatReciveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatReciveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
