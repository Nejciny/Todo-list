import { Component, OnChanges, SimpleChanges, DoCheck, OnDestroy} from '@angular/core';
import { Todo } from './todos';
import { Router } from '@angular/router';
import { DataService } from '../Service/DataService';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {

  filteredTodoList: Todo[] = [];

  todoList: Todo[] = [
    {
      title: "my dummy todo title",
      desc: "you will create a cool todo application! :)",
      status: "ToDo"
    },
    {
      title: "Go to store",
      desc: "buy: milk, bread, cheese, oranges, tomatoes",
      status: "ToDo"
    },
    {
      title: "last todo",
      desc: "ababababababab",
      status: "ToDo"
    },
  ];

  TodoInEditing: Todo = {
    title: 'dummy todo',
    desc: 'dummy desc',
    status: 'NA',
  };; 

  searchQuery: string = '';

  constructor (
    private route:Router,
    private dataService: DataService
  ){}

  ngOnInit(){
    // get todos from local storage when the app opens
    this.getData();

    // saves todos to local storage if the window is closed or the page is refreshed
    window.onbeforeunload = () => {
      this.saveData(); // Save data to local storage when the page is about to unload
    };
  }

  ngOnDestroy(): void{
    this.saveData();
    console.log("data was saved to local storage")
  }

  getData() {
    const myTodos = localStorage.getItem('todos');
  
    if (myTodos) {
      this.todoList = JSON.parse(myTodos);
    } else {
      console.log("No todos found in local storage.");
    }
  }

  saveData(){
    let myTodos = this.todoList;

    localStorage.setItem('todos',JSON.stringify(myTodos));
  }

  sortedTodos: Todo[] = this.todoList;

  addTodo(){
    document.getElementById('background')!.style.display="block";   
    document.getElementById('form-container')!.style.display = "block";
    document.getElementById('editForm')!.style.display = "none";
    document.getElementById('addForm')!.style.display = "block";
  }

  testVariable:object = {title:'title',desc:'desc'};

  navigateToTodo(todo:Todo){
    this.dataService.setData(todo);
    this.route.navigate(['todo']);
  }

  filterBySearch() {
    this.filteredTodoList = this.todoList.filter(todo =>
      todo.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  filterByStatus() {
    this.todoList.sort((a, b) => {
      if (a.status === 'Done' && b.status !== 'Done') {
        return -1; // 'Done' todos come first
      } else if (a.status !== 'Done' && b.status === 'Done') {
        return 1; // 'Done' todos come first
      } else {
        return 0; // No change in order
      }
    });
  }

  FinishedTodo(todo:Todo){
    todo.status = "Done";
  }

  EditTodo(todo:Todo){
    this.TodoInEditing = todo;

    document.getElementById('background')!.style.display="block";    
    document.getElementById('form-container')!.style.display = "block";
    document.getElementById('editForm')!.style.display = "block";
    document.getElementById('addForm')!.style.display = "none";
  }

  DeleteTodo(todo:Todo){
    let filteredList = this.todoList.filter(object => {
      return object.title != todo.title;
    });
    this.todoList = filteredList;
  }

}
