import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { useLocation, BrowserRouter as Router } from "react-router-dom";

import { getArticles } from './articles-actions'
import { setApiUrlParams } from '../api/api-actions'
import { compareObjects } from '../utils/compareObjects'

import Pager from './Pager'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Articles = ({
  loading,
  loaded,
  articles,
  storeParams,
  dispatchSetApiUrlParams,
  dispatchGetArticles,
}) => {

  //
  // - get the font-end url params if any
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

      {
        loaded
          ? (
            articles.map((item, i) => {

              // get TERMS field
              const terms = item.field_tags.map((term, i) => {
                return (
                  <div key={i}>
                    <Link to={"/?terms="+term.name}>{term.name}</Link>
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
      <Pager />
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
