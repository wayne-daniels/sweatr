import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      validation: true,
      validationMessage: null
    };
    this.inputChange = this.inputChange.bind(this);
    this.submitUserName = this.submitUserName.bind(this);
    this.cancelSignUp = this.cancelSignUp.bind(this);
  }

  signUp(userName) {
    fetch('/api/signUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName: userName })
    })
      .then(result => result.json())
      .then(userInfo => {
        if (userInfo.err) return this.setState({ validationMessage: userInfo.err });
        this.props.userIdentification(userInfo);
        this.props.setView('welcome');
      })
      .catch(err => console.error(err));
  }

  submitUserName(event) {
    event.preventDefault();
    this.signUp(this.state.userName);
  }

  cancelSignUp(event) {
    event.preventDefault();
    this.setState({ userName: '' });
    this.props.setView('login');
  }

  inputChange(event) {
    this.setState({
      userName: event.target.value
    });
  }

  render() {
    return (
      <div className='mx-auto my-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>

        <div className='w-50 d-flex flex-row justify-content-center'>
          <h1 className="title">SWEAT</h1>
          <h1 className="titleGr">r</h1>
        </div>
        <h1><i className="fas fa-dumbbell text-black mx-2 mb-5"></i></h1>

        <div className='w-100 h-20 mb-5'>
          <form id="userSignUp" className="d-flex justify-content-center w-100 h-100 py-2 pl-1" onSubmit={this.submitUserName} onReset={this.cancelSignUp}>
            <input id="createUserName" placeholder="create username" type="text" className="w-75 h-100 text-center py-2 pl-1"
              onChange={this.inputChange} />
          </form>
        </div>

        <div className='mb-5'>
          <button className='btn-circle-create py-2 pl-1' name="username" id="username" form="login">
            <option value='Select User' className="text-center">Submit</option>
          </button>
        </div>

        <div className='mb-5'>
          <button className='btn-circle-log py-2 pl-1' name="username" id="username" type="reset" form="userSignUp">
            <option value='Select User' className="text-center">Cancel</option>
          </button>
        </div>

      </div>
    );
  }

}
