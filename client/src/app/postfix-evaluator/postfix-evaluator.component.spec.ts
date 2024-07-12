import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostfixEvaluatorComponent } from './postfix-evaluator.component';

describe('PostfixEvaluatorComponent', () => {
  let component: PostfixEvaluatorComponent;
  let fixture: ComponentFixture<PostfixEvaluatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostfixEvaluatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostfixEvaluatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
