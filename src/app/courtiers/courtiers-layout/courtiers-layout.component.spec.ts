import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtiersLayoutComponent } from './courtiers-layout.component';

describe('CourtiersLayoutComponent', () => {
  let component: CourtiersLayoutComponent;
  let fixture: ComponentFixture<CourtiersLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtiersLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtiersLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
