import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import "./App.css";

import TaskList from "./components/TaskList";
import Header from "./components/Header";
import Quote from "./components/Quote";

export default function App() {
  return (
    <>
      <MantineProvider>
        <Header />
        <TaskList />
        <Quote />
      </MantineProvider>
    </>
  );
}
