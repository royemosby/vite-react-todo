import { Todo } from "./todo";

export function TodoList({
  todos,
  updateTodo,
  deleteTodo,
  isFetching,
  toggleCompleteTodo,
}) {
  return (
    <>
      {isFetching ? <p>Loading todos...</p> : ""}
      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            toggleCompleteTodo={toggleCompleteTodo}
          />
        ))}
      </ul>
    </>
  );
}
