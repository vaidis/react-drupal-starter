import React from 'react'
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone-uploader'
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
  title,
  files,
  body,
  tags,
  selected,
  vocabulary,
  csrf_token,
}) => {

  /** used by the react-dropzone-uploader for the image field */
  const [error_upload, setErrorUpload] = React.useState('');

  const handleSumbitForm = (e) => {
    e.preventDefault();
    /**
     *
     * @type {object} payload - the body of POST request of
     *     an article that contains an image and at least one
     *     term. There is no validation yet
     */
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
    // console.log('dispatchPostArticle payload', payload)

    /**
     * Dispatch the POST_ARTICLE action that triggers the
     * saga postArticleWorker to POST the article
     *
     * @param {object} payload - the POST request body
     */
    dispatchPostArticle(payload)
  }

  /**
   * react-dropzone-uploader POST request parameters
   * The react-dropzone-uploader uses his own xhr library
   * and thus not using the api.js
   *
   * @param {object} file - The image or video file
   * @param {object} meta - Meta data
   */
  const getUploadParams = async ({ file, meta }) => {
    var body = file;
    const url = endpoint.ARTICLE_POST_FILE;
    const headers = {
      "Accept": "application/vnd.api+json",
      "Content-Type": "application/octet-stream",
      "Content-Disposition": "file; filename=\"" + file.name + "\"",
      "X-CSRF-Token": csrf_token,
    }
    console.log("body", body)
    console.log("headers", headers)
    return { url, headers, body }

  }

  /**
   * react-dropzone-uploader POST response
   * Gets the id of the new image just stored in backend
   * api: https://github.com/fortana-co/react-dropzone-uploader/blob/8603b1892f568ef14f35ace5596c3f5b4b6381d3/docs/api.md
   *
   * @param {object} xhr - The fetcher
   * @param {object} fileWithMeta - file callback functions
   * @param {object} status - response status
   */
  const handleChangeStatus = ({ xhr }, fileWithMeta, status) => {
    if (xhr) {
      console.log('xhr', xhr)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const result = JSON.parse(xhr.response);
          console.log('xhr.response', result)
          if (result.hasOwnProperty('data')) {
            dispatchSetArticleFile(result.data.id)
          }
          if (result.hasOwnProperty('errors')) {
            status[0].remove()
            setErrorUpload(fileWithMeta)
            /**
             * for some reason, the fileWithMeta gives the data of status
             * and the status gives the data of the fileWithMeta
             */
            // console.log("handleChangeStatus status", status);
            // console.log("xhr.response fileWithMeta", fileWithMeta);
            // console.log("xhr.response status[0].remove", status[0].remove);
            // console.log('xhr.response result', result)
            // console.log('xhr.response result.error', result.errors)
          }
        }
      }
    }
  }

  React.useEffect(() => {
    /** get a fresh vocabulary to fill the react-select options list */
    dispatchGetVocabulary('tags')
  }, [
    dispatchGetVocabulary,
  ]);

  const tagPostBodyitem = (item) => {
    return (
      { "type": "taxonomy_term--tags", "id": item }
    )
  }

  /**
   * called from react-select when a tag added or removed
   * save all selected values to store.articlePost.tags
   *
   * @param {string[]} value - term name
   *     [{"value":"00d9f5ee-9121-46c3","label":"some tag"}]
   * @dispatch {string[]} ids - the selected terms
   */
  const handleSelectOnChange = (value) => {
    console.log("handleSelectOnChange value", JSON.stringify(value))
    dispatchSetSelected(value)
    if (value) {
      /**
       * @type {string[]} itds - format: {1234},{5678},{9012}
       */
      const ids = value.map(x => tagPostBodyitem(x.value));

      dispatchSetArticleTags(ids)
    }
  }

  /**
   * called from react-select when post a new tag
   *
   * @param {string} name - The name of the tag
   * @dispatch {object} body - The body of POST request
   */
  const handleSelectOnCreate = (name) => {
    // console.group('handleSelectOnCreate', name);
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
          style={{ margin: '10px 0px' }}
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
        {error_upload}<br />
        <textarea
          type="text"
          name="body"
          placeholder="Body"
          onChange={(event) => dispatchSetArticleBody(event.target.value)}
          value={body || ''}
          style={{ margin: '10px 0px' }}
        ></textarea>
        <CreatableSelect
          placeholder={'Creatable Multi Select'}
          isMulti
          value={selected}
          isClearable
          options={vocabulary}
          onChange={handleSelectOnChange}
          onCreateOption={handleSelectOnCreate}
          style={{ margin: '10px 0px' }}
        />
        <input
          type="submit"
          placeholder="Send"
          value="Submit"
          style={{ margin: '10px 0px' }}
        />
      </form>
      <div style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>
        <code >
          <div><strong>store.articlePost.title:</strong> {JSON.stringify(title)}</div><br />
          <div><strong>store.articlePost.files:</strong> {JSON.stringify(files)}</div><br />
          <div><strong>store.articlePost.body:</strong> {JSON.stringify(body)}</div><br />
          <div><strong>store.articlePost.tags:</strong> {JSON.stringify(tags)}</div><br />
          <div><strong>store.articlePost.selected:</strong> {JSON.stringify(selected)}</div><br />
        </code>
      </div>
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
  files: state.articlePost.files,
  title: state.articlePost.title,
  body: state.articlePost.body,
  tags: state.articlePost.tags,
  vocabulary: state.articlePost.vocabulary,
  selected: state.articlePost.selected,
  csrf_token: state.user.csrf_token,
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePost);
