import React from 'react';
import { connect } from 'react-redux'
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { useLocation, BrowserRouter as Router } from "react-router-dom";

import { getArticles } from './articles-actions'
import { setApiUrlParams } from '../api/api-actions'
import { setPagerNext, setPagerPrev, setPagerFirst, setPagerLast } from '../api/api-actions'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Articles = ({
  links,
  pager,
  loading,
  loaded,
  articles,
  params,
  dispatchSetApiUrlParams,
  dispatchGetArticles,
  dispatchSetPagerFirst,
  dispatchSetPagerNext,
  dispatchSetPagerPrev,
  // dispatchSetPagerLast,
}) => {

  // get front-end url params fromr user
  // set back-end url params for api.js
  // const location = useLocation();
  // let { path } = useParams();
  let query = useQuery();

  const userParams = {
    terms: query.get('terms') || '',
    search: query.get('search') || '',
    pager: {
      offset: parseInt(query.get('offset')) || 0,
      page: parseInt(query.get('page')) || 0,
      items: parseInt(query.get('items')) || 0,
      limit: parseInt(query.get('limit')) || 4,
    },
  }
  // console.log("Articles.js userParams", userParams)
  // console.log("Articles.js path", path)
  // console.log("Articles.js query", query.get('zzz'))
  // console.log("Articles.js articles", articles)

  React.useEffect(() => {

    // Compare Objects
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

    if (!deepEqual(userParams, params)) {
      dispatchSetApiUrlParams(userParams)
      // console.log(" - 1 Articles.js > useEffect > userParams:", userParams)
      // console.log(" - 2 Articles.js > useEffect > params:", params)
      dispatchGetArticles(userParams)
    }
  }, [
    dispatchSetApiUrlParams,
    dispatchGetArticles,
    userParams
  ]);

  return (
    <div>
      <h1>Articles</h1>
      <div>{JSON.stringify(userParams, 0, 2)}</div>
      <br />
      <div>{JSON.stringify(params, 0, 2)}</div>
      <div>QUERY: {JSON.stringify(query, 0, 2)}</div>
      <Link to={"/articles/?offset=0"}> [FIRST] </Link>
      <Link to={"/articles/?offset=4"}> [NEXT] </Link>
      <Link to={"/contact"}> [TEST] </Link>

      <div>
        {/* <button onClick={() => dispatchSetPagerFirst()}> [First] </button>
        <button onClick={() => dispatchSetPagerPrev()}> [Prev] </button>
        <button onClick={() => dispatchSetPagerNext()}> [Next] </button> */}
        {/* <button onClick={() => dispatchSetPagerLast(total_pages - 1)}> [Last] </button> */}
      </div>

      {
        loaded
          ? (
            articles.map((item, i) => {
              // console.log("guery", query.getAll)

              // get TERMS
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

              // get IMAGE
              const imageobject = item.field_image.image_style_uri;
              let image = ''
              imageobject.forEach(function (item) {
                if (item.thumbnail) {
                  image = item.thumbnail
                }
              })


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
            console.log("------------- LOADED FALSE -----------")
          )

      }



      <div>
        {/* {JSON.stringify(pager)} */}
        {/* {JSON.stringify(total_pages)} */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.api.loading,
  loaded: state.api.loaded,
  articles: state.articles,
  params: state.api.params,
  links: state.api.links,
  // total_pages: state.articles.pager.total_pages,
  pager: state.params,
})

const mapDispatchToProps = dispatch => ({
  dispatchSetPagerFirst: () => dispatch(setPagerFirst()),
  dispatchSetPagerNext: () => dispatch(setPagerNext()),
  dispatchSetPagerPrev: () => dispatch(setPagerPrev()),
  // dispatchSetPagerLast: total_pages => dispatch(setPagerLast((total_pages))),
  dispatchSetApiUrlParams: params => dispatch(setApiUrlParams(params)),
  dispatchGetArticles: params => dispatch(getArticles(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
