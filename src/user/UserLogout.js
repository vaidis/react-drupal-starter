import React from 'react';
import { userLogoutRequest } from './user-actions'
import { connect } from 'react-redux';

const UserLogout = ({ dispatchUserLogoutRequest }) => {
    return (
        <div>
            <button
                type="button"
                onClick={ () => dispatchUserLogoutRequest()}
            >
                Logout
            </button>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    dispatchUserLogoutRequest: () => dispatch(userLogoutRequest()),
})

export default connect(null, mapDispatchToProps)(UserLogout);
