import React from 'react'
import { connect } from 'react-redux';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
// import AsyncSelect from 'react-select/async';

import {
    postArticle,
    setArticleFile,
    setArticleBody,
    setArticleTags,
    setArticleTitle,
    getVocabulary,
} from '../articlePost/articlePost-actions'
import * as endpoint from '../api/endpoints'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const animatedComponents = makeAnimated();

const ArticlePost = ({
    loaded,
    loading,
    dispatchPostArticle,
    dispatchSetArticleFile,
    dispatchSetArticleTitle,
    dispatchSetArticleBody,
    dispatchSetArticleTags,
    dispatchGetVocabulary,
    images,
    title,
    files,
    body,
    tags,
    vocabulary,
}) => {

    // const [values, setValues] = React.useState({
    //   title: '',
    //   body: '',
    //   images: '',
    // });

    // const handleChange = prop => event => {
    //   setValues({ ...values, [prop]: event.target.value });
    // };

    const [selected, setSelected] = React.useState();

    const handleSumbitForm = (e) => {
        e.preventDefault();
        console.log("handleSumbit e", e)
        console.log("handleSumbit tags", tags)
        const payload = {
            "data": {
                "type": "node--article",
                "attributes": {
                    "title": title,
                    "body": {
                        "value": body,
                        "format": "plain_text"
                    }
                },
                "relationships": {
                    "field_image": {
                        "data": {
                            "type": "file--file",
                            "id": files.id,
                            "meta": {
                                "alt": "Json Uploaded Testing1",
                                "title": "Json Uploaded Testing1",
                                "width": null,
                                "height": null
                            }
                        }
                    },
                    "field_tags": {
                        "data": tags
                    }
                }
            }
        }

        console.log('dispatchPostArticle payload', payload)
        dispatchPostArticle(payload)
    }


    React.useEffect(() => {
        // get the available tags from vocabulary
        // to fill the option list of the react-select
        dispatchGetVocabulary('tags')
    }, [
        dispatchGetVocabulary,
    ]);


    // upload the image and get the image id before the form submit
    const getUploadParams = async ({ file, meta }) => {
        var body = file;
        const url = endpoint.ARTICLE_POST_FILE;
        const headers = {
            "Accept": "application/vnd.api+json",
            "Content-Type": "application/octet-stream",
            "Content-Disposition": "file; filename=\"" + file.name + "\"",
        }
        return { url, headers, body }
    }

    // when the submit is finished store the file
    const handleChangeStatus = ({ xhr }, status) => {
        if (xhr) {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const result = JSON.parse(xhr.response);
                    console.log('xhr.response >>>>>>>>>>>>>>>>> ', result)
                    dispatchSetArticleFile(result.data.id)
                }
            }
        }
    }

    // POST body entries, one for every tag
    const tagPostBodyitem = (item) => {
        return (
            { "type": "taxonomy_term--tags", "id": item }
        )
    }

    // store to redux every change
    const handleSelectOnChange = (value) => {
        // console.log("handleSelectOnChange", JSON.stringify(value))
        setSelected(value)
        const ids = value.map(x => tagPostBodyitem(x.value));
        dispatchSetArticleTags(ids)
    }

    // const handleSubmit = (files, allFiles) => {
    //   // console.log(files.map(f => f.meta))
    //   allFiles.forEach(f => f.remove())
    // }


    return (
        <div>

            <form
                onSubmit={handleSumbitForm}
                style={{ margin: '10px' }}
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={(event) => dispatchSetArticleTitle(event.target.value)}
                    value={title || ''}
                />
                <Dropzone
                    multiple={false}
                    maxFiles={1}
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    accept="image/*,audio/*,video/*"
                    inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
                    styles={{
                        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                    }}
                />
                <input
                    type="text"
                    name="body"
                    placeholder="Body"
                    onChange={(event) => dispatchSetArticleBody(event.target.value)}
                    value={body || ''}
                />

                <Select
                    // defaultValue={[options[1], options[2]]}
                    defaultValue={[]}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={vocabulary}
                    // onChange={value => dispatchSetArticleTags(value)}
                    onChange={value => handleSelectOnChange(value)}
                    value={selected}
                />

                <input
                    type="submit"
                    placeholder="Send"
                    value="Submit"
                />
            </form>

            <div>title: {JSON.stringify(title)}</div>
            <div>images: {JSON.stringify(images)}</div>
            <div>body: {JSON.stringify(body)}</div>
            <div>tags: {JSON.stringify(tags)}</div>
            <div>selected: {JSON.stringify(selected)}</div>
            {/* <div>vocabulary: {vocabulary && JSON.stringify(vocabulary)}</div> */}
        </div>

    )
}

const mapDispatchToProps = dispatch => ({
    dispatchPostArticle: payload => dispatch(postArticle(payload)),
    dispatchSetArticleFile: payload => dispatch(setArticleFile(payload)),
    dispatchSetArticleTitle: payload => dispatch(setArticleTitle(payload)),
    dispatchSetArticleBody: payload => dispatch(setArticleBody(payload)),
    dispatchSetArticleTags: payload => dispatch(setArticleTags(payload)),
    dispatchGetVocabulary: payload => dispatch(getVocabulary(payload)),
})

const mapStateToProps = (state) => ({
    loaded: state.api.loaded,
    loading: state.api.loading,
    images: state.articlePost.images,
    files: state.articlePost.files,
    title: state.articlePost.title,
    body: state.articlePost.body,
    tags: state.articlePost.tags,
    vocabulary: state.articlePost.vocabulary
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePost);
