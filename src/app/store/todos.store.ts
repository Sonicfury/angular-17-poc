import { signalStore, patchState, withMethods, withState, type } from "@ngrx/signals";
import { Todo } from "../models/todo";
import { withCallState, withDevtools, withUndoRedo } from "@angular-architects/ngrx-toolkit";
import { withEntities } from "@ngrx/signals/entities";

export interface TodosState {
  todos: Todo[],
}

const initialValues = JSON.parse(localStorage.getItem('todos') ?? '');

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withDevtools('todos'),
  withCallState({ collection: 'todos' }),
  withEntities({
    entity: type<Todo>(),
    collection: 'todos'
  }),
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
  ),
  withUndoRedo({collections: ['todos']})
)
