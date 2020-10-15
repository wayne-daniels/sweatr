import React from 'react';

export default class Selections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gyms: this.props.cardStack,
      details: null,
      index: this.props.index,
      canRewind: false,
      canClick: true,
      showDetails: false
    };
    // this.handleClick = this.handleClick.bind(this);
    // this.toLikedGym = this.toLikedGym.bind(this);
    // this.toCardStack = this.toCardStack.bind(this);
    // this.toLocationSetting = this.toLocationSetting.bind(this);
  }

  // componentDidMount() {
  //   if (!this.state.gyms) this.getGyms();
  // }

  getGyms() {
    if (!this.props.location) return this.setState({ gyms: [] });
    this.setState({ canClick: false });
    fetch('/api/search/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        term: this.props.currentQuery,
        latitude: (this.props.location.lat || null),
        longitude: (this.props.location.long || null),
        location: (this.props.location.keyword || ''),
        radius: (this.props.location.radius || '')
      })
    })
      .then(res => res.json())
      .then(data => this.setState({ gyms: data, canClick: true }))
      .catch(err => console.error(err));
  }

  handleChange(event) {
    this.setState({ gym: event.target.value });
  }

  render() {
    return (
      <div className='mx-auto my-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>

        <div className="container">
          <div className='flex-row my-5'>
            <div className='h-100 mt-4 d-flex align-items-start justify-content-around'>
              <div className='d-flex align-items-center' id='user' onClick={this.handleClick}><i className='fas fa-user fa-2x hover'></i></div>
              <div className='d-flex align-items-center' id='likedRes' onClick={this.handleClick}><i className='fas fa-heart fa-2x hover'></i></div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='flex-row mb-3'>
            <div className='h-100 pb-4 d-flex align-items-end justify-content-around'>
              <button type='button' id='pass' className='stack-button pink btn button-outline' onClick={this.handleClick}>
                <i className='fas fa-chevron-circle-left fa-2x'></i>
              </button>
              <button type='button' id='rewind' className='stack-button yellow btn button-outline' onClick={this.handleClick}>
                <i className='fas fa-chevron-circle-right fa-2x'></i>
              </button>
              <button type='button' id='like' className='stack-button green btn button-outline' onClick={this.handleClick}>
                <i className='fas fa-plus-circle fa-2x'></i>
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }

}
