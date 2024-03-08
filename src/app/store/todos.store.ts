import { signalStore, patchState, withMethods, withState } from "@ngrx/signals";
import { Todo } from "../models/todo";

export interface TodosState {
  todos: Todo[],
}

const initialValues = JSON.parse(localStorage.getItem('todos') ?? '');

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState<TodosState>({ todos: initialValues || [] }),
  withMethods((store) => ({
    addTodo(todo: Todo): void {
      patchState(store, (state) => ({ todos: [...state.todos, todo] }));
    },
    removeTodo(id: string): void {
      patchState(store, (state) => ({ todos: [...state.todos.filter(i => i.id !== id)] }));
    },
    updateTodo(todo: Todo): void {
      patchState(store, (state) => ({ todos: [...state.todos.filter(i => i.id !== todo.id), todo] }));
    },
  }),
  )
)
