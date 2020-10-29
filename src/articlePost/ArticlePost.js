//
// Request Headers
//
// Accept: application/vnd.api+json
// Content-Type: application/octet-stream
// X-CSRF-Token: ab9GUlrf7UfccnaNKSmicMF60N0TcVzoWupcA3UBv7c
// Content-Disposition: file; filename="156696.jpg"
// User-Agent: PostmanRuntime/7.26.5
// Postman-Token: 11d0a64a-816c-41cc-b7ff-8e45ae3f65c0
// Host: 192.168.56.101
// Connection: keep-alive
// Cookie: "SESS2f4ff3168b8423453fc408c2c2581ce0=z4nY3mKAsitDoNP-1jn3oIuq2SukOHBj8702fq0fWaI"
//
//
// Request Body
//
// content: {…}
//     autoClose: true
//     bytesRead: 379896
//     closed: true
//     fd: null
//     flags: "r"
//     mode: 438
//     path: "/home/ste/Pictures/wallpapers/156696.jpg"
//     readable: false
// src: "/home/ste/Pictures/wallpapers/156696.jpg"
//

import React from 'react'
import { connect } from 'react-redux';

import { postArticle, setArticleFile } from '../articlePost/articlePost-actions'

import * as endpoint from '../api/endpoints'
// import { getCsrfToken } from '../api/api';


import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'


// import { api } from '../api/api';
// import axios from 'axios';

// ant design ------------------------------------------------
// import "antd/dist/antd.css";
// import { Upload, message } from 'antd';
// import { InboxOutlined } from '@ant-design/icons';
// ant design ------------------------------------------------


const ArticlePost = ({
  loaded,
  loading,
  dispatchPostArticle,
  dispatchSetArticleFile,
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


  // React.useEffect(() => {
  //   console.log("useEffect()")
  // }, []);


  // ant design ------------------------------------------------
  // const { Dragger } = Upload;
  // const props = {
  //   name: 'file',
  //   multiple: true,
  //   withCredentials: true,
  //   action: endpoint.ARTICLE_POST_FILE,
  //   headers: {
  //     "Accept": "application/vnd.api+json",
  //     "Content-Type": "application/octet-stream",
  //     "X-CSRF-Token": axios(endpoint.CSRF_TOKEN),
  //     "Content-Disposition": "file; filename=\"" + "file" + "\"",
  //     "Accept-Language": "en-US,en;q=0.9",
  //   },
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };
  // ant design ------------------------------------------------


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

      {/* react-dropzone-uploader */}
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*,audio/*,video/*"
        inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
        styles={{
          dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
          inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
        }}
      />

images: {JSON.stringify(images)}
      {/* react-dropzone-uploader */}

      {/* ant design */}
      {/* <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag and drop the files</p>
      </Dragger> */}
      {/* ant design */}

      <form onSubmit={handleSumbitForm}>
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
  dispatchSetArticleFile: payload => dispatch(setArticleFile(payload)),
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
