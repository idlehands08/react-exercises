import React, { Component } from "react";
import PropTypes from "prop-types";

export class TodoItem extends Component {
  getStyle = () => {
    return {
      background: "smokewhite",
      padding: "10px",
      borderBottom: "1px #ccc solid",
      textDecoration: this.props.todo.completed ? "line-through" : "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    };
  };

  checkComplete = (e) => {
    console.log(this.props);
  };

  render() {
    // destructured this.props so we don't have to keep typing this.props etc etc.
    const { id, title } = this.props.todo;
    return (
      <div className="todo-item-row" style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            style={{ marginRight: "10px" }}
            //bind the props id to the lowest child so that the parent can have access to it.
            onChange={this.props.checkComplete.bind(this, id)}
          />
          {title}
          <button
            style={btnStyle}
            onClick={this.props.deleteTodo.bind(this, id)}
          >
            X
          </button>
        </p>
      </div>
    );
  }
}

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

const btnStyle = {
  background: "#FE9000",
  color: "#fff",
  border: "none",
  padding: "5px, 10px",
  marginLeft: "10px",
  cursor: "pointer",
  float: "right",
};

export default TodoItem;
