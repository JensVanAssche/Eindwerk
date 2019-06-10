import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectUser } from "auth/selectors";
import { logout } from "auth/actions";
import { getChildren } from "./actions";
import { selectChildren } from "./selectors";

import ChildEntry from "./childEntry/ChildEntry";
import ChildConfModal from "./childConfModal/ChildConfModal";
import ChildStatsModal from "./childStatsModal/ChildStatsModal";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.confModalRef = React.createRef();
    this.statsModalRef = React.createRef();
    this.state = {
      children: null
    };
  }

  componentDidMount() {
    const { user, getChildren } = this.props;
    getChildren(user.id);
  }

  openConfModal = child => this.confModalRef.current.openModal(child);

  openStatsModal = child => this.statsModalRef.current.openModal(child);

  render() {
    const { logout, children } = this.props;
    if (!children) {
      return <span>loading</span>;
    }

    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <Link to="/dashboard-parent/addchild" className="red-button">
          Voeg kind toe
        </Link>
        <span onClick={logout} className="red-button">
          Uitloggen
        </span>
        {children.map(child => {
          return (
            <ChildEntry
              child={child}
              key={child.id}
              openConfModal={this.openConfModal}
              openStatsModal={this.openStatsModal}
            />
          );
        })}
        {children.length === 0 && (
          <div>
            <p>
              Nog geen kinderen op dit account. Maak een account voor je kind
              aan!
            </p>
          </div>
        )}
        <ChildConfModal ref={this.confModalRef} />
        <ChildStatsModal ref={this.statsModalRef} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: selectUser(state),
  children: selectChildren(state)
});

const mapDispatchToProps = {
  logout,
  getChildren
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
