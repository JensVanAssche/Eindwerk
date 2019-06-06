import React from "react";

import "./auth.scss";

function Signup() {
  return (
    <div>
      <h1>Registreer</h1>
      <form>
        <input type="text" name="firstname" placeholder="Voornaam" />
        <input type="text" name="lastname" placeholder="Achternaam" />
        <input type="text" name="email" placeholder="E-mail" />
        <input type="password" name="password1" placeholder="Wachtwoord" />
        <input
          type="password"
          name="password2"
          placeholder="Wachtwoord bevestigen"
        />
        <button type="submit">Registreer</button>
      </form>
    </div>
  );
}

export default Signup;
