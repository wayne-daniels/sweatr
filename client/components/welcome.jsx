import React from 'react';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promptCheck: true
    };

  }

  render() {
    return (
      <div className='mx-auto my-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>

        <div className='w-100 mb-3 d-flex flex-row align-items-center justify-content-center'>
          <h1 className='welcome'>Welcome {String.fromCharCode(160)}</h1>
          <h1 className='welcome'>{this.props.userInfo.userName}</h1>
        </div>

        <div className='w-50 d-flex flex-row justify-content-center'>
          <h1 className="title">SWEAT</h1>
          <h1 className="titleGr">r</h1>
        </div>
        <h1><i className="fas fa-dumbbell text-black mx-2 mb-5"></i></h1>

        <div className='mb-5'>
          <button className='btn-circle-select py-2 pl-1' name="username" id="username" form="login" onClick={this.handleClick}>
            <option className="text-center">Let{String.fromCharCode(39)}s Work Out</option>
          </button>
        </div>

      </div>
    );
  }

}
