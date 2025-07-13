import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsBordereauComponent } from './models.component';

describe('ModelsBordereauComponent', () => {
  let component: ModelsBordereauComponent;
  let fixture: ComponentFixture<ModelsBordereauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelsBordereauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelsBordereauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
