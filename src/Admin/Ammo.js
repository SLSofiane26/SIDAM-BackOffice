import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import * as styled from "../Style/Arme.module.css";
import { Button, Table, Dropdown, DropdownButton } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import * as ACTIONS from "../Login/Actions";
import ReactPaginate from "react-paginate";

let Munitions = (props) => {
  let token = useSelector((state) => state.token);

  let munitions = useSelector((state) => state.MunitionBis);

  let [postperPage] = useState(10);

  let [pageCount, setPageCount] = useState(0);

  let [currentPage, setCurrentPage] = useState(0);

  let [offset, setOffset] = useState(0);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(ACTIONS.Munitions(token, props.match.params.id));
  }, [dispatch]);

  useEffect(() => {
    setPageCount(Math.ceil(munitions.length / postperPage));
  });

  let handlePageClick = (e) => {
    let select = e.selected;
    let offset = select * postperPage;
    setOffset(offset);
    setCurrentPage(select);
  };

  let handleDelete = async (data) => {
    await axios({
      method: "DELETE",
      baseURL: `${process.env.REACT_APP_API_URL_BIS}/munitions/${data}`,
      header: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        dispatch(ACTIONS.Munitions(token, props.match.params.id));
      })
      .catch((err) => {});
  };

  let d = null;

  let handleSearchB = (e) => {
    dispatch(ACTIONS.SearchArmesBIS(e.target.value));
  };

  if (munitions !== null) {
    d = (
      <div className={styled.BisMunitions}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>
                Date d'achat
                <DropdownButton size="sm">
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.ACHATMUNITIONB(null))}
                  ></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.ACHATMUNITIONB("alpha"))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.ACHATMUNITIONB("inverse"))}
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th>
                Quantité de munitions
                <DropdownButton size="sm">
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.ACHATMUNITIONBIS(null))}
                  ></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.ACHATMUNITIONBIS("alpha"))}
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(ACTIONS.ACHATMUNITIONBIS("inverse"))
                    }
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th>Numéro de lot</th>
              <th>Facture d'achat</th>
              <th>Voir facture d'achat</th>
              <th>
                Date de création
                <DropdownButton size="sm">
                  <Dropdown.Item
                    onClick={() => dispatch(ACTIONS.ACHATMUNITIONBISBIS(null))}
                  ></Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(ACTIONS.ACHATMUNITIONBISBIS("alpha"))
                    }
                  >
                    Croissant
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(ACTIONS.ACHATMUNITIONBISBIS("inverse"))
                    }
                  >
                    Décroissant
                  </Dropdown.Item>
                </DropdownButton>
              </th>
            </tr>
          </thead>
          <tbody>
            {munitions &&
              munitions
                .slice(offset, offset + postperPage)
                .map((items, index) => {
                  return (
                    <tr>
                      <td>{new Date(items.dateachat).toLocaleDateString()}</td>
                      <td>{items.nombre}</td>
                      <td>{items.numerodelot}</td>
                      <td>
                        <img
                          style={{ height: 200, width: 200 }}
                          src={`${process.env.REACT_APP_API_URL}/${items.preuveachat}`}
                        />
                      </td>
                      <td>
                        <Button variant="primary">
                          <a
                            href={`${process.env.REACT_APP_API_URL}/${items.preuveachat}`}
                            target="_blank"
                            style={{ color: "white" }}
                          >
                            Voir
                          </a>
                        </Button>
                      </td>
                      <td>
                        {new Date(items.dateCreation).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      </div>
    );
  }

  return (
    <Fragment>
      <Helmet>
        <title>SIDAM</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div class="input-group" style={{ marginTop: 20 }}>
        <input
          type="Rechercher"
          class="form-control rounded"
          placeholder="Rechercher"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={(e) => handleSearchB(e)}
        />
      </div>
      <div style={{}}>
        <h3 style={{ color: "black", textAlign: "center", marginTop: 20 }}>
          {munitions !== null ? "Munition(s)" : "Aucune(s) munition(s)"}
        </h3>
        {d}
      </div>
      <div style={{ justifyContent: "center", width: "100%", display: "flex" }}>
        {munitions.length > 0 && (
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(munitions.length / postperPage)}
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
export default withRouter(Munitions);
