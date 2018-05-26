import React, {Component} from "react";
import "semantic-ui-css/semantic.min.css";
import "./styles/App.css";
import {Container} from "semantic-ui-react";
import Main from "./components/Main";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Container>
          <Main />
        </Container>
      </div>
    );
  }
}

export default App;
