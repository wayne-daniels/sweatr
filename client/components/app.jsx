import React from 'react';
import Login from './login';
import CreateUsername from './createUsername';
import Welcome from './welcome';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      view: 'login'
    };
    this.setView = this.setView.bind(this);
    this.userIdentification = this.userIdentification.bind(this);
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

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
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
  }
}
