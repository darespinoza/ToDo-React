import { Todo } from "../types";

type Props = {
  todo: Todo;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};

function TodoItem({ todo, deleteTodo, toggleTodo }: Props) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span
        onClick={() => toggleTodo(todo.id)}
        style={{
          cursor: "pointer",
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
