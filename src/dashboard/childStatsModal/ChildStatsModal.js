import React from "react";
import { Modal } from "semantic-ui-react";
import api from "../api";

import "../modals.scss";

import StatsEntry from "./StatsEntry";

class ChildStatsModal extends React.Component {
  state = {
    modalOpen: false,
    child: null,
    stats: []
  };

  openModal = child => {
    this.setState({
      modalOpen: true,
      child
    });
    api.getStats(child.id).then(res => {
      res.sort((a, b) => (a.gameDisplayName > b.gameDisplayName ? 1 : -1));
      this.setState({ stats: res });
    });
  };

  closeModal = () => this.setState({ modalOpen: false });

  render() {
    const { child, stats } = this.state;

    if (!child) return null;

    return (
      <Modal
        open={this.state.modalOpen}
        onOpen={this.openModal}
        onClose={this.closeModal}
      >
        <Modal.Header>
          {child.firstName} {child.lastName}: Statistieken
        </Modal.Header>
        <Modal.Content>
          <div className="stats-entry top">
            <span>Spel Naam</span>
            <span>Parameter</span>
            <span>Behaalde Score/Tijd</span>
            <span>Datum</span>
          </div>
          {stats &&
            stats.map(stat => {
              return <StatsEntry key={stat.id} stats={stat} />;
            })}
          {stats.length === 0 && (
            <div className="stats-entry">
              <span>Nog geen statistieken</span>
            </div>
          )}
        </Modal.Content>
        <Modal.Actions>
          <div className="grow" />
          <button onClick={this.closeModal} className="gray-button">
            Sluiten
          </button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ChildStatsModal;
