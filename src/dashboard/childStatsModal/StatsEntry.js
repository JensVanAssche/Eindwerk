import React from "react";

class StatsEntry extends React.Component {
  render() {
    const { stats } = this.props;
    const date = new Date(stats.createdAt);
    const newDate =
      date.getHours() +
      ":" +
      date.getMinutes() +
      " " +
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear();

    return (
      <div key={stats.id} className="stats-entry">
        <span>{stats.gameDisplayName}</span>
        <span>{stats.statValue}</span>
        <span>{stats.time}</span>
        <span>{newDate}</span>
      </div>
    );
  }
}

export default StatsEntry;
