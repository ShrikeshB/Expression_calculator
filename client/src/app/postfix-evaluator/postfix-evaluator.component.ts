import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../MyComponents/nav-bar/nav-bar.component';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-postfix-evaluator',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, NavBarComponent],

  templateUrl: './postfix-evaluator.component.html',
  styleUrl: './style/app.component.css',
})
export class PostfixEvaluatorComponent {
  constructor() {}
  private items: any[] = [];
  steps: String[] = [];
  flag: boolean = false;
  peek() {
    if (this.isEmpty()) {
      return 'No elements in the stack';
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  push(element: any) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      return 'Underflow';
    }
    return this.items.pop();
  }

  printStack() {
    return this.items.join(' ');
  }

  counter: number = 0;
  checkForOperator(item: any) {
    if (!isNaN(item)) {
      this.push(parseInt(item, 10));
    } else {
      let operand2 = this.pop();
      let operand1 = this.pop();

      switch (item) {
        case '+':
          this.push(operand1 + operand2);
          break;
        case '-':
          this.push(operand1 - operand2);
          break;
        case '*':
          this.push(operand1 * operand2);
          break;
        case '/':
          this.push(operand1 / operand2);
          break;
        case '^':
          this.push(Math.pow(operand1, operand2));
          break;
        default:
          throw new Error('Invalid operator: ' + item);
      }

      console.log(operand1 + item + operand2 + '=' + this.peek());
      this.steps[this.counter] = operand1 + item + operand2 + '=' + this.peek();
      this.counter++;
    }
  }

  result: String = '';
  evaluate(item: any) {
    this.result = '';
    this.items.length = 0;
    this.steps.splice(0, this.steps.length);
    this.counter = 0;
    let expression = item.expression;
    for (let i = 0; i < expression.length; i++) {
      this.checkForOperator(expression[i]);
    }

    if (this.items.length !== 1) {
      console.log('invalid express' + this.items.length);
      console.log('steps len ' + this.steps.length);

      this.result = 'invalid express';
    } else {
      console.log('steps len ' + this.steps.length);
      this.result = this.peek().toString();
      this.flag = true;
    }
  }
}

// 623+-382/^+