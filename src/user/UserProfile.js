import React from 'react';
import { connect } from 'react-redux';


const UserProfile = ({ user }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <pre>
        <code>
          <div>store.user: {JSON.stringify(user, null, 4)}<br /><br /></div>
        </code>
      </pre>
    </div>
  );
}


const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps, null)(UserProfile);
