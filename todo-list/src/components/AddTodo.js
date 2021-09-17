import React, { Component } from "react";

export class AddTodo extends Component {
  state = {
    title: "",
  };

  onChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: "" });
  };

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        style={{ display: "flex", margin: "20px" }}
      >
        <input
          type="text"
          name="title"
          placeholder="Add new to do..."
          value={this.state.title}
          onChange={this.onChangeHandler}
          style={{ padding: "5px" }}
        />
        <input
          type="submit"
          value="Add"
          className="btn"
          style={{ marginLeft: "5px", width: "80px" }}
        />
      </form>
    );
  }
}

export default AddTodo;
