import React from 'react';
import { connect } from 'react-redux';
import { userGetStatus } from './user-actions'

const UserStatus = ({ user, user_status, dispatchUserGetStatus }) => {

    React.useEffect(() => {
        dispatchUserGetStatus()
    }, [dispatchUserGetStatus]);

    return (
        <div>
            <h2>User Status: {user_status}</h2>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    dispatchUserGetStatus: () => dispatch(userGetStatus()),
})

const mapStateToProps = (state) => ({
    user_status: state.user.status,
})

export default connect(mapStateToProps, mapDispatchToProps)(UserStatus);

