import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setLocalStorage();
  }

  setLocalStorage = () => {
    const { name, score } = this.props;
    const url = localStorage.getItem('url');
    const oldInfo = JSON.parse(localStorage.getItem('ranking'));
    const info = {
      name,
      score,
      picture: url,
    };
    if (oldInfo !== null && oldInfo !== undefined) {
      const teste = oldInfo.flat();
      teste.push(info);
      localStorage.setItem('ranking', JSON.stringify(teste));
    } else {
      localStorage.setItem('ranking', JSON.stringify([info]));
    }
  }

  handleClick({ target: { name } }) {
    const { history } = this.props;
    console.log(history);
    if (name === 'again') {
      history.push('/');
    } else {
      history.push('/ranking');
    }
  }

  render() {
    const { assertions, score } = this.props;
    const magicNumber = 3;
    return (
      <div>
        <Header />
        { assertions < magicNumber ? (
          <h1 data-testid="feedback-text">Could be better...</h1>)
          : (<h1 data-testid="feedback-text">Well Done!</h1>)}
        <h3 data-testid="feedback-total-score">
          {score}
        </h3>
        <h3 data-testid="feedback-total-question">
          {assertions}
        </h3>
        <button
          name="again"
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <button
          name="ranking"
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClick }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  name: state.player.nome,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
