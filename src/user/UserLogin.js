import React from 'react';
import { userLoginRequest } from './user-actions'
import { connect } from 'react-redux';

import UserProfile from './UserProfile'


const UserLogin = ({ dispatchUserLoginRequest }) => {
  const [name, setName] = React.useState("manager");
  const [pass, setPass] = React.useState("1234");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name: name, pass: pass }
    dispatchUserLoginRequest(payload)
  }

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="password"
          name="pass"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
        />
        <input
          type="submit"
          placeholder="Login"
          value="Submit"
        />
      </form>
      <UserProfile />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  dispatchUserLoginRequest: credentials => dispatch(userLoginRequest(credentials)),
})

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
