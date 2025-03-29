import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBookAuthorSelectorComponent } from './modal-book-author-selector.component';

describe('ModalBookAuthorSelectorComponent', () => {
  let component: ModalBookAuthorSelectorComponent;
  let fixture: ComponentFixture<ModalBookAuthorSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBookAuthorSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalBookAuthorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
