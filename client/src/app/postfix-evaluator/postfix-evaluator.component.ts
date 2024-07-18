import { Component, OnInit, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../MyComponents/nav-bar/nav-bar.component';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-postfix-evaluator',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    NavBarComponent,
    HttpClientModule,
  ],

  templateUrl: './postfix-evaluator.component.html',
  styleUrls: ['./style/app.component.css'],
})
export class PostfixEvaluatorComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private http: HttpClient
  ) {}

  private items: any[] = [];
  steps: string[] = [];
  flag: boolean = false;
  private uid: string = '';
  private flag_UID: boolean = false;
  //! get the UID from the session..
  private getSessionData(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      if (!sessionStorage.getItem(key)) {
        console.log('no session');
      } else {
        console.log('session available');
        this.flag_UID = true;
        this.uid = sessionStorage.getItem(key) || '';
      }
    }
  }

  expression_ls: any[] = [];
  getHistory() {
    const params = new HttpParams().set('UID', this.uid);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .get('http://localhost:3000/expression/postfix_eval_history', {
        headers,
        params,
      })
      .subscribe({
        next: (res) => {
          console.log('History retrieved!', res);
          this.expression_ls = res as any[];
          console.log(this.expression_ls);
          
        },
        error: (err) => {
          console.error('Error retrieving history:', err);
        },
      });
  }

  //! onload the function should execute..
  public ngOnInit(): void {
    this.getSessionData('UID');
    if (this.flag_UID) {
      this.getHistory();
    }
  }

  //! save the expression..
  private saveExpression(expression: any) {
    const data = {
      UID: this.uid,
      expression: expression,
    };
    console.log(data);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post('http://localhost:3000/expression/postfix_eval', data, { headers })
      .subscribe((res) => {
        console.log('expresion saved!', res);
        this.getHistory()
      });
  }

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
      if (this.flag_UID) {
        this.saveExpression(expression);
      }
    }
  }
}

// 623+-382/^+
