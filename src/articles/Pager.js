import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

function PagerLink({ to, title, urlParams }) {
    if (typeof (urlParams.terms) !== 'undefined') {
        return <Link to={"/?offset=" + to + "&terms=" + urlParams.terms}>{title}{to}</Link>
    }
    return <Link to={"/?offset=" + to}>{title}{to}</Link>
}

const Pager = ({
    pager,
    urlParams,
}) => {
    // console.log("Pager.js  pager ================", pager)
    return (
        <div>
            <h4>Pager</h4>
            <button type="button" disabled={!pager.first}>
                {
                    pager.first ? (
                        <Link to={"/?offset=" + pager.first}> [FIRST] </Link>
                    ) : ('[FIRST]')
                }
            </button>

            <button type="button" disabled={!pager.prev}>
                {
                    pager.prev ? (
                        <Link to={"/?offset=" + pager.prev}> [PREV] </Link>
                    ) : ('[PREV]')
                }
            </button>

            <button type="button" disabled={!pager.next}>
                {
                    pager.next ? (
                        <PagerLink to={pager.next} title={'[NEXT]'} urlParams={urlParams} />
                    ) : ('[NEXT]')
                }
            </button>

            <button type="button" disabled={!pager.last}>
                {
                    pager.last ? (
                        <Link to={"/?offset=" + pager.last}> [LAST] </Link>
                    ) : ('[END]')
                }
            </button>

        </div>
    );
}

const mapStateToProps = (state) => ({
    loading: state.api.loading,
    loaded: state.api.loaded,
    articles: state.articles.data,
    urlParams: state.api.urlParams,
    pager: state.api.pager,
})


export default connect(mapStateToProps, null)(Pager)
