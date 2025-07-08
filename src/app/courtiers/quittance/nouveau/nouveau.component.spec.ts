import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauQuittanceComponent } from './nouveau.component';

describe('NouveauQuittanceComponent', () => {
  let component: NouveauQuittanceComponent;
  let fixture: ComponentFixture<NouveauQuittanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouveauQuittanceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NouveauQuittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
