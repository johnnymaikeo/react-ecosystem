import { todos } from "./reducers";

import { createSelector } from 'reselect';

export const getTodos = state => state.todos.data;
export const getTodosLoading = state => state.todos.isLoading;

// reselect prevent re-computing the function
// unless theres a change in the selectors

export const getIncompleteTodos = createSelector(
  getTodos,
  (todos) => todos.filter(todos => !todos.isCompleted)
);

export const getCompleteTodos = createSelector(
  getTodos,
  (todos) => todos.filter(todos => todos.isCompleted)
);
