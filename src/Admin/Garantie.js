import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { Form, Button, Spinner, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as ACTIONS from '../Login/Actions';
import Select from 'react-select';
import axios from 'axios';
import CZ from '../Asset/1.svg';
import SW from '../Asset/2.svg';
import PSW from '../Asset/3.svg';
import image1 from '../Asset/image1.svg';
import image2 from '../Asset/image2.svg';
import * as styled from '../Style/Arme.module.css';

import CarabineCZ from '../Asset/4.svg';
import CarabineSW from '../Asset/5.svg';
import { BsChevronRight } from 'react-icons/bs';
import CZZ from '../Asset/CZ.svg';
import SWw from '../Asset/sw.svg';

import CZBisCara from '../Asset/caraCZ.svg';
import CZBis from '../Asset/pistCZ.svg';
import SWBISCara from '../Asset/caraSW.svg';
import SWR from '../Asset/revoSW.svg';
import SWP from '../Asset/pistSW.svg';

let Garantie = (props) => {
  let dispatch = useDispatch();

  let token = useSelector((state) => state.token);

  let User = useSelector((state) => state.userBis);

  let [all, setAll] = useState(false);

  let SearchEmail = useSelector((state) => state.SearchEmail);

  let [sujet, setSujet] = useState(null);
  let [text, setText] = useState(null);
  let [email, setEmail] = useState(null);
  let [marque, setMarque] = useState(null);
  let [image, setImage] = useState(null);
  let [type, setType] = useState(null);
  let [error, setError] = useState(null);
  let [loadingB, setLoadingB] = useState(false);
  let [loadingC, setLoadingC] = useState(false);
  let [loadingCB, setLoadingCB] = useState(false);
  let [loadingCBB, setLoadingCBB] = useState(false);
  let [loadingCBBB, setLoadingCBBB] = useState(false);
  let [succes, setSucces] = useState(false);
  let [succesB, setSuccesB] = useState(false);

  let [loading, setLoading] = useState(false);

  let dBis = [];

  useEffect(() => {
    setTimeout(() => {
      setLoadingB(true);
    }, 500);
  }, []);

  if (loadingB) {
    setTimeout(() => {
      setLoadingC(true);
    }, 1500);
  }

  if (loadingC) {
    setTimeout(() => {
      setLoadingCB(true);
    }, 1500);
  }

  if (loadingCB) {
    setTimeout(() => {
      setLoadingCBB(true);
    }, 1500);
  }

  if (loadingCBB) {
    setTimeout(() => {
      setLoadingCBBB(true);
    }, 1500);
  }

  SearchEmail.filter((x) => x.email !== 'sidams029@gmail.com').map(
    (items, index) => {
      dBis.push({ value: items.email, label: items.email });
    }
  );

  let d = [
    { value: 'CZ', label: 'CZ' },
    { value: 'SMITHWESSON', label: 'Smith&Wesson' },
  ];

  let f = [
    { value: 'PISTOLETCZ', label: 'Pistolet CZ' },
    { value: 'CARABINECZ', label: 'Carabine CZ' },
    { value: 'CARABINESMITHWESSON', label: 'Carabine Smith&Wesson' },
    { value: 'REVOLVERSMITHWESSON', label: 'Revolver Smith&Wesson' },
    { value: 'PISTOLETSMITHWESSON', label: 'Pistolet Smith&Wesson' },
  ];

  let handleSubmit = async () => {
    setLoading(true);
    if (all && sujet) {
      let fa = [];
      let c = User.slice();
      c.map((items, index) => {
        fa.push(items.email);
      });
      let data = {};
      data.email = fa;
      data.sujet = sujet;

      await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL_BIS}/garantie`,
        headers: {
          'x-auth-token': token,
        },
        data: data,
      })
        .then((res) => {
          setSucces(true);
          setLoading(false);
          setEmail(null);
          setMarque(null);
          setType(null);
          setText(null);
          setSujet(null);
          setTimeout(() => {
            setSucces(false);
          }, 3000);
        })
        .catch((err) => setLoading(false));
    } else {
      if (
        (sujet && email && email.length > 0 && !all) ||
        (sujet && marque && marque.length > 0 && !all) ||
        (sujet && type && type.length > 0 && !all)
      ) {
        let emailMarque = [];
        let emailMarqueB = [];
        let emailMarqueBB = [];
        if (email && email.length > 0) {
          email.map((items, index) => {
            emailMarque.push(items.value);
          });
        }
        if (marque && marque.length > 0) {
          let gg = null;
          for (let i = 0; i < marque.length; i++) {
            gg = User.slice().filter(
              (x) => x.marque.indexOf(marque[i].value) >= 0
            );
          }

          gg.map((items, index) => {
            emailMarqueB.push(items.email);
          });
        }
        if (type && type.length > 0) {
          let ggg = null;
          for (let i = 0; i < type.length; i++) {
            ggg = User.slice().filter((x) => {
              return x.type.indexOf(type[i].value) >= 0;
            });
          }
          ggg.map((items, index) => {
            emailMarqueBB.push(items.email);
          });
        }

        let ff = [];
        let fff = ff.concat(emailMarque, emailMarqueB, emailMarqueBB);
        let dataBis = {};
        dataBis.email = fff;
        dataBis.sujet = sujet;

        await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_API_URL_BIS}/garantie`,
          headers: {
            'x-auth-token': token,
          },
          data: dataBis,
        })
          .then((res) => {
            setSucces(true);
            setLoading(false);
            setEmail(null);
            setMarque(null);
            setType(null);
            setText(null);
            setSujet(null);
            setTimeout(() => {
              setSucces(false);
            }, 3000);
          })
          .catch((err) => setLoading(false));
      } else {
        setLoading(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    dispatch(ACTIONS.User(token));
  }, []);

  let handleSubmitBis = async () => {
    setLoading(true);
    if (all && sujet) {
      let fa = [];
      let c = User.slice();
      c.map((items, index) => {
        fa.push(items.email);
      });
      let data = {};
      data.email = fa;
      data.sujet = sujet;

      await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL_BIS}/datelimite`,
        headers: {
          'x-auth-token': token,
        },
        data: data,
      })
        .then((res) => {
          setSuccesB(true);
          setLoading(false);
          setEmail(null);
          setMarque(null);
          setType(null);
          setText(null);
          setSujet(null);
          setTimeout(() => {
            setSucces(false);
          }, 3000);
        })
        .catch((err) => setLoading(false));
    } else {
      if (
        (sujet && email && email.length > 0 && !all) ||
        (sujet && marque && marque.length > 0 && !all) ||
        (sujet && type && type.length > 0 && !all)
      ) {
        let emailMarque = [];
        let emailMarqueB = [];
        let emailMarqueBB = [];
        if (email && email.length > 0) {
          email.map((items, index) => {
            emailMarque.push(items.value);
          });
        }
        if (marque && marque.length > 0) {
          let gg = null;
          for (let i = 0; i < marque.length; i++) {
            gg = User.slice().filter(
              (x) => x.marque.indexOf(marque[i].value) >= 0
            );
          }

          gg.map((items, index) => {
            emailMarqueB.push(items.email);
          });
        }
        if (type && type.length > 0) {
          let ggg = null;
          for (let i = 0; i < type.length; i++) {
            ggg = User.slice().filter((x) => {
              return x.type.indexOf(type[i].value) >= 0;
            });
          }
          ggg.map((items, index) => {
            emailMarqueBB.push(items.email);
          });
        }

        let ff = [];
        let fff = ff.concat(emailMarque, emailMarqueB, emailMarqueBB);
        let dataBis = {};
        dataBis.email = fff;
        dataBis.sujet = sujet;

        await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_API_URL_BIS}/datelimite`,
          headers: {
            'x-auth-token': token,
          },
          data: dataBis,
        })
          .then((res) => {
            setSuccesB(true);
            setLoading(false);
            setEmail(null);
            setMarque(null);
            setType(null);
            setText(null);
            setSujet(null);
            setTimeout(() => {
              setSucces(false);
            }, 3000);
          })
          .catch((err) => setLoading(false));
      } else {
        setLoading(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
  };

  return (
    <Fragment>
      <div style={{ marginTop: '3%', position: 'absolute', width: '100%' }}>
        <Carousel controls={false} contextMenu={false} indicators={false}>
          <Carousel.Item interval={2000}>
            <img
              className='d-block w-100'
              src={image1}
              alt='image1'
              height='100px'
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className='d-block w-100'
              src={image2}
              alt='image2'
              height='100px'
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className='d-block w-100'
              src={CZZ}
              alt='image3'
              height='100px'
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className='d-block w-100'
              src={SWw}
              alt='image4'
              height='100px'
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          marginTop: '0%',
        }}
      >
        <img
          src={CZBisCara}
          alt='CZBisCara'
          width='120%'
          style={{
            position: 'absolute',
            marginLeft: !loadingB ? 5000 : -3000,
            transition: 'ease-in-out 4s',
          }}
        />
        <img
          src={CZBis}
          alt='CZBis'
          width='100%'
          height='70%'
          style={{
            position: 'absolute',
            marginLeft: !loadingC ? 5000 : -2000,
            transition: 'ease-in-out 4s',
          }}
        />
        <img
          src={SWR}
          alt='SWR'
          height='70%'
          width='100%'
          className={styled.imageMailing}
          style={{
            position: 'absolute',
            marginLeft: !loadingCB ? 5000 : -2000,
            transition: 'ease-in-out 4s',
          }}
        />
        <img
          src={SWBISCara}
          alt='SWBisCara'
          height='70%'
          width='150%'
          style={{
            position: 'absolute',
            marginLeft: !loadingCBB ? 5000 : -3000,
            transition: 'ease-in-out 4s',
          }}
        />
        <img
          src={SWP}
          alt='SWP'
          width='60%'
          style={{
            position: 'absolute',
            marginLeft: !loadingCBBB ? 5000 : -2000,
            transition: 'ease-in-out 4s',
          }}
        />
      </div>
      <div
        style={{
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {error && (
          <div
            class='alert alert-danger'
            role='alert'
            style={{
              textAlign: 'center',
              marginTop: '10%',
              fontFamily: 'Poppins-Regular',
              width: '20%',
              position: 'absolute',
            }}
          >
            Veuillez renseigner tout les champs
          </div>
        )}
        {succes && (
          <div
            class='alert alert-success'
            role='alert'
            style={{
              textAlign: 'center',
              marginTop: '5%',
              fontFamily: 'Poppins-Regular',
              width: '20%',
            }}
          >
            Garantie ajouté avec succés
          </div>
        )}
        {succesB && (
          <div
            class='alert alert-success'
            role='alert'
            style={{
              textAlign: 'center',
              marginTop: '5%',
              fontFamily: 'Poppins-Regular',
              width: '20%',
            }}
          >
            Date limite prolongée avec succés
          </div>
        )}
      </div>
      <h1
        style={{
          textAlign: 'center',
          marginTop: '13%',
          fontFamily: 'Poppins-SemiBold',
          textTransform: 'uppercase',
        }}
      >
        Garantie(s)
      </h1>
      <Form className={styled.MailingForm}>
        <Form.Group
          controlId='exampleForm.ControlInput1'
          style={{
            width: '40%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center ',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Form.Label style={{ fontFamily: 'Poppins-Regular' }}>
            Rechercher un utilisateur
          </Form.Label>

          <div style={{ width: '100%' }}>
            <Select
              isMulti
              name='colors'
              options={dBis}
              className='basic-multi-select'
              classNamePrefix='Selectionner'
              onChange={setEmail}
            />

            <div class='form-check form-switch'>
              <input
                class='form-check-input'
                type='checkbox'
                color='primary'
                id='flexSwitchCheckChecked'
                onChange={() => setAll(!all)}
              />
              <label
                class='form-check-label'
                for='flexSwitchCheckChecked'
                style={{ fontFamily: 'Poppins-Regular' }}
              >
                Sélectionner tout les utilisateurs
              </label>
            </div>
          </div>
        </Form.Group>

        <Form.Group
          controlId='exampleForm.ControlSelect1'
          style={{
            width: '40%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center ',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Form.Label style={{ fontFamily: 'Poppins-Regular' }}>
            Marque
          </Form.Label>
          <div style={{ width: '100%' }}>
            <Select
              isMulti
              name='colors'
              options={d}
              className='basic-multi-select'
              classNamePrefix='Selectionner'
              onChange={setMarque}
            />
            {marque &&
              marque.map((items, index) => {
                return items.value == 'CZ' ? (
                  <img
                    src={CZZ}
                    width='20%'
                    style={{ marginTop: '2%' }}
                    alt='CZZ'
                  />
                ) : items.value === 'SMITHWESSON' ? (
                  <img
                    src={SWw}
                    alt='SWW'
                    width='20%'
                    style={{ marginTop: '2%', marginLeft: '2%' }}
                  />
                ) : null;
              })}
          </div>
        </Form.Group>
        <Form.Group
          controlId='exampleForm.ControlSelect1'
          style={{
            width: '40%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center ',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Form.Label style={{ fontFamily: 'Poppins-Regular' }}>
            Type
          </Form.Label>
          <div style={{ width: '100%' }}>
            <Select
              isMulti
              name='colors'
              options={f}
              className='basic-multi-select'
              classNamePrefix='Selectionner'
              onChange={setType}
            />
            {type &&
              type.map((items, index) => {
                return items.value == 'PISTOLETCZ' ? (
                  <img
                    src={CZ}
                    alt='CZZ'
                    width='15%'
                    style={{ marginTop: '2%', marginLeft: '3%' }}
                  />
                ) : items.value == 'CARABINECZ' ? (
                  <img
                    src={CarabineCZ}
                    alt='CarabineCZCZ'
                    width='15%'
                    style={{ marginTop: '2%', marginLeft: '3%' }}
                  />
                ) : items.value === 'REVOLVERSMITHWESSON' ? (
                  <img
                    src={SW}
                    alt='SWSW'
                    width='15%'
                    style={{ marginTop: '2%', marginLeft: '3%' }}
                  />
                ) : items.value === 'CARABINESMITHWESSON' ? (
                  <img
                    src={CarabineSW}
                    alt='CaraSWSW'
                    width='15%'
                    style={{ marginTop: '2%', marginLeft: '3%' }}
                  />
                ) : items.value === 'PISTOLETSMITHWESSON' ? (
                  <img
                    src={PSW}
                    alt='PSWPSW'
                    width='15%'
                    style={{ marginTop: '2%', marginLeft: '3%' }}
                  />
                ) : null;
              })}
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Durée de garantie supplémentaire</Form.Label>
          <Form.Control
            as='select'
            custom
            onChange={(e) => setSujet(e.target.value)}
          >
            <option value={null}></option>
            <option value={Number(2629800000)}>1 mois</option>
            <option value={Number(5259600000)}>2 mois</option>
            <option value={Number(7889400000)}>3 mois</option>
            <option value={Number(10519200000)}>4 mois </option>
            <option value={Number(13149000000)}>5 mois</option>
            <option value={Number(15778800000)}>6 mois</option>
          </Form.Control>
        </Form.Group>

        {loading && <Spinner animation='grow' variant='success' size='xxl' />}

        <Form.Group
          style={{
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center ',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button onClick={() => handleSubmit()} className={styled.buttonForm}>
            Garantie(s) supplémentaire
            <BsChevronRight
              size='25'
              style={{ marginLeft: 10, position: 'absolute' }}
            />
          </Button>
        </Form.Group>
        <Form.Group>
          <Form.Label> Date butoire d'achat de munitions</Form.Label>
          <Form.Control
            as='select'
            custom
            onChange={(e) => setSujet(e.target.value)}
          >
            <option value={null}></option>
            <option value={Number(2629800000)}>1 mois</option>
            <option value={Number(5259600000)}>2 mois</option>
            <option value={Number(7889400000)}>3 mois</option>
            <option value={Number(10519200000)}>4 mois </option>
            <option value={Number(13149000000)}>5 mois</option>
            <option value={Number(15778800000)}>6 mois</option>
          </Form.Control>
        </Form.Group>

        {loading && <Spinner animation='grow' variant='success' size='xxl' />}

        <Form.Group
          style={{
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center ',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button
            onClick={() => handleSubmitBis()}
            className={styled.buttonForm}
          >
            Date butoire d'achat de munitions
            <BsChevronRight
              size='25'
              style={{ marginLeft: 10, position: 'absolute' }}
            />
          </Button>
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default Garantie;
