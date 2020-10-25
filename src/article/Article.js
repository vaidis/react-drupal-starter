import React from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from "react-router-dom"

import { getArticle } from './article-actions'
import * as endpoint from '../api/endpoints'

const Article = ({ loading, article, dispatchGetArticle }) => {

    let { path } = useParams();
    console.log("ARTICLE path", path)

    React.useEffect(() => {
        dispatchGetArticle(path)
    }, [
        dispatchGetArticle,
        path
    ]);

    // const image = <img
    //     src={endpoint.BASE + "/" + article.field_image.uri.url}
    //     alt={article.title}
    // />

    // const tags = article.field_tags.map((tag, i) => {
    //     return (
    //         <span key={i}>
    //             <Link to={tag.path.alias}>{tag.name}</Link>
    //         </span>
    //     )
    // })

    return (
        <div>
            <h2>Article</h2>
            {/* {!loading &&
                <div>
                    <h1>{article.title}</h1>
                    <div>{article.created}</div>
                    <div>{tags} </div>
                    <div>{image}</div>
                    <div>{article.body.value}</div>
                </div>
            } */}
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    dispatchGetArticle: path => dispatch(getArticle(path)),
})

const mapStateToProps = (state) => ({
    article: state.article,
    loading: state.api.loading,
})

export default connect(mapStateToProps, mapDispatchToProps)(Article);
