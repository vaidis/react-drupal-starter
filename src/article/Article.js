import React from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom"

import { getArticle } from './article-actions'
import * as endpoint from '../api/endpoints'

import TermLink from '../common/TermLink'

const Article = ({
  loaded,
  loading,
  article,
  title,
  dispatchGetArticle
}) => {
  let { path } = useParams();
  React.useEffect(() => {
    dispatchGetArticle(path)
  }, [
    dispatchGetArticle,
    path
  ]);

  return (
    <div>
      {
        !loading && article.data
          ? (
            <div>
              <h1>{article.data[0].title}</h1>
              <div>{article.data[0].created}</div>
              <div>
                <img
                  src={endpoint.BASE + "/" + article.data[0].field_image.uri.url}
                  alt={title}
                />
              </div>
              <div>{article.data[0].body.value.substring(0, 255)}</div>
              <div>
                {
                  article.data[0].field_tags.lenght &&
                  article.data[0].field_tags.map((tag, i) => {
                    return (
                      <span key={i}>
                        <TermLink tag={tag} />
                      </span>
                    )
                  })
                }
              </div>
            </div>
          )
          : (
            <div>loading...</div>
          )
      }
    </div>
  );
}


const mapDispatchToProps = dispatch => ({
  dispatchGetArticle: path => dispatch(getArticle(path)),
})

const mapStateToProps = (state) => ({
  loaded: state.api.loaded,
  loading: state.api.loading,
  article: state.article,
})

export default connect(mapStateToProps, mapDispatchToProps)(Article);
