import React, { useState, useReducer } from "react";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "remove":
      return state.filter( todo=> todo.id !== action.payload);
    case "toggle":  
     return state.map( todo => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo)
    default:
      return state;
  }
};

function UseReducer() {
  const [input, setinputvalue] = useState("");
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addtodo = () => {
    if (input.trim()) {
      dispatch({ type: "add", payload: input });
      setinputvalue("");
    }
  };
  return (
    <div>
      <h1>hi i am here </h1>
      <div>
        <h2> Add item to your todo list</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setinputvalue(e.target.value)}
          placeholder="enter new to-do"
        />
        <button onClick={addtodo}>Add to do</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}

            <button onClick={() => dispatch({ type: "toggle", payload: todo.id })}>
                {todo.completed ? "undo" : "complete"}
            </button>
            <button onClick={() => dispatch({ type: "remove", payload: todo.id })}>
              Remove
            </button>   




          </li>
        ))}
      </ul>
    </div>
  );
}

export default UseReducer;
