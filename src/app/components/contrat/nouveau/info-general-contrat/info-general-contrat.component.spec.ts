import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGeneralContratComponent } from './info-general-contrat.component';

describe('InfoGeneralContratComponent', () => {
  let component: InfoGeneralContratComponent;
  let fixture: ComponentFixture<InfoGeneralContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoGeneralContratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoGeneralContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
