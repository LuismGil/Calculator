import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      result: '0',
      currentValue: '',
      formula: '0',
      extraNum: false,
    };

    this.handleNumberPress = this.handleNumberPress.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDecimalPress = this.handleDecimalPress.bind(this);
  }

  handleNumberPress = num => {
    const { display, formula, currentValue, extraNum } = this.state;
    let numTarget = num.target.value;
    let currentDisplay = display;
    let currentFormula = formula;

    currentDisplay === '0'
      ? this.setState({
          display: numTarget,
        })
      : this.setState({
          display: extraNum ? numTarget : currentDisplay + numTarget,
        });

    currentFormula === '0'
      ? this.setState({ formula: numTarget })
      : this.setState({
          formula: extraNum ? numTarget : currentFormula + numTarget,
        });

    currentFormula === '0'
      ? (currentFormula = numTarget)
      : (currentFormula = currentFormula + numTarget);

    this.setState({
      currentValue: currentValue + numTarget,
      result: extraNum ? numTarget : eval(currentFormula),
      extraNum: false,
    });
  };

  handleOperation = op => {
    const { display, formula } = this.state;
    let currentDisplay = display;
    let currentFormula = formula;
    let isLastOperator = ['x', '/', '-', '+'].includes(display.slice(-1));
    let isSecondLastOperator = ['x', '/', '-', '+'].includes(
      display.slice(currentDisplay.length - 2, currentDisplay.length - 1)
    );

    if (isLastOperator) {
      if (isSecondLastOperator) {
        currentDisplay = currentDisplay.slice(0, currentDisplay.length - 2);
        currentFormula = currentFormula.slice(0, currentFormula.length - 2);
      } else {
        currentDisplay = currentDisplay.slice(0, currentDisplay.length - 1);
        currentFormula = currentFormula.slice(0, currentFormula.length - 1);
      }
    }

    switch (op.target.value) {
      case 'multiply':
        this.setState({
          display: currentDisplay + 'x',
          formula: currentFormula + '*',
        });
        break;

      case 'divide':
        this.setState({
          display: currentDisplay + '/',
          formula: currentFormula + '/',
        });
        break;

      case 'add':
        this.setState({
          display: currentDisplay + '+',
          formula: currentFormula + '+',
        });
        break;

      case 'subtract':
        // eslint-disable-next-line no-unused-expressions
        '-'.includes(display.slice(-1))
          ? false
          : this.setState({
              display: display + '-',
              formula: formula + '-',
            });
        break;

      default:
        this.setState({
          display: 'ERROR!',
        });
    }

    this.setState({
      result: eval(currentFormula),
      currentValue: '0',
      extraNum: false,
    });
  };

  handleEvaluate = () => {
    const { result } = this.state;
    this.setState({
      display: result.toString(),
      formula: result.toString(),
      currentValue: result.toString(),
      result: result.toString(),
      extraNum: true,
    });
  };

  handleClear = () => {
    this.setState({
      display: '0',
      result: '0',
      currentValue: '',
      formula: '0',
    });
  };

  handleDecimalPress = () => {
    const { display, formula, currentValue } = this.state;
    // eslint-disable-next-line no-unused-expressions
    this.state.currentValue.includes('.')
      ? false
      : this.setState({
          display: display + '.',
          formula: formula + '.',
          currentValue: currentValue + '.',
        });
  };

  render() {
    const { display, result } = this.state;
    return (
      <>
        <div className="container">
          <Display display={display} result={result} />
          <Buttons
            handleNumberPress={this.handleNumberPress}
            handleClear={this.handleClear}
            handleOperation={this.handleOperation}
            handleEvaluate={this.handleEvaluate}
            handleDecimalPress={this.handleDecimalPress}
          />
        </div>
        <Footer />
      </>
    );
  }
}

const Buttons = props => {
  const {
    handleNumberPress,
    handleClear,
    handleOperation,
    handleDecimalPress,
    handleEvaluate,
  } = props;

  return (
    <>
      <hr />
      <div className="container__btn__spaces">
        <button
          className="container__btn"
          id="seven"
          onClick={handleNumberPress}
          value="7"
        >
          7
        </button>

        <button
          className="container__btn"
          id="eight"
          onClick={handleNumberPress}
          value="8"
        >
          8
        </button>

        <button
          className="container__btn"
          id="nine"
          onClick={handleNumberPress}
          value="9"
        >
          9
        </button>

        <button
          className="container__btn container__btn--operators"
          id="add"
          onClick={handleOperation}
          value="add"
        >
          +
        </button>

        <button
          className="container__btn"
          id="four"
          onClick={handleNumberPress}
          value="4"
        >
          4
        </button>

        <button
          className="container__btn"
          id="five"
          onClick={handleNumberPress}
          value="5"
        >
          5
        </button>

        <button
          className="container__btn"
          id="six"
          onClick={handleNumberPress}
          value="6"
        >
          6
        </button>

        <button
          className="container__btn container__btn--operators"
          id="subtract"
          onClick={handleOperation}
          value="subtract"
        >
          -
        </button>

        <button
          className="container__btn"
          id="one"
          onClick={handleNumberPress}
          value="1"
        >
          1
        </button>

        <button
          className="container__btn"
          id="two"
          onClick={handleNumberPress}
          value="2"
        >
          2
        </button>

        <button
          className="container__btn"
          id="three"
          onClick={handleNumberPress}
          value="3"
        >
          3
        </button>

        <button
          className="container__btn container__btn--operators"
          id="divide"
          onClick={handleOperation}
          value="divide"
        >
          /
        </button>

        <button
          className="container__btn"
          id="zero"
          onClick={handleNumberPress}
          value="0"
        >
          0
        </button>

        <button
          className="container__btn"
          id="decimal"
          onClick={handleDecimalPress}
        >
          .
        </button>

        <button
          className="container__btn container__btn--clear"
          id="clear"
          onClick={handleClear}
        >
          C
        </button>

        <button
          className="container__btn container__btn--operators"
          id="multiply"
          onClick={handleOperation}
          value="multiply"
        >
          X
        </button>
      </div>

      <button
        className="container__btn container__btn--equal"
        id="equals"
        onClick={handleEvaluate}
      >
        =
      </button>
    </>
  );
};

const Display = props => {
  const { display, result } = props;
  return (
    <div className="container__display">
      <div id="display" className="container__display--display">
        {display}
      </div>
      <div id="result" className="container__display--result">
        {result}
      </div>
    </div>
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
          rel="noreferrer"
        >
          <i className="container__icons__icon--size fab fa-github-square"></i>
        </a>

        <a
          className="container__icons__icon"
          href="https://www.linkedin.com/in/giltorresluis/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="container__icons__icon--size fab fa-linkedin"></i>
        </a>
      </div>
      <footer className="container__footer">by Luis M Gil</footer>
    </div>
  );
};
ReactDOM.render(<Calculator />, document.getElementById('root'));
