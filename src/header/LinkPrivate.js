import React from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux';

const PrivateRoute = ({
  user,
  to,
  label,
}) => {
  const isAuthenticated = user.current_user.uid === 0 ? false : true

  if (isAuthenticated) {
    return <Link to={to}>{label}</Link>
  } else {
    return null
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps, null)(PrivateRoute);
