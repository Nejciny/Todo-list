import { Component, Input, Output } from '@angular/core';
import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Todo } from '../todos';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() EditTodo: Todo = {
    title: 'inEditingMode',
    desc: 'This is a dummy forms Todo',
    status: 'no status',
  };

  @Input() updatedTodos: Todo[] = []; 

  todoFormEdit = this.fb.group({
    titleEdit: this.EditTodo.title,
    descEdit: this.EditTodo.desc,
  });

  todoFormAdd = this.fb.group({
    titleAdd: '',
    descAdd: '',
  });

  newTodo: Todo = {
    title: '',
    desc: '',
    status: 'ToDo',
  }

  constructor(private fb: FormBuilder){

    this.todoFormEdit = this.fb.group({
      titleEdit: [this.EditTodo.title],
      descEdit: [this.EditTodo.desc],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['EditTodo']) {
      this.todoFormEdit.patchValue({
        titleEdit: this.EditTodo.title,
        descEdit: this.EditTodo.desc,
      });
    }
  }

  onSubmitEdit(){
    // checks if the fields are empty
    if (this.todoFormEdit.value.titleEdit!.length != 0 && this.todoFormEdit.value.descEdit!.length != 0){
      this.EditTodo.title = this.todoFormEdit.value.titleEdit!;
      this.EditTodo.desc = this.todoFormEdit.value.descEdit!;
  
      document.getElementById("background")!.style.display="none";
      document.getElementById("form-container")!.style.display="none";
    }
    else{
      alert("One of the fields is empty!");
    }

  }

  onSubmitAdd() {
    // create new instance to not override the previously saved new todos
    const newTodo: Todo = {
      title: this.todoFormAdd.value.titleAdd!,
      desc: this.todoFormAdd.value.descAdd!,
      status: 'ToDo'
    };
  
    if (newTodo.title.length !== 0 && newTodo.desc.length !== 0) {
      this.updatedTodos.push(newTodo);
      document.getElementById("background")!.style.display = "none";
      document.getElementById("form-container")!.style.display = "none";
  
      // clear the form inputs
      this.todoFormAdd.reset();
    } else {
      alert("One of the fields is empty!");
    }
  }

  closeForm(){
    document.getElementById("background")!.style.display="none";
    document.getElementById("form-container")!.style.display="none";

    // clear the form inputs
    this.todoFormAdd.reset();
  }


}