import React from "react";
import { connect } from "react-redux";
import { logout } from "auth/actions";

import "./dashboard.scss";

function DashboardChild({ logout }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <span onClick={logout} className="button">
        Uitloggen
      </span>
    </div>
  );
}

const mapDispatchToProps = {
  logout
};

export default connect(
  null,
  mapDispatchToProps
)(DashboardChild);
