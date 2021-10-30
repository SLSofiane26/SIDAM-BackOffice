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
import CarabineCZ from '../Asset/4.svg';
import CarabineSW from '../Asset/5.svg';
import { BsChevronRight } from 'react-icons/bs';
import CZZ from '../Asset/CZ.svg';
import SWw from '../Asset/sw.svg';
import * as styled from '../Style/Arme.module.css';

import CZBisCara from '../Asset/caraCZ.svg';
import CZBis from '../Asset/pistCZ.svg';
import SWBISCara from '../Asset/caraSW.svg';
import SWR from '../Asset/revoSW.svg';
import SWP from '../Asset/pistSW.svg';

let NotificationUsers = (props) => {
  let dispatch = useDispatch();

  let token = useSelector((state) => state.token);

  let User = useSelector((state) => state.userBis);

  let [all, setAll] = useState(false);

  let SearchEmail = useSelector((state) => state.SearchEmail);

  let [sujet, setSujet] = useState(null);
  let [text, setText] = useState(null);
  let [email, setEmail] = useState(null);
  let [marque, setMarque] = useState(null);
  let [type, setType] = useState(null);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let [succes, setSucces] = useState(false);
  let [image, setImage] = useState(null);

  let [loadingB, setLoadingB] = useState(false);
  let [loadingC, setLoadingC] = useState(false);
  let [loadingCB, setLoadingCB] = useState(false);
  let [loadingCBB, setLoadingCBB] = useState(false);
  let [loadingCBBB, setLoadingCBBB] = useState(false);

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

  let dBis = [];

  SearchEmail.map((items, index) => {
    dBis.push({
      value: items.deviceToken,
      label: items.email,
      autorisation: items.autorisation,
    });
  });

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

    if (all && sujet && text) {
      let fa = [];
      let c = User.slice();
      c.map((items, index) => {
        if (items.autorisation) {
          fa.push(items.deviceToken);
        } else {
          return;
        }
      });

      let data = {};
      data.deviceToken = fa;
      data.body = text;
      data.title = sujet;
      let formData = new FormData();

      formData.append('notification', image);

      let config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      if (image) {
        await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_API_URL_BIS}/notification`,
          headers: config,
          data: formData,
        })
          .then(async (res) => {
            await axios({
              method: 'POST',
              url: `${process.env.REACT_APP_API_URL_BIS}/notification/${res.data._id}`,
              data: data,
            })
              .then((res) => {
                setSucces(true);
                setLoading(false);
                setEmail(null);
                setMarque(null);
                setSujet(null);
                setText(null);
                setType(null);
                setTimeout(() => {
                  setSucces(false);
                }, 3000);
              })
              .catch((err) => {
                setError(true);
                setLoading(false);
                setEmail(null);
                setMarque(null);
                setSujet(null);
                setText(null);
                setType(null);
                setTimeout(() => {
                  setError(false);
                }, 3000);
              });
          })
          .catch((err) => {
            setError(true);
            setLoading(false);
            setEmail(null);
            setMarque(null);
            setSujet(null);
            setText(null);
            setType(null);
            setTimeout(() => {
              setError(false);
            }, 3000);
          })
          .catch((err) => {
            setError(true);
            setLoading(false);
            setEmail(null);
            setMarque(null);
            setSujet(null);
            setText(null);
            setType(null);
            setTimeout(() => {
              setError(false);
            }, 3000);
          });
      } else {
        await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_API_URL_BIS}/notificationB`,
          headers: config,
          data: data,
        })
          .then(async (res) => {
            setSucces(true);
            setLoading(false);
            setEmail(null);
            setMarque(null);
            setSujet(null);
            setText(null);
            setType(null);
            setTimeout(() => {
              setSucces(false);
            }, 3000);
          })
          .catch((err) => {
            setError(true);
            setLoading(false);
            setEmail(null);
            setMarque(null);
            setSujet(null);
            setText(null);
            setType(null);
            setTimeout(() => {
              setError(false);
            }, 3000);
          });
      }
    } else {
      if (
        (sujet && text && email && email.length > 0 && !all) ||
        (sujet && text && marque && marque.length > 0 && !all) ||
        (sujet && text && type && type.length > 0 && !all)
      ) {
        let emailMarque = [];
        let emailMarqueB = [];
        let emailMarqueBB = [];
        if (email && email.length > 0) {
          email.map((items, index) => {
            if (items.autorisation) {
              emailMarque.push(items.value);
            } else {
              return;
            }
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
            if (items.autorisation) {
              emailMarqueB.push(items.deviceToken);
            } else {
              return;
            }
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
            if (items.autorisation) {
              emailMarqueBB.push(items.deviceToken);
            } else {
              return;
            }
          });
        }

        let ff = [];
        let fff = ff.concat(emailMarque, emailMarqueB, emailMarqueBB);
        let dataBis = {};
        dataBis.deviceToken = fff;
        dataBis.title = sujet;
        dataBis.text = text;
        let d = fff.filter((x) => x != null);
        let data = {};
        data.deviceToken = d;
        data.body = text;
        data.title = sujet;
        let formData = new FormData();

        formData.append('notification', image);

        let config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };

        if (d.length > 0) {
          if (image) {
            await axios({
              method: 'POST',
              url: `${process.env.REACT_APP_API_URL_BIS}/notification`,
              headers: config,
              data: formData,
            })
              .then(async (res) => {
                await axios({
                  method: 'POST',
                  url: `${process.env.REACT_APP_API_URL_BIS}/notification/${res.data._id}`,
                  data: data,
                })
                  .then((res) => {
                    setSucces(true);
                    setLoading(false);
                    setEmail(null);
                    setMarque(null);
                    setSujet(null);
                    setText(null);
                    setType(null);
                    setTimeout(() => {
                      setSucces(false);
                    }, 3000);
                  })
                  .catch((err) => {
                    setError(true);
                    setLoading(false);
                    setEmail(null);
                    setMarque(null);
                    setSujet(null);
                    setText(null);
                    setType(null);
                    setTimeout(() => {
                      setError(false);
                    }, 3000);
                  });
              })
              .catch((err) => {
                setError(true);
                setLoading(false);
                setEmail(null);
                setMarque(null);
                setSujet(null);
                setText(null);
                setType(null);
                setTimeout(() => {
                  setError(false);
                }, 3000);
              })
              .catch((err) => {
                setError(true);
                setLoading(false);
                setEmail(null);
                setMarque(null);
                setSujet(null);
                setText(null);
                setType(null);
                setTimeout(() => {
                  setError(false);
                }, 3000);
              });
          } else {
            await axios({
              method: 'POST',
              url: `${process.env.REACT_APP_API_URL_BIS}/notificationB`,
              headers: config,
              data: data,
            })
              .then(async (res) => {
                setSucces(true);
                setLoading(false);
                setEmail(null);
                setMarque(null);
                setSujet(null);
                setText(null);
                setType(null);
                setTimeout(() => {
                  setSucces(false);
                }, 3000);
              })
              .catch((err) => {
                setError(true);
                setLoading(false);
                setEmail(null);
                setMarque(null);
                setSujet(null);
                setText(null);
                setType(null);
                setTimeout(() => {
                  setError(false);
                }, 3000);
              });
          }
        } else {
          setLoading(false);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        }
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

  return (
    <Fragment>
      <div style={{ marginTop: '3%' }}>
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
                marginTop: '20%',
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
              Notification envoyée avec succès
            </div>
          )}
        </div>
        <div style={{ marginTop: '0%', position: 'absolute', width: '100%' }}>
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
                alt='CZZ'
                height='100px'
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                className='d-block w-100'
                src={SWw}
                alt='SWW'
                height='100px'
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <h1
        style={{
          textAlign: 'center',
          marginTop: '10%',
          fontFamily: 'Poppins-SemiBold',
          textTransform: 'uppercase',
          zIndex: 100000,
        }}
      >
        Notification(s)
      </h1>
      <Form className={styled.FormNotification}>
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
                  <img src={CZZ} width='20%' style={{ marginTop: '2%' }} />
                ) : items.value === 'SMITHWESSON' ? (
                  <img
                    src={SWw}
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
                    alt='CZCZCZ'
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
                    alt='SWSWSW'
                    width='15%'
                    style={{ marginTop: '2%', marginLeft: '3%' }}
                  />
                ) : items.value === 'CARABINESMITHWESSON' ? (
                  <img
                    src={CarabineSW}
                    alt='CarabineSWSWSW'
                    width='15%'
                    style={{ marginTop: '2%', marginLeft: '3%' }}
                  />
                ) : items.value === 'PISTOLETSMITHWESSON' ? (
                  <img
                    alt='PSWPSWPSW'
                    src={PSW}
                    width='15%'
                    style={{ marginTop: '2%', marginLeft: '3%' }}
                  />
                ) : null;
              })}
          </div>
        </Form.Group>
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
            Titre ({sujet ? sujet.length : 0}/65)
          </Form.Label>
          <Form.Control
            placeholder='Sujet'
            value={sujet}
            defaultValue={sujet}
            onChange={(e) => setSujet(e.target.value)}
          />
        </Form.Group>
        <Form.Group
          controlId='exampleForm.ControlTextarea1'
          style={{
            width: '90%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center ',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Form.Label>Texte ({text ? text.length : 0}/240)</Form.Label>
          <Form.Control
            as='textarea'
            rows={10}
            value={text}
            defaultValue={text}
            style={{ fontFamily: 'Poppins-Regular' }}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          style={{
            width: '50%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center ',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div class='form-group'>
            <label
              for='exampleFormControlFile1'
              style={{ fontFamily: 'Poppins-Regular' }}
            >
              Image
            </label>
            <input
              defaultValue={image}
              type='file'
              class='form-control-file'
              id='exampleFormControlFile1'
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <div>
            {image && <Button onClick={() => setImage(null)}>Supprimer</Button>}
            {image && (
              <img
                src={URL.createObjectURL(image)}
                width='100%'
                height='100%'
                style={{ marginTop: '3%' }}
              />
            )}
          </div>
        </Form.Group>

        {loading && <Spinner animation='grow' variant='success' size='xxl' />}

        <Form.Group
          style={{
            width: '50%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center ',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button
            onClick={() => handleSubmit()}
            className={styled.buttonNotification}
          >
            Envoyer la notification
            <BsChevronRight
              size='25'
              style={{ marginLeft: 2, position: 'absolute' }}
            />
          </Button>
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default NotificationUsers;
