import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

const Pager = ({
    pager,
    urlParams,
}) => {

    function getTerms() {
        if (urlParams !== 'undefined') {
            if (urlParams.terms !== '') {
                console.log("Pager.js  urlParams", urlParams.terms)
                const terms = urlParams.terms
                return ("&terms=" + terms)
            }
        }
    }

    return (
        <div>
            <h4>Pager</h4>
            <button type="button" disabled={!pager.first}>
                {
                    pager.first ? (
                        <Link to={
                            urlParams.terms
                            ? `"/?offset=" + pager.first + getTerms()`
                            : `"/?offset=" + pager.first`
                        }> [FIRST] </Link>
                    ) : ('[FIRST]')
                }
            </button>

            <button type="button" disabled={!pager.prev}>
                {
                    pager.prev ? (
                        <Link to={"/?offset=" + pager.prev + getTerms()}> [PREV] </Link>
                    ) : ('[PREV]')
                }
            </button>

            <button type="button" disabled={!pager.next}>
                {
                    pager.next ? (
                        <Link to={
                            urlParams.terms
                            ? "/?offset=" + pager.next + getTerms()
                            : "/?offset=" + pager.next
                        }> [NEXT] </Link>


                    ) : ('[NEXT]')
                }
            </button>

            <button type="button" disabled={!pager.last}>
                {
                    pager.last ? (
                        <Link to={"/?offset=" + pager.lastv + getTerms()}> [LAST] </Link>
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
