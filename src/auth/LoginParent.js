import React from "react";
import { connect } from "react-redux";
import { validateEmail, validateRequired } from "utils/validate";
import { loginParent } from "./actions";
import "./auth.scss";

class LoginParent extends React.Component {
  state = {
    email: "",
    password: "",
    error: null
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
    const { loginParent } = this.props;

    const isValid = this.validateForm(email, password);

    if (isValid) {
      loginParent(email, password).then(this.props.history.push("/dashboard"));
    } else {
      this.setState({ error: "Velden zijn niet juist ingevuld" });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Log In als begeleider</h1>
          {error && <p className="error-message">{error}</p>}
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
  loginParent
};

export default connect(
  null,
  mapDispatchToProps
)(LoginParent);
