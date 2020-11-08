import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

/**
 * create a pager link
 *
 * @param {string} to - the value of offset
 * @param {string} title - "Next"
 * @param {object} urlParams - url parameters
 */
function PagerLink({ to, title, urlParams }) {

  /** include the taxonomy term if needed */
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

