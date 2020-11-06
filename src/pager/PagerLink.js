import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

function PagerLink({ to, title, urlParams }) {
  if (typeof (urlParams.terms) !== 'undefined') {
    if (urlParams.terms !== '') {
      return <Link to={"/?terms=" + urlParams.terms + "&offset=" + to}>
        {title + " : " + to}
      </Link>
    }
  }
  return <Link to={"/?offset=" + to}>{title + " : " + to}</Link>
}

const mapStateToProps = (state) => ({
  urlParams: state.api.urlParams,
})

export default connect(mapStateToProps, null)(PagerLink)

