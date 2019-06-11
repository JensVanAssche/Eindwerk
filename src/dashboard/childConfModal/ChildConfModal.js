import React from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { deleteChild } from "../actions";
import api from "../api";

import ConfigEntry from "./ConfigEntry";

import "../modals.scss";

class ChildConfModal extends React.Component {
  state = {
    modalOpen: false,
    child: null,
    config: null,
    sendData: []
  };

  openModal = child => {
    this.setState({
      modalOpen: true,
      child
    });
    api.getChildConfig(child.id).then(res => {
      res.sort((a, b) => (a.id > b.id ? 1 : -1));
      this.setState({ config: res });
    });
  };

  closeModal = () => {
    this.setState({ modalOpen: false, child: null, config: null });
    api.updateChildConfig(this.state.sendData);
  };

  deleteChild = () => {
    this.props.deleteChild(this.state.child.id).then(this.closeModal);
  };

  handleConfigChange = config => {
    const data = this.state.sendData
      .filter(c => c.id !== config.id)
      .concat(config);
    this.setState({ sendData: data });
  };

  render() {
    const { child, config } = this.state;

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
        <Modal.Content>
          {config &&
            config.map(c => {
              return (
                <ConfigEntry
                  key={c.id}
                  config={c}
                  configChange={this.handleConfigChange}
                />
              );
            })}
        </Modal.Content>
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
