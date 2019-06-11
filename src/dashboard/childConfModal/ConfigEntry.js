import React from "react";

class ConfigEntry extends React.Component {
  state = {
    id: this.props.config.id,
    parameterValue: this.props.config.parameterValue,
    enabled: this.props.config.enabled,
    parameterName: this.props.config.parameterName,
    gameDisplayName: this.props.config.gameDisplayName
  };

  handleParameterChange = event => {
    const data = this.state;
    data.parameterValue = event.target.value;
    this.setState({ parameterValue: event.target.value });
    this.props.configChange(data);
  };

  handleEnabledChange = event => {
    const data = this.state;
    data.enabled = event.target.checked;
    this.setState({ enabled: event.target.checked });
    this.props.configChange(data);
  };

  render() {
    const { config } = this.props;
    const forId = `checkbox-${config.id}`;

    return (
      <div key={config.id} className="config-entry">
        <div>
          <input
            type="checkbox"
            id={forId}
            checked={this.state.enabled}
            onChange={this.handleEnabledChange}
          />
          <label htmlFor={forId}>{config.gameDisplayName}</label>
        </div>
        <div>
          <span>{config.parameterName}</span>
          <input
            type="text"
            value={this.state.parameterValue}
            onChange={this.handleParameterChange}
          />
        </div>
      </div>
    );
  }
}

export default ConfigEntry;
