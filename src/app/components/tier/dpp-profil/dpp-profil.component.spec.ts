import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DppProfilComponent } from './dpp-profil.component';

describe('DppProfilComponent', () => {
  let component: DppProfilComponent;
  let fixture: ComponentFixture<DppProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DppProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DppProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
