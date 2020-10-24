import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { useLocation, BrowserRouter as Router } from "react-router-dom";

import { getArticles } from './articles-actions'
import { setApiUrlParams } from '../api/api-actions'


import { compareObjects } from '../utils/compareObjects'


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Articles = ({
  pager,
  loading,
  loaded,
  articles,
  storeParams,
  dispatchSetApiUrlParams,
  dispatchGetArticles,
}) => {

  //
  // - get the font-end url params
  // - into urlParams object
  // ready for dispatch if needed, in useEffect() bellow
  //
  let query = useQuery();
  const urlParams = {
    terms: query.get('terms') || '',
    search: query.get('search') || '',
    offset: parseInt(query.get('offset')) || 0,
    page: parseInt(query.get('page')) || 1,
    items: parseInt(query.get('items')) || 0,
    limit: parseInt(query.get('limit')) || 2,
  }

  React.useEffect(() => {
    //
    // IF the font-end url params has been change
    // - update the store.params
    // - and get the new list of articles
    //
    console.log("-----------------------------------------")
    console.log("urlParams", urlParams)
    console.log("storeParams", storeParams)
    console.log("-----------------------------------------")
    if (!compareObjects(urlParams, storeParams)) {
      dispatchSetApiUrlParams(urlParams)
      dispatchGetArticles(urlParams)
    }
  }, [
    dispatchSetApiUrlParams,
    dispatchGetArticles,
    urlParams,
  ]);

  return (
    <div>
      <Link to={"/"}><h1>Articles</h1></Link>

      <button type="button" disabled={!pager.first}>
        <Link to={"/?offset=" + pager.first}> [FIRST] </Link>
      </button>
      <button type="button" disabled={!pager.prev}>
        <Link to={"/?offset=" + pager.prev}> [PREV] </Link>
      </button>
      <button type="button" disabled={!pager.next}>
        <Link to={"/?offset=" + pager.next}> [NEXT] </Link>
      </button>
      <button type="button" disabled={!pager.last}>
        <Link to={"/?offset=" + pager.last}> [LAST] </Link>
      </button>


      {
        loaded
          ? (
            articles.map((item, i) => {
              // console.log("guery", query.getAll)

              // get TERMS field
              const terms = item.field_tags.map((term, i) => {
                // console.log("TERM ------------------ ^ -----------------------")
                // console.log("TERM id:", term.id)
                // console.log("TERM name:", term.name)
                // console.log("TERM alias:", term.path.alias)
                // console.log("TERM tid:", term.drupal_internal__tid)
                // console.log("TERM href:", term.links.self.href)
                // console.log("TERM --------------------------------------------")
                return (
                  <div key={i}>
                    <div>{term.name}</div>
                  </div>
                )
              })

              // get IMAGE field
              const imageobject = item.field_image.image_style_uri;
              let image = ''
              imageobject.forEach(function (item) {
                if (item.thumbnail) {
                  image = item.thumbnail
                }
              })

              // render the article item
              return (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <h4 style={{ marginBottom: "0px" }}>{item.title}</h4>
                  <img src={image} alt="Girl in a jacket"></img>
                  {terms}
                </div>
              )

            })
          )
          : (
            // console.log("------------- LOADED FALSE -----------")
            null
          )

      }

    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.api.loading,
  loaded: state.api.loaded,
  articles: state.articles.data,
  storeParams: state.api.urlParams,
  pager: state.api.pager,
})

const mapDispatchToProps = dispatch => ({
  dispatchSetApiUrlParams: params => dispatch(setApiUrlParams(params)),
  dispatchGetArticles: params => dispatch(getArticles(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
