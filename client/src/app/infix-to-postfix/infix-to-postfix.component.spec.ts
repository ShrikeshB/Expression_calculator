import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfixToPostfixComponent } from './infix-to-postfix.component';

describe('InfixToPostfixComponent', () => {
  let component: InfixToPostfixComponent;
  let fixture: ComponentFixture<InfixToPostfixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfixToPostfixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfixToPostfixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
