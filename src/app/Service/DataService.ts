

// used to send the information of the chosen todo to the todo page when you click the title in the table.

import { Injectable } from '@angular/core';
import { Todo } from '../todos/todos';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: Todo={
    title: '',
    desc: '',
    status: '',
  };

  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}