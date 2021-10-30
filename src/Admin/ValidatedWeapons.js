import axios from "axios";
import {
  Button,
  Table,
  Dropdown,
  DropdownButton,
  Carousel,
} from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as styled from "../Style/Arme.module.css";
import * as ACTIONS from "../Login/Actions";
import ReactPaginate from "react-paginate";
import image1 from "../Asset/image1.svg";
import image2 from "../Asset/image2.svg";

import CZZ from "../Asset/CZ.svg";
import SWw from "../Asset/sw.svg";

let CederBis = (props) => {
  let [postperPage] = useState(10);

  let [datab, setData] = useState(null);

  let [currentPage, setCurrentPage] = useState(1);

  let token = useSelector((state) => state.token);

  let data = useSelector((state) => state.CederTwoBis);

  let dispatch = useDispatch();

  let [pageCount, setPageCount] = useState(null);

  let [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(ACTIONS.UserCederBis(token));
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

  let handleAnnulez = async (data) => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL_BIS}/cederannulez/${data}`,
      headers: {
        "x-auth-token": token,
      },
    }).then((res) => {
      dispatch(ACTIONS.UserCederBis(token));
    });
  };

  useEffect(() => {
    dispatch(ACTIONS.UserCederBis(token));
  }, []);

  let handleSearch = (e) => {
    dispatch(ACTIONS.SearchBisBis(e.target.value));
  };

  return (
    <Fragment>
      <div className={styled.CederBis}>
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
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <DropdownButton size="sm" style={{ marginTop: "1%" }}>
          <Dropdown.Item
            onClick={() => dispatch(ACTIONS.ArmurierParticulierBis(null))}
          >
            Toute les armes en cours de validation
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => dispatch(ACTIONS.ArmurierParticulierBis("alpha"))}
          >
            Armurier
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => dispatch(ACTIONS.ArmurierParticulierBis("inverse"))}
          >
            Particulier
          </Dropdown.Item>
        </DropdownButton>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                De (email)
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.EmailBisBis("alpha"))}
                  >
                    Alphabetique
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.EmailBisBis("inverse"))}
                  >
                    Inverse
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                De (nom)
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.NomBisBis("alpha"))}
                  >
                    Alphabetique
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.NomBisBis("inverse"))}
                  >
                    Inverse
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                De (SIA)
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.SIABisBis("alpha"))}
                  >
                    Alphabetique
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.SIABisBis("inverse"))}
                  >
                    Inverse
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                À (email)
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.EMAILBisBisBis("alpha"))}
                  >
                    Alphabetique
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.EMAILBisBisBis("inverse"))}
                  >
                    Inverse
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                À (nom)
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.NomBisBisBis("alpha"))}
                  >
                    Alphabetique
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.NomBisBisBis("inverse"))}
                  >
                    Inverse
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                À (SIA)
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.SIAisBisBis("alpha"))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.SIAisBisBis("inverse"))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>

              <th style={{ fontFamily: "Poppins-Regular" }}>Téléphone</th>
              <th style={{ fontFamily: "Poppins-Regular" }}>Voir arme</th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                Annuler le transfert
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.slice(offset, offset + postperPage).map((items, index) => {
                return (
                  <tr>
                    <td
                      style={{
                        background: items.armurier ? "#6D9FB2" : "white",
                        borderColor: "black",
                        borderWidth: 1,
                        color: items.armurier ? "white" : "black",
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {items.fromEmail}
                    </td>
                    <td
                      style={{
                        background: items.armurier ? "#6D9FB2" : "white",
                        borderColor: "black",
                        borderWidth: 1,
                        color: items.armurier ? "white" : "black",
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {items.fromNom}
                    </td>
                    <td
                      style={{
                        background: items.armurier ? "#6D9FB2" : "white",
                        borderColor: "black",
                        borderWidth: 1,
                        color: items.armurier ? "white" : "black",
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {items.fromSIA}
                    </td>
                    <td
                      style={{
                        background: items.armurier ? "#6D9FB2" : "white",
                        borderColor: "black",
                        borderWidth: 1,
                        color: items.armurier ? "white" : "black",
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {items.toEmail}
                    </td>
                    <td
                      style={{
                        background: items.armurier ? "#6D9FB2" : "white",
                        borderColor: "black",
                        borderWidth: 1,
                        color: items.armurier ? "white" : "black",
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {items.armurier
                        ? `Armurier ${items.armurier.nom}`
                        : `Particulier : ${items.toNom}`}
                    </td>
                    <td
                      style={{
                        background: items.armurier ? "#6D9FB2" : "white",
                        borderColor: "black",
                        borderWidth: 1,
                        color: items.armurier ? "white" : "black",
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {items.armurier ? "Armurier" : items.toSIA}
                    </td>

                    <td
                      style={{
                        background: items.armurier ? "#6D9FB2" : "white",
                        borderColor: "black",
                        borderWidth: 1,
                        color: items.armurier ? "white" : "black",
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {items.armurier
                        ? items.armurier.telephone
                        : "Particulier"}
                    </td>
                    <td
                      style={{
                        background: items.armurier ? "#6D9FB2" : "white",
                        borderColor: "black",
                        borderWidth: 1,
                        color: items.armurier ? "white" : "black",
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      <Button
                        variant="success"
                        onClick={() =>
                          props.history.push({
                            pathname: "/weaponsmodification/" + items.armes,
                          })
                        }
                      >
                        Voir l'arme
                      </Button>
                    </td>
                    <td
                      style={{
                        background: items.armurier ? "#6D9FB2" : "white",
                        borderColor: "black",
                        borderWidth: 1,
                        color: items.armurier ? "white" : "black",
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      <Button
                        variant="danger"
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
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
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

export default CederBis;
