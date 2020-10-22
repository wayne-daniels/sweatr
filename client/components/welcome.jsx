import React from 'react';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promptCheck: true
    };
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation() {
    if (this.props.locationPermission === 'denied' && this.state.promptCheck) return this.setState({ promptCheck: false });
    this.props.setView('search');
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.props.setLocation(position.coords.latitude, position.coords.longitude, '', this.props.userInfo.distanceRadius);
      navigator.permissions.query({ name: 'geolocation' })
        .then(result => this.props.locationPrompt(result.state));
    }
    ,
    () => navigator.permissions.query({ name: 'geolocation' })
      .then(result => this.props.locationPrompt(result.state)));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.locationPermission === 'denied' && this.state.promptCheck && prevProps.userInfo.userId) return this.setState({ promptCheck: false });
  }

  render() {
    if (this.state.promptCheck) {
      return (
        <div className='mx-auto my-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>

          <div className='w-100 mb-3 d-flex flex-row align-items-center justify-content-center'>
            <h1 className='welcome'>Welcome {String.fromCharCode(160)}</h1>
            <h1 className='welcome'>{this.props.userInfo.userName || 'Guest'}</h1>
          </div>

          <div className='w-50 d-flex flex-row justify-content-center'>
            <h1 className="title">SWEAT</h1>
            <h1 className="titleGr">r</h1>
          </div>
          <h1><i className="fas fa-dumbbell text-black mx-2 mb-5"></i></h1>

          <div className='mb-5'>
            <button className='btn-circle-select py-2 pl-1' name="username" id="username" form="login" onClick={this.getLocation}>
              <option className="text-center">Let{String.fromCharCode(39)}s Work Out</option>
            </button>
          </div>

        </div>
      );
    }
    if (!this.state.promptCheck) {
      return (
        <div className='mx-auto vw-100 vh-100 d-flex flex-column text-white align-items-center justify-content-center gradient'>
          <div className='w-100 h-100 my-3'></div>
          <div className='w-100 h-100 mb-3 d-flex flex-column align-items-center justify-content-start text-center'>
            <span className="w-75 h6">Your geolocation is currently disabled</span>
            <br />
            <span className="w-75 h6">For the best experience, it is suggested that the geolocation setting is enabled</span>
            <br />
            <span className="w-75 h6">If you would like to proceed your search with geolocation, please <a className="underline text-white" href="https://www.clockspot.com/support/articles/how-to-enable-geolocation-tracking/" target="_blank" rel="noopener noreferrer"><u>reconfigure your geolocation settings</u></a></span>
          </div>
          <div className='w-100 h-100 mb-3 d-flex flex-column align-items-center justify-content-center'>
            <button
              id="reject"
              type='button'
              className='w-75 mt-4 btn btn-outline-light button-outline font-weight-bold'
              onClick={this.getLocation}>
              <span className="h6">Continue to Profile Page</span>
            </button>
          </div>
          <div className='w-100 h-100 mb-3'></div>
        </div>
      );
    }
  }

}
