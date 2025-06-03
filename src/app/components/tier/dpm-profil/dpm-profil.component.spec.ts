import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpmProfilComponent } from './dpm-profil.component';

describe('DpmProfilComponent', () => {
  let component: DpmProfilComponent;
  let fixture: ComponentFixture<DpmProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpmProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpmProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
