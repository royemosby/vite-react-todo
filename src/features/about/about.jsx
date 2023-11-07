import { Header } from "../../shared/components/header";

export function About() {
  return (
    //TODO
    <>
      <Header title={"About this Application"} />
      <main>
        <p>Created November 1st, 2023</p>
        <p>
          This todo application was built using{" "}
          <a href="https://vitejs.dev/guide/#scaffolding-your-first-vite-project">
            {"Vite's"} React template
          </a>{" "}
          as a code-along for example code in Code The {"Dream's"} React
          curriculum
        </p>
      </main>
    </>
  );
}
