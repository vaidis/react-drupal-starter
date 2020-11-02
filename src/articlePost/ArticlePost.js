import React from 'react'
import { connect } from 'react-redux';
// import Select from 'react-select'
// import makeAnimated from 'react-select/animated';
// import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';

import {
    postArticle,
    postTag,
    setArticleFile,
    setArticleBody,
    setArticleTags,
    setArticleTitle,
    getVocabulary,
    setSelected,
    addSelected,
} from '../articlePost/articlePost-actions'
import * as endpoint from '../api/endpoints'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

// const animatedComponents = makeAnimated();

const ArticlePost = ({
    loaded,
    loading,
    dispatchPostArticle,
    dispatchPostTag,
    dispatchSetArticleFile,
    dispatchSetArticleTitle,
    dispatchSetArticleBody,
    dispatchSetArticleTags,
    dispatchGetVocabulary,
    dispatchSetSelected,
    dispatchAddSelected,
    images,
    title,
    files,
    body,
    tags,
    selected,
    vocabulary,
}) => {


    Object.size = function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };


    const handleSumbitForm = (e) => {
        e.preventDefault();

        // POST request body
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


    //
    // image: POST request
    //
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

    //
    // image: POST response (id)
    //
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


    React.useEffect(() => {
        //
        // tags:
        // get the vocabulary
        // save it to store.vocabulary
        // (react-select use the store.vocabulary as term options)
        //
        dispatchGetVocabulary('tags')
    }, [
        dispatchGetVocabulary,
    ]);



    //
    // tags:
    // part of POST body
    //
    const tagPostBodyitem = (item) => {
        return (
            { "type": "taxonomy_term--tags", "id": item }
        )
    }

    //
    // tags:
    // called from react-select
    // save selected values to store.articlePost.tags
    //
    const handleSelectOnChange = (value) => {
        console.log("handleSelectOnChange value", JSON.stringify(value))
        dispatchSetSelected(value)
        if (value) {

            //
            // combine selected items with format:
            // {1234},{5678},{9012}
            //
            const ids = value.map(x => tagPostBodyitem(x.value));

            //
            // save them in store.articlePost.tags
            // ready for POST article with tags
            //
            dispatchSetArticleTags(ids)
        }
    }

    //
    // tags:
    // POST a new term (before submitting the article)
    // and add it in the store.articlePost.selected (react-select options)
    //
    const handleSelectOnCreate = (name) => {

        // POST new tag
        console.group('handleSelectOnCreate', name);
        const body = {
            "data": {
                "type": "taxonomy_term--tags",
                "attributes": {
                    "name": name
                }
            }
        }
        dispatchPostTag(body)
    }


    const handleSelectInputChange = (e) => {
        console.log("handleSelectInputChange - - - - - - - -")
        if (selected) {
            const ids = selected.map(x => tagPostBodyitem(x.value));
            console.log("handleSelectInputChange ids ----------------------", ids)
            dispatchSetArticleTags(ids)
        }
        // console.log("handleSelectInputChange ====================================")
    }

    return (
        <div>

            <form
                onSubmit={handleSumbitForm}
                style={{ margin: '10px' }}
            >

                <CreatableSelect
                    isMulti
                    isClearable
                    value={selected}
                    options={vocabulary}
                    onChange={handleSelectOnChange}
                    onCreateOption={handleSelectOnCreate}
                    onInputChange={handleSelectInputChange}
                />

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



                {/* <Select
                    isMulti
                    // defaultValue={[options[1], options[2]]}
                    defaultValue={[]}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={vocabulary}
                    // onChange={value => dispatchSetArticleTags(value)}
                    onChange={value => handleSelectOnChange(value)}
                    value={selected}
                /> */}

                <input
                    type="submit"
                    placeholder="Send"
                    value="Submit"
                />
            </form>

            <div>title: {JSON.stringify(title)}</div><br />
            <div>images: {JSON.stringify(images)}</div><br />
            <div>body: {JSON.stringify(body)}</div><br />
            <div>tags: {JSON.stringify(tags)}</div><br />
            <div>selected: {JSON.stringify(selected)}</div><br />
            <div>vocabulary: {JSON.stringify(Object.size(vocabulary))}</div><br />
            {/* <div>vocabulary: {vocabulary && JSON.stringify(vocabulary)}</div> */}
        </div>

    )
}

const mapDispatchToProps = dispatch => ({
    dispatchPostArticle: payload => dispatch(postArticle(payload)),
    dispatchPostTag: payload => dispatch(postTag(payload)),
    dispatchSetArticleFile: payload => dispatch(setArticleFile(payload)),
    dispatchSetArticleTitle: payload => dispatch(setArticleTitle(payload)),
    dispatchSetArticleBody: payload => dispatch(setArticleBody(payload)),
    dispatchSetArticleTags: payload => dispatch(setArticleTags(payload)),
    dispatchGetVocabulary: payload => dispatch(getVocabulary(payload)),
    dispatchSetSelected: payload => dispatch(setSelected(payload)),
    dispatchAddSelected: payload => dispatch(addSelected(payload)),
})

const mapStateToProps = (state) => ({
    loaded: state.api.loaded,
    loading: state.api.loading,
    images: state.articlePost.images,
    files: state.articlePost.files,
    title: state.articlePost.title,
    body: state.articlePost.body,
    tags: state.articlePost.tags,
    vocabulary: state.articlePost.vocabulary,
    selected: state.articlePost.selected,
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePost);
