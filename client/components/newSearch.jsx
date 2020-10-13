import React from 'react';

export default class NewSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationKeyword: (!this.props.location) ? '' : this.props.location.keyword,
      radius: (!this.props.location) ? this.props.userInfo.distanceRadius : this.props.location.radius
    };
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeDistance = this.handleChangeDistance.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChangeLocation(event) {
    this.setState({ locationKeyword: event.target.value });
  }

  handleChangeDistance(event) {
    this.setState({ radius: event.target.value });
  }

  handleClick(event) {
    if (event.currentTarget.id === 'cancel') return this.props.setView('search');
    if (event.currentTarget.id === 'submit') {
      this.props.setLocation(
        !this.props.location ? null : this.props.location.lat,
        !this.props.location ? null : this.props.location.long,
        !this.state.locationKeyword ? null : this.state.locationKeyword,
        this.state.radius);
      this.props.setView('profile');
    }
    if (event.target.id === 'currentLocation') {
      navigator.geolocation.getCurrentPosition(position =>
        this.props.setLocation(position.coords.latitude, position.coords.longitude, '', this.state.radius)
      );
      return this.props.setView('profile');
    }
  }

  render() {
    return (
      <div className='mx-auto my-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>

        <div className='w-100 mb-3 d-flex flex-row align-items-center justify-content-center'>
          <h1 className='welcome'>{this.props.userInfo.userName || 'Guest'}</h1>
        </div>

        <div className='w-50 d-flex flex-row justify-content-center'>
          <h1 className="title">SWEAT</h1>
          <h1 className="titleGr">r</h1>
        </div>
        <h1><i className="fas fa-dumbbell text-black mx-2 mb-5"></i></h1>

        <div className="my-2">
          <div className="wrapper d-flex mt-3">
            <i className="pin fas fa-map-marker-alt fa-2x text-pink ml-3 mb-2"></i>
            <input id = "search-area" className="search text-secondary w-130 px-5 py-2 justify-content-left" placeholder="Enter City or Zip Code"
              value={this.state.locationKeyword} onChange={this.handleChangeLocation}></input>
            <i className="mag-glass fas fa-search fa-2x gray mt-2"></i>
          </div>
        </div>

        <div className='mx-auto w-100 d-flex flex-column justify-content-center'>
          <div className="d-flex justify-content-center mt-3 mb-5">
            <label className="d-flex mb-0 align-items-center">
              <input
                id="typeinp"
                type="range"
                min="1" max="24"
                value={this.state.radius}
                onChange={this.handleChangeDistance}
                step="1"
                className="mr-3" />
            </label>
            <div className="miles text-pink" style={{ width: '7rem' }}>
              {this.state.radius} mi. rad.
            </div>
          </div>
        </div>

        <div className='mb-5'>
          <button className='btn-circle-create py-2 pl-1' name="username" id="change" form="login" onClick={this.handleClick}>
            <option className="text-center">Submit</option>
          </button>
        </div>

        <div className='mb-5'>
          <button className='btn-circle-log py-2 pl-1' id="cancel" type="submit" form="logout" onClick={this.handleClick}>
            <option className="text-center">Cancel</option>
          </button>
        </div>

      </div>
    );
  }

}
