import React from 'react';

export const Definition = (props) => (
  <div style={{ maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
    <h1 style={{ fontFamily: 'serif', marginBottom: 0 }}>
      {props.syllables.join('·')}
    </h1>
    <div style={{ marginBottom: '5rem', fontWeight: 200 }}>
      <i>
      {props.type}
      </i>
    </div>
    <div style={{ fontWeight: 200 }}>
      {props.definition}
    </div>
  </div>
);
