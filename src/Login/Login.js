import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as ACTIONS from "./Actions";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as styled from "../Style/Arme.module.css";
import { Form, Button, Alert } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import logo from "../Asset/image3White.svg";
import CZ from "../Asset/1.svg";
import SW from "../Asset/2.svg";
import PSW from "../Asset/3.svg";
import CarabineCZ from "../Asset/4.svg";
import CarabineSW from "../Asset/5.svg";
import song from "./sound_one.mp3";
import songB from "./sound_two.mp3";
import Mun from "../Asset/22.jpg"; 

let Connexion = (props) => {
  let [form, setForm] = useState({
    email: null,
    motdepasse: null,
  });
  let [error, setError] = useState(false);
  let token = useSelector((state) => state.token);

  let d = null;

  if (token) {
    d = <Redirect from="/login" to="/users" />;
  }

  let dispatch = useDispatch();

  let regEx = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  let isValid = (form) => {
    let valid = true;
    Object.values(form).forEach((val) => {
      val === null ? (valid = false) : (valid = true);
    });
    return valid;
  };

  let dd = null;

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid(form) && regEx.test(form.email)) {
      let d = {};
      d.email = form.email;
      d.motdepasse = form.motdepasse;
      await axios({
        method: "POST",
        baseURL: `${process.env.REACT_APP_API_URL_BIS}/auth`,
        data: d,
      })
        .then((res) => {
          let audioELL = document.getElementsByClassName("audio-elementbis")[0];
          audioELL.play();
          setTimeout(() => {
            dispatch(ACTIONS.Login(res.data));
            props.history.push({ pathname: "/home" });
          }, 400);
        })
        .catch((err) => {
          let audioEl = document.getElementsByClassName("audio-element")[0];
          audioEl.play();
          setError(true);
        });
    } else {
      let audioEl = document.getElementsByClassName("audio-element")[0];
      audioEl.play();
      setError(true);
    }
  };

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 2000);
  }

  return (
    <Fragment>
      <Helmet>
        <title>SIDAM - BACKOFFICE</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <img
        alt="logosidam"
        src={Mun}
        style={{ position: "fixed", top: 0, left: 0, width: "100%" }}
      />

      <audio className="audio-elementbis">
        <source src={songB}></source>
      </audio>
      <audio className="audio-element">
        <source src={song}></source>
      </audio>
      <div className={styled.Connexion} style={{ marginTop: "2%" }}>
        {dd}
        {error && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              zIndex: 10000,
            }}
          >
            <Alert
              variant="danger"
              style={{
                textAlign: "center",
                justifyContent: "center",
                width: "15%",
                marginTop: "-3%",
                position: "absolute",
              }}
            >
              Identifiants inconnus
            </Alert>
          </div>
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <div className={styled.logoLogin}>
            <img
              alt="logosidam"
              src={logo}
              style={{
                width: "90%",
                top: 0,
                left: 0,
                zIndex: 1000,
                justifyContent: "center",
                alignContent: "center",
              }}
            />
          </div>
        </div>
        <Form style={{ marginTop: 30, zIndex: 1000 }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label
              style={{ color: "white", fontFamily: "Poppins-Regular" }}
            >
              Adresse email
            </Form.Label>
            <Form.Control
              type="email"
              style={{ height: 50, width: 300 }}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              placeholder="Email"
            />
          </Form.Group>
          {d}

          <Form.Group controlId="formBasicPassword">
            <Form.Label
              style={{ color: "white", fontFamily: "Poppins-Regular" }}
            >
              Mot de passe
            </Form.Label>
            <Form.Control
              type="password"
              style={{ height: 50, width: 300 }}
              onChange={(e) =>
                setForm({
                  ...form,
                  motdepasse: e.target.value,
                })
              }
              placeholder="Mot de passe"
            />
          </Form.Group>

          <Button
            variant={error ? "danger" : "primary"}
            style={{ marginTop: 10, width: "60%" }}
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Connexion{" "}
            <BsChevronRight
              size="25"
              style={{ marginLeft: 10, position: "absolute" }}
            />
          </Button>
        </Form>
        <div
          style={{
            zIndex: 10000,
            marginTop: "4%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <img src={CZ} width="15%" alt="CZ" />
          <img src={PSW} width="15%" alt="PSW" />
          <img src={SW} width="15%" alt="SW" />
          <img src={CarabineCZ} width="15%" alt="CarabineCZ" />
          <img src={CarabineSW} width="15%" alt="CarabineSW" />
        </div>
      </div>
    </Fragment>
  );
};

export default Connexion;
