import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import "./styles/App.css";
import {Container, Input, Menu, Segment} from "semantic-ui-react";
import {MENU_ITEMS} from "./scripts/constants";

class App extends Component {
  state = {
    activeItem: MENU_ITEMS.ITEM1
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderMenu = () => {
    const { activeItem } = this.state;
    return (
        <Menu pointing>
          <Menu.Item name={MENU_ITEMS.ITEM1} active={activeItem === MENU_ITEMS.ITEM1} onClick={this.handleItemClick} />
          <Menu.Item name={MENU_ITEMS.ITEM2} active={activeItem === MENU_ITEMS.ITEM2} onClick={this.handleItemClick} />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
    )
  };

  render() {
    return (
      <div className="App">
        <Container>
          {this.renderMenu()}
        <Segment>
        </Segment>
        </Container>
      </div>
    );
  }
}

export default App;
