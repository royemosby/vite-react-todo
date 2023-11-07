import { useState, useEffect } from "react";
import { Button } from "../../shared/components/button";
import styles from "./todo-form.module.css";

export function TodoForm({ onSubmit, todo, buttonText = "Submit" }) {
  const [title, setTitle] = useState("");
  const [isFieldEmpty, setIsFieldEmpty] = useState(!!todo);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (todo) {
      onSubmit({ title: title, id: todo.id });
    } else {
      onSubmit(title);
      setTitle("");
    }
  }

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
    }
  }, [todo]);

  useEffect(() => {
    if (title.length === 0) {
      setIsFieldEmpty(true);
    } else {
      setIsFieldEmpty(false);
    }
  }, [title]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Add a todo..."
        onChange={(evt) => setTitle(evt.target.value)}
      />
      <Button
        name={buttonText}
        type="submit"
        value="add todo"
        isDisabled={isFieldEmpty}
        clickHandler={handleSubmit}
      />
    </form>
  );
}
