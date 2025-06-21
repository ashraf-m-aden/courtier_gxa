import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsContratComponent } from './produits-contrat.component';

describe('ProduitsContratComponent', () => {
  let component: ProduitsContratComponent;
  let fixture: ComponentFixture<ProduitsContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitsContratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitsContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
