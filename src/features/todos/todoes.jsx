import { useState, useEffect, useCallback } from "react";
const baseUrl = import.meta.env.VITE_API_URL;
const baseId = import.meta.env.VITE_BASE_ID;
const apiToken = import.meta.env.VITE_AIRTABLE_TOKEN;
import { Header } from "../../shared/components/header";
import { TodoList } from "./todo-list";
import { TodoForm } from "./todo-form";
import {
  deserializeEach,
  serializeNew,
  serializeExisting,
} from "../../shared/utils/serializers";

const url = `${baseUrl}/${baseId}/Default`;

const headers = {
  Authorization: `Bearer ${apiToken}`,
  "Content-Type": "application/json",
};

//TODO: provide successful API save/error toast
export function Todos() {
  const [todos, setTodos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getAllTodos = useCallback(async () => {
    setIsFetching(true);
    const options = {
      method: "GET",
      headers: headers,
    };
    try {
      const resp = await fetch(url, options);
      if (resp.ok) {
        const payload = await resp.json();
        const todos = payload.records.map((todo) => deserializeEach(todo));
        setTodos(todos);
      } else {
        throw new Error("Failure with GET all todos");
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  const addTodoCallback = useCallback(
    async (newTodo) => {
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(serializeNew(newTodo)),
      };
      try {
        const resp = await fetch(url, options);
        if (resp.ok) {
          const todo = await resp.json();
          setTodos([...todos, deserializeEach(todo)]);
        } else {
          throw new Error("Error POSTing new todo");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    },
    [todos],
  );

  function addTodo(title) {
    addTodoCallback({ title });
  }

  //handles updateTodo & toggleCompleteTodo
  const patchTodoCallback = useCallback(async (todo) => {
    const options = {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        records: [serializeExisting(todo)],
      }),
    };
    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error("Error PATCHing todo ${id}");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }, []);

  function updateTodo({ title, id }) {
    const targetTodoIndex = todos.findIndex((todo) => todo.id === id);
    const todoToUpdate = todos[targetTodoIndex];

    try {
      //update local version of todo
      if (targetTodoIndex > -1) {
        todoToUpdate.title = title;
        setTodos([
          ...todos.slice(0, targetTodoIndex),
          todoToUpdate,
          ...todos.slice(targetTodoIndex + 1),
        ]);
        //update remote copy
        patchTodoCallback(todoToUpdate);
      } else {
        throw new Error("todo not found");
      }
    } catch (e) {
      alert(e.message);
    }
  }

  //TODO update
  function toggleCompleteTodo({ id }) {
    const targetTodoIndex = todos.findIndex((todo) => {
      return todo.id === id;
    });
    const todoToToggle = todos[targetTodoIndex];
    //update local version of todo
    if (todoToToggle.completedAt) {
      delete todoToToggle.completedAt;
    } else {
      const now = new Date(Date.now());
      todoToToggle.completedAt = now.toISOString();
    }
    setTodos([
      ...todos.slice(0, targetTodoIndex),
      todoToToggle,
      ...todos.slice(targetTodoIndex + 1),
    ]);
    //update remote copy
    patchTodoCallback(todoToToggle);
  }

  //TODO update
  function deleteTodo({ id }) {
    const options = {
      method: "DELETE",
      headers,
    };
    async function removeTodoFromApi(id) {
      try {
        const resp = await fetch(`${url}/${id}`, options);
        if (resp.ok) {
          return await resp.json();
        } else {
          throw new Error("OOPS Patch todo ${id}");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    if (removeTodoFromApi(id)) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  }

  return (
    <>
      <Header title={"All Todos"} />
      <main>
        <TodoForm
          onSubmit={addTodo}
          isFetching={isFetching}
        />
        <TodoList
          isFetching={isFetching}
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          toggleCompleteTodo={toggleCompleteTodo}
        />
      </main>
    </>
  );
}
