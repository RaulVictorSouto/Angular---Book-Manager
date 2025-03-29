import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBookComponent } from './modal-book.component';

describe('ModalBookComponent', () => {
  let component: ModalBookComponent;
  let fixture: ComponentFixture<ModalBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
