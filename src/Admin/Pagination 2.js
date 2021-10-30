import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

let Pagination = ({ total, postPerParge, paginate }) => {
  let d = [];

  for (let i = 1; i <= Math.ceil(total / postPerParge); i++) {
    d.push(i);
  }

  return (
    <Fragment>
      <div
        style={{
          zIndex: 0,
        }}
      >
        <ul
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            display: 'flex',
          }}
        >
          {d.map((number) => {
            return (
              <li key={number} style={{ color: '#636A28', listStyle: 'none' }}>
                <a onClick={() => paginate(number)}>{number}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default withRouter(Pagination);
