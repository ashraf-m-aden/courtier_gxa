import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierProfilComponent } from './tier-profil.component';

describe('TierProfilComponent', () => {
  let component: TierProfilComponent;
  let fixture: ComponentFixture<TierProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TierProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TierProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
