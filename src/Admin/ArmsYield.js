import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as styled from '../Style/Arme.module.css';
import { useHistory, withRouter } from 'react-router-dom';
import * as ACTIONS from '../Login/Actions';

import ReactPaginate from 'react-paginate';
import {
  Button,
  Table,
  Dropdown,
  DropdownButton,
  Carousel,
  Form,
} from 'react-bootstrap';
import image1 from '../Asset/image1.svg';
import image2 from '../Asset/image2.svg';

import CZZ from '../Asset/CZ.svg';
import SWw from '../Asset/sw.svg';

let Ceder = () => {
  let [postperPage] = useState(10);

  let [currentPage, setCurrentPage] = useState(1);

  let token = useSelector((state) => state.token);

  let data = useSelector((state) => state.CederOneBis);

  let [pageCount, setPageCount] = useState(null);

  let [offset, setOffset] = useState(0);

  let dispatch = useDispatch();

  let history = useHistory();

  let [newEmail, setNewEmail] = useState(null);

  let [errorEmailBis, setEmailErrorBis] = useState(false);

  useEffect(() => {
    dispatch(ACTIONS.UserCeder(token));
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(data.length / postperPage));
  }, []);

  let handlePageClick = (e) => {
    let select = e.selected;
    let offset = select * postperPage;
    setOffset(offset);
    setCurrentPage(select);
  };

  let handleValidate = async (data) => {
    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL_BIS}/ceder/${data}`,
      headers: {
        'x-auth-token': token,
      },
    }).then((res) => {
      dispatch(ACTIONS.UserCeder(token));
    });
  };

  let handleValidateBis = async (data) => {
    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL_BIS}/cederd/${data}`,
      headers: {
        'x-auth-token': token,
      },
    }).then((res) => {
      dispatch(ACTIONS.UserCeder(token));
    });
  };

  let handleAnnulez = async (data) => {
    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL_BIS}/cederbis/${data}`,
      headers: {
        'x-auth-token': token,
      },
    }).then((res) => {
      dispatch(ACTIONS.UserCeder(token));
    });
  };

  let handleSearch = (e) => {
    dispatch(ACTIONS.SearchBiss(e.target.value));
  };

  let handleModificationEmail = async (data) => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let d = {};
    d.email = newEmail;
    if (newEmail && regEmail.test(newEmail)) {
      await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL_BIS}/cedermodification/${data}`,
        data: d,
        headers: {
          'x-auth-token': token,
        },
      })
        .then((res) => {
          dispatch(ACTIONS.UserCeder(token));
        })
        .catch((err) => setEmailErrorBis(true));
    } else {
      setEmailErrorBis(true);
    }
  };

  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <Fragment>
      <div>
        <div style={{ marginTop: '1%' }}>
          <Carousel controls={false} contextMenu={false} indicators={false}>
            <Carousel.Item interval={2000}>
              <img
                className='d-block w-100'
                src={image1}
                alt='First slide'
                height='100px'
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                className='d-block w-100'
                src={image2}
                alt='Third slide'
                height='100px'
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                className='d-block w-100'
                src={CZZ}
                alt='Third slide'
                height='100px'
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                className='d-block w-100'
                src={SWw}
                alt='Third slide'
                height='100px'
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      <div class='input-group' style={{ marginTop: 20 }}>
        <input
          type='search'
          class='form-control rounded'
          placeholder='Rechercher'
          aria-label='Search'
          aria-describedby='search-addon'
          onChange={(e) => handleSearch(e)}
        />
      </div>

      <DropdownButton size='sm' style={{ marginTop: '1%' }}>
        <Dropdown.Item
          onClick={() => dispatch(ACTIONS.ArmurierParticulier(null))}
        >
          Toute les armes en cours de validation
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => dispatch(ACTIONS.ArmurierParticulier('alpha'))}
        >
          Armurier
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => dispatch(ACTIONS.ArmurierParticulier('inverse'))}
        >
          Particulier
        </Dropdown.Item>
      </DropdownButton>
      <div className={styled.Ceder}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ fontFamily: 'Poppins-Regular' }}>
                Destinataire
                <DropdownButton size='sm'>
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Email('alpha'))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Email('inverse'))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: 'Poppins-Regular' }}>
                De (email)
                <DropdownButton size='sm'>
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Email('alpha'))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Email('inverse'))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: 'Poppins-Regular' }}>
                De (nom)
                <DropdownButton size='sm'>
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item onClick={() => dispatch(ACTIONS.NOM('alpha'))}>
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.NOM('inverse'))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: 'Poppins-Regular' }}>
                De (SIA)
                <DropdownButton size='sm'>
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item onClick={() => dispatch(ACTIONS.SIA('alpha'))}>
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.SIA('inverse'))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: 'Poppins-Regular' }}>
                À (email)
                <DropdownButton size='sm'>
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.EmailBis('alpha'))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.EmailBis('inverse'))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: 'Poppins-Regular' }}>
                À (nom)
                <DropdownButton size='sm'>
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.NOMBis('alpha'))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.NOMBis('inverse'))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: 'Poppins-Regular' }}>
                À (SIA)
                <DropdownButton size='sm'>
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.SIABis('alpha'))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.SIABis('inverse'))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: 'Poppins-Regular' }}>Téléphone</th>
              <th style={{ fontFamily: 'Poppins-Regular' }}>
                Date de création
                <DropdownButton size='sm'>
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Creation('alpha'))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Creation('inverse'))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: 'Poppins-Regular' }}>Voir arme</th>
              <th style={{ fontFamily: 'Poppins-Regular' }}>
                Autoriser le transfert
              </th>
              <th style={{ fontFamily: 'Poppins-Regular' }}>
                Annuler le transfert
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.slice(offset, offset + postperPage).map((items, index) => {
                return (
                  <tr
                    style={{
                      background: items.armurier ? '#6D9FB2' : 'white',
                      borderColor: 'black',
                      borderWidth: 1,
                      fontFamily: 'Poppins-Regular',
                    }}
                  >
                    <td
                      style={{
                        background: items.armurier ? '#6D9FB2' : 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                        color: items.armurier ? 'white' : 'black',
                        fontFamily: 'Poppins-Regular',
                      }}
                    >
                      {items.armurier ? 'Armurerie' : 'Particulier'}
                    </td>
                    <td
                      style={{
                        background: items.armurier ? '#6D9FB2' : 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                        color: items.armurier ? 'white' : 'black',
                        fontFamily: 'Poppins-Regular',
                      }}
                    >
                      {items.fromEmail}
                    </td>
                    <td
                      style={{
                        background: items.armurier ? '#6D9FB2' : 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                        color: items.armurier ? 'white' : 'black',
                        fontFamily: 'Poppins-Regular',
                      }}
                    >
                      {items.fromNom}
                    </td>
                    <td
                      style={{
                        background: items.armurier ? '#6D9FB2' : 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                        color: items.armurier ? 'white' : 'black',
                        fontFamily: 'Poppins-Regular',
                      }}
                    >
                      {items.fromSIA}
                    </td>
                    <td
                      style={{
                        background: items.armurier ? '#6D9FB2' : 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                        color: items.armurier ? 'white' : 'black',
                        fontFamily: 'Poppins-Regular',
                        width: '100%',
                      }}
                    >
                      {items.armurier ? (
                        <Form.Group controlId='formBasicEmail'>
                          <Form.Label>{items.toEmail}</Form.Label>
                          {newEmail && !regEmail.test(newEmail) && (
                            <p style={{ color: 'red' }}>
                              Adresse email invalide
                            </p>
                          )}
                          {errorEmailBis && (
                            <p style={{ color: 'red' }}>
                              Adresse email introuvable
                            </p>
                          )}
                          <Form.Control
                            type='email'
                            placeholder={`${items.toEmail}`}
                            onChange={(e) => setNewEmail(e.target.value)}
                          />
                          <Button
                            variant='primary'
                            type='submit'
                            onClick={() => handleModificationEmail(items._id)}
                          >
                            Transférer
                          </Button>
                        </Form.Group>
                      ) : (
                        items.toEmail
                      )}
                    </td>
                    <td
                      style={{
                        background: items.armurier ? '#6D9FB2' : 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                        color: items.armurier ? 'white' : 'black',
                        fontFamily: 'Poppins-Regular',
                      }}
                    >
                      {items.toNom}
                    </td>
                    <td
                      style={{
                        background: items.armurier ? '#6D9FB2' : 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                        color: items.armurier ? 'white' : 'black',
                        fontFamily: 'Poppins-Regular',
                      }}
                    >
                      {items.toSIA}
                    </td>

                    <td
                      style={{
                        background: items.armurier ? '#6D9FB2' : 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                        color: items.armurier ? 'white' : 'black',
                        fontFamily: 'Poppins-Regular',
                      }}
                    >
                      {items.armurier
                        ? items.armurier.telephone
                        : 'Particulier'}
                    </td>
                    <td
                      style={{
                        background: items.armurier ? '#6D9FB2' : 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                        color: items.armurier ? 'white' : 'black',
                        fontFamily: 'Poppins-Regular',
                      }}
                    >
                      {new Date(items.dateCreation).toLocaleDateString()}
                    </td>
                    <td
                      style={{
                        background: items.armurier ? '#6D9FB2' : 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                      }}
                    >
                      <Button
                        variant='primary'
                        onClick={() =>
                          history.push({
                            pathname: '/weaponsmodification/' + items.armes,
                          })
                        }
                      >
                        Voir l'arme
                      </Button>
                    </td>
                    <td
                      style={{
                        background: items.armurier ? '#6D9FB2' : 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                      }}
                    >
                      <Button
                        variant='primary'
                        onClick={() =>
                          items.armurier
                            ? handleValidateBis(items._id)
                            : handleValidate(items._id)
                        }
                      >
                        Autoriser le transfert
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant='danger'
                        onClick={() => handleAnnulez(items._id)}
                      >
                        Annuler le transfert
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        {data.length > 0 && (
          <ReactPaginate
            previousLabel={'précédent'}
            nextLabel={'suivant'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(data.length / postperPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={styled.pagination}
            subContainerClassName={'pages pagination'}
            activeClassName={styled.active}
          />
        )}
      </div>
    </Fragment>
  );
};

export default withRouter(Ceder);
