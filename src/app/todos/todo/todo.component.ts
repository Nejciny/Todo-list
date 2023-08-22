import { DataService } from '../../Service/DataService';
import { Todo } from './../todos';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  myTodo:Todo = {
    title: 'no title provided',
    desc: 'dummy desc',
    status: 'na'
  };

  constructor(
    private dataService: DataService 
  ){}

  ngOnInit(): void{

    this.myTodo = this.dataService.getData();
    console.log(this.myTodo.title)
  }

}
