import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBordereauxComponent } from './list.component';

describe('ListBordereauxComponent', () => {
  let component: ListBordereauxComponent;
  let fixture: ComponentFixture<ListBordereauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBordereauxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBordereauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
