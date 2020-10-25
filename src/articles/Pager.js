import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import PagerLink from './PagerLink'

// function PagerLink({ to, title, urlParams }) {
//     if (typeof (urlParams.terms) !== 'undefined') {
//         if (urlParams.terms !== '') {
//             return <Link to={"/?offset=" + to + "&terms=" + urlParams.terms}>
//                 {title + " : " + to}
//             </Link>
//         }
//     }
//     return <Link to={"/?offset=" + to}>{title + " : " + to}</Link>
// }

const Pager = ({
    pager,
    urlParams,
}) => {
    return (
        <div>
            <h4>Pager</h4>
            <button type="button" disabled={!pager.first}>
                {
                    pager.first ? (
                        <PagerLink to={pager.first} title={'FIRST'} urlParams={urlParams} />
                    ) : ('[FIRST]')
                }
            </button>

            <button type="button" disabled={!pager.prev}>
                {
                    pager.prev ? (
                        <PagerLink to={pager.prev} title={'PREV'} urlParams={urlParams} />
                    ) : ('[PREV]')
                }
            </button>

            <button type="button" disabled={!pager.next}>
                {
                    pager.next ? (
                        <PagerLink to={pager.next} title={'NEXT'} urlParams={urlParams} />
                    ) : ('[NEXT]')
                }
            </button>

            <button type="button" disabled={!pager.last}>
                {
                    pager.last ? (
                        <PagerLink to={pager.last} title={'LAST'} urlParams={urlParams} />
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
