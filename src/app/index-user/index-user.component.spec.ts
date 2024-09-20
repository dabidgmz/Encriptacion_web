import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndexUsersComponent } from './index-user.component';

describe('IndexUserComponent', () => {
  let component: IndexUsersComponent;
  let fixture: ComponentFixture<IndexUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
