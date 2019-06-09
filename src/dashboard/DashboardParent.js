import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import api from "./api";
import { selectUser } from "auth/selectors";
import { logout } from "auth/actions";

import "./dashboard.scss";

class Dashboard extends React.Component {
  state = {
    children: null,
    loading: true
  };

  async componentDidMount() {
    const { user } = this.props;
    const children = await api.getAll(user.id);
    this.setState({ children: children.payload, loading: false });
  }

  render() {
    const { logout } = this.props;
    if (this.state.loading) {
      return <span>loading</span>;
    }

    return (
      <div>
        <h1>Dashboard</h1>
        <Link to="/dashboard-parent/addchild" className="button">
          Voeg kind toe
        </Link>
        <span onClick={logout} className="button">
          Uitloggen
        </span>
        {this.state.children.map(child => {
          return (
            <div className="child-entry" key={child.id}>
              <span>
                {child.firstName} {child.lastName}
              </span>
              <span className="grow" />
              <span>Configureer</span>
              <span>Stats</span>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: selectUser(state)
});

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
