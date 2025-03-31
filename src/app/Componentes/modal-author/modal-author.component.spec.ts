import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAuthorComponent } from './modal-author.component';

describe('ModalAuthorComponent', () => {
  let component: ModalAuthorComponent;
  let fixture: ComponentFixture<ModalAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAuthorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
