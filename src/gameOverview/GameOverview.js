import React from "react";
import GameThumbnail from "../gameThumbnail/GameThumbnail";
import api from "./api";
import { connect } from "react-redux";
import { selectChildLoggedIn, selectUser } from "auth/selectors";

import "./gameOverview.scss";

class GameOverview extends React.Component {
  state = {
    games: []
  };

  async componentDidMount() {
    let games;
    if (this.props.childLoggedIn) {
      games = await api.findByChildId(this.props.user.id);
    } else {
      games = await api.getAll();
    }
    this.setState({ games });
  }

  render() {
    const { games } = this.state;
    const { match } = this.props;

    if (!games) return <div>Loading games...</div>;

    return (
      <div className="gameoverview">
        <h1>Kies een spel</h1>
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
