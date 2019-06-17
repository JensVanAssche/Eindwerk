import React from "react";
import GameThumbnail from "../gameThumbnail/GameThumbnail";
import api from "./api";
import { connect } from "react-redux";
import { selectChildLoggedIn, selectUser } from "auth/selectors";

import "./gameOverview.scss";

class GameOverview extends React.Component {
  _isMounted = false;

  state = {
    games: null
  };

  async componentDidMount() {
    this._isMounted = true;
    let games;
    if (this.props.childLoggedIn) {
      games = await api.findByChildId(this.props.user.id);
    } else {
      games = await api.getAll();
    }
    if (this._isMounted) this.setState({ games });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { games } = this.state;
    const { match } = this.props;

    if (!games) return <div>Loading games...</div>;

    return (
      <div className="gameoverview">
        <h1>spelletjes</h1>
        <div className="gameoverview-content">
          {games.map(game => {
            return (
              <GameThumbnail
                key={game.id}
                url={match.path}
                gameId={game.gameCodeName}
                image={game.imageName}
                gameTitle={game.gameDisplayName}
              />
            );
          })}
          {games.length === 0 && <p>Nog geen spelletjes hier</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  childLoggedIn: selectChildLoggedIn(state),
  user: selectUser(state)
});

export default connect(
  mapStateToProps,
  null
)(GameOverview);
