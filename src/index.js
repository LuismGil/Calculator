import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      currentVal: '0',
      display: '0',
      formula: '',
      newDigit: false,
    };

    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleSignClick = this.handleSignClick.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleNumberClick = e => {
    const { display, formula, newDigit } = this.state;

    const target = e.target.value;
    const newValue = display === '0' ? '' + target : display + '' + target;
    if (target === '.' && display.includes('.')) {
      return;
    }
    this.setState({
      formula: newDigit ? target : formula + '' + target,
      display: newDigit ? target : newValue,
      newDigit: false,
    });
  };

  removeOperator = () => {
    let { formula } = this.state;
    while ('/-*+'.includes(formula.slice(-1))) {
      formula = formula.slice(0, -1);
    }
    return formula;
  };

  handleSignClick = e => {
    const { formula } = this.state;
    const target = e.target.value;
    let newFormula;
    if (target === '-') {
      newFormula = formula + '' + target;
    } else {
      newFormula = this.removeOperator() + '' + target;
    }
    this.setState({
      formula: newFormula,
      display: target,
      newDigit: false,
    });
  };

  handleEvaluate = () => {
    const { formula, newDigit } = this.state;
    const result = Math.round(10000 * eval(formula)) / 10000;

    this.setState({
      display: result,
      formula: '' + result, //obs
      newDigit: true,
    });
  };

  handleClear = () => {
    this.setState({
      display: '0',
      formula: '',
    });
  };

  render() {
    const { display, formula } = this.state;
    return (
      <>
        <div className="container">
          <Display display={display} formula={formula} />

          <div className="container__btn__spaces">
            <NumberKey
              id="seven"
              handleClick={this.handleNumberClick}
              value={7}
            />

            <NumberKey
              id="eight"
              handleClick={this.handleNumberClick}
              value={8}
            />

            <NumberKey
              id="nine"
              handleClick={this.handleNumberClick}
              value={9}
            />

            <OperatorKey
              id="add"
              handleClick={this.handleSignClick}
              value="+"
            />

            <NumberKey
              id="four"
              handleClick={this.handleNumberClick}
              value={4}
            />

            <NumberKey
              id="five"
              handleClick={this.handleNumberClick}
              value={5}
            />

            <NumberKey
              id="six"
              handleClick={this.handleNumberClick}
              value={6}
            />

            <OperatorKey
              id="subtract"
              handleClick={this.handleSignClick}
              value="-"
            />

            <NumberKey
              id="one"
              handleClick={this.handleNumberClick}
              value={1}
            />

            <NumberKey
              id="two"
              handleClick={this.handleNumberClick}
              value={2}
            />

            <NumberKey
              id="three"
              handleClick={this.handleNumberClick}
              value={3}
            />

            <OperatorKey
              id="divide"
              handleClick={this.handleSignClick}
              value="/"
            />

            <NumberKey
              id="zero"
              handleClick={this.handleNumberClick}
              value={0}
            />

            <NumberKey
              id="decimal"
              handleClick={this.handleNumberClick}
              value="."
            />
            <button
              className="container__btn container__btn--clear"
              id="clear"
              onClick={this.handleClear}
            >
              C
            </button>
            <OperatorKey
              id="multiply"
              handleClick={this.handleSignClick}
              value="*"
            />
          </div>
          <button
            className="container__btn container__btn--equal"
            id="equals"
            onClick={this.handleEvaluate}
          >
            =
          </button>
        </div>
        <Footer />
      </>
    );
  }
}

const Display = props => {
  const { display, formula } = props;
  return (
    <>
      <div className="container__display">
        <div className="container__display--outputs">{formula} </div>
        <hr className="container__display--space" />
        <div
          className="container__display--outputs container__display--outputs--formula"
          id="display"
        >
          {display}
        </div>
      </div>
    </>
  );
};

const OperatorKey = props => {
  const { value, id, handleClick } = props;
  return (
    <button
      className="container__btn container__btn--operators"
      id={id}
      value={value}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

const NumberKey = props => {
  const { value, id, handleClick } = props;
  return (
    <button
      className="container__btn"
      id={id}
      value={value}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

const Footer = () => {
  return (
    <div>
      <div className="container__icons">
        <a
          className="container__icons__icon"
          id="profile-link"
          href="https://github.com/LuismGil"
          target="_blank"
        >
          <i className="container__icons__icon--size fab fa-github-square"></i>
        </a>

        <a
          className="container__icons__icon"
          href="https://www.linkedin.com/in/giltorresluis/"
          target="_blank"
        >
          <i className="container__icons__icon--size fab fa-linkedin"></i>
        </a>
      </div>
      <footer className="container__footer">by Luis M Gil</footer>
    </div>
  );
};
ReactDOM.render(<Calculator />, document.getElementById('root'));
