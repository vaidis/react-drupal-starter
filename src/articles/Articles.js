import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { getArticles } from './articles-actions'
import { setApiUrlParams } from '../api/api-actions'
import { compareObjects } from '../utils/compareObjects'
import Pager from '../pager/Pager'

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
  //   ready for dispatch if needed, in useEffect() bellow
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
    // If the font-end URL params has been change
    // - update the store.api.urlParams
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
    storeParams,
  ]);

  return (
    <div>
      <p>{urlParams.terms !== '' && "articles with terms: " + urlParams.terms}</p>
      {
        !loading && loaded && articles
          ? (
            articles.map((item, i) => {
              //
              // get TERMS field
              //
              let terms = ''
              terms = item.field_tags.map((term, i) => {
                return (
                  <div key={i}>
                    <Link to={"/?terms=" + term.name}>{term.name}</Link>
                  </div>
                )
              })
              //
              // get IMAGE field
              //
              let image = ''
              let imageobject = ''
              if (item.field_image.image_style_uri) {
                imageobject = item.field_image.image_style_uri;
                imageobject.forEach(function (item) {
                  if (item.thumbnail) {
                    image = item.thumbnail
                  }
                })
              }
              //
              // render the article item
              //
              return (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <Link to={item.path.alias}>
                    <h4 style={{ marginBottom: "0px" }}>{item.title}</h4>
                    <img src={image} alt="Girl in a jacket"></img>
                  </Link>
                  {terms}
                </div>
              )
            })
          )
          : ( <div>Loading...</div> )
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
