import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TodoList from "./TodoList";
  
var destination = document.querySelector("#container");
window.addEventListener("load", function() { window. scrollTo(0, 0); });
  
ReactDOM.render(
    <div>
      <TodoList/>
    </div>,
    destination
);