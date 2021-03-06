import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.css';
import { login, setAddToken } from '../redux/actions';
import { tokenFetch } from '../services/index';
import BarraInfo from '../components/BarraInfo/BarraInfo';
import InfoGrupo from '../components/Developers/InfoGrupo';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      enterDisabled: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.enableEnterButton = this.enableEnterButton.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
    this.clickConfig = this.clickConfig.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.enableEnterButton);
  }

  async onHandleClick() {
    const { dispatch, history } = this.props;
    const { email, name } = this.state;
    dispatch(login({ email, name }));
    const token = await tokenFetch();
    dispatch(setAddToken(token));
    history.push('/game');
  }

  clickConfig() {
    const { history } = this.props;
    history.push('/config');
  }

  enableEnterButton() {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { email, name } = this.state;
    if ((email.match(mailformat)) && name.length !== 0) {
      this.setState({
        enterDisabled: false,
      });
    } else {
      this.setState({
        enterDisabled: true,
      });
    }
  }

  render() {
    const {
      email,
      name,
      enterDisabled,
    } = this.state;
    return (
      <div className="container-main">
        <BarraInfo />
        <header className="Login-header">
          <h1>Trivia!</h1>
          <strong>Insira Email e Name User </strong>
        </header>
        <form className="container-form">
          <label htmlFor="email">
            <p>Email:</p>
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.onInputChange }
              placeholder="Email User"
            />
          </label>
          <label htmlFor="name">
            <p>Nome:</p>
            <input
              data-testid="input-player-name"
              type="name"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
              placeholder="Name User"
            />
          </label>
          <div className="container-butons">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ enterDisabled }
              onClick={ this.onHandleClick }
            >
              Play
            </button>
            <button
              data-testid="btn-settings"
              type="button"
              onClick={ this.clickConfig }
            >
              Config
            </button>
          </div>
        </form>
        <InfoGrupo />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getToken: state.token.token,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
