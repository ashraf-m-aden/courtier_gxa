import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProjetsComponent } from './details.component';

describe('DetailsProjetsComponent', () => {
  let component: DetailsProjetsComponent;
  let fixture: ComponentFixture<DetailsProjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsProjetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
