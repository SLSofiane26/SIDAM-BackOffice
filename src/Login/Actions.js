import axios from 'axios';

export let Login = (data) => async (dispatch) => {
  await localStorage.setItem('token', data.token);
  if (data.admin) {
    await localStorage.setItem('admin', 'admin');
    let exp = new Date(Date.now() + 36000 * 1000).getTime();
    await localStorage.setItem('expDate', exp);
    dispatch(LogoutTimeOut(3600));
    dispatch({
      type: 'SUCCES',
      payload: { token: data.token, admin: data.admin },
    });
  }
};

export let LogoutTimeOut = (data) => async (dispatch) => {
  setTimeout(() => {
    dispatch(Logout());
  }, data * 1000);
};

export let CheikAuth = () => async (dispatch) => {
  let token = await localStorage.getItem('token');
  let admin = await localStorage.getItem('admin');
  let date = await localStorage.getItem('expDate');
  if (!token) {
    dispatch(Logout());
  } else {
    if (date <= new Date().getTime()) {
      dispatch(Logout());
    } else {
      dispatch(LogoutTimeOut((date - new Date().getTime()) / 100));
      dispatch({ type: 'SUCCES', payload: { token: token, admin: admin } });
    }
  }
};

export let Logout = () => async (dispatch) => {
  await localStorage.removeItem('token');
  await localStorage.removeItem('admin');
  await localStorage.removeItem('expDate');
  dispatch({ type: 'LOGOUT' });
};

export let Identifiant = (d) => async (dispatch, getState) => {
  let user = getState().user.slice();

  dispatch({
    type: 'USER',
    payload: {
      data: user.sort((a, b) => {
        if (d === 'alpha') {
          return a.identifiant.toLowerCase() < b.identifiant.toLowerCase()
            ? -1
            : 1;
        } else {
          return a.identifiant.toLowerCase() < b.identifiant.toLowerCase()
            ? 1
            : -1;
        }
      }),
    },
  });
};

export let Identifiantb = (d) => async (dispatch, getState) => {
  let user = getState().user.slice();

  dispatch({
    type: 'USER',
    payload: {
      data: user.sort((a, b) => {
        if (d === 'alpha') {
          return a.prenom.toLowerCase().trim() < b.prenom.toLowerCase().trim()
            ? -1
            : 1;
        } else {
          return a.prenom.toLowerCase().trim() < b.prenom.toLowerCase().trim()
            ? 1
            : -1;
        }
      }),
    },
  });
};

export let Identifiantbb = (d) => async (dispatch, getState) => {
  let user = getState().user.slice();

  dispatch({
    type: 'USER',
    payload: {
      data: user.sort((a, b) => {
        if (d === 'alpha') {
          return a.email.toLowerCase() < b.email.toLowerCase() ? -1 : 1;
        } else {
          return a.email.toLowerCase() < b.email.toLowerCase() ? 1 : -1;
        }
      }),
    },
  });
};

export let Identifiantbbb = (d) => async (dispatch, getState) => {
  let user = getState().user.slice();

  dispatch({
    type: 'USER',
    payload: {
      data: user.sort((a, b) => {
        if (d === 'alpha') {
          return a.SIA.toLowerCase() < b.SIA.toLowerCase() ? -1 : 1;
        } else {
          return a.SIA.toLowerCase() < b.SIA.toLowerCase() ? 1 : -1;
        }
      }),
    },
  });
};

export let Identifiantbbbbb = (d) => async (dispatch, getState) => {
  let user = getState().user.slice();

  dispatch({
    type: 'USER',
    payload: {
      data: user.sort((a, b) => {
        if (d === 'alpha') {
          return a.ville.toLowerCase() < b.ville.toLowerCase() ? -1 : 1;
        } else {
          return a.ville.toLowerCase() < b.ville.toLowerCase() ? 1 : -1;
        }
      }),
    },
  });
};

export let Identifiantbbbb = (d) => async (dispatch, getState) => {
  let user = getState().user.slice();

  dispatch({
    type: 'USER',
    payload: {
      data: user.sort((a, b) => {
        if (d === 'alpha') {
          return a.adresse.toLowerCase() < b.adresse.toLowerCase() ? -1 : 1;
        } else {
          return a.adresse.toLowerCase() < b.adresse.toLowerCase() ? 1 : -1;
        }
      }),
    },
  });
};

export let IdentifiantBis = (d) => async (dispatch, getState) => {
  let user = getState().user.slice();

  dispatch({
    type: 'USER',
    payload: {
      data: user.sort((a, b) => {
        if (d === 'alpha') {
          return a.nom.toLowerCase() < b.nom.toLowerCase() ? -1 : 1;
        } else {
          return a.nom.toLowerCase() < b.nom.toLowerCase() ? 1 : -1;
        }
      }),
    },
  });
};

export let User = (token) => async (dispatch) => {
  await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL_BIS}/users`,
    headers: {
      'x-auth-token': token,
    },
  })
    .then((res) => {
      if (res.data.msg === 'No token acces') {
        dispatch(Logout());
      } else {
        dispatch({ type: 'USER', payload: { data: res.data } });
      }
    })
    .catch((err) => {
      dispatch(Logout());
    });
};

export let IdentifiantArme = (d) => async (dispatch, getState) => {
  let user = getState().user.slice();

  dispatch({
    type: 'USER',
    payload: {
      data: user.sort((a, b) => {
        if (d === 'alpha') {
          return a.armes.length < b.armes.length ? -1 : 1;
        } else {
          return a.armes.length < b.armes.length ? 1 : -1;
        }
      }),
    },
  });
};

export let SearchEmail = (data) => async (dispatch, getState) => {
  let d = getState()
    .user.slice()
    .filter((x) => {
      return (
        x.nom.toLowerCase().includes(data.toLowerCase()) ||
        x.prenom.toLowerCase().includes(data.toLowerCase()) ||
        x.email.toLowerCase().includes(data.toLowerCase()) ||
        x.telephone.toLowerCase().includes(data.toLowerCase()) ||
        x.SIA.toLowerCase().includes(data.toLowerCase())
      );
    });

  dispatch({
    type: 'USERSEARCH',
    payload: {
      data: d,
    },
  });
};

export let Search = (data) => async (dispatch, getState) => {
  let d = getState()
    .user.slice()
    .filter((x) => {
      return (
        x.nom.toLowerCase().includes(data.toLowerCase()) ||
        x.prenom.toLowerCase().includes(data.toLowerCase()) ||
        x.email.toLowerCase().includes(data.toLowerCase())
      );
    });

  dispatch({
    type: 'USERB',
    payload: {
      data: d,
    },
  });
};

export let Marques = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'ARMESB',
    payload: { data: data },
  });
};

export let MarquesBis = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'ARMESBB',
    payload: { data: data },
  });
};

export let fetchArmes = (token) => async (dispatch, getState) => {
  await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL_BIS}/armes`,
    headers: {
      'x-auth-token': token,
    },
  })
    .then((res) => {
      if (res.data.msg === 'No token acces') {
        dispatch(Logout());
      } else {
        dispatch({ type: 'ARMES', payload: { data: res.data } });
      }
    })
    .catch((err) => {
      dispatch(Logout());
    });
};

export let IdentifiantArmeB = (data) => async (dispatch, getState) => {
  dispatch({ type: 'ACHAT', payload: { data: data } });
};

export let Email = (data) => async (dispatch, getState) => {
  dispatch({ type: 'EMAIL', payload: { data: data } });
};

export let NOM = (data) => async (dispatch, getState) => {
  dispatch({ type: 'NOM', payload: { data: data } });
};

export let SIA = (data) => async (dispatch, getState) => {
  dispatch({ type: 'SIA', payload: { data: data } });
};

export let EmailBis = (data) => async (dispatch, getState) => {
  dispatch({ type: 'EMAILBIS', payload: { data: data } });
};

export let SearchBiss = (data) => async (dispatch, getState) => {
  let d = getState()
    .CederOne.slice()
    .filter((x) => {
      return (
        x.fromNom.toLowerCase().includes(data.toLowerCase()) ||
        x.fromSIA.toLowerCase().includes(data.toLowerCase()) ||
        x.fromEmail.toLowerCase().includes(data.toLowerCase()) ||
        x.toNom.toLowerCase().includes(data.toLowerCase()) ||
        x.toEmail.toLowerCase().includes(data.toLowerCase()) ||
        x.toSIA.toLowerCase().includes(data.toLowerCase())
      );
    });
  dispatch({ type: 'SEARCHCEDER', payload: { data: d } });
};

export let NOMBis = (data) => async (dispatch, getState) => {
  dispatch({ type: 'NOMBIS', payload: { data: data } });
};

export let SIABis = (data) => async (dispatch, getState) => {
  dispatch({ type: 'SIABIS', payload: { data: data } });
};

export let IdentifiantArmeBB = (data) => async (dispatch, getState) => {
  dispatch({ type: 'ACHATB', payload: { data: data } });
};

export let IdentifiantArmeBBB = (data) => async (dispatch, getState) => {
  dispatch({ type: 'ACHATBB', payload: { data: data } });
};
export let Calibre = (data) => async (dispatch, getState) => {
  dispatch({ type: 'Calibre', payload: { data: data } });
};
export let Serie = (data) => async (dispatch, getState) => {
  dispatch({ type: 'Serie', payload: { data: data } });
};

export let Garant = (data) => async (dispatch, getState) => {
  dispatch({ type: 'Garant', payload: { data: data } });
};

export let IdentifiantCreation = (data) => async (dispatch, getState) => {
  dispatch({ type: 'IdentifiantCreation', payload: { data: data } });
};

export let Munitions = (token, data) => async (dispatch, getState) => {
  await axios({
    method: 'GET',
    baseURL: `${process.env.REACT_APP_API_URL_BIS}/munitions/${data}`,
    headers: {
      'x-auth-token': token,
    },
  })
    .then((res) => {
      if (res.data.msg === 'No token acces') {
        dispatch(Logout());
      } else {
        dispatch({ type: 'MUNITIONS', payload: { data: res.data.munitions } });
      }
    })
    .catch((err) => {
      dispatch(Logout());
    });
};

export let ArmurierParticulier = (data) => async (dispatch, getState) => {
  dispatch({ type: 'ArmurierParticulier', payload: { data: data } });
};

export let ArmurierParticulierBis = (data) => async (dispatch, getState) => {
  dispatch({ type: 'ArmurierParticulierBis', payload: { data: data } });
};

export let Armurier = (data) => async (dispatch, getState) => {
  dispatch({ type: 'ARMURIER', payload: { data: data } });
};

export let IdentifiantArmeBBBB = (data) => async (dispatch, getState) => {
  dispatch({ type: 'ACHATBBB', payload: { data: data } });
};

export let UserArmeCalibre = (data) => async (dispatch, getState) => {
  dispatch({ type: 'UserArmeCalibre', payload: { data: data } });
};

export let UserArmeCategorie = (data) => async (dispatch, getState) => {
  dispatch({ type: 'UserArmeCategorie', payload: { data: data } });
};

export let Creation = (data) => async (dispatch, getState) => {
  dispatch({ type: 'CREATION', payload: { data: data } });
};

export let UserArmeSerie = (data) => async (dispatch, getState) => {
  dispatch({ type: 'UserArmeSerie', payload: { data: data } });
};

export let UserArmeAchat = (data) => async (dispatch, getState) => {
  dispatch({ type: 'UserArmeAchat', payload: { data: data } });
};

export let UserArmeMunitions = (data) => async (dispatch, getState) => {
  dispatch({ type: 'UserArmeMunitions', payload: { data: data } });
};

export let UserArmeGarantie = (data) => async (dispatch, getState) => {
  dispatch({ type: 'UserArmeGarantie', payload: { data: data } });
};
export let UserArmeCreation = (data) => async (dispatch, getState) => {
  dispatch({ type: 'UserArmeCreatione', payload: { data: data } });
};

export let UserArmeGarantieBis = (data) => async (dispatch, getState) => {
  dispatch({ type: 'UserArmeGarantieBis', payload: { data: data } });
};

export let UserArmeExtension = (data) => async (dispatch, getState) => {
  dispatch({ type: 'UserArmeExtension', payload: { data: data } });
};

export let Telephone = (data) => async (dispatch, getState) => {
  dispatch({ type: 'TELEPHONE', payload: { data: data } });
};

export let SearchArmes = (data) => async (dispatch, getState) => {
  let ff = getState()
    .Armes.slice()
    .filter((x) => {
      return (
        x.serie.toLowerCase().includes(data.toLowerCase()) ||
        x.marques.toLowerCase().includes(data.toLowerCase()) ||
        x.type.toLowerCase().includes(data.toLowerCase()) ||
        x.modele.toLowerCase().includes(data.toLowerCase()) ||
        x.armurier.toLowerCase().includes(data.toLowerCase()) ||
        x.extension.toString().includes(data.toLowerCase()) ||
        x.armurier.toLowerCase().includes(data.toLowerCase()) ||
        x.calibre.toLowerCase().includes(data.toLowerCase())
      );
    });

  dispatch({ type: 'SUCCESSEARCH', payload: { data: ff } });
};

export let UserCeder = (data) => async (dispatch, getState) => {
  await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL_BIS}/ceder`,
    headers: {
      'x-auth-token': data,
    },
  })
    .then((res) => {
      if (res.data.msg === 'No token acces') {
        dispatch(Logout());
      } else {
        dispatch({ type: 'CEDER', payload: { data: res.data } });
      }
    })
    .catch((err) => {
      dispatch(Logout());
    });
};

export let UserCederBis = (data) => async (dispatch, getState) => {
  await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL_BIS}/cederB`,
    headers: {
      'x-auth-token': data,
    },
  })
    .then((res) => {
      if (res.data.msg === 'No token acces') {
        dispatch(Logout);
      } else {
        dispatch({ type: 'CEDERBIS', payload: { data: res.data } });
      }
    })
    .catch((err) => {
      dispatch(Logout());
    });
};

export let SearchBisBis = (data) => async (dispatch, getState) => {
  let ff = getState()
    .CederTwo.slice()
    .filter((x) => {
      return (
        x.fromNom.toLowerCase().includes(data.toLowerCase()) ||
        x.fromSIA.toLowerCase().includes(data.toLowerCase()) ||
        x.fromEmail.toLowerCase().includes(data.toLowerCase()) ||
        x.toNom.toLowerCase().includes(data.toLowerCase()) ||
        x.toSIA.toString().toLowerCase().includes(data.toLowerCase()) ||
        x.toEmail.toLowerCase().includes(data.toLowerCase())
      );
    });

  dispatch({ type: 'SUCCESSEARCHB', payload: { data: ff } });
};

export let EmailBisBis = (data) => async (dispatch) => {
  dispatch({ type: 'EMAILBISS', payload: { data: data } });
};

export let NomBisBis = (data) => async (dispatch) => {
  dispatch({ type: 'NOMBISS', payload: { data: data } });
};

export let SIABisBis = (data) => async (dispatch) => {
  dispatch({ type: 'SIABISS', payload: { data: data } });
};

export let EMAILBisBis = (data) => async (dispatch) => {
  dispatch({ type: 'EMAILBISS', payload: { data: data } });
};

export let FactureMunition = (data) => async (dispatch) => {
  dispatch({ type: 'FactureMunition', payload: { data: data } });
};

export let EMAILBisBisBis = (data) => async (dispatch) => {
  dispatch({ type: 'EMAILBBISS', payload: { data: data } });
};

export let NomBisBisBis = (data) => async (dispatch) => {
  dispatch({ type: 'NOMBBISS', payload: { data: data } });
};

export let SIAisBisBis = (data) => async (dispatch) => {
  dispatch({ type: 'SIABBISS', payload: { data: data } });
};

export let TelephoneB = (data) => async (dispatch) => {
  dispatch({ type: 'TelephoneBISS', payload: { data: data } });
};

export let ACHATMUNITION = (data) => async (dispatch, getState) => {
  dispatch({ type: 'ACHATMUNITION', payload: { data: data } });
};

export let ACHATMUNITIONBIS = (data) => async (dispatch, getState) => {
  dispatch({ type: 'ACHATMUNITIONBIS', payload: { data: data } });
};

export let ACHATMUNITIONBISBIS = (data) => async (dispatch, getState) => {
  dispatch({ type: 'ACHATMUNITIONBISBIS', payload: { data: data } });
};

export let SearchArmesBIS = (data) => async (dispatch, getState) => {
  let MunitionBis = getState()
    .Munition.slice()
    .filter((x) => {
      return (
        x.dateachat.toString().toLowerCase().includes(data.toLowerCase()) ||
        x.nombre.toString().includes(data.toLowerCase()) ||
        x.dateCreation.toString().includes(data.toLowerCase())
      );
    });

  dispatch({ type: 'ACHATMUNITIONBISBISBIS', payload: { data: MunitionBis } });
};

export let ACHATMUNITIONB = (data) => async (dispatch, getState) => {
  dispatch({ type: 'ACHATMUNITIONBBIS', payload: { data: data } });
};

export let UserPerso = (data, dataB) => async (dispatch) => {
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL_BIS}/armes/${dataB}`,
    headers: {
      'x-auth-token': data,
    },
  })
    .then((res) => {
      if (res.data.msg === 'No token acces') {
        dispatch(Logout());
      } else {
        dispatch({ type: 'PERSOARME', payload: { data: res.data } });
      }
    })
    .catch((err) => {
      dispatch(Logout());
    });
};

export let UserFacture = (data, dataB) => async (dispatch) => {
  await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL_BIS}/factures/${dataB}`,
    headers: {
      'x-auth-token': data,
    },
  })
    .then((res) => {
      if (res.data.msg === 'No token acces') {
        dispatch(Logout());
      } else {
        dispatch({ type: 'PERSOFACTURE', payload: { data: res.data } });
      }
    })
    .catch((err) => {
      dispatch(Logout());
    });
};

export let WeaponButoire = (data) => async (dispatch) => {
  dispatch({ type: 'BUTOIRE', payload: { data: data } });
};
