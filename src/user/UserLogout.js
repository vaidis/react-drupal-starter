import React from 'react';
import { userLogoutRequest } from './user-actions'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";


const UserLogout = ({ uid, dispatchUserLogoutRequest }) => {
  return (
    <div>
      { uid !== 0 && (
        <Link
          onClick={() => dispatchUserLogoutRequest()}
          to={'#'}
        >(logout)</Link>
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
