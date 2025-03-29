import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBookGenreSelectorComponent } from './modal-book-genre-selector.component';

describe('ModalBookGenreSelectorComponent', () => {
  let component: ModalBookGenreSelectorComponent;
  let fixture: ComponentFixture<ModalBookGenreSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBookGenreSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalBookGenreSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
