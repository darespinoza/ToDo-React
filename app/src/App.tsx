import { useState } from "react";
import TodoList from "./components/TodoList";
import { Todo } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  // useState for Todos
  // const [todos, setTodos] = useState<Todo[]>(() => {
  //   // Lazy initializer, avoids an extra render on start up
  //   const savedTodos = localStorage.getItem("todos");
  //   return savedTodos ? JSON.parse(savedTodos) : [];
  // });

  // Custom useLocalStorate hook
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [input, setInput] = useState("");

  // Save todos on local storage
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a todo..."
      />

      <button onClick={addTodo}>Add</button>

      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;
