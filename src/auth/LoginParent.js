import React from "react";

import "./auth.scss";

function Login() {
  return (
    <div>
      <h1>Log In als ouder/leerkracht</h1>
      <form>
        <input type="text" name="email" placeholder="E-mail" />
        <input type="password" name="password" placeholder="Wachtwoord" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
