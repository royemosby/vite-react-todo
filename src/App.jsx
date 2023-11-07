import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Todos } from "./features/todos/todoes";
import { router } from "./routes/routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
