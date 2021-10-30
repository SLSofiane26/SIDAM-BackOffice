import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import * as styled from '../Style/Arme.module.css';
import { Button } from 'react-bootstrap';

let UserModification = (props) => {
  let [form, setForm] = useState({
    nom: null,
    prenom: null,
    adresse: null,
    telephone: null,
    SIA: null,
    admin: null,
  });

  let [isSelected, setSelection] = useState(false);
  let [error, setErrors] = useState(null);
  let token = useSelector((state) => state.token);
  let history = useHistory();

  let isValid = (form) => {
    let valid = true;
    Object.values(form).forEach((val) => {
      if (val === null) {
        valid = false;
      }
    });
    return valid;
  };

  let handleSubmit = async () => {
    let f = {};
    f.nom = form.nom;
    f.prenom = form.prenom;
    f.adresse = form.adresse;
    f.telephone = form.telephone;
    f.SIA = form.SIA;
    f.admin = form.admin;
    f.autorisation = isSelected;

    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL_BIS}/users/${props.VisibleModification._id}`,
      data: f,
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        setErrors(null);
        history.push({ pathname: '/users' });
      })
      .catch((err) => {
        setErrors(true);
      });
  };

  if (error) {
    setTimeout(() => {
      setErrors(false);
    }, 2000);
  }

  return props.VisibleModification ? (
    <div>
      <div className={styled.Modification}>
        <div className={styled.ModificationB}>
          <div className={styled.ModificationBb}>
            <h1 style={{ color: 'white' }}>Modification</h1>
            {error && (
              <h3 style={{ color: 'red' }}>
                Veuillez remplir tout les champs indiquez
              </h3>
            )}
          </div>
          <div>
            <div className={styled.ModificationBis}>
              <div className={styled.ModificationBBis}>
                <div className={styled.ModificationBBBis}>
                  <label>Nom</label>
                  <input
                    style={{ width: '350px' }}
                    placeholder='Nom'
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  />
                </div>
                <div className={styled.ModificationBBBis}>
                  <label>Prénom</label>
                  <input
                    style={{ width: '350px' }}
                    placeholder='Prénom'
                    onChange={(e) =>
                      setForm({ ...form, prenom: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styled.ModificationBBis}>
                <div className={styled.ModificationBBBis}>
                  <label style={{ marginTop: 15 }}>Adresse</label>
                  <input
                    style={{ width: '350px' }}
                    placeholder='Adresse'
                    onChange={(e) =>
                      setForm({ ...form, adresse: e.target.value })
                    }
                  />
                </div>
                <div className={styled.ModificationBBBis}>
                  <label style={{ marginTop: 15 }}>Téléphone</label>
                  <input
                    style={{ width: '350px' }}
                    placeholder='Téléphone'
                    onChange={(e) =>
                      setForm({ ...form, telephone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styled.ModificationBBis}>
                <div className={styled.ModificationBBBis}>
                  <label style={{ marginTop: 15 }}>SIA</label>
                  <input
                    style={{ width: '350px' }}
                    placeholder='SIA'
                    onChange={(e) => setForm({ ...form, SIA: e.target.value })}
                  />
                </div>

                <div className={styled.ModificationBBBis}>
                  <label style={{ marginTop: 15 }}>Admin</label>
                  <select
                    style={{ width: '350px' }}
                    onChange={(e) =>
                      setForm({ ...form, admin: e.target.value })
                    }
                  >
                    <option value={null}>{null}</option>
                    <option value={true}>Admin</option>
                    <option value={false}>Utilisateur</option>
                  </select>
                </div>
              </div>

              <div className={styled.autorisation}>
                <label>
                  « J’autorise SIDAM à m’envoyer, par notifications et/ou
                  e-mails, mes avantages cumulés et toutes informations
                  nécessaires à l’utilisation de l’application ainsi que sur les
                  produits et services proposés »
                </label>
                <input
                  type='checkbox'
                  defaultChecked={isSelected}
                  onChange={() => setSelection(!isSelected)}
                />
              </div>

              <div className={styled.ModificationBY}>
                <div className={styled.ModificationBYY}>
                  <Button
                    onClick={() => handleSubmit()}
                    variant={error ? 'danger' : 'success'}
                  >
                    Modifiez l'utilisateur
                  </Button>
                </div>
                <div className={styled.ModificationF}>
                  <Button
                    onClick={() => props.handleMoficiation()}
                    variant='danger'
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default withRouter(UserModification);
