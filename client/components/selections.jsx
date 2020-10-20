import React from 'react';

export default class Selections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gyms: this.props.selections,
      details: null,
      index: this.props.index,
      canRewind: false,
      canClick: true,
      showDetails: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.toLikedGym = this.toLikedGym.bind(this);
    this.toCardStack = this.toCardStack.bind(this);
    this.toLocationSetting = this.toLocationSetting.bind(this);
  }

  componentDidMount() {
    if (!this.state.gyms) this.getGyms();
  }

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

  handleClick(e) {
    if (!this.state.canClick) return;
    if (e.currentTarget.id === 'like' && this.state.gyms.length) return this.likeGym(this.state.gyms[this.state.index].yelpId, this.state.index);
    if (e.currentTarget.id === 'pass') return this.setState({ index: (this.state.index + 1) % this.state.gyms.length, canRewind: true, showDetails: false });
    if (e.currentTarget.id === 'rewind' && this.state.canRewind) return this.setState({ index: (this.state.index + this.state.gyms.length - 1) % this.state.gyms.length, canRewind: false, showDetails: false });
    if (e.currentTarget.id === 'details') return this.getGymDetails(this.state.gyms[this.state.index].yelpId);
    if (e.currentTarget.id === 'user') return this.toProfile();
    if (e.currentTarget.id === 'likedRes') return this.toLikedGym();
    if (e.currentTarget.id === 'arrow-left') return this.toCardStack();
  }

  toLikedGym(e) {
    this.props.saveCardStackPos(this.state.gyms, this.state.index);
    this.props.getLikedGyms();
    this.props.setView('likedGyms');
  }

  toCardStack() {
    this.setState({ showDetails: false });
  }

  toProfile() {
    this.props.saveCardStackPos(this.state.gyms, this.state.index);
    this.props.setView('welcome');
  }

  toLocationSetting(event) {
    this.props.setView('search');
  }

  renderPrice(gym) {
    if (!gym.price) return <div>No price data</div>;
    const price = [];
    for (let i = 0; i < gym.price.length; i++) price.push(<i className='fas fa-dollar-sign fa-sm mr-1' key={'price' + i}></i>);
    return price;
  }

  renderRating(gym) {
    if (!gym.rating) return <div>No rating data</div>;
    const rating = [];
    for (let i = 0; i < Math.floor(gym.rating); i++) rating.push(<i className='fas fa-star fa-sm' key={'rating' + i}></i>);
    if (!Number.isInteger(gym.rating)) rating.push(<i className='fas fa-star-half fa-sm' key={'rating' + rating.length}></i>);
    return rating;
  }

  renderCard() {
    if (!this.state.gyms) {
      return (
        <div className='w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow' style={{ height: '450px' }}>
          <h1 className='text-pink text-center font-weight-bold'>Rendering matches</h1>
          <div className="spinner-border text-pink mt-3" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      );
    }

    if (!this.state.gyms.length) {
      return (
        <div className='w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow' style={{ height: '450px' }}>
          {(this.props.locationPermission === 'denied' && (!this.props.location || !this.props.location.keyword))
            ? <>
              <span className="text-pink text-center font-weight-bold">Location is currently invalid</span>
              <span className="text-pink text-center font-weight-bold">Please set a valid location</span>
              <br />
              <button onClick={this.toLocationSetting} className="w-75 shadow"><span className="text-white text-center font-weight-bold">Location Settings</span></button>
            </>
            : <h1 className='text-pink text-center font-weight-bold'>No matches found</h1>
          }
        </div>
      );
    }

    // if (this.state.showDetails) return <Details renderPrice={this.renderPrice} renderRating={this.renderRating} restaurant={this.state.details} />;

    return (
      <div className='w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow font-weight-bold' style={{ height: '450px' }}>
        <div className='w-100 h-100 text-center text-pink d-flex align-items-center justify-content-center'>
          <div className='w-50'>{this.renderRating(this.state.gyms[this.state.index])}</div> |
          <div className='w-50'>{this.renderPrice(this.state.gyms[this.state.index])}</div>
        </div>
        <div className='w-100 h-100'>
          <img
            className='rounded hover effect1'
            id='details'
            src={this.state.gyms[this.state.index].storeImageUrl}
            alt={this.state.gyms[this.state.index].gymName}
            onClick={this.handleClick}
            style={{ objectFit: 'cover', height: '250px', width: '100%' }} />
        </div>
        <div className='w-100 h-100 text-center text-pink font-weight-bold d-flex flex-column align-items-center justify-content-center'>
          <div>{this.state.gyms[this.state.index].gymName}</div>
          <div>{this.state.gyms[this.state.index].location.city}, {this.state.gyms[this.state.index].location.state}</div>
          <div><i className="fas fa-map-marker-alt mr-2"></i>{(this.state.gyms[this.state.index].distance * 0.000621371).toFixed(1)} mi</div>
        </div>
      </div>
    );
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

        {this.renderCard()}

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
