import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Select User', users: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => this.setState({ users: data }))
      .catch(err => console.error(err));
  }

  login(userId) {
    fetch(`/api/login/${userId}`)
      .then(res => res.json())
      .then(data =>
        this.props.userIdentification(data)
      )
      .catch(err => console.error(err));
  }

  loginGuest(userId) {
    fetch('/api/guest/', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(result => result.json())
      .then(data => this.props.userIdentification(data))
      .catch(err => console.error(err));

    this.props.setView('welcome');
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value === 'Select User') return;
    this.login(this.state.value);
    this.props.setView('welcome');
  }

  handleClick(e) {
    if (e.currentTarget.id === 'guest') return this.loginGuest();
    if (e.currentTarget.id === 'signup') return this.props.setView('signup');
  }

  renderUsers() {
    return this.state.users.map(user => <option key={user.userId} value={user.userId}>{user.userName}</option>);
  }

  render() {
    return (
      <div className='mx-auto my-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>

        <div className='w-50 d-flex flex-row justify-content-center'>
          <h1 className="title">SWEAT</h1>
          <h1 className="titleGr">r</h1>
        </div>
        <h1><i className="fas fa-dumbbell text-black mx-2 mb-5"></i></h1>

        <form className='w-75 mx-auto' id='login' onSubmit={this.handleSubmit}>
          <div className='mb-5'>
            <select className='btn-circle-select py-2 pl-1' name="username" id="username" form="login" value={this.state.value} onChange={this.handleChange}>
              <option value='Select User' hidden disabled>Select User</option>
              {this.renderUsers()}
            </select>
          </div>
        </form>

        <div className='mb-5'>
          <button className='btn-circle-create py-2 pl-1' name="username" id="signup" form="login" onClick={this.handleClick}>
            <option className="text-center">Create User Name</option>
          </button>
        </div>

        <div className='mb-5'>
          <button className='btn-circle-log py-2 pl-1' type="submit" form="login">
            <option className="text-center">Log In</option>
          </button>
        </div>

        <div className='mb-5'>
          <button className='btn-circle-guest py-2 pl-1' type="button" id="guest" form="login" onClick={this.handleClick}>
            <option className="text-center">Continue As Guest</option>
          </button>
        </div>

      </div>
    );
  }

}
