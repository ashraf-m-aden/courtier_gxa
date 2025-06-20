import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPieceContratComponent } from './admin-piece-contrat.component';

describe('AdminPieceContratComponent', () => {
  let component: AdminPieceContratComponent;
  let fixture: ComponentFixture<AdminPieceContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPieceContratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPieceContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
