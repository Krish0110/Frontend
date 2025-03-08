/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import NameInput from '../components/NameInput';

export class Verification extends Component {
  constructor(props) {
    console.log('Constructor');
    super(props);
    this.state = {
      userName: '',
      isValid: false,
      // formSubmitted: false,
    };
    this.validateName = this.validateName.bind(this);

    // this.nameSize = 25
    // this.nameType = 'text'
  }

  componentDidMount() {}

  validateName() {
    console.log(this);
    debugger;
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.userName !== '') {
      this.setState({ isValid: true });
    }
    // console.log(this.state.isValid);
    debugger;
  }

  render() {
    const { userName } = this.state;
    const { isValid } = this.state;
    console.log('render');
    return (
      <div>
        <NameInput
          userName={userName}
          onChange={(name) => { this.setState({ userName: name }); }}
        />
        <button onClick={this.validateName}>
          DisplayName
        </button>

        {isValid && (
          <div>
            UserName: {userName}
          </div>
        )}

      </div>
    );
  }
}

export default Verification;
