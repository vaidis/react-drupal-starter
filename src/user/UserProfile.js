import React from 'react';
import { connect } from 'react-redux';

const UserLogin = ({ user }) => {
    return (
        <div>
            <h2>User Profile</h2>
            <div>current_user: {JSON.stringify(user.current_user)}<br /><br /></div>
            <div>csrf_token: {user.csrf_token}<br /><br /></div>
            <div>logout_token: {user.logout_token}<br /><br /></div>
        </div>
    );
}



const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, null)(UserLogin);


