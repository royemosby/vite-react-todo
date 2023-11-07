import { useState } from "react";
import { Circle, CheckCircle } from "react-feather";
import { Button } from "../../shared/components/button";
import { TodoForm } from "./todo-form";
import "./todo.module.css";

export function Todo({ todo, updateTodo, deleteTodo, toggleCompleteTodo }) {
  const { title } = todo;
  const [isEditing, setIsEditing] = useState(false);

  function handleCompleteTodo(event) {
    event.preventDefault();
    toggleCompleteTodo(todo);
  }
  function handleEditTodo(event) {
    event.preventDefault();
    setIsEditing(!isEditing);
  }

  function handleUpdateTodo(todo) {
    updateTodo(todo);
    setIsEditing(false);
  }

  function handleDeleteTodo(event) {
    event.preventDefault();
    deleteTodo(todo);
  }

  return (
    <li>
      <div onClick={handleCompleteTodo}>
        {todo.isCompleted ? (
          <CheckCircle color="#3D707F" />
        ) : (
          <Circle color="#cbd2d0" />
        )}
      </div>
      {isEditing ? (
        <TodoForm
          onSubmit={handleUpdateTodo}
          todo={todo}
          buttonText="Update"
        />
      ) : (
        <p>{title}</p>
      )}
      <Button
        name={isEditing ? "Cancel" : "Edit"}
        clickHandler={handleEditTodo}
      />
      <Button
        name="Delete"
        clickHandler={handleDeleteTodo}
      />
    </li>
  );
}
