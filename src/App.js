import React from "react";
import "../src/styles/styles.css";
import axios from "axios";

class Todo extends React.Component {
  state = {
    items: [],
    name: ""
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API}/items`)
      .then(res => {
        this.setState({
          items: res.data.reverse()
        });
      })
      .catch(err => {});
  }
  updateName = e => {
    this.setState({
      name: e.target.value
    });
  };
  addItem = e => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/items`, { name: this.state.name })
      .then(res => {
        let items = this.state.items;
        items.unshift(res.data);
        this.setState({
          items: items,
          name: ""
        });
      });
  };
  toggleDone = x => {
    let current = x.done;
    let newValue = !current;

    axios
      .patch(`${process.env.REACT_APP_API}/items/${x._id}`, {
        name: x.name,
        done: newValue
      })
      .then(res => {
        let item = res.data;
        let items = this.state.items;
        items.forEach((element, index) => {
          if (element._id === item._id) {
            items[index] = item;
          }
        });
        this.setState({
          items: items
        });
      });
  };
  getItemStyle = element => {
    return element.done ? "done" : "";
  };
  deleteItem = x => {
    axios
      .delete(`${process.env.REACT_APP_API}/items/${x._id}`)
      .then(res => {
        let items = this.state.items;
        let item = res.data;
        items.forEach((element, index) => {
          if (element._id === item._id) {
            delete items[index];
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <>
        <div className="layout">
          <h1>
            <strong>ToDo List.</strong>
          </h1>
          <div className="list">
            <form onSubmit={this.addItem}>
              <input
                type="text"
                placeholder="Add Item..."
                value={this.state.name}
                onChange={this.updateName}
              />
              <button>
                <i className="fas fa-plus"></i>
              </button>
            </form>
            <ul>
              {this.state.items.map(element => {
                return (
                  <li
                    className={this.getItemStyle(element)}
                    key={element._id}
                    onClick={x => this.toggleDone(element)}
                  >
                    {element.name}
                    <i
                      className="fas fa-minus-circle"
                      onClick={x => this.deleteItem(element)}
                    ></i>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Todo;
