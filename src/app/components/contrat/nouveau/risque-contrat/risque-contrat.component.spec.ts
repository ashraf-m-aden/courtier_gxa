import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisqueContratComponent } from './risque-contrat.component';

describe('RisqueContratComponent', () => {
  let component: RisqueContratComponent;
  let fixture: ComponentFixture<RisqueContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RisqueContratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RisqueContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
