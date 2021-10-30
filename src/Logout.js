import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as ACTIONS from './Login/Actions';

let Logout = (props) => {
  let dispatch = useDispatch();

  let history = useHistory();

  let d = null;

  useEffect(() => {
    history.push({ pathname: '/' });
    dispatch(ACTIONS.Logout());
  }, [dispatch]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      {d}
      <h1 style={{ color: '#636A28' }}>Déconnexion</h1>
    </div>
  );
};

export default Logout;
