import React from 'react';
/* global google */

export default class GymDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { infoIndex: this.props.gym.reviews.length, photoIndex: 0 };
  }

  componentDidMount() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.props.gym.coordinates.latitude, lng: this.props.gym.coordinates.longitude },
      zoom: 18
    });

    // eslint-disable-next-line no-unused-vars
    const marker = new google.maps.Marker({
      position: { lat: this.props.gym.coordinates.latitude, lng: this.props.gym.coordinates.longitude },
      map: map,
      title: 'Gym'
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gym !== this.props.gym) this.setState({ infoIndex: this.props.gym.reviews.length, photoIndex: 0 });
  }

  calculateTime(time) {
    let num = Number(time.slice(0, 2));
    let meridiem = 'AM';
    if (num >= 12) {
      meridiem = 'PM';
      num -= 12;
    }
    if (num === 0) return `12:${time.slice(2, time.length)} ${meridiem}`;
    return `${num.toString()}:${time.slice(2, time.length)} ${meridiem}`;
  }

  renderHours() {
    if (!this.props.gym.hours.length) return <h5>No hours data</h5>;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, ind) => {
      let hours;
      if (!this.props.gym.hours[0].open.length) hours = `${day}: No data`;
      else if (!this.props.gym.hours[0].open[ind]) hours = `${day}: Closed`;
      else hours = `${day}: ${this.calculateTime(this.props.gym.hours[0].open[ind].start)} - ${this.calculateTime(this.props.gym.hours[0].open[ind].end)}`;
      return <div key={day}>{hours}</div>;
    });
  }

  cycleInfo() {
    if (this.state.infoIndex === this.props.gym.reviews.length) return this.renderHours();
    if (!this.props.gym.reviews.length) return;
    const rating = this.props.renderRating(this.props.gym.reviews[this.state.infoIndex]);

    return (
      <div className='col-11 d-flex flex-column align-items-center justify-content-center'>
        <div className='mb-2'>{this.props.gym.reviews[this.state.infoIndex].text}</div>
        <div className='mb-2'>{`- ${this.props.gym.reviews[this.state.infoIndex].user.name}`}</div>
        <div className='user-rating mb-2'>{rating}</div>
      </div>
    );
  }

  render() {
    return (
      <div className='mx-auto my-auto vw-80 vh-80 d-flex flex-column align-items-center justify-content-center'>
        <div className='w-90 h-50 effect1'>
          <img
            className='rounded hover' onClick={() => this.setState({ photoIndex: (this.state.photoIndex + 1) % this.props.gym.photosUrl.length })}
            src={this.props.gym.photosUrl[this.state.photoIndex]}
            alt={this.props.gym.restaurantName}
            style={{ objectFit: 'cover', objectPosition: 'center bottom', height: '200px', width: '100%' }} />
        </div>
        <div className='w-100 h-25 mt-2 d-flex flex-column details-text'>
          <div className='detail-name w-100 h-100 d-flex flex-column align-items-center justify-content-center'>
            <div className=''>{this.props.gym.gymName}</div>
            <div className=''>{this.props.gym.location.city}, {this.props.gym.location.state}</div>
          </div>
          <div className='w-100 h-25 text-center d-flex align-items-center justify-content-center'>
            <div className='detail-rating w-100'>{this.props.renderRating(this.props.gym)}</div> |
            <div className='detail-price w-100'>{this.props.renderPrice(this.props.gym)}</div> |
            <div className='detail-dist w-100'><i className="fas fa-map-marker-alt mr-2"></i>{(this.props.gym.distance * 0.000621371).toFixed(1)} mi</div>
          </div>
        </div>
        <div
          className='detail-info w-100 h-75 row mb-2 mt-2 text-center d-flex flex-column align-items-center justify-content-center details-text hover effect2'
          onClick={() => this.setState({ infoIndex: (this.state.infoIndex + 1) % (this.props.gym.reviews.length + 1) })}>
          {this.cycleInfo()}
        </div>
        <div className='w-100 h-75' id="map"></div>
      </div>
    );
  }

}
