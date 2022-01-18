import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePasswordViewComponent } from './create-password-view.component';

describe('CreatePasswordViewComponent', () => {
  let component: CreatePasswordViewComponent;
  let fixture: ComponentFixture<CreatePasswordViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePasswordViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePasswordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
