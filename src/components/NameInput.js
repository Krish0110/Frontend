import React from 'react';

function NameInput({ userName, onChange }) {
  return (
    <div>
      <input
        type="text"
        maxLength="25"
        value={userName}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default NameInput;
