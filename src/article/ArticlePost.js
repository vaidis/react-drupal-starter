import React from 'react';
import { connect } from 'react-redux';
import { postArticle } from './article-actions'

const ArticlePost = ({
    loaded,
    loading,
    dispatchPostArticle,
}) => {

    const [values, setValues] = React.useState({
        title: '',
        body: '',
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        console.log("handleSumbit", e)

        const payload = {
            "data": {
                "type": "node--article",
                "attributes": {
                    "title": values.title,
                    "body": {
                        "value": values.body,
                        "format": "plain_text"
                    }
                }
            }
        }

        console.log('payload', payload)
        dispatchPostArticle(payload)
    }

    return (
        <div>
            Post Article
            <form onSubmit={handleSumbit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange('title')}
                    value={values.title}
                />
                <input
                    type="text"
                    name="body"
                    placeholder="Body"
                    onChange={handleChange('body')}
                    value={values.body}
                />
                <input
                    type="submit"
                    placeholder="Send"
                    value="Submit"
                />
            </form>
            {JSON.stringify(values)}
        </div>

    )
}

const mapDispatchToProps = dispatch => ({
    dispatchPostArticle: payload => dispatch(postArticle(payload)),
})

const mapStateToProps = (state) => ({
    loaded: state.api.loaded,
    loading: state.api.loading,
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePost);

