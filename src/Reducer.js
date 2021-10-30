let InitialState = {
  token: null,
  error: null,
  admin: false,
  loading: false,
  user: null,
  userBis: [],
  Armes: [],
  ArmesBis: [],
  CederOne: [],
  CederOneBis: [],
  CederTwo: [],
  CederTwoBis: [],
  Munition: [],
  MunitionBis: [],
  ArmePerso: [],
  ArmePersoBis: [],
  FacturePerso: [],
  FacturePersoBis: [],
  SearchEmail: [],
};

let Reducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'SUCCES':
      return Object.assign({}, state, {
        token: action.payload.token,
        error: null,
        admin: action.payload.admin,
      });
    case 'ERROR':
      return Object.assign({}, state, {
        token: null,
        error: true,
        loading: false,
      });
    case 'LOADING':
      return Object.assign({}, state, {
        token: null,
        error: false,
        loading: false,
      });
    case 'LOGOUT':
      return Object.assign({}, state, {
        token: null,
        error: null,
        loading: null,
      });
    case 'USER':
      return Object.assign({}, state, {
        user: action.payload.data,
        userBis: action.payload.data,
        SearchEmail: action.payload.data,
      });
    case 'USERB':
      return Object.assign({}, state, {
        userBis: action.payload.data,
      });

    case 'USERSEARCH':
      return Object.assign({}, state, {
        SearchEmail: action.payload.data,
      });
    case 'ARMES':
      return Object.assign({}, state, {
        Armes: action.payload.data,
        ArmesBis: action.payload.data,
      });
    case 'ARMESB':
      let f = state.Armes.slice();
      let c = f.filter((x) => {
        return x.marques === action.payload.data;
      });
      return Object.assign({}, state, {
        ArmesBis: action.payload.data ? c : state.Armes,
      });
    case 'ARMESBB':
      let fa = state.Armes.slice();
      let ca = fa.filter((x) => {
        return x.type === action.payload.data;
      });
      return Object.assign({}, state, {
        ArmesBis: action.payload.data ? ca : state.Armes,
      });

    case 'ACHAT':
      let cc = state.ArmesBis.slice();
      let ccd = cc.sort((a, b) => {
        let aaaab = new Date(a.dateAchat).getTime();
        let bbbbb = new Date(b.dateAchat).getTime();
        if (action.payload.data === 'alpha') {
          return Number(aaaab) > Number(bbbbb) ? 1 : -1;
        } else {
          return Number(aaaab) > Number(bbbbb) ? -1 : 1;
        }
      });
      return Object.assign({}, state, {
        ArmesBis: ccd,
      });

    case 'ACHATB':
      let ccc = state.ArmesBis.slice();
      let ccdd = ccc.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.extension < b.extension ? -1 : 1;
        } else {
          return a.extension < b.extension ? 1 : -1;
        }
      });

      return Object.assign({}, state, {
        ArmesBis: ccdd,
      });

    case 'ACHATBB':
      let cccc = state.ArmesBis.slice();
      let ccddd = cccc.sort((a, b) => {
        let aaaab = new Date(a.dateCreation).getTime();
        let bbbbb = new Date(b.dateCreation).getTime();
        if (action.payload.data === 'alpha') {
          return Number(aaaab) > Number(bbbbb) ? 1 : -1;
        } else {
          return Number(aaaab) > Number(bbbbb) ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        ArmesBis: ccddd,
      });

    case 'ACHATBBB':
      let dada = state.ArmesBis.slice();
      let dadad = dada.sort((a, b) => {
        let e = a.garantie;
        let g = a.extension * 7889400000;
        let dateGarantieB = Number(e) + Number(g);

        let dddd = b.garantie;
        let ffff = b.extension * 7889400000;
        let dateGarantiBiss = Number(dddd) + Number(ffff);
        if (action.payload.data === 'alpha') {
          return Number(dateGarantieB) > Number(dateGarantiBiss) ? -1 : -1;
        } else {
          return Number(dateGarantieB) > Number(dateGarantiBiss) ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        ArmesBis: dadad,
      });

    case 'SUCCESSEARCHB':
      return Object.assign({}, state, {
        CederTwoBis: action.payload.data,
      });

    case 'SUCCESSEARCH':
      return Object.assign({}, state, {
        ArmesBis: action.payload.data,
      });

    case 'IdentifiantCreation':
      let Achat = state.user.slice();

      let AchatBBBis = Achat.sort((a, b) => {
        let abb = new Date(a.dateCreation).getTime();
        let bbb = new Date(b.dateCreation).getTime();
        if (action.payload.data === 'alpha') {
          return Number(abb) > Number(bbb) ? 1 : -1;
        } else {
          return Number(abb) > Number(bbb) ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        userBis: AchatBBBis,
      });
    case 'IdentifiantModification':
      let ACHATBB = state.ArmePerso.slice();

      let AchatBBis = ACHATBB.sort((a, b) => {
        let abbb = new Date(a.dateModification).getTime();
        let bbbb = new Date(b.dateModification).getTime();
        if (action.payload.data === 'alpha') {
          return Number(abbb) > Number(bbbb) ? 1 : -1;
        } else {
          return Number(abbb) > Number(bbbb) ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        ArmePersoBis: AchatBBis,
      });

    case 'Garant':
      let dadadff = state.ArmesBis.slice();

      let dadaddd = dadadff.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return Number(a.garantie) > Number(b.garantie) ? 1 : -1;
        } else {
          return Number(a.garantie) > Number(b.garantie) ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        ArmesBis: dadaddd,
      });

    case 'Serie':
      let dadadfff = state.ArmesBis.slice();
      let dadadddd = dadadfff.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.serie < b.serie ? -1 : 1;
        } else {
          return a.serie < b.serie ? 1 : -1;
        }
      });
      return Object.assign({}, state, {
        ArmesBis: dadadddd,
      });

    case 'Calibre':
      let dadadffff = state.ArmesBis.slice();
      let dadaddddd = dadadffff.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.calibre < b.calibre ? -1 : 1;
        } else {
          return a.calibre < b.calibre ? 1 : -1;
        }
      });
      return Object.assign({}, state, {
        ArmesBis: dadaddddd,
      });

    case 'ARMURIER':
      let dadadf = state.ArmesBis.slice();
      let dadadd = dadadf.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.armurier < b.armurier ? -1 : 1;
        } else {
          return a.armurier < b.armurier ? 1 : -1;
        }
      });
      return Object.assign({}, state, {
        ArmesBis: dadadd,
      });

    // ValidateOne

    case 'CEDER':
      return Object.assign({}, state, {
        CederOne: action.payload.data,
        CederOneBis: action.payload.data,
      });

    case 'ArmurierParticulier':
      let particulier = state.CederOne.slice();

      let armurire = particulier.filter((x) => {
        if (action.payload.data === 'alpha') {
          return x.armurier;
        } else if (action.payload.data === 'inverse') {
          return x.armurier === null;
        } else {
          return state.CederOne;
        }
      });

      return Object.assign({}, state, {
        CederOneBis: armurire,
      });

    case 'ArmurierParticulierBis':
      let particulierB = state.CederOne.slice();

      let armurireB = particulierB.filter((x) => {
        if (action.payload.data === 'alpha') {
          return x.armurier;
        } else if (action.payload.data === 'inverse') {
          return x.armurier === null;
        } else {
          return state.CederOne;
        }
      });

      return Object.assign({}, state, {
        CederTwoBis: armurireB,
      });

    case 'EMAILBIS':
      let EmailB = state.CederOne.slice();
      let EmailBBis = EmailB.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.fromEmail < b.fromEmail ? 1 : -1;
        } else {
          return a.fromEmail < b.fromEmail ? -1 : 1;
        }
      });
      return Object.assign({}, state, {
        CederOneBis: EmailBBis,
      });

    case 'NOMBIS':
      let NOMB = state.CederOne.slice();
      let NOMBBis = NOMB.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.toNom < b.toNom ? 1 : -1;
        } else {
          return a.toNom < b.toNom ? -1 : 1;
        }
      });
      return Object.assign({}, state, {
        CederOneBis: NOMBBis,
      });

    case 'SIABIS':
      let SIAB = state.CederOne.slice();
      let SIABBis = SIAB.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.toSIA < b.toSIA ? 1 : -1;
        } else {
          return a.toSIA < b.toSIA ? -1 : 1;
        }
      });
      return Object.assign({}, state, {
        CederOneBis: SIABBis,
      });

    case 'CREATION':
      let CREATION = state.CederOne.slice();

      let CREATIONBis = CREATION.sort((a, b) => {
        let aaab = new Date(a.dateCreation).getTime();
        let bbbb = new Date(b.dateCreation).getTime();
        if (action.payload.data === 'alpha') {
          return Number(aaab) > Number(bbbb) ? 1 : -1;
        } else {
          return Number(aaab) > Number(bbbb) ? -1 : 1;
        }
      });
      return Object.assign({}, state, {
        CederOneBis: CREATIONBis,
      });

    case 'EMAIL':
      let Email = state.CederOne.slice();
      let EmailBis = Email.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.fromEmail < b.fromEmail ? 1 : -1;
        } else {
          return a.fromEmail < b.fromEmail ? -1 : 1;
        }
      });
      return Object.assign({}, state, {
        CederOneBis: EmailBis,
      });

    case 'NOM':
      let NOM = state.CederOne.slice();
      let NOMBis = NOM.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.fromNom < b.fromNom ? 1 : -1;
        } else {
          return a.fromNom < b.fromNom ? -1 : 1;
        }
      });
      return Object.assign({}, state, {
        CederOneBis: NOMBis,
      });

    case 'SEARCHCEDER':
      return Object.assign({}, state, {
        CederOneBis: action.payload.data,
      });

    case 'SIA':
      let SIA = state.CederOne.slice();
      let SIABis = SIA.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.fromSIA < b.fromSIA ? 1 : -1;
        } else {
          return a.fromSIA < b.fromSIA ? -1 : 1;
        }
      });
      return Object.assign({}, state, {
        CederOneBis: SIABis,
      });

    // ValidateBIS

    case 'CEDERBIS':
      return Object.assign({}, state, {
        CederTwo: action.payload.data,
        CederTwoBis: action.payload.data,
      });

    case 'EMAILBISS':
      let EmailBbb = state.CederTwo.slice();
      let EmailBBBbis = EmailBbb.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.fromEmail < b.fromEmail ? 1 : -1;
        } else {
          return a.fromEmail < b.fromEmail ? -1 : 1;
        }
      });
      return Object.assign({}, state, {
        CederTwoBis: EmailBBBbis,
      });

    case 'NOMBISS':
      let NomBbb = state.CederTwo.slice();
      let NomBBBbis = NomBbb.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.fromNom < b.fromNom ? 1 : -1;
        } else {
          return a.fromNom < b.fromNom ? -1 : 1;
        }
      });
      return Object.assign({}, state, {
        CederTwoBis: NomBBBbis,
      });

    case 'SIABISS':
      let SIABbb = state.CederTwo.slice();
      let SIABBBbis = SIABbb.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.fromSIA < b.fromSIA ? -1 : 1;
        } else {
          return a.fromSIA < b.fromSIA ? 1 : -1;
        }
      });
      return Object.assign({}, state, {
        CederTwoBis: SIABBBbis,
      });

    case 'EMAILBBISS':
      let EMAILBbbb = state.CederTwo.slice();
      let EMAILBBBBbis = EMAILBbbb.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.toEmail < b.toEmail ? 1 : -1;
        } else {
          return a.toEmail < b.toEmail ? -1 : 1;
        }
      });
      return Object.assign({}, state, {
        CederTwoBis: EMAILBBBBbis,
      });

    case 'NOMBBISS':
      let NOMBbbb = state.CederTwo.slice();
      let NOMBBBBbis = NOMBbbb.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.toNom < b.toNom ? 1 : -1;
        } else {
          return a.toNom < b.toNom ? -1 : 1;
        }
      });
      return Object.assign({}, state, {
        CederTwoBis: NOMBBBBbis,
      });

    case 'SIABBISS':
      let SIABbbb = state.CederTwo.slice();
      let SIABBBBbis = SIABbbb.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.toSIA < b.toSIA ? -1 : 1;
        } else {
          return a.toSIA < b.toSIA ? 1 : -1;
        }
      });
      return Object.assign({}, state, {
        CederTwoBis: SIABBBBbis,
      });

    case 'TelephoneBISS':
      let Telephonebbb = state.CederTwo.slice();
      let TelephoneBBBBbis = Telephonebbb.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.armurier
            ? a.armurier.telephone < b.armurier.telephone
              ? 1
              : -1
            : null;
        } else {
          return a.armurier
            ? a.armurier.telephone < b.armurier.telephone
              ? -1
              : 1
            : null;
        }
      });
      return Object.assign({}, state, {
        CederTwoBis: TelephoneBBBBbis,
      });

    case 'MUNITIONS':
      return Object.assign({}, state, {
        Munition: action.payload.data,
        MunitionBis: action.payload.data,
      });

    case 'ACHATMUNITIONBBIS':
      let d = state.Munition.slice();

      let ff = d.sort((a, b) => {
        let aab = new Date(a.dateCreation).getTime();
        let bbb = new Date(b.dateCreation).getTime();

        if (action.payload.data === 'alpha') {
          return Number(aab) > Number(bbb) ? -1 : 1;
        } else {
          return Number(aab) > Number(bbb) ? 1 : -1;
        }
      });
      return Object.assign({}, state, {
        MunitionBis: ff,
      });

    case 'ACHATMUNITIONBIS':
      let de = state.Munition.slice();

      let fff = de.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.nombre > b.nombre ? 1 : -1;
        } else {
          return a.nombre > b.nombre ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        Munition: fff,
        MunitionBis: fff,
      });

    case 'ACHATMUNITIONBISBIS':
      let ded = state.Munition.slice();

      let ffff = ded.sort((a, b) => {
        let aa = new Date(a.dateCreation).getTime();
        let bb = new Date(b.dateCreation).getTime();
        if (action.payload.data === 'alpha') {
          return Number(aa) > Number(bb) ? 1 : -1;
        } else {
          return Number(aa) > Number(bb) ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        Munition: ffff,
        MunitionBis: ffff,
      });

    case 'ACHATMUNITIONBISBISBIS':
      return Object.assign({}, state, {
        MunitionBis: action.payload.data,
      });

    case 'PERSOARME':
      return Object.assign({}, state, {
        ArmePerso: action.payload.data.armes,
        ArmePersoBis: action.payload.data.armes,
      });

    case 'UserArmeCalibre':
      let calibre = state.ArmePerso.slice();

      let calibreBis = calibre.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.calibre > b.calibre ? 1 : -1;
        } else {
          return a.calibre > b.calibre ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        ArmePersoBis: calibreBis,
        ArmePerso: calibreBis,
      });

    case 'PERSOFACTURE':
      return Object.assign({}, state, {
        FacturePerso: action.payload.data.factures,
        FacturePersoBis: action.payload.data.factures,
      });

    case 'UserArmeAchat':
      let AchatB = state.ArmePerso.slice();

      let AchatBBBBis = AchatB.sort((a, b) => {
        let ab = new Date(a.dateAchat).getTime();
        let bb = new Date(a.dateAchat).getTime();
        if (action.payload.data === 'alpha') {
          return Number(ab) > Number(bb) ? 1 : -1;
        } else {
          return Number(ab) > Number(bb) ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        ArmePersoBis: AchatBBBBis,
      });

    case 'UserArmeCategorie':
      let calibreB = state.ArmePerso.slice();

      let calibreBBis = calibreB.filter((a) => {
        if (action.payload.data) {
          return a.marques === action.payload.data;
        } else {
          return a.marques;
        }
      });

      return Object.assign({}, state, {
        ArmePersoBis: action.payload.data ? calibreBBis : state.ArmePerso,
      });

    case 'UserArmeGarantie':
      let Garant = state.ArmePerso.slice();

      let GarantB = Garant.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return Number(a.garantie) > Number(b.garantie) ? 1 : -1;
        } else {
          return Number(a.garantie) > Number(b.garantie) ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        ArmePersoBis: GarantB,
      });

    case 'UserArmeExtension':
      let Extension = state.ArmePerso.slice();

      let ExtensionB = Extension.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.extension > b.extension ? 1 : -1;
        } else {
          return a.extension > b.extension ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        ArmePersoBis: ExtensionB,
      });

    case 'UserArmeSerie':
      let Serie = state.ArmePerso.slice();

      let SerieB = Serie.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.serie > b.serie ? 1 : -1;
        } else {
          return a.serie > b.serie ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        ArmePersoBis: SerieB,
      });

    case 'UserArmeMunitions':
      let ArmeMunitions = state.ArmePerso.slice();

      let ArmeMunitionsB = ArmeMunitions.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.extension > b.extension ? 1 : -1;
        } else {
          return a.extension > b.extension ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        ArmePersoBis: ArmeMunitionsB,
      });

    case ' UserArmeCreation':
      let ArmeCreation = state.ArmePerso.slice();

      let ArmeCreationB = ArmeCreation.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.dateCreation > b.dateCreation ? 1 : -1;
        } else {
          return a.dateCreation > b.dateCreation ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        ArmePersoBis: ArmeCreationB,
      });

    case 'UserArmeGarantieBis':
      let GarantieBis = state.ArmePerso.slice();

      let GarantieBBis = GarantieBis.sort((a, b) => {
        let d = a.garantie;
        let f = a.extension * 7889400000;
        let dateGaranti = Number(d) + Number(f);

        let dd = b.garantie;
        let ff = b.extension * 7889400000;
        let dateGarantiBis = Number(dd) + Number(ff);

        if (action.payload.data === 'alpha') {
          return Number(dateGaranti) > Number(dateGarantiBis) ? 1 : -1;
        } else {
          return Number(dateGaranti) > Number(dateGarantiBis) ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        ArmePersoBis: GarantieBBis,
      });

    case 'FactureMunition':
      let ccs = state.FacturePerso.slice();
      let dddf = ccs.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return a.nombre < b.nombre ? -1 : 1;
        } else {
          return a.nombre < b.nombre ? 1 : -1;
        }
      });
      return Object.assign({}, state, {
        FacturePersoBis: dddf,
      });

    case 'BUTOIRE':
      let Butoire = state.ArmesBis.slice();

      let ButoireBis = Butoire.sort((a, b) => {
        if (action.payload.data === 'alpha') {
          return Number(a.limitDate) > Number(b.limitDate) ? 1 : -1;
        } else {
          return Number(a.limitDate) > Number(b.limitDate) ? -1 : 1;
        }
      });

      return Object.assign({}, state, {
        ArmeBis: ButoireBis,
      });

    default:
      break;
  }
  return state;
};

export default Reducer;
