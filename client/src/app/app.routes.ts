import { Routes } from '@angular/router';
import { PostfixEvaluatorComponent } from './postfix-evaluator/postfix-evaluator.component';
import { InfixToPostfixComponent } from './infix-to-postfix/infix-to-postfix.component';
import { SignupComponent } from './MyComponents/signup/signup.component';
import { LoginComponent } from './MyComponents/login/login.component';

export const routes: Routes = [
  {path:"",component:PostfixEvaluatorComponent},
  { path: 'PostfixEvaluator', component: PostfixEvaluatorComponent },
  { path: 'Signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'InfixToPostfix', component: InfixToPostfixComponent },
];
