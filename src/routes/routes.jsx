import { createBrowserRouter } from "react-router-dom";
import { Todos } from "../features/todos/todoes";
import { About } from "../features/about/about";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Todos />,
  },
  {
    path: "about",
    element: <About />,
  },
]);
