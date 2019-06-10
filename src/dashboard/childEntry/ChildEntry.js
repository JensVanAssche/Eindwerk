import React from "react";

import "./childEntry.scss";

const ChildEntry = ({ child, openConfModal, openStatsModal }) => {
  const { firstName, lastName } = child;
  return (
    <div className="child-entry" key={child.id}>
      <span>
        {firstName} {lastName}
      </span>
      <span className="grow" />
      <span onClick={() => openConfModal(child)} className="actions">
        Configureer
      </span>
      <span onClick={() => openStatsModal(child)} className="actions">
        Stats
      </span>
    </div>
  );
};

export default ChildEntry;
