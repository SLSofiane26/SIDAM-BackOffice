import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Table,
  Dropdown,
  DropdownButton,
  Carousel,
} from "react-bootstrap";
import * as styled from "../Style/Arme.module.css";
import { NavLink, useHistory, withRouter } from "react-router-dom";
import RevoSW from "../Asset/revoSW.svg";
import PistCZ from "../Asset/pistCZ.svg";
import PistSW from "../Asset/pistSW.svg";
import CaraCZ from "../Asset/caraCZ.svg";
import CaraSW from "../Asset/caraSW.svg";
import ReactPaginate from "react-paginate";
import * as ACTIONS from "../Login/Actions";
import { BsChevronRight } from "react-icons/bs";
import image1 from "../Asset/image1.svg";
import image2 from "../Asset/image2.svg";

import CZZ from "../Asset/CZ.svg";
import SWw from "../Asset/sw.svg";

let Armes = (props) => {
  let [armes, setArmes] = useState([]);
  let [postperPage] = useState(10);
  let [currentPage, setCurrentPage] = useState(0);

  let dispatch = useDispatch();

  let [pageCount, setPageCount] = useState(0);

  let [offset, setOffset] = useState(0);

  let data = useSelector((state) => state.ArmesBis);

  let token = useSelector((state) => state.token);

  let history = useHistory();

  let handlePageClick = (e) => {
    let select = e.selected;
    let offset = select * postperPage;
    setOffset(offset);
    setCurrentPage(select);
  };

  useEffect(() => {
    dispatch(ACTIONS.fetchArmes(token));
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(data.length / postperPage));
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
        dispatch(ACTIONS.fetchArmes(token));
      })
      .catch((err) => {});
  };

  let handleExport = async () => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL_BIS}/exportCSVW`,
      headers: {
        "x-auth-token": token,
      },
    }).then((res) =>
      window.open(`${process.env.REACT_APP_API_URL}/PDF/${res.data}`)
    );
  };

  let handleExportBis = async (data) => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL_BIS}/exportCSVWBis/${data}`,
      headers: {
        "x-auth-token": token,
      },
    }).then((res) =>
      window.open(`${process.env.REACT_APP_API_URL}/PDF/${res.data}`)
    );
  };

  let handleSearchB = (e) => {
    let cc = e.target.value;
    dispatch(ACTIONS.SearchArmes(cc));
  };

  let handleModification = (data) => {
    history.push({ pathname: "/weaponsmodification/" + data });
  };

  return (
    <Fragment>
      <Helmet>
        <title>SIDAM</title>
      </Helmet>
      <div style={{ marginTop: "1%" }}>
        <Carousel controls={false} contextMenu={false} indicators={false}>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src={image1}
              alt="First slide"
              height="100px"
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src={image2}
              alt="Third slide"
              height="100px"
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src={CZZ}
              alt="Third slide"
              height="100px"
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src={SWw}
              alt="Third slide"
              height="100px"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div class="input-group" style={{ marginTop: 20 }}>
        <input
          type="search"
          class="form-control rounded"
          placeholder="Rechercher"
          aria-label="Rechercher"
          aria-describedby="search-addon"
          onChange={(e) => handleSearchB(e)}
        />
      </div>

      <div
        style={{
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          display: "flex",
          marginTop: 10,
        }}
      >
        <div className={styled.BisArmes}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Marque
                  <DropdownButton size="lg">
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.Marques(null))}
                    >
                      Toute les marques
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.Marques("CZ"))}
                    >
                      CZ
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.Marques("SMITHWESSON"))}
                    >
                      SMITHWESSON
                    </Dropdown.Item>
                  </DropdownButton>
                </th>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Type
                  <DropdownButton size="lg">
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.MarquesBis("PISTOLETCZ"))}
                    >
                      PISTOLET CZ
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.MarquesBis("CARABINECZ"))}
                    >
                      CARABINE CZ
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dispatch(ACTIONS.MarquesBis("PISTOLETSMITHWESSON"))
                      }
                    >
                      PISTOLET SMITHWESSON
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dispatch(ACTIONS.MarquesBis("CARABINESMITHWESSON"))
                      }
                    >
                      CARABINE SMITHWESSON
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dispatch(ACTIONS.MarquesBis("REVOLVERSMITHWESSON"))
                      }
                    >
                      REVOLVER SMITHWESSON
                    </Dropdown.Item>
                  </DropdownButton>
                </th>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Calibre
                  <DropdownButton size="sm">
                    <Dropdown.Item></Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.Calibre("alpha"))}
                    >
                      Croissant
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.Calibre("inverse"))}
                    >
                      Décroissant
                    </Dropdown.Item>
                  </DropdownButton>
                </th>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Serie
                  <DropdownButton size="sm">
                    <Dropdown.Item></Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.Serie("alpha"))}
                    >
                      Croissant
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.Serie("inverse"))}
                    >
                      Décroissant
                    </Dropdown.Item>
                  </DropdownButton>
                </th>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Date d'achat
                  <DropdownButton size="sm">
                    <Dropdown.Item></Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dispatch(ACTIONS.IdentifiantArmeB("alpha"))
                      }
                    >
                      Croissant
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dispatch(ACTIONS.IdentifiantArmeB("inverse"))
                      }
                    >
                      Décroissant
                    </Dropdown.Item>
                  </DropdownButton>
                </th>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Armurier
                  <DropdownButton size="sm">
                    <Dropdown.Item></Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.Armurier("alpha"))}
                    >
                      Alphabetique
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.Armurier("inverse"))}
                    >
                      Inverse
                    </Dropdown.Item>
                  </DropdownButton>
                </th>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Garantie initiale
                  <DropdownButton size="sm">
                    <Dropdown.Item></Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.Garant("alpha"))}
                    >
                      Croissant
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.Garant("inverse"))}
                    >
                      Décroissant
                    </Dropdown.Item>
                  </DropdownButton>
                </th>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Extension(s)
                  <DropdownButton size="sm">
                    <Dropdown.Item></Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dispatch(ACTIONS.IdentifiantArmeBB("alpha"))
                      }
                    >
                      Croissant
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dispatch(ACTIONS.IdentifiantArmeBB("inverse"))
                      }
                    >
                      Décroissant
                    </Dropdown.Item>
                  </DropdownButton>
                </th>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Garantie actuelle{" "}
                  <DropdownButton size="sm">
                    <Dropdown.Item></Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dispatch(ACTIONS.IdentifiantArmeBBBB("alpha"))
                      }
                    >
                      Croissant
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dispatch(ACTIONS.IdentifiantArmeBBBB("inverse"))
                      }
                    >
                      Décroissant
                    </Dropdown.Item>
                  </DropdownButton>
                </th>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Date Butoire{" "}
                  <DropdownButton size="sm">
                    <Dropdown.Item></Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.WeaponButoire("alpha"))}
                    >
                      Croissant
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(ACTIONS.WeaponButoire("inverse"))}
                    >
                      Décroissant
                    </Dropdown.Item>
                  </DropdownButton>
                </th>
                <th style={{ fontFamily: "Poppins-Regular" }}>Autorisation</th>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Voir autorisation
                </th>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Voir utilisateur
                </th>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Voir les munitions
                </th>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Date de création
                  <DropdownButton size="sm">
                    <Dropdown.Item></Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dispatch(ACTIONS.IdentifiantArmeBBB("alpha"))
                      }
                    >
                      Croissant
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dispatch(ACTIONS.IdentifiantArmeBBB("inverse"))
                      }
                    >
                      Décroissant
                    </Dropdown.Item>
                  </DropdownButton>
                </th>
                <th style={{ fontFamily: "Poppins-Regular" }}>Modifier</th>
                <th style={{ fontFamily: "Poppins-Regular" }}>Supprimer</th>
                <th style={{ fontFamily: "Poppins-Regular" }}>
                  Export sous CSV
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.slice(offset, offset + postperPage).map((items, index) => {
                  let d = items.garantie;

                  let f = items.extension * 7889400000;

                  let dateGaranti = Number(d) + Number(f);

                  let dateGarantie = new Date(dateGaranti).getTime();

                  let m = new Date(dateGarantie).getMonth();

                  let ff = m + 1;

                  if (ff < 10) {
                    ff = "0" + ff;
                  }

                  let j = new Date(dateGarantie).getDate();

                  if (j < 10) {
                    j = "0" + j;
                  }

                  let an = new Date(dateGarantie).getFullYear();

                  let date = `${j}/${ff}/${an}`;

                  return (
                    <tr
                      key={index}
                      style={{
                        background: items.cedee ? "#6D9FB2" : "white",
                        borderColor: "black",
                        borderWidth: 1,
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      <td
                        style={{
                          background: items.cedee ? "#6D9FB2" : "white",
                          borderColor: "black",
                          borderWidth: 1,
                          color: items.cedee ? "white" : "black",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {items.type === "PISTOLETSMITHWESSON" && "Smith&Wesson"}
                        {items.type === "PISTOLETCZ" && "CZ"}
                        {items.type === "REVOLVERSMITHWESSON" && "Smith&Wesson"}
                        {items.type === "CARABINECZ" && "CZ"}
                        {items.type === "CARABINESMITHWESSON" && "Smith&Wesson"}
                      </td>
                      <td
                        style={{
                          background: items.cedee ? "#6D9FB2" : "white",
                          borderColor: "black",
                          borderWidth: 1,
                          color: items.cedee ? "white" : "black",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {items.type === "PISTOLETSMITHWESSON" &&
                          "Pistolet Smith&Wesson"}
                        {items.type === "PISTOLETCZ" && "Pistolet CZ"}
                        {items.type === "REVOLVERSMITHWESSON" &&
                          "Revolver Smith&Wesson"}
                        {items.type === "CARABINECZ" && "Carabine CZ"}
                        {items.type === "CARABINESMITHWESSON" &&
                          "Carabine Smith&Wesson"}
                      </td>
                      <td
                        style={{
                          background: items.cedee ? "#6D9FB2" : "white",
                          borderColor: "black",
                          borderWidth: 1,
                          color: items.cedee ? "white" : "black",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {items.calibre}
                      </td>
                      <td
                        style={{
                          background: items.cedee ? "#6D9FB2" : "white",
                          borderColor: "black",
                          borderWidth: 1,
                          color: items.cedee ? "white" : "black",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {items.serie}
                      </td>
                      <td
                        style={{
                          background: items.cedee ? "#6D9FB2" : "white",
                          borderColor: "black",
                          borderWidth: 1,
                          color: items.cedee ? "white" : "black",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {new Date(items.dateAchat).toLocaleDateString()}
                      </td>
                      <td
                        style={{
                          background: items.cedee ? "#6D9FB2" : "white",
                          borderColor: "black",
                          borderWidth: 1,
                          color: items.cedee ? "white" : "black",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {items.armurier}
                      </td>
                      <td
                        style={{
                          background: items.cedee ? "#6D9FB2" : "white",
                          borderColor: "black",
                          borderWidth: 1,
                          color: items.cedee ? "white" : "black",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {new Date(Number(items.garantie)).toLocaleDateString()}
                      </td>
                      <td
                        style={{
                          background: items.cedee ? "#6D9FB2" : "white",
                          borderColor: "black",
                          borderWidth: 1,
                          color: items.cedee ? "white" : "black",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {items.extension}
                      </td>
                      <td
                        style={{
                          background: items.cedee ? "#6D9FB2" : "white",
                          borderColor: "black",
                          borderWidth: 1,
                          color: items.cedee ? "white" : "black",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {date}
                      </td>
                      <td
                        style={{
                          background: items.cedee ? "#6D9FB2" : "white",
                          borderColor: "black",
                          borderWidth: 1,
                          color: items.cedee ? "white" : "black",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {new Date(Number(items.limitDate)).toLocaleDateString()}
                      </td>
                      <td
                        style={{
                          fontFamily: "Poppins-Regular",
                          background: items.cedee ? "#6D9FB2" : null,
                        }}
                      >
                        <img
                          alt="imagebbb"
                          style={{ width: 200, height: 200 }}
                          src={`${process.env.REACT_APP_API_URL}/${items.autorisation}`}
                        />
                      </td>
                      <td
                        style={{
                          background: items.cedee ? "#6D9FB2" : "white",
                          borderColor: "black",
                          borderWidth: 1,
                          color: items.cedee ? "white" : "black",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        <Button variant="primary">
                          <a
                            href={`${process.env.REACT_APP_API_URL}${items.autorisation}`}
                            target="_blank"
                            style={{ color: "white" }}
                          >
                            Voir
                          </a>
                        </Button>
                      </td>
                      <td
                        style={{
                          background: items.cedee ? "#6D9FB2" : "white",
                          borderColor: "black",
                          borderWidth: 1,
                          color: items.cedee ? "white" : "black",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        <Button variant="primary" style={{ color: "white" }}>
                          <NavLink
                            to={{ pathname: "/user/" + items.user }}
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            Utilisateur
                          </NavLink>
                        </Button>
                      </td>
                      <td
                        style={{
                          fontFamily: "Poppins-Regular",
                          background: items.cedee ? "#6D9FB2" : null,
                        }}
                      >
                        {items.munitions.length > 0 ? (
                          <Button variant="primary">
                            <NavLink
                              to={{ pathname: "/ammo/" + items._id }}
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
                      </td>
                      <td
                        style={{
                          background: items.cedee ? "#6D9FB2" : "white",
                          borderColor: "black",
                          borderWidth: 1,
                          color: items.cedee ? "white" : "black",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {new Date(items.dateCreation).toLocaleDateString()}
                      </td>
                      <td
                        style={{
                          fontFamily: "Poppins-Regular",
                          background: items.cedee ? "#6D9FB2" : null,
                        }}
                      >
                        <Button
                          variant="success"
                          onClick={() =>
                            items.ceder ? null : handleModification(items._id)
                          }
                        >
                          Modifier
                        </Button>
                      </td>
                      <td
                        style={{
                          fontFamily: "Poppins-Regular",
                          background: items.cedee ? "#6D9FB2" : null,
                        }}
                      >
                        <Button
                          variant="danger"
                          onClick={() =>
                            items.cedee ? null : handleDeleteBis(items._id)
                          }
                        >
                          {items.cedee ? "En cours de transfert" : "Supprimer"}
                        </Button>
                      </td>
                      <td style={{ fontFamily: "Poppins-Regular" }}>
                        <Button
                          variant="primary"
                          onClick={() => handleExportBis(items._id)}
                        >
                          Exporter
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
      <div
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          display: "flex",
          marginTop: 10,
          width: "100%",
        }}
      >
        <Button className={styled.AddUserButton} onClick={() => handleExport()}>
          Exporter sous CSV
          <BsChevronRight
            size="25"
            style={{ marginLeft: "1%", position: "absolute" }}
          />
        </Button>
      </div>
      <div style={{ justifyContent: "center", display: "flex" }}>
        {data.length > 0 && (
          <ReactPaginate
            previousLabel={"précédent"}
            nextLabel={"suivant"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(data.length / postperPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={styled.pagination}
            subContainerClassName={"pages pagination"}
            activeClassName={styled.active}
          />
        )}
      </div>
    </Fragment>
  );
};

export default withRouter(Armes);
