import React from 'react';
import Login from './login';
import CreateUsername from './createUsername';
import Welcome from './welcome';
import Search from './search';
import NewSearch from './newSearch';
import Selections from './selections';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      view: 'login',
      currentQuery: '',
      selection: null,
      index: null,
      location: null,
      locationPermission: null
    };
    this.setView = this.setView.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.saveCardStackPos = this.saveCardStackPos.bind(this);
    this.userIdentification = this.userIdentification.bind(this);
    this.locationPrompt = this.locationPrompt.bind(this);
    this.from = null;
  }

  setView(viewMode) {
    this.setState({
      view: viewMode
    });
  }

  userIdentification(userInfoObj) {
    this.setState({
      userInfo: userInfoObj
    });
  }

  searchQuery(currentQuery) {
    this.setState({ currentQuery, index: 0, selection: null });
  }

  setLocation(lat, long, keyword, radius) {
    const locationObj = {
      lat: lat,
      long: long,
      keyword: keyword,
      radius: radius
    };
    this.setState({ location: locationObj, index: 0, selection: null });
  }

  locationPrompt(promptStatus) {
    this.setState({ locationPermission: promptStatus });
  }

  saveCardStackPos(gyms, index) {
    this.setState({ selection: gyms, index });
  }

  render() {
    if (this.state.view === 'login') {
      return <Login setView={this.setView} userIdentification={this.userIdentification} />;
    }
    if (this.state.view === 'signup') {
      return <CreateUsername setView={this.setView} userIdentification={this.userIdentification} />;
    }
    if (this.state.view === 'welcome') {
      return <Welcome setView={this.setView} setLocation={this.setLocation} userInfo={this.state.userInfo} locationPrompt={this.locationPrompt} locationPermission={this.state.locationPermission} />;
    }
    if (this.state.view === 'search') {
      return <Search setView={this.setView} currentQuery={this.state.currentQuery} setLocation={this.setLocation} location={this.state.location} userInfo={this.state.userInfo} locationPermission={this.state.locationPermission} />;
    }
    if (this.state.view === 'newSearch') {
      return <NewSearch setView={this.setView} currentQuery={this.state.currentQuery} setLocation={this.setLocation} location={this.state.location} userInfo={this.state.userInfo} locationPermission={this.state.locationPermission} />;
    }
    if (this.state.view === 'selections') {
      return <Selections setView={this.setView} userInfo={this.state.userInfo} currentQuery={this.state.currentQuery} index={this.state.index} selection={this.state.selection} saveCardStackPos={this.saveCardStackPos} location={this.state.location} locationPermission={this.state.locationPermission} />;
    }
  }
}
