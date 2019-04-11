import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {todoItems: this.props.initItems};
  }

  addItem(todoItem) {
      this.state.todoItems.unshift({
      index: this.state.todoItems.length + 1,
      value: todoItem.newItemValue,
      done: false
    });
    this.setState({todoItems: this.state.todoItems});
  }

  removeItem (itemIndex) {
    this.state.todoItems.splice(itemIndex, 1);
    this.setState({todoItems: this.state.todoItems});
  }

  markTodoDone(itemIndex) {
    let todo = this.state.todoItems[itemIndex];
    this.state.todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? this.state.todoItems.push(todo) : this.state.todoItems.unshift(todo);
    this.setState({todoItems: this.state.todoItems});
  }

  componentDidMount() {
    this.refs.itemName.focus();
  }

  onSubmit(event) {
    event.preventDefault();
    const newItemValue = this.refs.itemName.value;

    if(newItemValue) {
      this.addItem({newItemValue});
      this.refs.form.reset();
    }
  }

  render() {
    return (
        <div id="main">
          <h1>Todo list</h1>
          <ul className="list-group">
            {this.props.initItems.map((item, index) => {
              return (<li key={index} className="list-group-item ">
              <div className={item.done ? "done" : "undone"}>
              <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={() => this.markTodoDone(index)}></span>
                {item.value}
              <button type="button" className="close" onClick={() => this.removeItem(index)}>&times;</button>
              </div>
              </li>)
            })}
          </ul>
          <form ref="form" onSubmit={this.onSubmit} className="form-inline">
            <input type="text" ref="itemName" className="form-control" placeholder="add a new todo..."/>
            <button type="submit" className="btn btn-default">Add</button>
          </form>
        </div>
    );
  }
}

export default App;
