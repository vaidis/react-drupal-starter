import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import UserLogout from './UserLogout'


const UserLogin = ({ user }) => {
  return (
    <div style={{ fontStyle: "italic" }}>
      Hello
      {
        user.uid !== 0
          ? <div>
            <Link to="/user/profile"> {user.name} </Link>
            <UserLogout />
          </div>
          : ' Anonymous'
      }

    </div>
  );
}


const mapStateToProps = (state) => ({
  user: state.user.current_user,
})

export default connect(mapStateToProps, null)(UserLogin);
