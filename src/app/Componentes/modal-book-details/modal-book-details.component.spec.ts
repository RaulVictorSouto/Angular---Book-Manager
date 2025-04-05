import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBookDetailsComponent } from './modal-book-details.component';

describe('ModalBookDetailsComponent', () => {
  let component: ModalBookDetailsComponent;
  let fixture: ComponentFixture<ModalBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBookDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
