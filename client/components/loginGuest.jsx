import React from 'react';

export default class LoginGuest extends React.Component {
  constructor(props) {
    super(props);
    this.guestClick = this.guestClick.bind(this);
  }

  guestClick(event) {
    event.preventDefault();
    this.props.setView('welcome');
    this.props.loginGuest();
  }

  render() {
    return (
      <div className='mx-auto my-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>

        <div className='w-50 d-flex flex-row justify-content-center'>
          <h1 className="title">SWEAT</h1>
          <h1 className="titleGr">r</h1>
        </div>
        <h1><i className="fas fa-dumbbell text-black mx-2 mb-5"></i></h1>

        <div className='w-100 h-100 mb-3 d-flex align-items-center justify-content-center'>
          <button
            type='button'
            className='w-75 btn btn-outline-light button-outline font-weight-bold'
            onClick={this.guestClick}>
            Continue As Guest
          </button>
        </div>

      </div>
    );
  }
}
