import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, withRouter } from "react-router-dom";
import * as styled from "../Style/Arme.module.css";
import {
  Button,
  Table,
  Dropdown,
  DropdownButton,
  Carousel,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import * as ACTIONS from "../Login/Actions";
import ReactPaginate from "react-paginate";
import image1 from "../Asset/image1.svg";
import image2 from "../Asset/image2.svg";
import { BsChevronRight } from "react-icons/bs";
import CZZ from "../Asset/CZ.svg";
import SWw from "../Asset/sw.svg";
import axios from "axios";

let User = (props) => {
  let token = useSelector((state) => state.token);
  let User = useSelector((state) => state.userBis);
  let [state, setState] = useState([]);
  let [data, setData] = useState(null);
  let [postperPage] = useState(10);
  let [currentPage, setCurrentPage] = useState(0);
  let [offSet, setOffset] = useState(0);
  let history = useHistory();
  let [pageCount, setPageCount] = useState(0);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(ACTIONS.User(token));
  }, [dispatch]);

  let handleSearch = (e) => {
    setData(e.target.value);
    dispatch(ACTIONS.Search(e.target.value));
  };

  let handlePageClick = (e) => {
    let select = e.selected;
    let offset = select * postperPage;
    setOffset(offset);
    setCurrentPage(select);
  };

  let handleExport = async () => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL_BIS}/exportCSV`,
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
      url: `${process.env.REACT_APP_API_URL_BIS}/exportCSVBis/${data}`,
      headers: {
        "x-auth-token": token,
      },
    }).then((res) =>
      window.open(`${process.env.REACT_APP_API_URL}/PDF/${res.data}`)
    );
  };

  useEffect(() => {
    setPageCount(Math.ceil(User.length / postperPage));
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>SIDAM</title>
        <meta name="description" content="sidam admin" />
      </Helmet>

      <div style={{ marginTop: "1%", zIndex: 1000 }}>
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
          type="Rechercher"
          class="form-control rounded"
          placeholder="Rechercher"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={(e) => handleSearch(e)}
        />
      </div>

      <div className={styled.UserHome}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                Identifiant
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Identifiant("alpha"))}
                  >
                    Alphabetique
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Identifiant("inverse"))}
                  >
                    Inverse
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                Nom
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.IdentifiantBis("alpha"))}
                  >
                    Alphabetique
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.IdentifiantBis("inverse"))}
                  >
                    Inverse
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                Prénom
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Identifiantb("alpha"))}
                  >
                    Alphabetique
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Identifiantb("inverse"))}
                  >
                    Inverse
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                Email
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Identifiantbb("alpha"))}
                  >
                    Alphabetique
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Identifiantbb("inverse"))}
                  >
                    Inverse
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                SIA
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Identifiantbbb("alpha"))}
                  >
                    Alphabetique
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Identifiantbbb("inverse"))}
                  >
                    Inverse
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                Adresse
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Identifiantbbbb("alpha"))}
                  >
                    Alphabetique
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Identifiantbbbb("inverse"))}
                  >
                    Inverse
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                Ville
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.Identifiantbbbbb("alpha"))}
                  >
                    Alphabetique
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(ACTIONS.Identifiantbbbbb("inverse"))
                    }
                  >
                    Inverse
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>Téléphone</th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                Nombre d'armes
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.IdentifiantArme("alpha"))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.IdentifiantArme("inverse"))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                Date de création
                <DropdownButton size="sm">
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(ACTIONS.IdentifiantCreation("alpha"))
                    }
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(ACTIONS.IdentifiantCreation("inverse"))
                    }
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>
                Date de modification
              </th>
              <th style={{ fontFamily: "Poppins-Regular" }}>Voir</th>
              <th style={{ fontFamily: "Poppins-Regular" }}>Export sous CSV</th>
            </tr>
          </thead>
          <tbody>
            {User.length >= 0 &&
              User.slice(offSet, offSet + postperPage).map((items, index) => {
                return (
                  <tr>
                    <td style={{ fontFamily: "Poppins-Regular" }}>
                      {items.identifiant}
                    </td>
                    <td style={{ fontFamily: "Poppins-Regular" }}>
                      {items.nom}
                    </td>
                    <td style={{ fontFamily: "Poppins-Regular" }}>
                      {items.prenom}
                    </td>
                    <td style={{ fontFamily: "Poppins-Regular" }}>
                      {items.email}
                    </td>
                    <td style={{ fontFamily: "Poppins-Regular" }}>
                      {items.SIA}
                    </td>
                    <td style={{ fontFamily: "Poppins-Regular" }}>
                      {items.adresse}
                    </td>
                    <td style={{ fontFamily: "Poppins-Regular" }}>
                      {items.ville}
                    </td>
                    <td style={{ fontFamily: "Poppins-Regular" }}>
                      {items.telephone}
                    </td>
                    <td style={{ fontFamily: "Poppins-Regular" }}>
                      {items.armes.length}
                    </td>
                    <td style={{ fontFamily: "Poppins-Regular" }}>
                      {new Date(items.dateCreation).toLocaleDateString()}
                    </td>
                    <td style={{ fontFamily: "Poppins-Regular" }}>
                      {new Date(items.dateModification).toLocaleDateString()}
                    </td>
                    <td style={{ fontFamily: "Poppins-Regular" }}>
                      <Button variant="primary">
                        <NavLink
                          to={{ pathname: "/user" + "/" + items._id }}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          Voir
                        </NavLink>
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
          <Button
            className={styled.AddUserButton}
            onClick={() => history.push("/add-user")}
          >
            Ajouter un utilisateur
            <BsChevronRight
              size="25"
              style={{ marginLeft: "1%", position: "absolute" }}
            />
          </Button>
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
          <Button
            className={styled.AddUserButton}
            onClick={() => handleExport()}
          >
            Exporter sous CSV
            <BsChevronRight
              size="25"
              style={{ marginLeft: "1%", position: "absolute" }}
            />
          </Button>
        </div>
        <div
          style={{
            width: "100%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {User.length > 0 && (
            <ReactPaginate
              previousLabel={"précédent"}
              nextLabel={"suivant"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              pageCount={Math.ceil(User.length / postperPage)}
              containerClassName={styled.pagination}
              subContainerClassName={"pages pagination"}
              activeClassName={styled.active}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(User);
