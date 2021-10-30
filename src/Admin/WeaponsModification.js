import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import DatePicker from "react-date-picker";
import { Button, Table, Dropdown, DropdownButton } from "react-bootstrap";
import CZ from "../Asset/pistCZ.svg";
import SW from "../Asset/pistSW.svg";
import PSW from "../Asset/revoSW.svg";
import CarabineCZ from "../Asset/caraCZ.svg";
import CarabineSW from "../Asset/caraSW.svg";
import RevoSW from "../Asset/revoSW.png";
import PistCZ from "../Asset/pistCZ.png";
import PistSW from "../Asset/pistSW.png";
import { NavLink } from "react-router-dom";
import * as styled from "../Style/Arme.module.css";
import ReactPaginate from "react-paginate";
import * as ACTIONS from "../Login/Actions";

let WeaponsModification = React.memo(function WeaponsModification(props) {
  let [facturesPerPage] = useState(3);
  let [facture, setFacture] = useState(null);
  let [pageCount, setPageCount] = useState(null);
  let [currentFacture, setCurrentFacture] = useState(0);
  let [offset, setOffset] = useState(0);

  let [arme, setArme] = useState(null);
  let [date, setDate] = useState(new Date());
  let [dateBis, setDateBis] = useState(new Date());
  let [changeG, setChangeG] = useState(false);
  let [changeGB, setChangeGB] = useState(false);
  let token = useSelector((state) => state.token);
  let history = useHistory();
  let dispatch = useDispatch();
  let params = useParams();

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

  let fetchData = async () => {
    setChangeG(false);
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL_BIS}/arme/${params.id}`,
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        setArme(res.data.arme);
        setFacture(res.data.facture);
      })
      .catch((err) => console.error(err));
  };

  useEffect(async () => {
    fetchData();
  }, []);

  let handlePageClick = (e) => {
    let select = e.selected;
    let offset = select * facturesPerPage;
    setOffset(offset);
    setCurrentFacture(select);
  };

  let handleDeleteBis = async (data) => {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL_BIS}/armes/${data}`,
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        history.push({ pathname: "/weapons" });
      })
      .catch((err) => {});
  };

  let handleChangeBisBis = async () => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL_BIS}/armesButoire/${arme._id}`,
      headers: {
        "x-auth-token": token,
      },
      data: { dateBis },
    }).then((res) => {
      fetchData();
    });
  };

  let handleChangeBis = async () => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL_BIS}/armesGarantie/${arme._id}`,
      headers: {
        "x-auth-token": token,
      },
      data: { date },
    }).then((res) => {
      fetchData();
    });
  };

  let y = null;
  if (facture) {
    y = (
      <div className={styled.Factures} style={{ marginTop: "2%" }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Marque</th>
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
            {facture
              .slice(offset, offset + facturesPerPage)
              .map((items, index) => {
                return (
                  <tr className={styled.factureTR}>
                    <td
                      style={{
                        fontfamily: "Poppins-Regular",
                      }}
                    >
                      {items.type === "PISTOLETSMITHWESSON" && (
                        <img alt="PistSW" src={PistSW} />
                      )}
                      {items.type === "PISTOLETCZ" && (
                        <img alt="PistCZ" src={PistCZ} />
                      )}
                      {items.type === "REVOLVERSMITHWESSON" && (
                        <img alt="RevolverSW" src={RevoSW} />
                      )}
                      {items.type === "CARABINESMITHWESSON" && (
                        <img alt="RevolverSW" src={CarabineSW} />
                      )}
                      {items.type === "CARABINECZ" && (
                        <img alt="RevolverSW" src={CarabineCZ} />
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
                          rel="noreferrer"
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
        {facture.length > 0 && (
          <ReactPaginate
            previousLabel={"précédent"}
            nextLabel={"suivant"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(facture.length / facturesPerPage)}
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

  return (
    <Fragment>
      {arme && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "2%",
          }}
        >
          <div
            style={{
              flexBasis: "50%",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <img
              alt="imagebbb"
              style={{ width: "70%", height: "100%" }}
              src={`${process.env.REACT_APP_API_URL}/${arme.autorisation}`}
            />
          </div>

          <div style={{ flexBasis: "50%" }}>
            {arme.type === "PISTOLETCZ" && (
              <img src={CZ} width="10%" alt="CZCZCZ" />
            )}
            {arme.type === "CARABINECZ" && (
              <img src={CarabineCZ} width="17%" alt="CarabineCZCZCZ" />
            )}
            {arme.type === "PISTOLETSMITHWESSON" && (
              <img src={SW} width="10%" alt="SWSWSWSW" />
            )}
            {arme.type === "REVOLVERSMITHWESSON" && (
              <img src={PSW} width="13%" alt="REVOSWSW" />
            )}
            {arme.type === "CARABINESMITHWESSON" && (
              <img src={CarabineSW} width="20%" alt="CarabineSWSW" />
            )}
            <h4 style={{ marginTop: 20, fontFamily: "Poppins-Regular" }}>
              Marque : {arme.marques}
            </h4>
            <h4 style={{ marginTop: 20, fontFamily: "Poppins-Regular" }}>
              Modèle : {arme.modele}
            </h4>
            <h4 style={{ marginTop: 20, fontFamily: "Poppins-Regular" }}>
              Type : {arme.type}
            </h4>
            <h4 style={{ marginTop: 20, fontFamily: "Poppins-Regular" }}>
              Calibre : {arme.calibre}
            </h4>
            <h4 style={{ marginTop: 20, fontFamily: "Poppins-Regular" }}>
              Série : {arme.serie}
            </h4>
            <h4 style={{ marginTop: 20, fontFamily: "Poppins-Regular" }}>
              Date d'achat : {new Date(arme.dateAchat).toLocaleDateString()}
            </h4>
            <h4 style={{ marginTop: 20, fontFamily: "Poppins-Regular" }}>
              Garantie actuelle :{" "}
              {new Date(Number(arme.garantie)).toLocaleDateString()}
            </h4>
            <h4 style={{ marginTop: 20, fontFamily: "Poppins-Regular" }}>
              Date butoire :{" "}
              {new Date(Number(arme.limitDate)).toLocaleDateString()}
            </h4>
            <h4 style={{ marginTop: 20, fontFamily: "Poppins-Regular" }}>
              Nombre d'extension(s) : {arme.extension}
            </h4>
            <h4 style={{ marginTop: 20, fontFamily: "Poppins-Regular" }}>
              Quantité de munition(s) : {arme.quantite}
            </h4>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              {arme.munitions.length > 0 ? (
                <Button variant="primary">
                  <NavLink
                    to={{ pathname: "/ammo/" + arme._id }}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Voir munitions
                  </NavLink>
                </Button>
              ) : (
                <Button variant="danger">Pas de munitions</Button>
              )}
              <Button
                variant="primary"
                onClick={() =>
                  props.history.push({ pathname: "/user/" + arme.user })
                }
              >
                Voir utilisateur
              </Button>
              <Button variant="primary">
                <a
                  href={`${process.env.REACT_APP_API_URL}/${arme.autorisation}`}
                  target="_blank"
                  style={{ color: "white", fontFamily: "Poppins-Regular" }}
                >
                  Voir autorisation
                </a>
              </Button>
              <Button
                variant="danger"
                onClick={() => setChangeGB(true)}
                style={{
                  fontFamily: "Poppins-Regular",
                  height: "50%",
                  marginTop: "5%",
                }}
              >
                Modifier la date butoire
              </Button>
              {changeGB && (
                <div
                  style={{
                    position: "absolute",
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    background: "white",
                  }}
                >
                  <DatePicker value={date} onChange={setDateBis} />
                  <div style={{ width: "10%", marginLeft: "5%" }}>
                    <Button
                      variant="success"
                      onClick={() => handleChangeBisBis()}
                      style={{ fontFamily: "Poppins-Regular" }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => setChangeGB(false)}
                      style={{
                        fontFamily: "Poppins-Regular",
                        marginTop: 10,
                      }}
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              )}
              <Button
                variant="danger"
                onClick={() => setChangeG(true)}
                style={{
                  fontFamily: "Poppins-Regular",
                  height: "50%",
                  marginTop: "5%",
                }}
              >
                Modifier la garantie
              </Button>
              {changeG && (
                <div
                  style={{
                    position: "absolute",
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    background: "white",
                  }}
                >
                  <DatePicker value={date} onChange={setDate} />
                  <div style={{ width: "10%", marginLeft: "5%" }}>
                    <Button
                      variant="success"
                      onClick={() => handleChangeBis()}
                      style={{ fontFamily: "Poppins-Regular" }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => setChangeG(false)}
                      style={{
                        fontFamily: "Poppins-Regular",
                        marginTop: 10,
                      }}
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              )}
              <Button
                variant="danger"
                className={styled.ButtonModification}
                onClick={() => (arme.cedee ? null : handleDeleteBis(arme._id))}
              >
                {arme.cedee ? "En cours de transfert" : "Supprimer"}
              </Button>
            </div>
          </div>
        </div>
      )}
      {y}
    </Fragment>
  );
});

export default WeaponsModification;
