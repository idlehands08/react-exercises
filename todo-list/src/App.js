import React, { Component } from "react";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    todos: [
      // {
      //   id: uuidv4(),
      //   title: "The quick brown fox",
      //   completed: false,
      // },
      // {
      //   id: uuidv4(),
      //   title: "Jumped over the lazy dog",
      //   completed: false,
      // },
      // {
      //   id: uuidv4(),
      //   title: "Hello world!",
      //   completed: false,
      // },
    ],
  };

  checkComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  //Delete Todo
  deleteTodo = (id) => {
    this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    });
  };

  addTodo = (title) => {
    if (title.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        title: title,
        completed: false,
      };
      this.setState({
        todos: [...this.state.todos, newTodo],
      });
    } else {
      alert("New to do cannot be empty!");
    }
  };

  render() {
    return (
      <div className="App">
        <div className="todoList-container">
          <Header />
          <AddTodo addTodo={this.addTodo} />
          <div className="todoItems-wrapper">
            <Todos
              todos={this.state.todos}
              checkComplete={this.checkComplete}
              deleteTodo={this.deleteTodo}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
