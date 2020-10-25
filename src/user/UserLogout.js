import React from 'react';
import { userLogoutRequest } from './user-actions'
import { connect } from 'react-redux';

const UserLogout = ({ uid, dispatchUserLogoutRequest }) => {
    return (
        <div>
            { uid !== 0 && (
                <button
                    type="button"
                    onClick={() => dispatchUserLogoutRequest()}
                >
                    Logout
                </button>
            )}
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    dispatchUserLogoutRequest: () => dispatch(userLogoutRequest()),
})
const mapStateToProps = (state) => ({
    uid: state.user.current_user.uid,
})

export default connect(mapStateToProps, mapDispatchToProps)(UserLogout);
