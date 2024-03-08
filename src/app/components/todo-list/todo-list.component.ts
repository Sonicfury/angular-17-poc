import { v4 as uuidv4 } from 'uuid';
import { DatePipe } from '@angular/common';
import { Component, inject, effect } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TodosStore } from '@store/todos.store';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  providers: [TodosStore],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  readonly store = inject(TodosStore)
  newTodoCtl = new FormControl('')
  assigneeCtl = new FormControl('')

  constructor() {
    effect(() => {
      localStorage.setItem('todos', JSON.stringify(this.store.todos()))
    })
  }

  addTodo() {
    this.store.addTodo({
      id: uuidv4(),
      assignee: this.assigneeCtl.value || '',
      content: this.newTodoCtl.value || '',
      isDone: false,
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
    })

    this.newTodoCtl.reset();
    this.assigneeCtl.reset();
  }

  toggleTodo(todo: Todo) {
    this.store.updateTodo({ ...todo, isDone: !todo.isDone, lastUpdatedAt: new Date() })
  }

  removeTodo(id: string) {
    this.store.removeTodo(id)
  }

  reset() {
    this.store.todos().forEach(t => this.store.removeTodo(t.id))
  }
}
