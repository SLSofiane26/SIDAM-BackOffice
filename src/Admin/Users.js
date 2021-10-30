import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import UserModification from "./UserModification";
import * as styled from "../Style/Arme.module.css";

import CZ from "../Asset/pistCZ.svg";
import SW from "../Asset/pistSW.svg";
import PSW from "../Asset/revoSW.svg";
import CarabineCZ from "../Asset/caraCZ.svg";
import CarabineSW from "../Asset/caraSW.svg";

import * as ACTIONS from "../Login/Actions";
import { Button, Table, Dropdown, DropdownButton } from "react-bootstrap";

import ReactPaginate from "react-paginate";

let Users = (props) => {
  let [data, setData] = useState(null);

  let [armesPerPage] = useState(3);

  let [currentArme, setCurrentArme] = useState(0);

  let [facturesPerPage] = useState(3);

  let [currentFacture, setCurrentFacture] = useState(0);

  let [modification, setModification] = useState(null);

  let [pageCount, setPageCount] = useState(null);

  let [pageCountB, setPageCountB] = useState(null);

  let [offset, setOffset] = useState(0);

  let [offsetB, setOffsetB] = useState(0);

  let token = useSelector((state) => state.token);

  let history = useHistory();

  let armes = useSelector((state) => state.ArmePersoBis);

  let factures = useSelector((state) => state.FacturePersoBis);

  let dispatch = useDispatch();

  let fetchUser = async () => {
    await axios({
      url: `${process.env.REACT_APP_API_URL_BIS}/users/${props.match.params.id}`,
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        if (res.data === null) {
          history.push("/users");
        }
        setData(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    dispatch(ACTIONS.UserPerso(token, props.match.params.id));
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(armes.length / armesPerPage));
  }, []);

  useEffect(() => {
    dispatch(ACTIONS.UserFacture(token, props.match.params.id));
  }, []);

  useEffect(() => {
    setPageCountB(Math.ceil(factures.length / facturesPerPage));
  }, []);

  let handleDeleteB = async (data) => {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL_BIS}/factures/${data}`,
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        dispatch(ACTIONS.UserFacture(token, props.match.params.id));
      })
      .catch((err) => {});
  };

  let c = null;

  let handleDelete = async (data) => {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL_BIS}/users/${data}`,
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        history.push("/users");
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchUser();
  }, []);

  let handleDeleteBis = async (data) => {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL_BIS}/armes/${data}`,
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        dispatch(ACTIONS.UserPerso(token, props.match.params.id));
      })
      .catch((err) => console.error(err));
  };

  let handlePageClick = (e) => {
    let select = e.selected;
    let offset = select * armesPerPage;
    setOffset(offset);
    setCurrentArme(select);
  };

  let handlePageClickBis = (e) => {
    let selectt = e.selected;
    let OffsetB = selectt * facturesPerPage;
    setOffsetB(OffsetB);
    setCurrentFacture(selectt);
  };

  let handleAnnulate = async (data) => {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL_BIS}/factureBis/${data}`,
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) =>
        dispatch(ACTIONS.UserFacture(token, props.match.params.id))
      )
      .catch((err) => console.error(err));
  };

  let handleValidate = async (data) => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL_BIS}/facture/${data}`,
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) =>
        dispatch(ACTIONS.UserFacture(token, props.match.params.id))
      )
      .catch((err) => console.error(err));
  };

  let d = null;

  if (data !== null) {
    d = (
      <div className={styled.UserBB}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Email
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                SIA
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Adresse
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Nom
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Prénom
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Téléphone
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Supprimer l'utilisateur
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Modifiez l'utilisateur
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                {data.email ? data.email : "Aucun email"}
              </td>
              <td
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                {data.SIA ? data.SIA : "SIA"}
              </td>
              <td
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                {data.adresse ? data.adresse : "Adresse"}
              </td>
              <td
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                {data.nom ? data.nom : "Nom"}
              </td>
              <td
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                {data.prenom ? data.prenom : "Prénom"}
              </td>
              <td
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                {data.telephone ? data.telephone : "Téléphone"}
              </td>
              <td
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                {data.admin ? (
                  <Button variant="success" style={{ fontSize: "15px" }}>
                    ADMIN
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    style={{ fontSize: "15px" }}
                    onClick={() => handleDelete(data._id)}
                  >
                    Supprimer
                  </Button>
                )}
              </td>
              <td
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                <Button
                  variant="primary"
                  onClick={() => setModification(data)}
                  style={{ fontSize: "15px" }}
                >
                  Modifez l'utilisateur
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

  let e = null;
  if (armes) {
    e = (
      <div className={styled.Armes}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Calibre
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.UserArmeCalibre("alpha"))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.UserArmeCalibre("inverse"))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Marque
                <DropdownButton size="sm">
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.UserArmeCategorie(null))}
                  >
                    Toutes les marques
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.UserArmeCategorie("CZ"))}
                  >
                    CZ
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(ACTIONS.UserArmeCategorie("SMITHWESSON"))
                    }
                  >
                    SMITHWESSON
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Série
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.UserArmeSerie("alpha"))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.UserArmeSerie("inverse"))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Date d'achat
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.UserArmeAchat("alpha"))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.UserArmeAchat("inverse"))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Garantie
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.UserArmeGarantie("alpha"))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(ACTIONS.UserArmeGarantie("inverse"))
                    }
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Extension(s)
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.UserArmeExtension("alpha"))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(ACTIONS.UserArmeExtension("inverse"))
                    }
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Garantie actuelle
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(ACTIONS.UserArmeGarantieBis("alpha"))
                    }
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(ACTIONS.UserArmeGarantieBis("inverse"))
                    }
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Munitions
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.UserArmeMunitions("alpha"))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(ACTIONS.UserArmeMunitions("inverse"))
                    }
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Date de création
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.UserArmeCreation("alpha"))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(ACTIONS.UserArmeCreation("inverse"))
                    }
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Autorisation
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Télécharger l'autorisation
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Voir les munitions
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Modifier l'arme
              </th>
              <th
                style={{
                  fontfamily: "Poppins-Regular",
                }}
              >
                Supprimer cette arme
              </th>
            </tr>
          </thead>
          <tbody>
            {armes.slice(offset, offset + armesPerPage).map((items, index) => {
              let d = items.garantie;
              let f = items.extension * 7889400000;
              let dateGaranti = Number(d) + Number(f);
              let dateGarantie = new Date(dateGaranti).toLocaleDateString();

              return (
                <tr>
                  <td
                    style={{
                      fontfamily: "Poppins-Regular",
                    }}
                  >
                    {items.calibre}
                  </td>
                  <td
                    style={{
                      fontfamily: "Poppins-Regular",
                    }}
                  >
                    {items.type === "PISTOLETSMITHWESSON" && (
                      <img alt="PistSW" src={SW} />
                    )}
                    {items.type === "PISTOLETCZ" && (
                      <img alt="PistCZ" src={CZ} />
                    )}
                    {items.type === "REVOLVERSMITHWESSON" && (
                      <img alt="RevolverSW" src={PSW} />
                    )}
                    {items.type === "CARABINESMITHWESSON" && (
                      <img alt="CarabineSW" src={CarabineSW} />
                    )}
                    {items.type === "CARABINECZ" && (
                      <img alt="CarabineCZ" src={CarabineCZ} />
                    )}
                  </td>
                  <td
                    style={{
                      fontfamily: "Poppins-Regular",
                    }}
                  >
                    {items.serie}
                  </td>
                  <td
                    style={{
                      fontfamily: "Poppins-Regular",
                    }}
                  >
                    {new Date(items.dateAchat).toLocaleDateString()}
                  </td>
                  <td
                    style={{
                      fontfamily: "Poppins-Regular",
                    }}
                  >
                    {new Date(Number(items.garantie)).toLocaleDateString()}
                  </td>
                  <td
                    style={{
                      fontfamily: "Poppins-Regular",
                    }}
                  >
                    {items.extension}
                  </td>
                  <td
                    style={{
                      fontfamily: "Poppins-Regular",
                    }}
                  >
                    {dateGarantie}
                  </td>
                  <td
                    style={{
                      fontfamily: "Poppins-Regular",
                    }}
                  >
                    {items.quantite}
                  </td>
                  <td
                    style={{
                      fontfamily: "Poppins-Regular",
                    }}
                  >
                    {new Date(items.dateCreation).toLocaleDateString()}
                  </td>
                  <td>
                    <img
                      alt="autorisation"
                      src={`${process.env.REACT_APP_API_URL}/${items.autorisation}`}
                      style={{ width: 150, height: 150 }}
                    />
                  </td>

                  <td
                    style={{
                      fontfamily: "Poppins-Regular",
                    }}
                  >
                    <Button variant="primary" style={{ color: "white" }}>
                      <a
                        style={{ color: "white" }}
                        target="_blank"
                        href={`${process.env.REACT_APP_API_URL}/${items.autorisation}`}
                      >
                        Voir
                      </a>
                    </Button>
                  </td>
                  <td
                    style={{
                      fontfamily: "Poppins-Regular",
                    }}
                  >
                    <Button variant="primary">
                      {items.munitions.length > 0 ? (
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                          to={{ pathname: "/ammo/" + items._id }}
                        >
                          Voir les munitions
                        </Link>
                      ) : (
                        "Pas de munitions"
                      )}
                    </Button>
                  </td>

                  <td
                    style={{
                      fontfamily: "Poppins-Regular",
                    }}
                  >
                    <Button
                      variant="success"
                      onClick={() =>
                        props.history.push({
                          pathname: "/weaponsmodification/" + items._id,
                        })
                      }
                    >
                      Modifier
                    </Button>
                  </td>

                  <td
                    style={{
                      fontfamily: "Poppins-Regular",
                    }}
                  >
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteBis(items._id)}
                    >
                      Supprimer cette arme
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {armes.length > 0 && (
          <ReactPaginate
            previousLabel={"précédent"}
            nextLabel={"suivant"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(armes.length / armesPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={styled.pagination}
            subContainerClassName={"pages pagination"}
            activeClassName={styled.active}
          />
        )}
      </div>
    );
  }

  let y = null;
  if (factures) {
    y = (
      <div className={styled.Factures}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Marques</th>
              <th>
                Nombre de munitions
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.FactureMunition("alpha"))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.FactureMunition("inverse"))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th>Date de création</th>
              <th>Nom du fichier</th>
              <th>Voir la facture</th>

              <th>Supprimer la facture</th>
            </tr>
          </thead>
          <tbody>
            {factures
              .slice(offsetB, offsetB + facturesPerPage)
              .map((items, index) => {
                return (
                  <tr className={styled.factureTR}>
                    <td
                      style={{
                        fontfamily: "Poppins-Regular",
                      }}
                    >
                      {items.type === "PISTOLETSMITHWESSON" && (
                        <img alt="PistSW" src={SW} />
                      )}
                      {items.type === "PISTOLETCZ" && (
                        <img alt="PistCZ" src={CZ} />
                      )}
                      {items.type === "REVOLVERSMITHWESSON" && (
                        <img alt="RevolverSW" src={PSW} />
                      )}
                      {items.type === "CARABINESMITHWESSON" && (
                        <img alt="CarabineSW" src={CarabineSW} />
                      )}
                      {items.type === "CARABINECZ" && (
                        <img alt="CarabineCZ" src={CarabineCZ} />
                      )}
                    </td>
                    <th>{items.nombre}</th>
                    <th>{new Date(items.dateCreation).toLocaleDateString()}</th>
                    <th>{items.fileName}</th>
                    <th>
                      <Button
                        variant="primary"
                        style={{ color: "white", border: "none" }}
                      >
                        <a
                          style={{ color: "white" }}
                          target="_blank"
                          href={`${process.env.REACT_APP_API_URL}${items.file}`}
                        >
                          Voir
                        </a>
                      </Button>
                    </th>
                    <th>
                      <Button
                        onClick={() => handleDeleteB(items._id)}
                        variant="danger"
                        style={{ border: "none" }}
                      >
                        Supprimer
                      </Button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        {factures.length > 0 && (
          <ReactPaginate
            previousLabel={"précédent"}
            nextLabel={"suivant"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(factures.length / facturesPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClickBis}
            containerClassName={styled.pagination}
            subContainerClassName={"pages pagination"}
            activeClassName={styled.active}
          />
        )}
      </div>
    );
  }

  return (
    <Fragment>
      <Helmet>
        <title>SIDAM</title>
        <meta name="description" content="sidam admin" />
      </Helmet>
      <div>
        <UserModification
          VisibleModification={modification}
          handleMoficiation={() => setModification(null)}
        />
        <h3
          style={{
            color: "#515151",
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
            marginTop: 30,
          }}
        >
          Utilisateur
        </h3>
        {d}
        <h3
          style={{
            color: "#515151",
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
            marginTop: "20px",
          }}
        >
          Armes
        </h3>
        {e}
        <h3
          style={{
            color: "#515151",
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
          }}
        >
          Factures
        </h3>
        {y}
        {c}
      </div>
    </Fragment>
  );
};

export default withRouter(Users);
