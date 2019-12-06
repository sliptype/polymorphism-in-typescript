import React from 'react';

export const Code = (props) => (
  <code style={{
    backgroundColor: 'black',
    padding: '.5rem',
    fontSize: 'xx-large',
    borderRadius: '1rem'}}>
  {props.children}
  </code>
);
