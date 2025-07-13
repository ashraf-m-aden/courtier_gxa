import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEncaissementComponent } from './list.component';

describe('ListEncaissementComponent', () => {
  let component: ListEncaissementComponent;
  let fixture: ComponentFixture<ListEncaissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEncaissementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEncaissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
