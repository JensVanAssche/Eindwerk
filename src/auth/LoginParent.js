import React from "react";
import { connect } from "react-redux";
import { validateEmail, validateRequired } from "utils/validate";
import { login } from "./actions";
import "./auth.scss";

class LoginParent extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleEmailChange = event => this.setState({ email: event.target.value });

  handlePasswordChange = event =>
    this.setState({ password: event.target.value });

  validateForm = (email, password) => {
    if (!validateEmail(email)) return false;
    if (!validateRequired(password)) return false;
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;
    const { login } = this.props;

    const isValid = this.validateForm(email, password);

    if (isValid) {
      login(email, password).then(res => console.log(res));
    }
  };

  render() {
    return (
      <div>
        <h1>Log In als ouder/leerkracht</h1>
        <form onSubmit={this.handleSubmit}>
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
  login
};

export default connect(
  null,
  mapDispatchToProps
)(LoginParent);
