import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';

const Calculator = () => {
  return (
    <div className="container">
      <Buttons />
    </div>
  );
};

class Buttons extends React.Component {
  constructor() {
    super();
    this.state = {
      currentValue: '0',
    };
    this.handleAddDecimals = this.handleAddDecimals.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClick = value => {
    const { currentValue } = this.state;
    this.setState({
      currentValue: currentValue === '0' ? String(value) : currentValue + value,
    });
  };

  handleAddDecimals = () => {
    const { currentValue } = this.state;
    if (currentValue.indexOf('.') === -1) {
      this.setState({
        currentValue: currentValue + '.',
      });
    }
  };

  handleEvaluate = () => {
    const { currentValue } = this.state;
    this.setState({
      currentValue: eval(currentValue),
    });
  };

  // handleEvaluate = () => {
  //   const { currentValue } = this.state;
  //   let fixedNum =
  //     currentValue % 1 === 0
  //       ? parseFloat(currentValue).toFixed(0)
  //       : parseFloat(currentValue).toFixed(2);
  //   this.setState({
  //     currentValue: eval(fixedNum),
  //   });
  // };

  handleClear = () => {
    this.setState({
      currentValue: '0',
    });
  };

  render() {
    const { currentValue } = this.state;

    return (
      <div>
        <input
          className="container__display"
          id="display"
          value={currentValue}
          type="text"
        />
        <div className="container__btn__spaces">
          <button
            className="container__btn"
            id="seven"
            onClick={() => this.handleClick(7)}
          >
            7
          </button>
          <button
            className="container__btn"
            id="eight"
            onClick={() => this.handleClick(8)}
          >
            8
          </button>
          <button
            className="container__btn"
            id="nine"
            onClick={() => this.handleClick(9)}
          >
            9
          </button>
          <button
            className="container__btn container__btn--clear"
            id="clear"
            onClick={this.handleClear}
          >
            C
          </button>
          <button
            className="container__btn"
            id="four"
            onClick={() => this.handleClick(4)}
          >
            4
          </button>
          <button
            className="container__btn"
            id="five"
            onClick={() => this.handleClick(5)}
          >
            5
          </button>
          <button
            className="container__btn"
            id="six"
            onClick={() => this.handleClick(6)}
          >
            6
          </button>
          <button
            className="container__btn container__btn--operators "
            id="add"
            onClick={() => this.handleClick('+')}
          >
            +
          </button>
          <button
            className="container__btn"
            id="one"
            onClick={() => this.handleClick(1)}
          >
            1
          </button>
          <button
            className="container__btn"
            id="two"
            onClick={() => this.handleClick(2)}
          >
            2
          </button>
          <button
            className="container__btn"
            id="three"
            onClick={() => this.handleClick(3)}
          >
            3
          </button>
          <button
            className="container__btn container__btn--operators "
            id="subtract"
            onClick={() => this.handleClick('-')}
          >
            -
          </button>
          <button
            className="container__btn"
            id="zero"
            onClick={() => this.handleClick(0)}
          >
            0
          </button>
          <button
            className="container__btn"
            id="decimal"
            onClick={this.handleAddDecimals}
          >
            .
          </button>
          <button
            className="container__btn container__btn--operators "
            id="multiply"
            onClick={() => this.handleClick('*')}
          >
            *
          </button>
          <button
            className="container__btn container__btn--operators "
            id="divide"
            onClick={() => this.handleClick('/')}
          >
            /
          </button>
        </div>
        <button
          className="container__btn container__btn--equal"
          id="equals"
          onClick={this.handleEvaluate}
        >
          =
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
