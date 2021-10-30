import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };
  }

  componentDidMount = () => {
    if (this.props.token) {
      this.props.history.push({ pathname: '/home' });
    }
  };

  componentDidUpdate = (prevProps) => {};

  render() {
    return (
      <Fragment>
        <header style={{ background: 'white' }}>
          {this.props.token ? (
            <nav class='navbar navbar-dark bg-dark' style={{ zIndex: 10000 }}>
              <button
                class='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span class='navbar-toggler-icon'></span>
              </button>
              <div class='collapse navbar-collapse' id='navbarNav'>
                <ul
                  class='navbar-nav'
                  style={{ width: '50%', justifyContent: 'space-between' }}
                >
                  <li class='nav-item' style={{ marginTop: 15 }}>
                    <NavLink
                      to='/home'
                      style={{ fontFamily: 'Poppins-Regular', color: 'white' }}
                    >
                      Accueil
                    </NavLink>
                  </li>
                  <li class='nav-item'>
                    <NavLink
                      to='/users'
                      style={{ fontFamily: 'Poppins-Regular', color: 'white' }}
                    >
                      Utilisateurs
                    </NavLink>
                  </li>
                  <li class='nav-item'>
                    <NavLink
                      to='/weapons'
                      style={{ fontFamily: 'Poppins-Regular', color: 'white' }}
                    >
                      Armes
                    </NavLink>
                  </li>
                  <li class='nav-item'>
                    <NavLink
                      to='/arms-yield'
                      style={{ fontFamily: 'Poppins-Regular', color: 'white' }}
                    >
                      Arme(s) en transfert
                    </NavLink>
                  </li>
                  <li class='nav-item'>
                    <NavLink
                      to='/validated-weapons'
                      style={{ fontFamily: 'Poppins-Regular', color: 'white' }}
                    >
                      Arme(s) transférée(s)
                    </NavLink>
                  </li>

                  <li class='nav-item'>
                    <NavLink
                      to='/garantie'
                      style={{ fontFamily: 'Poppins-Regular', color: 'white' }}
                    >
                      Garantie(s)
                    </NavLink>
                  </li>
                  <li class='nav-item'>
                    <NavLink
                      to='/mailing'
                      style={{ fontFamily: 'Poppins-Regular', color: 'white' }}
                    >
                      Mailing
                    </NavLink>
                  </li>
                  <li class='nav-item'>
                    <NavLink
                      to='/notification'
                      style={{ fontFamily: 'Poppins-Regular', color: 'white' }}
                    >
                      Notification
                    </NavLink>
                  </li>
                  <li class='nav-item'>
                    <NavLink
                      to='/logout'
                      style={{ fontFamily: 'Poppins-Regular', color: 'white' }}
                    >
                      Déconnexion
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
          ) : null}
        </header>
        <main className='container-fluid' style={{ background: 'white' }}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {};
};

let mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
