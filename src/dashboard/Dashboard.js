import React from "react";
import { connect } from "react-redux";

import { logout } from "auth/actions";

function Dashboard({ logout }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <a href="#" onClick={logout}>
        logout
      </a>
    </div>
  );
}

const mapDispatchToProps = {
  logout
};

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
