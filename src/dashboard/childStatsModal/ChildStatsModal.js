import React from "react";
import { Modal } from "semantic-ui-react";

import "../modals.scss";

class ChildStatsModal extends React.Component {
  state = {
    modalOpen: false,
    child: null
  };

  openModal = child =>
    this.setState({
      modalOpen: true,
      child
    });

  closeModal = () => this.setState({ modalOpen: false });

  render() {
    const { child } = this.state;

    if (!child) return null;

    return (
      <Modal
        open={this.state.modalOpen}
        onOpen={this.openModal}
        onClose={this.closeModal}
        size="small"
      >
        <Modal.Header>
          {child.firstName} {child.lastName}: Statistieken
        </Modal.Header>
        <Modal.Content>a</Modal.Content>
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
