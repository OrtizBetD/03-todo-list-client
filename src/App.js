import React from "react";
import "./styles/styles.css";

class App extends React.Component {
  render() {
    return (
      <>
        <div className="layout">
          <h1>ToDo List.</h1>
          <div className="list">
            <form>
              <input type="text" placeholder="Add Item..." />
              <button>
                <i className="fas fa-plus"></i>
              </button>
            </form>
            <ul>
              <li>
                Go surfing <i className="fas fa-minus-circle"></i>
              </li>
              <li className="done">
                Study JavaScript <i className="fas fa-minus-circle"></i>
              </li>
              <li className="done">
                Make coffee <i className="fas fa-minus-circle"></i>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default App;
