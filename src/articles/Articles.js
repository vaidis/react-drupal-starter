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
  // ready for dispatch if needed, from useEffect() bellow
  //
  let query = useQuery();
  const urlParams = {
    terms: query.get('terms') || '',
    search: query.get('search') || '',
    pager: {
      offset: parseInt(query.get('offset')) || 0,
      page: parseInt(query.get('page')) || 1,
      items: parseInt(query.get('items')) || 0,
      limit: parseInt(query.get('limit')) || 2,
    },
  }


  React.useEffect(() => {

    // Compare Objects -----------------------------------
    // from:
    // https://dmitripavlutin.com/how-to-compare-objects-in-javascript/
    // https://github.com/panzerdp/dmitripavlutin.com/blob/master/content/posts/083-compare-objects/index.md
    //
    function deepEqual(object1, object2) {
      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
          areObjects && !deepEqual(val1, val2) ||
          !areObjects && val1 !== val2
        ) {
          return false;
        }
      }
      return true;
    }
    function isObject(object) {
      return object != null && typeof object === 'object';
    }

    //
    // if the url params has been change
    // - update store.params
    // - and get the new list of articles
    //


    // if ( ! compareObjects(urlParams, storeParams)) {
    if (!deepEqual(urlParams, storeParams)) {
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

      <div>urlParams_____: {JSON.stringify(urlParams, 0, 2)}</div>
      <br />
      <div>api.params_____: {JSON.stringify(storeParams, 0, 2)}</div>
      <br />
      <div>api.pager______: {JSON.stringify(pager.next, 0, 2)}</div>

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
  articles: state.articles,
  links: state.api.links,
  storeParams: state.api.params,
  pager: state.api.pager,
})

const mapDispatchToProps = dispatch => ({
  dispatchSetApiUrlParams: params => dispatch(setApiUrlParams(params)),
  dispatchGetArticles: params => dispatch(getArticles(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
