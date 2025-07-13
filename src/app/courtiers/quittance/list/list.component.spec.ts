import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuittanceComponent } from './list.component';

describe('ListQuittanceComponent', () => {
  let component: ListQuittanceComponent;
  let fixture: ComponentFixture<ListQuittanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListQuittanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListQuittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
