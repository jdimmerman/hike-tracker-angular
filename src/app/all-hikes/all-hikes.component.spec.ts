import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHikesComponent } from './all-hikes.component';

describe('AllHikesComponent', () => {
  let component: AllHikesComponent;
  let fixture: ComponentFixture<AllHikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllHikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllHikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
