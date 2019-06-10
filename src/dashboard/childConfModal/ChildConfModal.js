import React from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { deleteChild } from "../actions";

import "../modals.scss";

class ChildConfModal extends React.Component {
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

  deleteChild = () => {
    this.props.deleteChild(this.state.child.id).then(this.closeModal);
  };

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
          {child.firstName} {child.lastName}: Configureer
        </Modal.Header>
        <Modal.Content>a</Modal.Content>
        <Modal.Actions>
          <button onClick={this.deleteChild} className="red-button">
            Verwijder kind
          </button>
          <div className="grow" />
          <button onClick={this.closeModal} className="gray-button">
            Sluiten
          </button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  deleteChild
};

export default connect(
  null,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(ChildConfModal);
