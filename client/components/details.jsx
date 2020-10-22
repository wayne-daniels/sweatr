import React from 'react';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = { infoIndex: this.props.gym.reviews.length, photoIndex: 0 };
  }

  // componentDidMount() {
  //   const map = new google.maps.Map(document.getElementById('map'), {
  //     center: { lat: this.props.gym.coordinates.latitude, lng: this.props.gym.coordinates.longitude },
  //     zoom: 18
  //   });

  //   const marker = new google.maps.Marker({
  //     position: { lat: this.props.gym.coordinates.latitude, lng: this.props.gym.coordinates.longitude },
  //     map: map,
  //     title: 'Restaurant'
  //   });
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.gym !== this.props.gym) this.setState({ infoIndex: this.props.gym.reviews.length, photoIndex: 0 });
  // }

  // calculateTime(time) {
  //   let num = Number(time.slice(0, 2));
  //   let meridiem = 'AM';
  //   if (num >= 12) {
  //     meridiem = 'PM';
  //     num -= 12;
  //   }
  //   if (num === 0) return `12:${time.slice(2, time.length)} ${meridiem}`;
  //   return `${num.toString()}:${time.slice(2, time.length)} ${meridiem}`;
  // }

  // renderHours() {
  //   if (!this.props.gym.hours.length) return <h5>No hours data</h5>;
  //   const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  //   return days.map((day, ind) => {
  //     let hours;
  //     if (!this.props.gym.hours[0].open.length) hours = `${day}: No data`;
  //     else if (!this.props.gym.hours[0].open[ind]) hours = `${day}: Closed`;
  //     else hours = `${day}: ${this.calculateTime(this.props.gym.hours[0].open[ind].start)} - ${this.calculateTime(this.props.gym.hours[0].open[ind].end)}`;
  //     return <div key={day}>{hours}</div>;
  //   });
  // }

  // cycleInfo() {
  //   if (this.state.infoIndex === this.props.gym.reviews.length) return this.renderHours();
  //   if (!this.props.gym.reviews.length) return;
  //   const rating = this.props.renderRating(this.props.gym.reviews[this.state.infoIndex]);

  //   return (
  //     <div className='col-11 d-flex flex-column align-items-center justify-content-center'>
  //       <div className='mb-2'>{this.props.gym.reviews[this.state.infoIndex].text}</div>
  //       <div className='mb-2'>{`- ${this.props.gym.reviews[this.state.infoIndex].user.name}`}</div>
  //       <div className='mb-2'>{rating}</div>
  //     </div>
  //   );
  // }

}
