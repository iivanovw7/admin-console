import React from 'react';

export const errorMessage = props => {
  if (props.errorMessage) {
    return (
      <div style={{ color: 'red', margin: '10px' }}>
        {props.errorMessage}
      </div>
    );
  }
};