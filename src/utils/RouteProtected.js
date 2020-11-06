import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

function RouteProtected({component, user}) {

    const isAuthenticated = user.current_user.uid === 0 ? false : true
    const Component = component

    return (
      isAuthenticated ? (
            <Component />
        ) : (
                <Redirect to={{ pathname: '/user/login' }} />
            )
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, null)(RouteProtected);
