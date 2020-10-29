import React from 'react'
import { connect } from 'react-redux';

import {
  postArticle,
  setArticleFile,
  setArticleBody,
  setArticleTags,
  setArticleTitle,
} from '../articlePost/articlePost-actions'
import * as endpoint from '../api/endpoints'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'



const ArticlePost = ({
  loaded,
  loading,
  dispatchPostArticle,
  dispatchSetArticleFile,
  dispatchSetArticleTitle,
  dispatchSetArticleBody,
  dispatchSetArticleTags,
  images,
  title,
  body,
  tags,
}) => {

  const [values, setValues] = React.useState({
    title: '',
    body: '',
    images: '',
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSumbitForm = (e) => {
    e.preventDefault();
    console.log("handleSumbit", e)

    // WOrking - No image -------------------
    // const payload2 = {
    //   "data": {
    //     "type": "node--article",
    //     "attributes": {
    //       "title": values.title,
    //       "body": {
    //         "value": values.body,
    //         "format": "plain_text"
    //       }
    //     }
    //   }
    // }

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
              "id": images.file,
              "meta": {
                "alt": "Json Uploaded Testing1",
                "title": "Json Uploaded Testing1",
                "width": null,
                "height": null
              }
            }
          }
        }
      }
    }

    console.log('payload', payload)
    dispatchPostArticle(payload)
  }


  // React.useEffect(() => {
  //   console.log("useEffect()")
  // }, []);


  const getUploadParams = async ({ file, meta }) => {

    // console.log('file >>>>>>>>>>>>>>>>> ', file)
    // console.log('meta >>>>>>>>>>>>>>>>> ', meta.previewUrl)
    // console.log('body >>>>>>>>>>>>>>>>> ', body)

    var body = file;
    const url = endpoint.ARTICLE_POST_FILE;
    const headers = {
      "Accept": "application/vnd.api+json",
      "Content-Type": "application/octet-stream",
      "Content-Disposition": "file; filename=\"" + file.name + "\"",
    }
    return { url, headers, body }
  }

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

  const handleSubmit = (files, allFiles) => {
    // console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }



  return (
    <div>

      <div>images: {JSON.stringify(images)}</div>
      <div>title: {JSON.stringify(title)}</div>


      <form onSubmit={handleSumbitForm}>
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
  dispatchSetArticleFile: payload => dispatch(setArticleFile(payload)),
  dispatchSetArticleTitle: payload => dispatch(setArticleTitle(payload)),
  dispatchSetArticleBody: payload => dispatch(setArticleBody(payload)),
  dispatchSetArticleTags: payload => dispatch(setArticleTags(payload)),
})

const mapStateToProps = (state) => ({
  loaded: state.api.loaded,
  loading: state.api.loading,
  images: state.articlePost.images,
  title: state.articlePost.title,
  body: state.articlePost.body,
  tags: state.articlePost.tags,
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePost);
