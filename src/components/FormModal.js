import React, { Component, Fragment } from "react";
import { Button, Dropdown, Form, Grid, Icon, Input } from "semantic-ui-react";
import { EMPLOYMENT_STATUS } from "../scripts/constants";
import { formSubmitAction } from "../redux/actions";
import { connect } from "react-redux";

class FormModal extends Component {
  state = {
    modalVisible: false,
    formValues: {
      firstName: "",
      lastName: "",
      employmentStatus: ""
    },
    rerenderModal: false,
    showDropdownError: false
  };

  showModal = () => {
    this.setState({
      modalVisible: true,
      rerenderModal: false
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
      rerenderModal: true,
      showDropdownError: false,
      formValues: {
        employmentStatus: ""
      }
    });
  };

  handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value
      }
    });
  };

  handleDropdownChange = (e, data) => {
    if (data.value !== "") {
      this.setState({
        showDropdownError: false
      });
    }
    this.setState({
      formValues: {
        ...this.state.formValues,
        employmentStatus: data.value
      }
    });
  };

  formSubmit = () => {
    if (this.state.formValues.employmentStatus === "") {
      this.setState({
        showDropdownError: true
      });
      return false;
    }
    this.props.dispatch(formSubmitAction(this.state.formValues));
    this.setState({
      modalVisible: false,
      rerenderModal: true,
      formValues: {
        employmentStatus: ""
      }
    });
  };

  renderModal = () => {
    const { modalVisible, showDropdownError } = this.state;
    return (
      <div className={`modal-wrapper ${modalVisible ? "show" : "hide"}`}>
        <div className="modal">
          <Icon name="remove" onClick={this.hideModal} />
          <Form onSubmit={this.formSubmit}>
            <Form.Field required>
              <label>First Name</label>
              <Input
                required
                fluid
                placeholder="Type your first name"
                name="firstName"
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>Last Name</label>
              <Input
                required
                fluid
                placeholder="Type your last name"
                name="lastName"
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>Employment status</label>
              <Dropdown
                required
                placeholder="Select your employment status"
                fluid
                selection
                options={EMPLOYMENT_STATUS}
                onChange={this.handleDropdownChange}
              />
              {showDropdownError && <p className="error">Please select an item in the list.</p>}
            </Form.Field>
            <p>
              <span className="error">*</span> - Required fields
            </p>
            <Button positive type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  };

  render() {
    const { user } = this.props;
    const { rerenderModal } = this.state;
    return (
      <Fragment>
        <Grid>
          {user && (
            <Grid.Row>
              <Grid.Column>
                <h3 className="user">
                  User: <span>{user.firstName}</span> <span>{user.lastName}</span>
                </h3>
                <p>Employment status: {user.employmentStatus}</p>
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row>
            <Grid.Column>
              <Button content="Show modal" primary onClick={this.showModal} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {!rerenderModal && this.renderModal()}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.formValues
});

export default connect(mapStateToProps)(FormModal);
