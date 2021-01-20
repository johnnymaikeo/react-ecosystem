import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from './thunks';
import {
  getTodos,
  getTodosLoading,
  getCompleteTodos,
  getIncompleteTodos
} from './selectors';

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = ({ completedTodos, incompletedTodos, isLoading, onRemovePressed, onCompletedPressed, startLoadingTodos }) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = <div>loading todos...</div>;

  const content = (
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete:</h3>
      {incompletedTodos.map((todo, key) =>
        <TodoListItem
          key={key}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed} />
      )}
      <h3>Completed:</h3>
      {completedTodos.map((todo, key) =>
        <TodoListItem
          key={key}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed} />
      )}
    </ListWrapper>
  );

  return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompleteTodos(state),
  incompletedTodos: getIncompleteTodos(state)
});

const mapDispatchToProps = dispatch => ({
  onRemovePressed: id => dispatch(removeTodoRequest(id)),
  onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
  startLoadingTodos: () => dispatch(loadTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
