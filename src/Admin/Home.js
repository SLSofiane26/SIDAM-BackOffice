import React from 'react';
import { Fragment } from 'react';
import logo from '../Asset/image3White.svg';
import * as styleB from '../Style/Arme.module.css';

import CZ from '../Asset/1.svg';
import SW from '../Asset/2.svg';
import PSW from '../Asset/3.svg';

import CarabineCZ from '../Asset/4.svg';
import CarabineSW from '../Asset/5.svg';
import Mun from '../Asset/22.jpg';

let Home = () => {
  return (
    <Fragment>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          marginTop: '10%',
        }}
      >
        <div
          className={styleB.LogoSidam}
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <img
            alt='logosidam'
            src={logo}
            style={{
              top: 0,
              left: 0,
              width: '90%',
              zIndex: 1000,
            }}
          />
        </div>
      </div>
      <div
        className={styleB.HomeLogo}
        style={{ backgroundColor: '#636A28', marginTop: '0%' }}
      >
        <img
          alt='logosidam'
          src={Mun}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 0,
            width: '100%',
          }}
        />
        <div
          style={{
            zIndex: 10000,
            marginTop: '10%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            flexBasis: '100%',
          }}
        >
          <img src={CZ} width='13%' alt='CZ' />
          <img src={PSW} width='13%' alt='PSW' />
          <img src={SW} width='13%' alt='SW' />
          <img src={CarabineCZ} width='13%' alt='CarabineCZ' />
          <img src={CarabineSW} width='13%' alt='CarabineSW' />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
