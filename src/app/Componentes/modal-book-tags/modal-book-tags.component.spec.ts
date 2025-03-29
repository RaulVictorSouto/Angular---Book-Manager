import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBookTagsComponent } from './modal-book-tags.component';

describe('ModalBookTagsComponent', () => {
  let component: ModalBookTagsComponent;
  let fixture: ComponentFixture<ModalBookTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBookTagsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalBookTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
