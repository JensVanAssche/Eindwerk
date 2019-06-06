import React from "react";

import "./auth.scss";

function Login() {
  return (
    <div>
      <h1>Log In als kind</h1>
      <form>
        <input
          type="text"
          name="email"
          placeholder="E-mail van de ouder/leerkracht"
        />
        <input type="text" name="name" placeholder="Volledige naam kind" />
        <input type="password" name="password" placeholder="Wachtwoord" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
