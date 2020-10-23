import { SET_ARTICLES } from '../common/constants'
export const initialArticles = ''

// export const initialArticles = {
//     "rows": [
//         { "field_image": "http://192.168.56.101/sites/default/files/styles/thumbnail/public/2020-10/generateImage_mDQHw6.jpeg?itok=D_9jbXgY", "title": "Plaga Tego", "nid": "251", "view_node": "/article/plaga-tego" },
//         { "field_image": "http://192.168.56.101/sites/default/files/styles/thumbnail/public/2020-10/generateImage_c3dVN5.jpg?itok=mKatzG64", "title": "Bene Eum Laoreet Mauris", "nid": "257", "view_node": "/article/bene-eum-laoreet-mauris" }, 
//         { "field_image": "http://192.168.56.101/sites/default/files/styles/thumbnail/public/2020-10/generateImage_0BohZf.jpg?itok=4WprhlO4", "title": "Torqueo Validus", "nid": "252", "view_node": "/node-252-article" }, 
//     ],
//         "pager": { "current_page": 0, "total_items": "3", "total_pages": 1, "items_per_page": 5 }
// }

const reducer = (state = initialArticles, action) => {
    switch (action.type) {

        case SET_ARTICLES:
            // console.log("REDUCER SET_ARTICLES", action)
            return action.payload;

        default:
            return state;
    }
};

export default reducer;
