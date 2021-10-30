import React, { Fragment, memo, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import * as styled from "../Style/Arme.module.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BsChevronRight } from "react-icons/bs";
import Mun from "../Asset/22.jpg";

let AddUser = memo(function AddUser(props) {
  let [form, setForm] = useState({
    nom: null,
    prenom: null,
    email: null,
    telephone: null,
    adresse: null,
    codepostal: null,
    ville: null,
    SIA: null,
    motdepasse: null,
    admin: null,
  });

  let [isSelected, setSelection] = useState(false);

  let [error, setErrors] = useState(null);
  let [errorB, setErrorsB] = useState(false);

  let dispatch = useDispatch();

  let token = useSelector((state) => state.token);

  let history = useHistory();

  let regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let e = null;

  if (form.motdepasse !== null && form.motdepasse.length < 5) {
    e = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <h4 style={{ color: "red", fontSize: 15, marginTop: 10 }}>
          Le mot de passe doit contenir entre 5 et 10 caracteres
        </h4>
      </div>
    );
  }

  let d = null;

  if (form.email && !regEx.test(form.email)) {
    d = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <h4 style={{ color: "red", fontSize: 15, marginTop: 10 }}>
          Veuillez saisir une adresse email valide
        </h4>
      </div>
    );
  }

  let isValid = (form) => {
    let valid = true;
    Object.values(form).forEach((val) => {
      !val ? (valid = false) : (valid = true);
    });
    return valid;
  };

  let handleSubmit = async () => {
    let c = {};

    c.nom = form.nom;
    c.prenom = form.prenom;
    c.email = form.email;
    c.telephone = form.telephone;
    c.adresse = form.adresse;
    c.codepostal = form.codepostal;
    c.ville = form.ville;
    c.SIA = form.SIA;
    c.motdepasse = form.motdepasse;
    c.admin = form.admin;
    c.autorisation = isSelected;

    if (isValid(form) && regEx.test(form.email)) {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL_BIS}/user`,
        data: c,
        headers: {
          "x-auth-token": token,
        },
      })
        .then((res) => {
          history.push({ pathname: "/users" });
        })
        .catch((err) => {
          setErrorsB(true);
        });
    } else {
      setErrors(true);
    }
  };

  if (error) {
    setTimeout(() => {
      setErrors(false);
    }, 2000);
  }

  if (errorB) {
    setTimeout(() => {
      setErrorsB(false);
    }, 5000);
  }

  return (
    <Fragment>
      <div>
        <img
          alt="logosidam"
          src={Mun}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 10,
            width: "100%",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1000,
          }}
        >
          <div>
            <div className={styled.AddUser} style={{ width: "100%" }}>
              <h1
                style={{
                  fontSize: 30,
                  color: "white",
                  background: "#999D3B",
                  padding: 40,
                  borderRadius: 10,
                }}
              >
                Ajouter un utilisateur
              </h1>
              <Button
                onClick={() => props.history.goBack()}
                style={{ fontFamily: "Poppins-Regular", width: "20%" }}
              >
                Retour
                <BsChevronRight
                  size="25"
                  style={{ marginLeft: "6%", position: "absolute" }}
                />
              </Button>
              {d}
              {e}
              {errorB && (
                <h3
                  style={{
                    color: "red",
                    fontSize: 15,
                    background: "white",
                    padding: 20,
                  }}
                >
                  SIA ou email déjâ utilisée
                </h3>
              )}
              {error && (
                <h3
                  style={{
                    color: "red",
                    fontSize: 15,
                    background: "white",
                    padding: 20,
                  }}
                >
                  Veuillez remplir tout les champs indiquez
                </h3>
              )}
            </div>
            <div
              style={{
                marginTop: "2%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className={styled.autorisation}
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <label
                  style={{
                    color: "white",
                    background: "#999D3B",
                    padding: "10px",
                  }}
                >
                  « J’autorise SIDAM à m’envoyer, par notifications et/ou
                  e-mails, mes avantages cumulés et toutes informations
                  nécessaires à l’utilisation de l’application ainsi que sur les
                  produits et services proposés »
                </label>
                <input
                  style={{
                    width: "150px",
                    height: "50px",
                  }}
                  type="checkbox"
                  defaultChecked={isSelected}
                  onChange={() => setSelection(!isSelected)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-evenly",
                  marginTop: 40,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        textAlign: "center",
                        color: "white",
                        background: "#999D3B",
                        height: "50px",
                        verticalAlign: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      Nom
                    </label>
                    <input
                      placeholder="Nom"
                      style={{ textAlign: "center" }}
                      onChange={(e) =>
                        setForm({ ...form, nom: e.target.value })
                      }
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        textAlign: "center",
                        color: "white",
                        background: "#999D3B",
                        height: "50px",
                        verticalAlign: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        display: "flex",
                        marginTop: "40px",
                      }}
                    >
                      Prénom
                    </label>
                    <input
                      style={{ textAlign: "center", width: "400px" }}
                      placeholder="Prénom"
                      onChange={(e) =>
                        setForm({ ...form, prenom: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className={styled.ModificationBBis}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        textAlign: "center",
                        color: "white",
                        background: "#999D3B",
                        height: "50px",
                        verticalAlign: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      Email
                    </label>
                    <input
                      style={{ textAlign: "center", width: "400px" }}
                      placeholder="Email"
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        textAlign: "center",
                        color: "white",
                        background: "#999D3B",
                        height: "50px",
                        verticalAlign: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        display: "flex",
                        marginTop: "40px",
                      }}
                    >
                      Téléphone
                    </label>
                    <input
                      style={{ textAlign: "center", width: "400px" }}
                      placeholder="Téléphone"
                      onChange={(e) =>
                        setForm({ ...form, telephone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className={styled.ModificationBBis}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        textAlign: "center",
                        color: "white",
                        background: "#999D3B",
                        height: "50px",
                        verticalAlign: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      Adresse
                    </label>
                    <input
                      style={{ textAlign: "center" }}
                      placeholder="Adresse"
                      onChange={(e) =>
                        setForm({ ...form, adresse: e.target.value })
                      }
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        textAlign: "center",
                        color: "white",
                        background: "#999D3B",
                        height: "50px",
                        verticalAlign: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        display: "flex",
                        marginTop: "40px",
                      }}
                    >
                      Code postale
                    </label>
                    <input
                      style={{ textAlign: "center", width: "400px" }}
                      placeholder="Code postale"
                      onChange={(e) =>
                        setForm({ ...form, codepostal: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className={styled.ModificationBBis}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        textAlign: "center",
                        color: "white",
                        background: "#999D3B",
                        height: "50px",
                        verticalAlign: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      Ville
                    </label>
                    <input
                      style={{ textAlign: "center", width: "400px" }}
                      placeholder="Ville"
                      onChange={(e) =>
                        setForm({ ...form, ville: e.target.value })
                      }
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        textAlign: "center",
                        color: "white",
                        background: "#999D3B",
                        height: "50px",
                        verticalAlign: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        display: "flex",
                        marginTop: "40px",
                      }}
                    >
                      SIA
                    </label>
                    <input
                      style={{ textAlign: "center" }}
                      placeholder="SIA"
                      onChange={(e) =>
                        setForm({ ...form, SIA: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className={styled.ModificationBBis}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10%",
                    }}
                  >
                    <label
                      style={{
                        textAlign: "center",
                        color: "white",
                        background: "#999D3B",
                        height: "50px",
                        verticalAlign: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      Mot de passe
                    </label>
                    <input
                      style={{ textAlign: "center", width: "400px" }}
                      placeholder="Mot de passe"
                      onChange={(e) =>
                        setForm({ ...form, motdepasse: e.target.value })
                      }
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        textAlign: "center",
                        color: "white",
                        background: "#999D3B",
                        height: "50px",
                        verticalAlign: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        display: "flex",
                        marginTop: "40px",
                      }}
                    >
                      Admin
                    </label>
                    <select
                      style={{ textAlign: "center", width: "400px" }}
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

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "3%",
                  }}
                >
                  <Button
                    onClick={() => handleSubmit()}
                    variant={error ? "danger" : "success"}
                  >
                    Ajouter utilisateur
                  </Button>

                  <Button
                    onClick={() => history.push("/users")}
                    variant="danger"
                    style={{ marginTop: 10 }}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default withRouter(AddUser);
