import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProductNew } from './admin-product-new';

describe('AdminProductNew', () => {
  let component: AdminProductNew;
  let fixture: ComponentFixture<AdminProductNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductNew],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProductNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
