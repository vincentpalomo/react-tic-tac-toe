import React from 'react';

export default function Square(props) {
  return (
    <div className='square' {...props}>
      {props.x ? 'X' : props.o ? 'O' : ''}
    </div>
  );
}
