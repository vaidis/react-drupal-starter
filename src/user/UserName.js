import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import UserLogout from './UserLogout'

const UserLogin = ({ user }) => {
    return (
        <div>
            Hello
            {
                user.uid !== 0
                    ? <Link to="/user/profile">{user.name}</Link>
                    : ' mr Anonymous'
            }
            <UserLogout />
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user.current_user,
})

export default connect(mapStateToProps, null)(UserLogin);
