import React from "react";
import { connect } from "react-redux";
import { validateEmail, validateRequired } from "utils/validate";
import { signupParent } from "./actions";

import "./auth.scss";

class Signup extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    error: null
  };

  handleFirstNameChange = event =>
    this.setState({ firstName: event.target.value });

  handleLastNameChange = event =>
    this.setState({ lastName: event.target.value });

  handleEmailChange = event => this.setState({ email: event.target.value });

  handlePasswordChange = event =>
    this.setState({ password: event.target.value });

  handlePasswordConfirmChange = event =>
    this.setState({ passwordConfirm: event.target.value });

  validateForm = (firstName, lastName, email, password, passwordConfirm) => {
    if (!validateRequired(firstName)) return false;
    if (!validateRequired(lastName)) return false;
    if (!validateEmail(email)) return false;
    if (!validateRequired(password)) return false;
    if (!validateRequired(passwordConfirm)) return false;
    if (password !== passwordConfirm) return false;
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();

    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm
    } = this.state;
    const { signupParent } = this.props;

    const isValid = this.validateForm(
      firstName,
      lastName,
      email,
      password,
      passwordConfirm
    );

    if (isValid) {
      signupParent(firstName, lastName, email, password).then(() => {
        this.props.history.push(`/login-parent`);
      });
    } else {
      this.setState({ error: "Velden zijn niet juist ingevuld" });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Registreer begeleider</h1>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            name="firstname"
            placeholder="Voornaam"
            value={this.state.firstName}
            onChange={this.handleFirstNameChange}
          />
          <input
            type="text"
            name="lastname"
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
            name="password1"
            placeholder="Wachtwoord"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <input
            type="password"
            name="password2"
            placeholder="Wachtwoord bevestigen"
            value={this.state.passwordConfirm}
            onChange={this.handlePasswordConfirmChange}
          />
          <button type="submit">Registreer</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  signupParent
};

export default connect(
  null,
  mapDispatchToProps
)(Signup);
