import React from "react";
import { connect } from "react-redux";
import { validateEmail, validateRequired } from "utils/validate";
import { loginChild } from "./actions";
import "./auth.scss";

class LoginParent extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: null
  };

  handleFirstNameChange = event =>
    this.setState({ firstName: event.target.value });

  handleLastNameChange = event =>
    this.setState({ lastName: event.target.value });

  handleEmailChange = event => this.setState({ email: event.target.value });

  handlePasswordChange = event =>
    this.setState({ password: event.target.value });

  validateForm = (firstName, lastName, email, password) => {
    if (!validateRequired(firstName)) return false;
    if (!validateRequired(lastName)) return false;
    if (!validateEmail(email)) return false;
    if (!validateRequired(password)) return false;
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();

    const { firstName, lastName, email, password } = this.state;
    const { loginChild } = this.props;

    const isValid = this.validateForm(firstName, lastName, email, password);

    if (isValid) {
      loginChild(firstName, lastName, email, password);
    } else {
      this.setState({ error: "Velden zijn niet juist ingevuld" });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Log In als kind</h1>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            name="firstName"
            placeholder="Voornaam"
            value={this.state.firstName}
            onChange={this.handleFirstNameChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Achternaam"
            value={this.state.lastName}
            onChange={this.handleLastNameChange}
          />
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Wachtwoord"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginChild
};

export default connect(
  null,
  mapDispatchToProps
)(LoginParent);
