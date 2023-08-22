import { TodosComponent } from './todos/todos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todos/todo/todo.component';

const routes: Routes = [
  {
    component: TodosComponent,
    path: '',
  },
  {
    component: TodoComponent,
    path: 'todo'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
