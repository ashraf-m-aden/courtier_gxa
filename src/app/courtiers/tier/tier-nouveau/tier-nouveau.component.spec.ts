import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierNouveauComponent } from './tier-nouveau.component';

describe('TierNouveauComponent', () => {
  let component: TierNouveauComponent;
  let fixture: ComponentFixture<TierNouveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TierNouveauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TierNouveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
