import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";


function PagerLink({ to, title, urlParams }) {
    if (typeof (urlParams.terms) !== 'undefined') {
        if (urlParams.terms !== '') {
            return <Link to={"/?offset=" + to + "&terms=" + urlParams.terms}>
                {title + " : " + to}
            </Link>
        }
    }
    return <Link to={"/?offset=" + to}>{title + " : " + to}</Link>
}

const mapStateToProps = (state) => ({
    loading: state.api.loading,
    loaded: state.api.loaded,
    articles: state.articles.data,
    urlParams: state.api.urlParams,
    pager: state.api.pager,
})

export default connect(mapStateToProps, null)(PagerLink)

