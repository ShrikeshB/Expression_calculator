import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostfixEvaluatorComponent } from './postfix-evaluator/postfix-evaluator.component';
import { InfixToPostfixComponent } from './infix-to-postfix/infix-to-postfix.component';
import { LoginComponent } from './MyComponents/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: InfixToPostfixComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
