import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { validateRequired } from "utils/validate";
import { signupChild } from "auth/actions";
import { selectUser } from "auth/selectors";

import "../auth/auth.scss";

class AddChild extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
    error: null
  };

  handleFirstNameChange = event =>
    this.setState({ firstName: event.target.value });

  handleLastNameChange = event =>
    this.setState({ lastName: event.target.value });

  handlePasswordChange = event =>
    this.setState({ password: event.target.value });

  handlePasswordConfirmChange = event =>
    this.setState({ passwordConfirm: event.target.value });

  validateForm = (firstName, lastName, password, passwordConfirm) => {
    if (!validateRequired(firstName)) return false;
    if (!validateRequired(lastName)) return false;
    if (!validateRequired(password)) return false;
    if (!validateRequired(passwordConfirm)) return false;
    if (password !== passwordConfirm) return false;
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();

    const { firstName, lastName, password, passwordConfirm } = this.state;
    const { signupChild, user } = this.props;

    const isValid = this.validateForm(
      firstName,
      lastName,
      password,
      passwordConfirm
    );

    if (isValid) {
      signupChild(firstName, lastName, user.id, password).then(() => {
        this.props.history.push(`/dashboard`);
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
          <h1>Voeg kind toe</h1>
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
          <button type="submit">Voeg toe</button>
          <Link to="/dashboard" className="red-button">
            Ga terug
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: selectUser(state)
});

const mapDispatchToProps = {
  signupChild
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddChild);
