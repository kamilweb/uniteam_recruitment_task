import React, { Component, Fragment } from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
import { MENU_TABS } from "../scripts/constants";
import { connect } from "react-redux";
import { fetchItemsAction, searchItemsAction } from "../redux/actions";
import ItemsList from "./ItemsList";
import FormModal from "./FormModal";

class Main extends Component {
  state = {
    activeTab: MENU_TABS.TAB1
  };

  componentDidMount() {
    this.props.dispatch(fetchItemsAction());
  }

  handleItemClick = (e, { name }) => this.setState({ activeTab: name });

  handleSearchItems = e => {
    const { items } = this.props;
    this.props.dispatch(searchItemsAction(items, e.target.value));
  };

  renderMenu = () => {
    const { activeTab } = this.state;
    return (
      <Menu pointing>
        <Menu.Item name={MENU_TABS.TAB1} active={activeTab === MENU_TABS.TAB1} onClick={this.handleItemClick} />
        <Menu.Item name={MENU_TABS.TAB2} active={activeTab === MENU_TABS.TAB2} onClick={this.handleItemClick} />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input
              icon="search"
              placeholder="Search..."
              disabled={activeTab === MENU_TABS.TAB2}
              onChange={this.handleSearchItems}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  };

  render() {
    const { activeTab } = this.state;
    const { visibleItems } = this.props;
    return (
      <Fragment>
        {this.renderMenu()}
        <Segment>
          {activeTab === MENU_TABS.TAB1 && <ItemsList visibleItems={visibleItems} />}
          {activeTab === MENU_TABS.TAB2 && <FormModal />}
        </Segment>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items.items,
  visibleItems: state.visibleItems.items ? state.visibleItems.items : state.items.items
});

export default connect(mapStateToProps)(Main);
